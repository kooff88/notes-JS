# Computed计算属性   

Computed计算属性是Vue中常用的一个功能，下面来解析一个官网例子：  

```html
 <div id="example">
   <p>Original message: "{{message}}"</p>
   <p>Computed reversed message: "{{ reversedMessage }}"</p>
 </div>
```

```
  var vm =new Vue({
  	el: '#example',
  	data: {
  		message: 'Hello'
  	},
  	computed: {
  	  reversedMessage: function () {
  	  	return this.message.split().reverse().join('')
  	  }
  	}
  })
```


## Situation

Vue里的Computed属性非常频繁的被使用到，但并不是很清楚它的实现原理。比如：计算属性如何与属性建立依赖关系？ 属性发生  
变化又如何通知到计算属性重新计算？  

关于如何建立依赖关系，我的第一个想到的就是语法解析，但这样太浪费性能，因此排除，第二个想到的就是利用JavaScript单线程  
的原理和Vue的 Getter设计，通过一个简单地发布订阅，就可以在一次计算属性求值的过程中收集到相关依赖。  

通过下面的任务 从Vue源码一步步解析Computed的实现原理。  


## Task

分析依赖收集实现原理，分析动态计算实现原理。  


## Action

data 属性初始化 getter setter:

```js
// src/observer/index.js

// 这里开始转换 data的getter setter,原始值已存入到 __ob__属性中 
 Object.defineProperty(obj, key, {
 	enmuerable: true,
 	configurable: true,
 	get: function reactiveGetter(){
 		const value= getter ? getter.call(obj) : val;

 		// 判断是否处于依赖收集状态

 		if (Dep.target) {
 			// 建立依赖关系
 			dep.depend()
 			...
 		}
 		return value
 	},
 	set: function reactiveSetter (newVal){
 		...
 		// 依赖发生变化，通知到计算属性重新计算
 		dep.notify()
 	}
 })

```

computed 计算属性初始化 

```js
... 
// 创建get set 方法
sharedPropertyDefinition.get = createComputedGetter(key);
sharedPropertyDefinition.set = noop
...

// 创建属性 vm.reversedMessage, 并初始化 getter, setter
Object.defineProperty(target, key, sharedPropertyDefinition)


function createComputedGetter (key){
	return function computedGetter(){
		const watcher = this._computedWatchers && this._computedWatchers[key];
		if (watcher.dirty){
			// watcher 暴露 evaluate 方法用于取值操作
			watcher.evaluate()
		}
		// 同第一步，判断是否处于依赖收集状态
		if (Dep.target){
			watcher.depend()
		}
		return watcher.value
	}
}
```


无论是属性还是计算属性，都会生成一个对应的watcher实例

```js
// sr/core/observer/watcher.js

// 当通过 vm.reversedMessage 获取计算属性时，就会进到这个getter方法
get (){
	// this 指的是watcher 实例
	// 将当前watcher实例暂存到 Dep.target, 这就表示开启了依赖收集任务
	pushTarget(this)
	let value
	const vm = this.vm;
	try {
		// 在执行 vm.reversedMessage的回调函数时，会触发属性（步骤1）和计算属性（步骤2）的getter
		// 在这个执行过程中，就可以收集到vm.reversedMessage的依赖了
		value = this.getter.call(vm,vm)
	} catch (e){
		if (this.user) {
			handleError(e,vm,`getter for watcher"${this.expresstion}"`)
		}else {
			throw e
		}
	} finally {
		if (this.deep){
			traverse(value)
		}
		// 结束依赖收集任务
		popTarget()
		this.cleanupDeps()
	}
	return value;
}
```


上面多处提到了 dep.depend,dep.notify,Dep.target, 那么 Dep究竟是什么呢？

Dep的代码短小精悍，但却承担着非常重要的依赖收集环节。  

```js
// src/core/observer/dep.js

export default class Dep {
	static target: ?Watcher
	id: number;
	subs: Array<Watcher>;

	constructor () {
		this.id = uid++;

		this.subs = [];
	}

	addSub(sub: Watcher){
		this.subs.push(sub)
	}

	removeSub (sub: Watcher){
		remove(this.subs,sub)
	}

	depend (){
		if (Dep.target){
			Dep.target.addDep(this)
		}
	}

	notify (){
		const subs = this.subs.clice();
		for (let i = 0; l = subs.length; i< l; i++){
			// 更新watcher的值，与watcher.evaluate()类似，
			// 但update是给依赖变化时使用的，包含对watch的处理
			subs[i].update();
		}
	}
}

// 当首次计算 computed属性的值时，Dep将会在计算期间对依赖进行收集

Dep.target = null;
const targetStack = [];

export function pushTarget (_target: Watcher){
	// 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前computed计算属性嵌套其他computed计算属性），  
	// 那么将会把当前target暂存到 targetStack,先进行其他 target的依赖收集，
	if (Dep.target) targetStack.push(Dep.target);
	Dep.target = _target;
}

export function popTarget (){
	// 当嵌套的依赖收集任务完成后，将 target恢复为上一层的 Watcher,并继续做依赖收集
	Dep.target = targetStack.pop();
}

```

 
## Result

总结一下依赖收集，动态计算的流程。

```
 1. data属性初始化 getter setter
 2. computed 计算属性初始化，提供的函数将用作属性 vm.reversedMessage 的 getter
 3. 当首次获取 reversedMessage计算属性的值时， Dep开始依赖收集
 4. 在执行message getter方法时，如果 Dep处于依赖收集状态，则判定message为 reversedMessage的依赖,并建立依赖关系。
 5. 当message发生变化时，根据依赖关系，触发reverseMessage的重新计算。 
```

到此，整个Computed的工作流程就理清楚了。  

Vue 是一个设计优美的框架，使用 Getter Setter设计使依赖关系实现的非常顺其自然，使用计算与渲染分离的设计  
（优先使用MutationObserver,降级使用setTimeout）也非常贴合浏览器计算引擎与排版引擎分离的设计原理。   