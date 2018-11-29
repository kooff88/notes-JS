# async 和 await 使用

`async` 它作为一个关键字放到函数前面，用于表示函数是一个异步函数，因为async就是异步的意思，异步函数也就意味着该函数的执行  
不会阻塞后面代码的执行。  

```
async function timeout(){
	return 'hello world';
}
```

```
async function timeout(){
	return 'hello world'
}

timeout();

console.log('虽然在后面，但是我先执行');

```

上面async函数 timeout调用了，但没有输出，打印 timeout(), 输出 Promise{...}, 要想获取promise返回值，我们应该用then  
方法。 


```
	async function timeout(){
		return 'hello world'
	}

	timeout().then(result => {
		console.log(result)
	})

	// 后台打印出了 'hello world';

```

`await` 就是等待的意思。 它后面可以放任何表达式，不过我们更多的是放一个返回 promise对象的表达式。  

```
function doubleAfter2seconds(num){
	return new Promise (resolve, reject) => {
		setTimeout(() => {
			resolve(2 * num)
		},2000);
	}
}
```

再写一个async函数，从而可以使用await关键字，await后面放置返回promise对象的一个表达式...   

```
async function testResult (){
	let result = await doubleAfter2seconds(30);
	console.log(result);
}

```

现在调用testResult() 函数， 打开控制台，2s之后，输出60;




### 并发操作

```
async function printFiles () {
	const files = await getFilePaths();

	await Promise.all(files.map( async (file) => {
		// 耗时操作

		const contents = await fs.readFile(file, 'utf8');
		console.log(contents)
	} ))

}

```

### 不想并发

延迟0.3s执行

```
	function delay(num) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('延迟0.3s成功!')
			})
		})
	}

	async function go(){
		let arr = [{}, {}, {}];

		for (let item of arr) {
			await delay();
		}

	}



```













