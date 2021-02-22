## react常用中间件以及组件

redux 默认只处理同步，对于API请求这样的任务则无能为力。

```js

// constants/ActionTypes.js
export const ADD = 'ADD';
export const SQUARE = 'SQUARE';
export const SET = 'SET';

// action/math.js
import { ADD, SQUARE, SET } from '../constants/ActionTypes';
export const add = num => ({ type: ADD, num });
export const square = { type: SQUARE };
export const setNum = num => ({ type: SET, num });

// reduce/math.js
import { ADD, SQUARE, SET } from  '../constants/ActionTypes';
const math = (state = 10, action ) => {
	switch( action.type){
		case ADD: 
			return state + action.num;
		case SQUARE:
		  return state * state;
		default:
			return state;
	}
}
export default math;

// index.js
import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'
import { add, square, setNum } from './action/math'
import axios from 'axios'
let uri = 'https://jsonplaceholder.typicode.com/posts/2'

const render = () => ReactDOM.render(
	<div store={ store }>
		<p> { store.getState().math } </p>
		<input type='button' onClick={()=>{ axios.get(url).then(res => store.dispatch(store.dispatch( setNum(res.data.id) ))) }}  value="设置"/>
		<input type="button" onClick={() => store.dispatch(add(1))} value="+1" />
    <input type="button" onClick={() => store.dispatch(add(2))} value="+2" />
    <input type="button" onClick={() => store.dispatch(square)} value="乘方" />
	</div>
	 document.getElementById('root')
)

render()
store.subscribe(render);

```