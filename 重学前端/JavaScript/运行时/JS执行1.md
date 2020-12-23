<!--
 * @Descripttion: 
 * @version: 
 * @Author: zhangpeng
 * @Date: 2020-12-22 20:36:59
 * @LastEditors: zhangpeng
 * @LastEditTime: 2020-12-22 20:52:02
-->
## JavaScript 执行

当拿到一段 JavaScript 代码时，浏览器或者 Node 环境首先要做的就是；传递给 JavaScript 引擎，并且要求它去执行。

一个 JavaScript 引擎会常驻于内存中，它等待着我们（宿主）把 JavaScript 代码或者函数传递给它执行

在 ES5 之后，JavaScript 引入了 Promise，这样，不需要浏览器的安排，JavaScript 引擎本身也可以发起任务了。

采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。

### 宏观和微观任务

等待的行为都是一个事件循环

```js

while(TRUE) {
    r = wait();
    ... 
    execute(r);
}
```

有了宏观任务和微观任务机制，我们就可以实现 JavaScript 引擎级和宿主级的任务了，  
例如：Promise 永远在队列尾部添加微观任务。setTimeout 等宿主 API，则会添加宏观任务。  


### Promise

Promise 是 JavaScript 语言提供的一种标准化的异步管理方式

需要进行 io、等待或者其它异步操作的函数，不返回真实结果，而返回一个“承诺”，函数的调用方可以在合适的时机，  
选择等待这个承诺兑现（通过 Promise 的 then 方法的回调  

```js

    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    r.then(() => console.log("c"));
    console.log("b")

    // a, b, c
```

```js

    var r = new Promise(function(resolve, reject){
        console.log("a");
        resolve()
    });
    setTimeout(()=>console.log("d"), 0)
    r.then(() => console.log("c"));
    console.log("b")

    // a ,b ,c ,d 

    //不论代码顺序如何，d 必定发生在 c 之后，因为 Promise 产生的是 JavaScript 引擎内部的微任务，而 setTimeout 是浏览器 API，它产生宏任务。
```

微观任务优先于 宏观任务

```js

    setTimeout(()=>console.log("d"), 0)
    var r = new Promise(function(resolve, reject){
        resolve()
    });
    r.then(() => { 
        var begin = Date.now();
        while(Date.now() - begin < 1000);
        console.log("c1") 
        new Promise(function(resolve, reject){
            resolve()
        }).then(() => console.log("c2"))
    });

    // c1 ,c2 ,d
```


通过一系列的实验，我们可以总结一下如何分析异步执行的顺序：
```
首先我们分析有多少个宏任务；
在每个宏任务中，分析有多少个微任务；
根据调用次序，确定宏任务中的微任务执行次序；
根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
确定整个顺序。
```


例子
```js

    function sleep(duration) {
        return new Promise(function(resolve, reject) {
            console.log("b");
            setTimeout(resolve,duration);
        })
    }
    console.log("a");
    sleep(5000).then(()=>console.log("c"));
    // a ,b ,c
```

### 新特性：async/await

async 函数必定返回 Promise，我们把所有返回 Promise 的函数都可以认为是异步函数。

async 函数是一种特殊语法

```js

function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(name){
    await sleep(2000)
    console.log(name)
}
async function foo2(){
    await foo("a");
    await foo("b");
}

```


#### 我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务

