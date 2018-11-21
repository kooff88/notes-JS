# checkbox

./app.js

```
import React, { Component } from 'react';
import './App.less';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      lastChecked:''
    }
  }

 
 handleCheck(e){
  console.log('e',e)
  let inBetween = false;
  if (e.target.shiftKey && this.checked){
    this.checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === this.state.lastChecked){
        inBetween = !inBetween
        console.log('STarting to check them inbetween!');
      }

      if (inBetween){
        checkbox.checked = true;
      }

    })
  }
  this.setState({lastChecked:this})
 }
  
  componentDidMount(){
    this.checkboxes = document.querySelectorAll('.input input[type="checkbox"]');
    this.checkboxes.forEach(checkbox => checkbox.addEventListener('click',this.handleCheck));
    console.log('this.checkboxes',this.checkboxes)
  }



  render() {
    return (
      <div className="inbox">
        <div className='item'>
          <input type="checkbox"/>
          <p>This is an input layout.</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Check one item</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Hold down your Shift key</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Check a lower item</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Everything inbetween should also be set to checked</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Try do it with out any libraries</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Just regular JavaScript</p>
        </div>
        <div className='item'>
          <input type="checkbox"/>
          <p>Good Luck!</p>
        </div>
         <div className='item'>
          <input type="checkbox"/>
          <p>Don't forget to tweet your result!</p>
        </div>
      </div>
    );
  }
}

export default App;

```

./app.less

```
 html, body {
    margin:0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
html{
  font-family: sans-serif;
  background: #ffc600;
}

.inbox {
  max-width:400px;
  margin:50px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    input:checked + p {
      background:#f9f9f9;
      text-decoration: line-through;
    }
    input[type="checkbox"] {
      margin:20px;
    }
    p{
      margin:0;
      padding:20px;
      transition: background 0.2s;
      flex:1;
      font-family: 'helvetica neue';
      font-size:20px;
      font-weight: 200;
      border-left: 1px solid #D1E2FF;
    }
  }
  .item:last-child {
    border-bottom: 0;
  }

}


```
