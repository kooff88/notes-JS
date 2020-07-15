## API

`tanslate` 改变坐标系原点位置

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.translate(256, 256);
```

`scale` 缩放当前绘图至更大或更小

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.scale(2, 2); // 放大两倍

// ctx.scale(1,-1)  // y轴翻转180度
```
