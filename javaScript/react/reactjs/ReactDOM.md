# 目录

[ReactDOM.render()](#ReactDOM.render())
[虚拟DOM](#虚拟DOM)
[Refs和findDOMNode](#Refs和findDOMNode)
[组件的生命周期](#组件的生命周期)

## ReactDOM.render()

ReactDOM.render()是 React的最基本方法，用于将模版转为HTML语言，并插入指定的DOM节点.  

```
 ReactDOM.render(
  <h1>Hello,world!</h1>,
  document.getElementById('example')
)
```

## 虚拟DOM

React之所以快，是因为它不直接操作DOM,React将DOM结构存储在内存中，然后同render()的返回内容进行比较，计算出需要改动的地方，  
最后才反映到DOM中.  
此外，React实现了一套完整的事件合成机制，能够保持事件冒泡的一致性，跨浏览器执行。甚至可以在IE8中使用HTML5的事件。  
大部分情况下，我们都在构建React的组件，也就是操作虚拟DOM,但是有时候我们需要访问底层的API,可能或通过使用第三方的插件来实现  
我们的功能，如jQuery.React也提供了借口让我们操作底层API.  


## Refs和findDOMNode

为了同浏览器交互，我们有时候需要获取到真实的DOM节点。我们可以通过调用React和React.findDOMNode(component)获取到组件中真实的DOM  

> React.findDOMNode()只在mounted组件中调用，mounted组件就是已经渲染在浏览器DOM结构中的组件。如果你在组件的render()方法中调用  
> React.findDOMNode()就会抛出异常  


官方栗子：  

```
var MyComponent = React.createClass({
  handleClick:function(){
    React.findDOMNode(this.refs.myTextInput).focus();
  },
  render:function(){
    return (
      <div>
        <input type="text ref="myTextInput/>
        <input 
          type="button"
          value="Focus the text input"
          onClick = {this.handleChick}
        >
      </div>
    )
  }
});

React.render(
  <MyComponent/>,
  document.getElementById('examole')
)
```

## 组件的生命周期

组件的生命周期主要由三个部分组成：  

- Mounting:组件正在被插入DOM中  
- Updating:如果DOM需要更新，组件正在被重新渲染  
- unmounting:组件从DOM中移除  

React提供了方法，让我们在组件状态更新的时候调用，will标示状态开始之前，did表示状态完成之后。例如componentWillMount就表示组件被插入之前。  

#### Mounting

- getInitialState():初始化state  
- componentWillMount():组件被插入DOM前执行  
- componentDidMount():组件被插入DOM后执行  

#### Updating

- componentWillReaciveProps(object nexrProps): 组件获取到新的属性时执行，这个方法应该将this.props同nextProps进行比较，然乎通过  
  this.setState()切换状态  
- shouldComponentUpdate(object nextProps, object nextState): 组件发生改变时执行，应该将this.props和nextProps,this.state和nextState  
  进行比较，返回true或false决定组件是否更新  
- componentWillUpdate(object nextProps, object nextState): 组件更新之前执行，不能在此处调用this.setState().  
- componentDidUpdate(object prevProps,object prevState): 组件更新后执行


#### Unmounting

- componentWillUnmount(): 组件被移除前执行  


#### Mounted Methods

- findDOMNode(): 获取真实DOM  
- forceUpdate():轻质更新  
