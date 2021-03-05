## React 优化

优化的方向有两个， 一个减少render次数， 也就是减少diff 计算。 另一个是 减少计算量，主要减少重复计算，对于函数组件来说，  
每次render都会重新从头开始执行函数调用。在类组建中主要使用 shouldComponentUpdate 生命周期和PureCompnent 组件去减少  
render次数，函数组件主要使用：

```
React.memo: 等同于 PureComponent, 用它包裹子组件, 当父组件需要重新render时，如果传递给自己的props不变, 就不会触发重新render。  
memo 可以添加第二个参数， 是个函数，参数为前后props，返回true不需要重新 render。

useCallback：应用场景是父组件向子组件传递方法，当父组件重新渲染时， 代码都会重新执行，所以就算子组件包裹了React.memo，
也会重新渲染。 可以通过 useCallback 进行记忆传递的方法， 并将记忆方法传递给子组件。

useMemo: 如果在组件有个变量的值需要大量的计算才可以得出， 因为函数组件重新渲染就会重新执行代码，所以该变量的值也会重新计算
         就可以useMemo做出计算结果缓存。


```


### Diff

对于数组的 diff 

```
 第一轮遍历的核心逻辑是复用和当前节点索引一致的旧节点， 一旦出现不能复用的情况就跳出遍历。

 当第一轮遍历结束后，会 出现两种情况:

    newChild 已经遍历完， 只需要把剩余的 旧节点都删除即可。
		旧节点已经遍历完了，开始第二轮遍历， 只需要把剩余新的节点全部创建完毕即可。
		找出可以复用的子节点， 否则创建。 原理是将旧节点放置在map 结构中， 循环新节点看是否有匹配的项， 
		匹配则在 map 中删除， 并移动位置， 循环结束后将 map 中还存在的旧节点删除。


注：删除新建移动的操作都只是先做标记。
```

### react-router 原理

hash 路由： 核心是 监听了 load 和 onHashChange 事件， 在页面刷新或者URL hash 改变时渲染不同页面组件。  
history API路由： 核心是通过 replaceState 和 pushState 去改变页面 URL，通过 popState 事件监听history 随想改变的时候改变页面。  

### react-redux 

Redux 是 JavaScript 状态容器， 能提供可预测化的状态管理。需要它的原因是因为前端有大量无规律的交互和异步操作， 而且随着代码量越来越大，  
我们要维护的状态也越来越多。它能提供的就是让每个  State 变化可预测， 动作与状态统一管理。 

### connect 原理

connent 方法是一个高阶组件，主要的两个参数都是函数， 命名为 mapStateToProps 和 mapDispatchToProps, 内部原理是获取 store 添加订阅后，  
将 state 和 dispatch 分别传入上面两个方法，返回需要的 state 和 改变 state 的方法 添加到 UI组件的props上。

前提是在 应用层已经使用 provider 组件，并应用初始化时创建 store。

### 中间件原理

中间件可以说是 dispatch 的增强或者替换。

applyMiddleware([middleware]) 返回的是一个函数， createStore 内部会使用这个函数的调用结果（参数为createStore）创建store。

```js
// 一个简单的中间件规范， next 可以理解成 dispatch

const middleware = store => next => action => {
	// 一些操作
	next(action);
	// 一些操作
}

// const aa = (store) => {
// 	return 	function next(action) {
		
// 	}
// }

const applyMiddleware = function ( ...middlewares ) {
	return function rewriteCreateStoreFunc( oldCreateStore ){
		return function newCreateStore( reducer, initState ) {
			const store = oldCreateStore( reducer, initState );
			const chain = middlewares.map(middleware => middleware(store));
			let dispatch = store.dispatch;
			chain.reverse().map( middleware => {
				dispatch = middleware(dispatch);
			})
			// 多个中间件的情况相当于 dispatch = middleware1( middleware2( middleware3( dispatch)));
			// middleware1 内执行包含 middleware2 操作的 dispatch, middleware2 内执行包含middleware3 操作的 dispatch
			// 所以中间件顺序是从左到右

		  store.dispatch = dispatch;
      return store;
		}
	}
}

const store = createStore( reducer, initState, applyMiddleware( middleware));

```

redux 是 通过compose 函数也做到 [ A, B, C ] 转换成 A(B(C(next)))

```js
// 结合上面代码
dispatch = compose(...chain)( store.dispatch);

export default function compose(...funcs){
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reduce((a,b) => (...args) => a(b(...args)));
}

```