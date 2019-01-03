# react-container-query


 根据屏幕不同宽度，调整浏览器大小  


```js

import React, {Component} from 'react';
import {render} from 'react-dom';
import {ContainerQuery} from 'react-container-query';
import classnames from 'classnames';

const query = {
	'width-between-400-and-599': {
		minWidth: 400,
		maxWidth: 599
	},

	'width-larger-than-600':{
		minWidth: 600,
	}
};

function MyComponent(){
	return (
		<ContainerQuery query={query}>
			{(params) => (
				<div classnames(params)> the box</div>
			)}

		</ContainerQuery>
	)
} 

render(<MyComponent/>, document.getElementById('app'));

 ```