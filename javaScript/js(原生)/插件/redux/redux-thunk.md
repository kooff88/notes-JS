# redux-thunk 

redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个  
参数(dispatch, getState)，在函数体内进行业务逻辑的封装。

```js
	
	function add() {
		return {
			type: 'ADD',
		}
	}

	function addIfOdd() {
		return (dispatch, getState) => {
			const currentValue = getState();
			if (currentValue % 2 === 0) {
				return false;
			}

			// 分发一个任务
			dispatch(add())
		}
	}

```
