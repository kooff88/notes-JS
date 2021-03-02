## Promise.all

Promise.all(iterable) 方法返回一个 Promise 实例， 此实例再 iterable 参数内所有的 promise 都完成(resolved),
或者参数中不包含 promise 时回调完成(resolve);如果参数中 promise 有一个失败(rejected),此实例回调失败(reject)，
失败的原因是第一个失败 primise 的结果。


### 实现

```js
	Promise.all = function (promises){
		let results = [];

		return new Promise(function(resolve){
			promises.forEach(function (val){
				// 按顺序执行类一个Promise操作
				val.then(function(res){
					results.push(res);
				});
			});
			resolve(results)
		})

	}
// 。一、Promise.all传递的参数可能不是Promise类型，可能不存在then方法。二、如果中间发生错误，应该直接返回错误，不执行后面操作。

```

改造版本

```js
Promise.prototype.all = function(promises){
	let results = [];
	let promiseCount = 0;
	let primiseLength = promises.length;
	return new Promise(function(resolve, reject) {
		for(let val of promises) {
			Promise.resolve(val).then(function(res){
				promiseCount++;
				results[i] = res;
				// 当所有函数都正确执行了， resolve输出所有返回结果
				if ( promiseCount === promiseLength ){
					return resolve(results);
				}
			}, function(err){
				return reject(err);
			})
		}
	})
}

```

Promise.all 返回的是数组

###  Promise.race 

race 有赛跑之译，因此返回的新实例状态，是跟随参数中最先改变状态的那个实例；如果不是Promise实例，依旧先用Promise.resolve方法，  
转化后再进一步处理。  如果传的迭代为空则返回的是Promise 永远等待

```js
var promise1 = new Promise(function(resolve, reject) {
	setTimeout( resolve, 500, 'one-resolve-500' );
})

var promise1 = new Promise(function(resolve, reject) {
	setTimeout( resolve, 400, 'one-resolve-400' );
})

Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
}, function(err) {
    console.log(err);
})


```