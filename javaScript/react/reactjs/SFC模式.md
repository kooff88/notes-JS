##SFC 模式

- 正常模式  
```
  import React from 'react';
  export default class AAA extends React.Component {
    constructor(props){
      super(props);
      this.state= {

      }
    }

    handleChange=(e) => {
      const {onChange} = this.props
      e.preventDefault();
      let val = e.target.value;
      onChange(e,val)
    }

    render(){
      <div>
        <input 
          type="text"
          onChange={this.handleChange}
        />
      </div>
    }
  }
```


- SFC模式 (无状态模式)
```
import React from 'react';

const handleChange=(onChange,e) => {
  e.preventDefault();
  let val = e.target.value;
  onChange(e,val)
}

const AAA = ({onChange}) =>
  <div>
    <input 
      type="text"
      onChange={(e)=> handleChange(onChange,e)}
    />
   
  </div>

export default AAA;
```
