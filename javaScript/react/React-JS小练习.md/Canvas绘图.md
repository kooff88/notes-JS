# Canvas绘图

./App.js
```
import React, { Component } from 'react';
import './App.less';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      isDrawing : false,
      lastX : 0,
      lastY : 0,
      hue : 0,
      direction : true
    }
  }

  draw = (e) => {
    if (!this.state.isDrawing) return; // stop the fn from running when they are not moused down
    console.log(e);

    /**
      HSL(H,S,L)
      取值：
      H :
      Hue(色调)。 0（或360）表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
      S :
      Saturation(饱和度)。取值为 ： 0.0% - 100.0%
      L : 
      Lightness(亮度)。取值为：0.0% - 100.0%
    */
    let ctx = this.state.ctx;
    let hue = this.state.hue;
    let direction = this.state.direction

    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    // start from 
    ctx.moveTo(this.state.lastX,this.state.lastY);
    // go to 
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    this.setState({
      lastX : e.offsetX,
      lastY : e.offsetY
    })

    hue ++ ; 
    this.setState({hue})   
    if (hue >= 360)   this.setState({hue: 0})       
    if (ctx.lineWidth >= 100 || ctx.lineWidth <=1){
      this.setState({direction: !direction})       
    }
    this.state.direction ? ctx.lineWidth++ : ctx.lineWidth-- ;

  }  

  componentDidMount(){
    const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 100;

    this.setState({ctx})
   

    canvas.addEventListener('mousedown',(e) => {
      this.setState({
        isDrawing:true,
        lastX : e.offsetX,
        lastY : e.offsetY
      })
    })

    canvas.addEventListener('mousemove',this.draw);
    canvas.addEventListener('mouseup',() => this.setState({isDrawing:false}))
    canvas.addEventListener('mouseout',() => this.setState({isDrawing:false}))
  }

  render() {
    return (
      <div>
        <canvas id="draw" width="800" height="800"></canvas>
      </div>
    );
  }
}

export default App;

```
