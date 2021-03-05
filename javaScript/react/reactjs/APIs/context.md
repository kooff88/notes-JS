## context

React中， 使用 context ,我们可以避免通过中间元素传递 props;

```js
// Context 可以让我们无需明确地传遍每一个组件， 就能将深入传递进 组件树
// 为当前的 theme 创建一个 context("light"为默认值)。

const ThemeContext = React.createContext("light");
class App extends React.Component {
	render(){
		return (
			<ThemeContext.Provider value="dark">
				<Toolbar/>
			</ThemeContext.Provider>
		)
	}
}

// 中间的组件再也不必指明往下传递theme了
function Toolbar(){
	return (
		<div>
			<ThemedButton/>
		</div>
	)	
}

class ThemeButton extends React.Component {
	// 指定 contentType 读取当前的 theme context。
	// React  会网上找到 最近的 theme Provider, 然后使用它的值
	// 在这个例子中，当前的 theme 值为 "dark"
	static contextType = ThemeContext;
	render(){
		return <Button theme={this.context} />
	}

}

```


#### React.createContext

```js
const Mycontext = React.createContext( defaultValue )
```

创建一个 Context 对象。 当 React 渲染一个订阅了这个 Context 对象的组件, 这个组件会从组件树中自身最近的那个匹配 Provider中读取到当前的context值。

只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。

#### Context.Provider

```js
<MyContext.Provider value={/* 某个值 */} />
```

每个 Context 对象都会返回一个 Provider React组件， 它允许消费组件订阅context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。  
当 Provider 的 value 值发生变化时， 它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，   
因此当 consumer 组件及其祖先组件退出更新的情况下也能更新。  


#### Class.contextType

```js
class MyClass extends React.Component {
	componentDidMount(){
		let value = this.context;
		// 在组件挂载完成后， 使用 Mycontext 组件来执行一些有副作用的操作
	}

 componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
	
} 

MyClass.contextType = MyContext;


```

挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。  
此属性能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。  

```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}

```

#### Context.Consumer

```js
<MyContext.Consumer>
	{value => /* 基于 context 值进行渲染 */}
</MyContext.Consumer>

```

一个 React 组件可以订阅 Context的变更， 此组件可以让你在 函数式组件中可以订阅 context。

这种方法需要一个函数作为子元素（function as a child）。这个函数接收当前的 context 值，并返回一个 React 节点。  
传递给函数的 value 值等价于组件树上方离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，  
value 参数等同于传递给 createContext() 的 defaultValue。  


#### Context.displayName

context 对象接收一个名为 displayName 的 property, 类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中

```