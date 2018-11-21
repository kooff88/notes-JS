# cubic-bezier

- 列子  

```list.js

import React, { Component} from 'react';
import './list.less'


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="animation">
        asd
      </div>
    );
  }
};

```

```
.animation{
  width: 50px;
  height: 50px;
  background-color: #ed3;
  -webkit-transition:  all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
       -o-transition:  all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          transition:  all 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.animation:hover {
  -webkit-transform:  translateX(100px);
  -ms-transform:  translateX(100px);
  -o-transform:  translateX(100px);
  transform:  translateX(100px);
}
```


