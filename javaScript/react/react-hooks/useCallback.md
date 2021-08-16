## useCallback


场景：在开发中，你会遇到这样的场景，需要从父组件中传递一个函数到子组件，如果我们不用useCallback包裹，那么也就意味着，只要父组件有更新，都会向子组件去传递一个新函数，虽然说每次传递的函数都一样，但是依旧是俩个不同的对象。但是如果使用了useCallback, useCallback 就会根据依赖项是否发生变化，从而决定是否返回一个新的函数，函数内部作用域也随之更新。


```
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
```

```js
import React, { useState, useCallback, useEffect } from "react";
function Parent(){
	const [ count, setCount ] = useState(1);
	const [val, setVal] = useState('');
	const callback = useCallback(()=>{
		return count;
	}, [count]);

	return (
		<div>
			<h4>{count}</h4>
			<Child callback={ callback } />
		</div>
	)

}

function Child({ callback }){
	const [ count, setCount ] = useState(()=>callback());
	useEffect(()=>{
		setCount(callback());
	},[callback])
	return (
		<div>
			{count}
		</div>
	)
}

```