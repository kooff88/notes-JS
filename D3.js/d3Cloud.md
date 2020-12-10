## d3-cloud

- [官网](https://www.npmjs.com/package/d3-cloud);

云词

`cloud.words`: 设置 云词组

`cloud.font`: 设置字体, 如果未设置，返回默认值 "serif"。

`cloud.fontSize`: 设置字体大小, 默认值： 
```js
function(d){
	return Math.sqrt( d.value)
}
```

`cloud.rotate`: 旋转角度, 默认值：
```js
function(){
	return (~~(Math.random() * 6) - 3) * 30
}
```

