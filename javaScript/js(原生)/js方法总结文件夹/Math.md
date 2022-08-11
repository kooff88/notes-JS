# Math

-[random](#random)  


## random

公式：  值 = Math.floor( Math.random() * 可能值的总数 + 第一个可能的值 )  

```
例子:

取(2 - 10)之间随机数

var num = Math.floor(Math.random() * 9 + 2);

```

## Math.pow(x, y) 与 **

** 可以看作是Math.pow( x,y ) 的语法糖, 其作用与 Math.pow() 一致

```js

// x ** y 表示：返回x 的 y次幂
// 2 ** 3 返回结果: 8 ( 2的3次幂 ) 

```