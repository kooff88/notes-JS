<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhangpeng
 * @Date: 2020-12-22 20:54:23
 * @LastEditors: zhangpeng
 * @LastEditTime: 2020-12-23 21:18:28
-->
## JS执行

一段 JavaScript 代码可能会包含函数调用的相关内容，从今天开始，我们就用两节课的时间来了解一下函数的执行


### 闭包

而在编程语言领域，它表示一种函数。

闭包其实只是一个绑定了执行环境的函数,闭包与普通函数的区别是，它携带了执行的环境，

组成成分：
```
环境部分：
   1. 环境： 函数的词法环境（执行上下文的一部分）
   2. 表示符列表： 函数中用到的未申明的变量。
表达式部分： 函数体
```


### 执行上下文：执行的基础设施

JavaScript 标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”。

在 ES2018 中，执行上下文又变成了这个样子，this 值被归入 lexical environment，但是增加了不少内容。

```
lexical environment：词法环境，当获取变量或者 this 值时使用。
variable environment：变量环境，当声明变量时使用。
code evaluation state：用于恢复代码执行位置。
Function：执行的任务是函数时使用，表示正在被执行的函数。
ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。
Realm：使用的基础库和内置对象实例。
Generator：仅生成器上下文有这个属性，表示当前生成器。
```

```js

var b = {}
let c = 1
this.a = 2;
```

要想正确执行它，我们需要知道以下信息：

```
var 把 b 声明到哪里；
b 表示哪个变量；
b 的原型是哪个对象；
let 把 c 声明到哪里；
this 指向哪个对象。
```

通常我们认为它声明了 b，并且为它赋值为 1，var 声明作用域函数执行的作用域。也就是说，var 会穿透 for 、if 等语句。

没有 let 的旧 JavaScript 时代，诞生了一个技巧，叫做：立即执行的函数表达式（IIFE）
```js

(function(){
    var a;
    //code
}());


(function(){
    var a;
    //code
})();



//推荐写法
void function(){
    var a;
    //code
}();
```

let 是 ES6 开始引入的新的变量声明模式，比起 var 的诸多弊病，let 做了非常明确的梳理和规定。

为了实现 let，JavaScript 在运行时引入了块级作用域。也就是说，在 let 出现之前，JavaScript 的 if for 等语句皆不产生作用域

以下语句会产生 let 使用的作用域：
```
for；
if；
switch；
try/catch/finally。
```


#### Realm


以下代码展示了在浏览器环境中获取来自两个 Realm 的对象，它们跟本土的 Object 做 instanceOf 时会产生差异：

```js

var iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2); //object object

console.log(b1 instanceof Object, b2 instanceof Object); //false true

//由于 b1、 b2 由同样的代码“ {} ”在不同的 Realm 中执行，所以表现出了不同的行为。
```

### 函数

在 JavaScript，切换上下文最主要的场景是函数调用。

```
第一种，普通函数：用 function 关键字定义的函数。

第二种，箭头函数：用 => 运算符定义的函数。

第三种，方法：在 class 中定义的函数。

第四种，生成器函数：用 function * 定义的函数。

第五种，类：用 class 定义的类，实际上也是函数。

第六 / 七 / 八种，异步函数：普通函数、箭头函数和生成器函数加上 async 关键字。

```

### this 关键字的行为

this 是 JavaScript 中的一个关键字，它的使用方法类似于一个变量。

this 是执行上下文中很重要的一个组成部分。同一个函数调用方式不同，得到的 this 值也不同

```js

function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // object
```
普通函数的 this 值由“调用它所使用的引用”决定，其中奥秘就在于：我们获取函数的表达式，它实际上返回的并非函数本身，而是一个 Reference 类型。

Reference 类型由两部分组成：一个对象和一个属性值。不难理解 o.showThis 产生的 Reference 类型，即由对象 o 和属性“showThis”构成。

在这个例子中，Reference 类型中的对象被当作 this 值，传入了执行函数时的上下文当中。

`调用函数时使用的引用，决定了函数执行时刻的 this 值。`

实际上从运行时的角度来看, this 跟面向对象毫无关联，它是与函数调用时使用的表达式相关。


```js

const showThis = () => {
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // global
o.showThis(); // global
```
我们看到，改为箭头函数后，不论用什么引用来调用它，都不影响它的 this 值。


```js

class C {
    showThis() {
        console.log(this);
    }
}
var o = new C();
var showThis = o.showThis;

showThis(); // undefined
o.showThis(); // o
```

不难验证出：生成器函数、异步生成器函数和异步普通函数跟普通函数行为是一致的，异步箭头函数与箭头函数行为是一致的。

### this 关键字的机制

在 JavaScript 标准中，为函数规定了用来保存定义时上下文的私有属性[[Environment]]。

当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境（outer lexical environment）会被设置成函数的[[Environment]]。  
这个动作就是切换上下文了

```js

var a = 1;
foo();

// 在别处定义了foo：

var b = 2;
function foo(){
    console.log(b); // 2
    console.log(a); // error
}

//这里的 foo 能够访问 b（定义时词法环境），却不能访问 a（执行时的词法环境），这就是执行上下文的切换机制了。
```

JavaScript 用一个栈来管理执行上下文，这个栈中的每一项又包含一个链表。

当函数调用时，会入栈一个新的执行上下文，函数调用结束时，执行上下文被出栈

而 this 则是一个更为复杂的机制，JavaScript 标准定义了 [[thisMode]] 私有属性.

[[thisMode]] 私有属性有三个取值。
```
lexical：表示从上下文中找 this，这对应了箭头函数。
global：表示当 this 为 undefined 时，取全局对象，对应了普通函数。
strict：当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined。
```

```js
"use strict"
function showThis(){
    console.log(this);
}

var o = {
    showThis: showThis
}

showThis(); // undefined
o.showThis(); // o

//非常有意思的是，方法的行为跟普通函数有差异，恰恰是因为 class 设计成了默认按 strict 模式执行。
```

函数创建新的执行上下文中的词法环境记录时，会根据[[thisMode]]来标记新纪录的[[ThisBindingStatus]]私有属性。  
代码执行遇到 this 时，会逐层检查当前词法环境记录中的[[ThisBindingStatus]]，当找到有 this 的环境记录时获取 this 的值。  

这样的规则的实际效果是，嵌套的箭头函数中的代码都指向外层 this，

```js

var o = {}
o.foo = function foo(){
    console.log(this);
    return () => {
        console.log(this);
        return () => console.log(this);
    }
}

o.foo()()(); // o, o, o
```

### 操作 this 的内置函数

Function.prototype.call 和 Function.prototype.apply 可以指定函数调用时传入的 this 值

```js

function foo(a, b, c){
    console.log(this);
    console.log(a, b, c);
}
foo.call({}, 1, 2, 3);
foo.apply({}, [1, 2, 3]);
```

还有 Function.prototype.bind 它可以生成一个绑定过的函数，这个函数的 this 值固定了参数：

```js

function foo(a, b, c){
    console.log(this);
    console.log(a, b, c);
}
foo.bind({}, 1, 2, 3)();
```

