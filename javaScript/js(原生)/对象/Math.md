## Math API

一个向量包含有长度和方向信息。它的长度可以用向量 x,y 的平方和的平方根来表示，用`javascript`来计算：

```js
x = 1;
y = 2;

v.length = function () {
  return Math.hypot(this.x, this, y);
};
```

它的方向 可以用 x 轴的夹角来表示:

```js
// Math.atan2 的取值范围是 -π到π， 负数表示在x轴下方，正数表示在x轴上方。
v.dir = function () {
  return Math.atan2(this.y, this.x);
};
```

根据长度和方向的定义， 可以推导出一组关系式：

```js
v.x = v.length * Math.cos(v.dir);
v.y = v.length * Math.sin(v.dir);
```



### Math.pow()

pow() 方法可以返回 x 的 y 次幂的值。

语法:

Math.pow(x, y);

x: 必需。底数。number.   
y: 必需。幂数。number.  