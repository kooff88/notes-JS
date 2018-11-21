# react-countup 数字滚动

- [网站](https://github.com/glennreyes/react-countup)  

```js

import react,{Component} from 'react';
import CountUp from 'react-countup';

class CountUp extends Component {
	constructor(props){
		super(props);
		this.state= {
			complete: false
		}
	}

	render(){
		return (
			<CountUp start={0} end={1000} duration={3} onComplete={() => {
        this.setState({ complete: true })
      }} />

		)
	}
}

export default CountUp;

```