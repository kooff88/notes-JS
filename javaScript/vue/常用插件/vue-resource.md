# Vue-resource

### 引入：  

```
<script type="js/vue.js"></script>
<script type="js/vue-resource.js"></script>

```

### 基本语法

引入vue-resource后，可以基于全局的Vue对象使用 http, 也可以基于某个Vue实例使用http。 

```vue
	
	// 基于全局Vue对象使用 http
	Vue.http.get('/someUrl', [options]).then(successCallback,errorCallback);

	Vue.http.post('/someUrl', [body], [options]).then(successCallback,errorCallback);

```

```vue
	// 在一个Vue 实例内使用 $http
	this.$http.get('/someUrl', [options]).then(successCallback,errorCallback);
	this.$http.post('/someUrl', [body],[options]).then(successCallback,errorCallback);
```

在发送请求后，使用then方法来处理响应结果，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数。  

then 方法的回调函数也有两种写法，第一种是传统的函数写法，第二种是更为简洁的ES 6的 Lambda写法。  

```
	// 传统写法
	this.$http.get('/someUrl',[options]).then(function(response){
		// 响应成功回调
	},function(response){
		// 响应错误回调
	})


	// Lambda写法
	this.$http.get('/someUrl',[options]).then((response)=>{
		// 响应成功回调
	},(response)=>{
		// 响应错误回调
	})

```