# 节点动态添加className


./App.js
```
import React, { Component } from 'react';
import './App.less';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
    }
    

  }

  toggleOpen = (e) => {
    e.target.parentNode.classList.toggle('open');
  }

 

  toggleActive = (e) => {
    if (e.propertyName.includes('flex')) {
       e.target.classList.toggle('open-active');
    }
  }

  componentDidMount(){
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => panel.addEventListener('click',this.toggleOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', this.toggleActive));
  }



  render() {
    return (
      <div className='panels'>
        <div  className='panel panel1'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </div>
        <div className='panel panel2'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </div>
        <div className='panel panel3'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </div>
        <div className='panel panel4'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </div>
        <div className='panel panel5'>
          <p>a</p>
          <p>b</p>
          <p>c</p>
        </div>
      </div>
    );
  }
}

export default App;


```

./app.less

```
html {
  box-sizing: border-box;
  background:#ffc600;
  font-family:'helvetica neue';
  font-size: 20px;
  font-weight: 200;
}
body {
  margin: 0;
}
*, *:before, *:after {
  box-sizing: inherit;
}

.panels {
  min-height:100vh;
  overflow: hidden;
  display: flex;
}

.panel {
  background:#6B0F9C;
  /*向内阴影😀*/
  box-shadow:inset 0 0 0 5px rgba(255,255,255,0.1);
  color:white;
  text-align: center;
  align-items:center;
  /* Safari transitionend event.propertyName === flex */
  /* Chrome + FF transitionend event.propertyName === flex-grow */
  transition:
    font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11), /* 字体大小过渡，flex自适应过渡，背景过渡 */
    flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
    background 0.2s;
  font-size: 20px;
  background-size:cover;
  background-position:center;
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  z-index: 10;
}


.panel1 { background-image:url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500); }
.panel2 { background-image:url(https://source.unsplash.com/1CD3fd8kHnE/1500x1500); }
.panel3 { background-image:url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d); }
.panel4 { background-image:url(https://source.unsplash.com/ITjiVXcwVng/1500x1500); }
.panel5 { background-image:url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500); }

/* Flex Items */
.panel > * {
  margin:0;
  width: 100%;
  transition:transform 0.5s; /* 变换过渡的时间 */
  flex: 1 0 auto;
  display:flex;
  justify-content: center;
  align-items: center;
}

.panel > *:first-child { transform: translateY(-100%);} /* 第一个子节点默认向上偏移 100%，相当于影藏 */
.open-active > *:first-child { transform: translateY(0); } /* active的时候Y轴偏移量为0，回到原来的位置，关键transform 变换有个过渡时间，这样看起来就是慢慢执行的了，NB，活到老，学到老 */
.panel > *:last-child { transform: translateY(100%); }
.open-active > *:last-child { transform: translateY(0); }

.panel p {
  text-transform: uppercase;
  font-family: 'Amatic SC', cursive;
  text-shadow:0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 2em;
}
.panel p:nth-child(2) {
  font-size: 4em;
}

.open {
  flex: 5;
  font-size:40px;
}

.cta {
  color:white;
  text-decoration: none;
}
```
