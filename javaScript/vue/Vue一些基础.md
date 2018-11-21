#基础

-[v-show](#v-show)  
-[v-on](#v-on)  
-[v-once](#v-once)  

## v-show
 
 控制元素的显示和隐藏


## v-on

我们可以用v-on 指令绑定一个事件监听器，通过它调用我们Vue实例中定义的方法。  

```
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="vue.js"></script>
	</head>
	<body>
		<div id="test">{{msg}}
			<p v-for="val in arr">
				{{ val.a }}
			</p>
			<a href="javascript:void(0)" v-on:click="tap">点我</a>
		</div>
	</body>
</html>

<script>
	window.onload = function(){
		var app2 = new Vue({
			el: "#test",
			data:{
				msg: '232',
				msg1: '555' + new Date(),
				msg2: '666',
				show: true,
				arr:[
					{a: 'bb'},
					{a: 'cc'}
				]
			},
			methods: {
				tap: function(){
					this.arr.unshift({ a: 'new' })
				}
			}
		})
	}
</script>

```

## v-once

通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这回影响到该节点上所有的数据绑定。  

```html

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src=""https://unpkg.com/vue></script>
</head>
<body>
	<div id="app">
		<p>可以改变：{{ msg }}</p>
		<p v-once>不可以改变{{ msg1 }}</p>
	</div>
	<script type="text/javascript">
		var app = new Vue({
			el: '#app',
			data: {
				msg: 'Hello Vue!',
				msg: 'Hello Vue11'
			}
		})
	</script>
</body>
</html>
```


控制台输入app.msg = 'hello' 会改变第一行的字段，输入 app.msg1 = 'hello' 不会改变第二行的字段。 