# components 组件

## 父组件和子组件

从 HTML 结构上来看，[父组件]是指页面载入时候的 HTML模板中的内容，[父组件]会等待[子组件]对其进行相关处理，  
[父组件]如下:  

```html
	<div id="componentId">
		<component-tag></component-tag>
	</div>
```

[父组件] 首先要进行实例化，才能和[子组件]进行交互， [父组件]实例化如下:  

```
	new Vue({
		el: '#componentId',
		data: {
			total:0
		},
		methods: {
			incrementTotal: function(){
				this.total +=1
			}
		}
	})

```

[子组件]在HTML上对[父组件]的指定标签（比如前面的<component-tag>标签）进行替换，从而可以与[父组件]进行交互，   
[子组件]如下：  

```
	Vue.component('component-tag', {
		template: '<button v-on:click="methodName">{{ counter }}</button>',
		data: function(){
			return{
				counter: 0,	
			}
		},
		methods: {
			methodName: function (){
				this.counter +=1;
				this.$emit('increment');
			}
		},
	})

```

如果你仅仅希望[子组件]被所在的[父组件]使用，那么也可以直接将[子组件]写到父组件的实例过程中，如下：  

```
new Vue({
	el:"#componentId",
	data: {
		total: 0
	},
	methods: {
		incrementTotal: function (){
			this.total +=1;
		}
	},
	components: {
		'my-component': {
			template: '<div>A custom component</div>'
		}
	}
})
```

父组件和子组件 的交互过程，是通过 父组件 的props属性，子组件的自定义事件来完成的：  

```
parents => child    pass Props

child => parents    emit Events

```

## 三种子组件的模板类型 

字符串模板( string template ):

```
Vue.component('my-component', {
	template: '<span>{{ message }}</span>',
	data: {
		message:'hello'
	}
})
```

直接将子组件模板定义在 [子组件标签]中的inline Templates:

```
<my-component inline-template>
	<div>
		<p>1</p>
		<p>2</p>
	</div>
</my-component>
```

定义在script标签中的X-Templates:

```
<script type="text/x-template" id="hello-world-template">
	<p>hello</p>
</script>

Vue.component('hello-world', {
	template: '#hello-world-template'
})

```

## 全局访问子组件

在Chrome的 Console里面调试的时候，直接能够党文到子组件是有一定需求的，这里可以用 ref属性来实现：  

```
<div id="parent">
	<user-profile ref="profile"></user-profile>
</div>
```

正常实例化以后就可以这样访问：  

```
	var parent = new Vue({ el: '#parent' })
	// access child component instance
	var child = parent.$refs.profile
```