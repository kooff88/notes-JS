## Let 和 Const

### let

### const

对于 复合类型的变量， 变量名不指向数据， 而是指向 数据所在的地址。 const 命令只是保证变量名指向的地址不变，  
并不保证该地址的数据不变。

```js

const foo = {};

foo.prop = 123;

console.log(foo.prop) // 123

foo = {}; // TypeError: "foo" is read-only
```
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。



如果 真的想将对象冻结，应该使用 Object.freeze 方法。

```js
const foo = Object.freeze({});

// 常规模式下时，下面一行不起作用。
// 严格模式时。 该行会报错
foo.prop = 123;

```

除了将对象本身冻结， 对象的属性也应该冻结。

```js
var constantize = (obj) => {
	Object.freeze(obj);

	Object.keys(obj).forEach( ( key, value ) => {
		if ( typeof obj[key] === 'object' ) {
			constantize( obj[key] );
		}
	})
}

```


ES6一共有6种声明变量的方法。

```
var

function

let

const

import

class

```

从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

```js

var a = 1;
// 如果在node的REPL环境，可以写成  global.a;
// 或者采用通用方法， 写成this.a

window.a // 1

let b = 1; 

window.b // undefined

```

### Global

```
浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是Node没有self。
Node 里面，顶层对象是global，但其他环境都不支持。
```

下面是两种勉强可以使用的方法。

```js
// 方法一

( typeof window !== 'undefined' 
	? window
	: (typeof process === 'object' &&
		 typeof require === 'function' &&
		 typeof global === 'object')
		 ? global
	: this
)

// 方法二

var getGlobal = function() {
	if ( typeof self !== 'undefined' ){ return self; }
	if ( typeof window !== 'undefined' ) { return window; }
	if ( typeof global !== 'undefined' ) { return global; }
	throw new Error(' unable to locate global object ');
}

```

### 提案

system.global

```js
// CommonJS 写法
require('system.global/shim')();

// ES6模块写法
import shim from 'system.global/shim'; shim();


```

上面代码可以保证各种环境里面，global对象都是存在的。

```js
// CommonJS 写法
var global = require('system.global')();

// ES6模块写法
import getGlobal from 'system.global';
const global = getGlobal();

```