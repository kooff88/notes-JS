## Generator

### 基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案。

语法上， 可以把 它理解为 状态机，封装了多个内部状态。

执行G函数会返回一个遍历器对象， 也就是说， G函数除了状态机，还是一个遍历器对象生成函数。 返回的遍历对象，  
可以一次遍历G函数内部的每一个状态。  

形式上，G函数是一个普通函数，但有俩特征。1. function 关键字与函数鸣之间有星，2. 函数体内部使用 yield 语句, 定义不同的内部桩状态.  
( yield 语句在英文里的意思就是 “产出” )

```js
function* helloWorldGenerator(){
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = hellowWorldGenerator();

```

上面函数内部有两个 `yield` 语句 , 即改函数有三个状态: hello, world和 return语句（ 结束执行 ）。

G函数调用方法与普通函数一样， 不同的是， 调用G函数后， 改函数并不执行， 返回的也不是函数运行结果， 而是一个指向内部状态的指针对象，  
也就是遍历器对象（Iterator Object）。

下一步， 必须调用遍历器对象的 next方法， 使得 指针移向下一个状态。也就是说， 每次调用 next 方法。 内部指针就从函数头部或上一次停下来的  
地方开始执行，知道遇到下一个 yield 语句（ 或return语句 ）为止。换言之，G函数是分段执行的。 yield语句是暂停执行的标记，而next方法恢复执行。  

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```

ES6没有规定， function 关键字与函数之间的星号，写在哪个为止，都可以。

```js
function * foo(x, y) { ··· }

function *foo(x, y) { ··· }

function* foo(x, y) { ··· }

function*foo(x, y) { ··· }

```

### yield语句

由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。

遍历器对象的 next 方法的运行逻辑如下。

```
1. 遇到 yield 语句， 就暂停执行后面的操作， 并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的value属性值。

2. 下一次调用 next 方法时， 再继续往下执行， 直到遇到下一个 yield语句。

3. 如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

4. 如果该函数没有return语句，则返回的对象的value属性值为undefined
```

yield 语句后面的表达式， 只有当调用 next 方法， 内部指针指向该语句时才会执行， 因此等于为 JavaScript 提供了 手动的"惰性求值"  
( Lazy Evaluation ) 的语法功能。  

```js
function* gen(){
	yield 123 +456
}

// 这段代码， yield后面的表达式 123 +456, 不会立即求值， 只会在 next 方法将指针移到这一句时，才会求值。
```

一种写法：

```js
var arr = [ 1, [ [2,3], 4 ], [5, 6]];

var flat = function* (a){
	var length =  a.length;
	for ( var i = 0; i < length; i++ ){
		var item = a[i];

		if (typeof item !== 'number') {
			yield* flat(item);
		} else {
			yield item;
		}
	}
}

for ( var f of flat(arr)) {
	console.log(f);
}

// 1,2,3,4,5,6

```

另外，yield语句如果用在一个表达式之中，必须放在圆括号里面。

```js
console.log('Hello' + yield); // SyntaxError
console.log('Hello' + yield 123); // SyntaxError

console.log('Hello' + (yield)); // OK
console.log('Hello' + (yield 123)); // OK

```

### 与Iterator接口的关系

上一章说过，任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有Iterator接口

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

```