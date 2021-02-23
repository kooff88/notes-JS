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

虽然API是异步操作，但 store.dispatch并不是异步， 而axios通过 get 方法请求回来数据后， store.dispatch中的then方法中同步取得数据。


### redux-thunk

如果把异步的请求和非常复杂的逻辑都放在组件里实现， 组件会变得臃肿， 应利用 redux-thunk。将这些复杂的逻辑放到action中去处理。redux-thunk检测到  
action是一个函数会进行处理。

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thhunk';
import rootReducer from '../reducer';
export default createStore( rootReducer,applyMiddleware(thunk));

// action/math.js
import { ADD, SQUARE, SET } from '../action/ActionTypes'
import axios from 'axios'
const uri = 'https://jsonplaceholder.typicode.com/posts/2'
export const add = num => ({ type: ADD, num })
export const square = { type: SQUARE }
export const setNum = () => (dispatch, getState) => {
	return axios.get(uri).then(res => {
		dispatch({
			type:SET,
			num:res.data.id
		})
	})
}

// index.js
import store from './store'
import React from 'react'
import ReactDOM from 'react-dom'
import { add, square, setNum } from './action/math'
const render = () => ReactDOM.render(
  <div store={store}>
    <p>{store.getState().math}</p>
    <input type="button" onClick={() => store.dispatch(setNum())} value="设置Num" />
    <input type="button" onClick={() => store.dispatch(add(1))} value="+1" />
    <input type="button" onClick={() => store.dispatch(add(2))} value="+2" />
    <input type="button" onClick={() => store.dispatch(square)} value="乘方" />
  </div>,
  document.getElementById('root')
)
render()
store.subscribe(render)


```

### redux-saga

超大型项目的异步处理， 用 redux-saga

### redux-persist

在开发过程中，数据用 redux 管理， 觉得希望将数据持久化保存，也就是说当用户下一次打开app或网站的时候，我们希望浏览器/app自动加载上次的数据，

### redux-immutable

统一数据格式

## 常用组合

### react-loadable
	HOC 高阶组件

	异步组件 react-loadable

```js
import Loadable from 'react-loadable';
import Loading from "./Loading";

const LoadableComponent = Loadable({
	loader: () => import('./');
	loading: Loading,
})

export default class App extends React.Component {
	render(){
		return <LoadableCompoonent/>
	}
}


```

### withRouter

	只有点击路由时才会加载相应的js

高阶组件中的 withRouter, 作用是将一个组件包裹进 Route里面， 然后 react-router的三个对象history, location, match就会  
就会被放进这个组件的props属性中。

```js
/*
	withRouter 实现原理：
	将组件包裹进 Route, 然后返回
	const withRouter = () => {
		return ()=>{
			return <Route component={Nav} />
		}
	}
*/

const withRouter = ( Component ) => ()=><Route component={ Component } />

```

上面是实现的原理， react-router-dom 里面是有这个组件的， 

```js
import React from 'react';
import './nav.css';
import {
	NavLink,
	withRouter
} from 'react-router-dom';

class Nav extends React.Component {
	
	handleClick = () => {
		// Route 的三个对象将会被放进来，对象里面的方法可以被调用
		console.log(this.props);
	}

	render(){
		return (
			<div className={'nav'}>
				 <span className={'logo'} onClick={this.handleClick}>掘土社区</span>
					<li><NavLink to="/" exact>首页</NavLink></li>
					<li><NavLink to="/activities">动态</NavLink></li>
					<li><NavLink to="/topic">话题</NavLink></li>
					<li><NavLink to="/login">登录</NavLink></li>
			</div>
		)
	}
}

export default withRouter (Nav);

```	
所以 withRouter 的作用就是， 如果我们某个东西不是一个 Router ， 但是我们要依靠它去跳转一个页面，比如点击页面的logo，返回首页，  
这个时候就可以使用 withRouter来做。
在这个例子中, 我将span使用withRouter作为一个可点击跳转的Link.


### react-transition-group

实现多个 DOM元素的动画

