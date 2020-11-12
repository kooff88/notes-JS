## Object.entries.md

Object.entries() 方法返回一个给定对象自身可枚举的键值对数组，其排列与使用for...in循环遍历对象时返回的顺讯一致。  
（区别在于for... in d循环也枚举原型链中的属性）。

通俗点就是 Object.entries() 可以把一个对象的键值以数组的形式遍历出来，结果和for...in 一致，但不会遍历原型链属性。

实例一：   传入对象

```js
const obj = { foo: 'bar', baz: "abc"};
console.log(Object.entries(obj)); // [[ "foo","bar" ], [ "baz", "abc"]]
```

实例二：数组,数组（数组中包含对象），数组（数组中的值全部为对象）

```js
// 数组,
const arr = [1,2,3];
console.log(Object.entries(arr));  // [[ "0",1 ], ["1", 2], ["2", 3]]

//数组（数组中包含对象）
const arr1 = [{ a: 1 }, 2, 3];
console.log( Object.entries(arr)); // [ [ "0", { a:1 } ], ["2", 2], ["3", 3]];

//数组（数组中的值全部为对象）
const arr2 = [{ a: 1 }, { b: 2 }, { c: 3 }]; 
console.log(Object.entries(arr2));  // [['0', { a: 1 }], ['1', { b: 2 }], ['2', { c: 3 }]]

```

实例三： 字符串

```js
const str = "123";
console.log( Object.entries(str)); // [["0", "1"], ["1", "2"], ["2", [3]]];
```

实例四： 数字，浮点数

```js
   const num = 123; 
    console.log(Object.entries(num));  // []

    const float1 = 12.3; 
    console.log(Object.entries(float1));  // []
```

实例五: 将Object 转化为Map

```js

const obj2 = { foo: 'bar', baz: 'abc' }; 
console.log(Object.entries(obj2));  // [['foo', 'bar'], ['baz', 'abc']]

const map = new Map( Object.entries(obj2));
console.log(map); // Map { 'foo' => 'bar', 'baz' => 'abc' };

```