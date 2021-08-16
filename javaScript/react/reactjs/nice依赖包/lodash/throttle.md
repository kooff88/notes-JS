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

JS 实现 防抖，节流


```js
// 防抖

function debounce ( fn, wait ) {
	let timer = null;
	return function (){
		let args = arguments, that = this;
		timer && clearTimeout( timer );
		timer = setTimeout( function(){ fn.apply(that, args)}, wait)
	}
}

// 节流
//一定时间内只触发一次函数。并且开始触发一次，结束触发一次。代码如下：
function throttle(fun, delay) {
	let timer = null;
	let startTime = Date.now();

	return function (){
		let curTime = Date.now();
		let remain = delay - ( curTime - startTime );
		let that = this;
		let args = arguments;
		clearTimeout(timer);

		if ( remain <= 0 ) {
			fun.apply(that,args);
			startTime = Date.now();
		} else {
			timer = setTimeout( fun, remain );
		}
	}
}

```