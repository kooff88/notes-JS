## Promise

Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大

Promise对象有以下两个特点。

1. 对象的状态不受外界影响。

2. 一旦状态改变，就不会再变， 任何时候都可以得到这个结果。

#### Promise 缺点

```
 首先， 无法取消 Promise, 一旦新建它就会立即执行， 无法中途取消。 其次， 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
第三， 当处于 Pending 状态时， 无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)。


如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。

```


### 基本用法

```js
// 下面代码创造了一个Promise实例。

var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});

```