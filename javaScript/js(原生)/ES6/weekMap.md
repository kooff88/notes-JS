## WeakMap

该对象是一组键/值对的合集，其中的键必须是对象，而值可以是任意的。

```js
let weakmap = new WeakMap();
(function () {
  let o = { n: 1 };
  weakmap.set(o, "A");
})(); // here 'o' key is garbage collected
let s = { m: 1 };
weakmap.set(s, "B");
console.log(weakmap.get(s));
console.log(...weakmap); // exception thrown
weakmap.delete(s);
weakmap.clear(); // Exception, no such function
let weakmap_1 = new WeakMap([
  [{}, 2],
  [{}, 5],
]); //this works
console.log(weakmap_1.size); //undefined”

const weakmap = new WeakMap();
let keyObject = { id: 1 };
const valObject = { score: 100 };
weakmap.set(keyObject, valObject);
console.log(weakmap.get(keyObject));
//output { score: 100 }
keyObject = null;
console.log(weakmap.has(keyObject));
//output false
```
