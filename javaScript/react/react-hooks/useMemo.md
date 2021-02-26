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