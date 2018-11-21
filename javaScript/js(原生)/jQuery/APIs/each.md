# each 遍历

## 遍历对象 || 数组

```js
	var obj = ['你好','你好','你好','你好'];

	$.each(obj, function(key, val){
		console.log(key)
		console.log(val)
	})
	
```

## 节点遍历
```js
	$('input:hidden').each(function (index, obj) {
		alert(obj.name + "..." + obj.value);
	});
```