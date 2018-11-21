# withRouter

react-router 提供了一个withRouter组件  

withdRouter可以包装任何自定义组件，将react-router的history,location,match三个对象传入。  
无需一级级传递react-router的属性，当需要用的router属性的时候，将组件包装一层withRouter,就可以拿到  
需要的路由信息。  

```js
	import { withRouter } from 'react-router-dom';
	var Test = withRouter(({ history, location, match }) => {
		return <div>{location.pathname}</div>
	})

```

正常情况下， 只有Router的component组件能够自动带有三个属性 如下的Home组件有  

```js
	<Route  exact path="/Home" component={Home} />

	var Home = ({ history,location,match }) => <div>{location.pathname}</div>

```

如果使用了react-router-redux,则可以直接从state中的router属性中获取location。不需要再使用withRouter  
获取路由信息了。  

```
export default connect(({ router }) => {
	return { pathname: router.location.pathname}
})(MyControl)

```


react-router-redux配置  

```js
	const store = createStore(
		combineReducers({
			...reducer,
			router: routerReducer
		}),
		applyMiddleware(routerMiddleware)
	)

```



