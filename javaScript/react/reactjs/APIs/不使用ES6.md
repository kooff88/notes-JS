# 不使用ES6

``` js
 // 使用ES6
class Greeting extends React.Component {
  // 初始化state
  constructor(props){
    super(props);
    this.state = { count: props.initialCount };
    // 这一行很重要！, 方法不会自动绑定this到这个组件实例，需要.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    alert(this.state.count)
  }

  // 上面的方法可以使用箭头函数,不需要.bind(this)
  handleClick1 = () => {
    alert(this.state.count)
  }


  render(){
    return (
      <div>
        <button onClick={this.handleClick}>Say hello</button>
        <h1>Hello ,{this.props.name}</h1>
      </div>
    )
  }
}

// 拥有defaultProps属性
Greeting.defaultProps = {
  name: 'Mary'
}

```


```js

// 不使用ES6 ,可以使用create-react-class 模块

var createReactClass = require('create-react-class');

var Greeting = createReactClass({

  // 初始化state
  getInitialState: function(){
    return { count: this.props.initialCount }
  }

  // 组件中的方法自动绑定至实例,直接调用
  handleClick:function(){
    alert(this.state.count)
  }  


  // 获取defaultPorps
  getDefaultProps: function(){
    return {
      name: 'Mary'
    }
  }


  render:function(){
    return (
      <div>
        <button onClick={this.handleClick}>Say hello</button>
        <h1>Hello ,{this.props.name}</h1>
      </div>
    )
  }
})

```

