## useMemo

使用

```tsx
import React, { FC,useMemo,useState} from "react";

const Practice = () => { 
	const [count, setCount] = useState(1);
	const [val, setValue] = useState('');
	const expensive = useMemo( () => { 
		console.log('compute');
		let sum = 0;
		for (let i = 0; i < count * 100; i++) {
				sum += i;
		}
		return sum;
	}, [count])

	return (
		<>
			<h4>{count} - {expensive}</h4>
			{val}
			<div>
				<button onClick={() => setCount(count + 1)}>+c1</button>
				<input value={val} onChange={ e => setValue(e.target.value)} />
			</div>
		</>
	)

}

export default Practice;

```


### React.memo

还记得在class组件时代我们如何做优化吗？对，没错，俩中方法：

（1）pureComponent，对props进行浅比对

（2）shouldComponentUpdate根据返回值来处理是否要更新

而是react提供了React.memo这样的高阶组件,与pureComponent和相似，但是，这个高阶组件并不是适用于class组件，而只为function组件服务。

React.memo() 可以支持指定一个参数，可以相当于 shouldComponentUpdate 的作用，因此 React.memo() 相对于 PureComponent 来说，用法更加方便。

```js
function MyComponent(){}

function areEqual(pre, next) {
	// 父组件 传值不变 返回true,
	// 否则false
}

export default React.memo(MyComponent, areEqual);

```