# Interpolators (d3-interpolate)

插值数字、颜色、字符串、数组、对象等等!

`d3.quantize`: 从插入器中 取出 一定数量样品
```js
let interpolator = d3.interpolate(" 0, 51", "49 -100");

let a =  d3.quantize(interpolator, 8)

//  ["0 — 51", "7 — 58", "14 — 65", "21 — 72", "28 — 79", "35 — 86", "42 — 93", "49 — 100"]

```