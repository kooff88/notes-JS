## Promise.all

Promise.all(iterable) 方法返回一个 Promise 实例， 此实例再 iterable 参数内所有的 promise 都完成(resolved),
或者参数中不包含 promise 时回调完成(resolve);如果参数中 promise 有一个失败(rejected),此实例回调失败(reject)，
失败的原因是第一个失败 primise 的结果。
