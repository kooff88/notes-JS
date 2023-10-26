## typeof


```js

// 引用值
let a = {}
typeof(a) // numebr, string, boolean, object, undefined, function



let aa = "2" * "1";

console.log(typeof aa); // number



// 显示引用转换
var num = Number('123'); // 123
var num = Number('undefined'); // NaN
var num = Number('123abc'); // NaN

var num = parseInt('123.9',16); // 123
var num = Number('123abc'); // 123 数字位看到非数字位

var num = String('123abc'); // 123abc 

var num = Boolean('123abc'); // true 

// toString(2) 转换成 二进制

var num = 10101010;
var test = parseInt(num,2);  // 二进制转换为 十进制
var last = test.toString(16);  // 十进制 转换为 十六进制

//  undefined, null 都不能用 toString




// 隐式类型转换
isNaN();
isNaN('abc'); // ==> Number('abc') 和 NaN 比较

var a = "a" * 1;  // NaN

undefined === null  // true

```


```js
function myIsNaN(num){
  
  var ret = Number(num);
  ret += "";
  if (ret == "NaN"){
    return true;
  }else {
    return false;
  }

}


```