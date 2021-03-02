## 节流

```js
import React from "react";
import { throttle } from "lodash";

class Throttle extends React.Component { 
	constructor(props) { 
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleClickThrottled = throttle(this.handleClick, 1000);
	}

	componentWillUnmount() { 
		this.handleClickThrottled.cancel();
	}

	render() { 
		return <button onClick={ this.handleClickThrottled }>load more</button>
	}

	handleClick() { 
		console.log('222')
	}

}

export default Throttle;
```

