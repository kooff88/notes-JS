# cloneElement

栗子:  

```
  import React, {Component} from 'react';
  import ReactDOM from 'react-dom';
  import Perf from 'react-addons-perf';

  class MyContainer extends Component {
    contructor(props){
      super(props);
      this.state = {
        count : 1
      }
    }

    render (){
      const  childrenWithProps = React.Children.map(this.props.children,(child) => 
        React.cloneElement(child,{baseInfo:def}));
      return <div>
          <h1>我是父亲容器</h1>
          {childrenWidthProps}
      </div>  
    }
  }

  class MySub extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count : 1
      }
    }
    render (){
      return <div>
          {this.props.subInfo}我是子元素{this.props.baseInfo}
      </div>
    }
  }

ReactDOM.render(
  (
      <div>
          <MyContainer>
              <MySub subInfo={"abc"}/>
          </MyContainer>
      </div>
  ), document.getElementById('J_contentContainer')
)
```
