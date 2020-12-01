# Arrays (d3-array)

数组

## Statistics

`d3.extent`: 获取一个数组的最大值和最小值
```js
let arr = [ 3, 5,1, 8,4]
d3.extend(arr)  // [1, 8]

```

## Iterables

可迭代的

`d3.map`: 遍历

`d3.every` - test if all values satisfy a condition.

`d3.some` - test if any value satisfies a condition.

`d3.filter` - filter values.

`d3.reduce` - reduce values.

`d3.reverse` - reverse the order of values.

`d3.sort` - sort values.

`d3.mean`: 取平均值。


#### d3.group

```js

let athletes = [
  {name: "Floyd Mayweather", sport: "Boxing", nation: "United States", earnings: 285},
  {name: "Lionel Messi", sport: "Soccer", nation: "Argentina", earnings: 111},
  {name: "Cristiano Ronaldo", sport: "Soccer", nation: "Portugal", earnings: 108},
  {name: "Conor McGregor", sport: "MMA", nation: "Ireland", earnings: 99},
  {name: "Neymar", sport: "Soccer", nation: "Brazil", earnings: 90},
  {name: "LeBron James", sport: "Basketball", nation: "United States",  earnings: 85.5},
  {name: "Roger Federer", sport: "Tennis", nation: "Switzerland", earnings: 77.2},
  {name: "Stephen Curry", sport: "Basketball", nation: "United States", earnings: 76.9},
  {name: "Matt Ryan", sport: "Football", nation: "United States", earnings: 67.3},
  {name: "Matthew Stafford", sport: "Football", nation: "United States", earnings: 59.5}
]

let temp = d3.group(athletes, d => d.sport);
/**
	temp = Map{
		0:{
			key:"Boxing",
			value: [
				 {name: "Floyd Mayweather", sport: "Boxing", nation: "United States", earnings: 285}
			]
		},
		1:...
		2:...
	}
*/

 console.log('Basketball',  temp.get("Basketball"))
/**
	[
		{name: "LeBron James", sport: "Basketball", nation: "United States", earnings: 85.5},
		{name: "Stephen Curry", sport: "Basketball", nation: "United States", earnings: 76.9}
	]
*/ 



let temp1 = d3.group(athletes, d => d.nation, d=> d.sport);
/**
	temp1 = Map{
		[
			{
				key: "United States",
				value:Map{
					[
						{
							"key":"Boxing",
							value:[
								{name: "Floyd Mayweather", sport: "Boxing", nation: "United States", earnings: 285}
							]
						},
							{
							"key":"Basketball",
							value:[
								{name: "LeBron James", sport: "Basketball", nation: "United States", earnings: 85.5},
								{name: "Stephen Curry", sport: "Basketball", nation: "United States", earnings: 76.9}
							]
						},
						...
					]
				}
			},
			...
		]
	}
*/

console.log('mation', temp.get("United States").get("Boxing"));
//  [{earnings: 285,name: "Floyd Mayweather",nation: "United States",sport: "Boxing"}]




```