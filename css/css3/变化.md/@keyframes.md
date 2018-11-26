# @keyframes

- example

``` list.js
import React from 'react';

import './list.less';
export default class app extends React.Component{
  render (){
    return (
      <div className='container'>
      </div>
    )
  }
}
```

```list.less
  .container {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation: mymove 5s infinite;
  -moz-animation:mymove 5s infinite; /* Firefox */
  -webkit-animation:mymove 5s infinite; /* Safari and Chrome */
  -o-animation:mymove 5s infinite; /* Opera */
}

@keyframes mymove {
  from {top:0px;}
  to{top:200px;}
}

@-moz-keyframes mymove{ /* Firefox */
  from{top:0px;}
  to{top:200px};
}
```


