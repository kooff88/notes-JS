# 侦听器

### 计算属性 vs 侦听属性

Vue 提供了一种更通用的方式来观察和响应Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着数据变动时，  
你很容易滥用watch -- 特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的  
watch回调。细想一下这个例子：  

```
<div id="demo">{{ fullName }}</div>
```

```
var vm = new Vue({
	el: "#demo",
	data: {
		firstName: 'Foo',
		lastName: 'Bar',
		fullName: 'Foo Bar'
	},
	watch: {
		firstName: function (val){
			this.fullName = val + ' ' + this.lastName
		},
		lastName: function (val){
			this.fullName = this.firstName + ' ' + val
		}
	}
})

```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：  

```js
var vm = new Vue({
	el: "#demo",
	data: {
		firstName: 'Foo',
		lastName: 'Bar'
	},
	computed: {
		fullName: function(){
			return this.firstName + ' ' + this.lastName
		}
	}
})
```


### 计算属性的 setter

计算属性默认只有 getter,不过在需要时你也可以提供一个 setter

```
	computed: {
		fullName: {
			// getter
			get: function () {
				return this.firstName + ' ' + this.lastName
			},

			// setter
			set: function (newValue){
				var names = newValue.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1]
			}
		}
	}

```

现在再运行  vm.fullName = 'John Doe' 时，setter会被调用， vm.firstName 和 vm.lastName 也会相应的被更新。  


## 侦听器

虽然计算属性在大多数情况下更合适，但有时候也需要一个自定义的侦听器。这就是为什么 Vue通过 watch 选项提供了  
一个更通用的方法，来响应数据变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。   

```
<div id="watch-example">
	<p>
		Ask a yes/no question:
		<input v-model="question">
	</p>
	<p>{{ answer }}</p>
</div>
```

```html
<!--因为AJAX库和通用工具的生态已经相当丰富， Vue核心代码没有重复-->
<!--提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具-->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
	var watchExampleVM = new Vue({
		el: '#watch-example',
		data: {
			question:'',
			answer: 'I cannot give you an answer until you ask a question!'
		},
		watch: {
			// 如果 `question`发生改变，这个函数就会运行 
			question: function (newQuestion, oldQuestion){
				this.answer = 'Waiting for you to stop typing...';
				this.debouncedGetAnswer();
			}
		},
		created: function(){
			// `_.debounce`是一个通过Loadsh限制操作频率的函数。  
			// 在这个例子中，我们希望限制访问 yesno.wtf/api的频率
			// AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
			// `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    		// 请参考：https://lodash.com/docs#debounce
    		this.debouncedGetAnswer = _.debounce(this.getAnswer,500)
		},
		methods: {
			getAnswer: function(){
				if(this.question.indexOf('?') === -1){
					this.answer = 'Questions usually contain a question mark. ;-)';
					return;
				}
				this.answer = 'Thinking...';
				var vm = this;
				axios.get('https://yesno.wtf/api')
					.then(function(response){
						vm.answer = _.capitalize(response.data.answer);
					})
					.catch(function(error){
						vm.answer = 'Error! Could not reach the API.' + error
					})
			}
		}
	})
</script>
```

在这个示例中，使用watch 选项允许我们执行异步操作（访问一个API）,限制我们执行该操作的频率，并在我们得到最终结果前，  
设置中间状态。这些都是计算属性无法做到的。  