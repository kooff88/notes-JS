# memoize-one


```js
import memoizeOne from 'memoize-one';

const add = (a, b) => a + b;
const memoizedAdd = memoizeOne(add);

memoizedAdd(1, 2); // 3
//调用函数

memoizedAdd(1, 2); // 3
//从缓存取出相同值

memoizedAdd(2, 3); // 5
//调用函数

memoizedAdd(2, 3); // 5
//从缓存取出相同值

memoizedAdd(1, 2); // 3
//调用函数

```