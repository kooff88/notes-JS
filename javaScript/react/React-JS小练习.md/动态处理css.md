# 动态处理CSS

```
  基础概念:
  `:root` : 伪类，匹配文档根元素

  变量声明 ： 
   --变量名 : 变量值
   --var_name : var_value


  变量使用 : 
  color : var(--变量名)
  color : var(--var_name)

 dateset : 
  <input type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
   其中data-*就是我们要讲的dateset,他会保存在`dataset`中 , `属性值`只能是`字符串`,非字符串会转换为字符串后存储
```


./css.js
```js
import React, { Component } from 'react';
// import logo from './2.jpeg';
import './App.less';


class Css extends Component {

  constructor(props){
    super(props);
    this.state={
      value1:10,
      value2:10,
      color:'#ffc600'
    }
    
  }

  componentDidMount(){
    this.inputs  = document.querySelectorAll('.controls input');
  }
  
  handleUpdate = (e) => {
    const suffix =  e.target.dataset.sizing || ''
    document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
    
    if (e.target.name === 'blur' ) this.setState({value1:e.target.value})  
    if (e.target.name === 'spacing') this.setState({value2:e.target.value})  
    if (e.target.name === 'base') this.setState({color:e.target.value})  
  }

  render() {

    return (
      <div>
        <h2>Update CSS Variables with<span className='hl'>JS</span></h2>

        <div className="controls">
          <label for="spacing">Spacing</label>
          <input id="spacing" type="range" name="spacing" min="10" max="200" value={this.state.value2} data-sizing="px" onChange={this.handleUpdate}/>
        
          <label for="blur">Blur:</label>
          <input id="blur" type="range" name="blur" min="0" max="25" value={this.state.value1} data-sizing="px" onChange={this.handleUpdate}/>

          <label for="base">Base Color</label>
          <input id="base" type="color" name="base" value={this.state.color} onChange={this.handleUpdate}/>

          <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500" alt=""/>
        </div>
      </div>
    );
  }
}

export default Css;


```


./css.less
```css
/* :root 伪类，匹配文档根元素 */ 

:root{
  /*
    css 变量的声明
    --变量名：变量值
  */
  --base : #ffc600;
  --spacing:10px;
  --blur:10px;

}

img {
  /*
    变量使用:var 函数调用
    var (--变量名)
  */
  padding : var(--spacing);
  background: var(--base);
  filter : blur(var(--blur));
}

.hl {
  color : var(--base);
}

body {
  text-align: center;
  background: #193549;
  color: white;
  font-family: 'helvetica neue',sans-serif;
  font-weight: 100;
  font-size: 50px;
}

.controls {
  margin-bottom: 50px;
}

input {
  width: 100px;
}


```
