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
