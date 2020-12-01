## Map

Map 对象
```
Map对象是一种有对应 键/值 对的对象， JS的Object也是 键/值 对的对象 ；
ES6中Map相对于Object对象有几个区别：

1. Object 对象有原型, 也就是说它有默认的key值在对象上面,除非我们使用Object.create(null)创建
   一个没有原型的对象；

2. 在Object对象中，只能吧String和Symbol作为key值，但是在Map中，key值可以是任何基本类型(String,
	 Number, Boolean, undefined, NaN...) ,或者对象(Map, Set,Object,Function,Symbol,null..)

3. 通过Map中的size属性， 可以很方便地获取到Map长度, 要获取Object的长度，得用别的方法。

	总： Map实例对象的key值可以为一个数据或者一个对象，或者一个函数，比较随意，而且Map对象实例中数据的
			排序是根据用户push的顺序进行排序，而Object实例中key,value的顺序就有些规律了，（他们会先排数字
			开头的key值，然后才是字符串开头的key值）

```

```js
	let myMap = new Map([
		[101, "101212"],
		[102,"123123"],
		[104,"qweqweq"]
	]);

	myMap.set(1000, "大鹏牛B");

	let temp = myMap.get(101); // 101212
	let temp1 = myMap.get(1000); // 大鹏牛B

```


Map实例的属性
```
map.size 长度
```

Map实例的方法
```
clear()方法， 删除所有的键/值对；

delete(key), 删除指定的键值对；

enteries() 返回一个迭代器，迭代器按照对象的插入顺序返回 [key, dvalue]

forEach(callback,cantenxt) 循环执行函数并把键值对作为参数； context为执行函数的上下文this;

get(key) 返回Map对象key相对应的value值。 

has(key) 返回布尔值，其实就是返回Map对象是否有指定的key;

keys() 返回一个迭代器，迭代器按照插入顺序返回每一个key元素

set(key,value) 给Map 对象设置key/value键值对，返回这个Map(相当于JS的Set, Set对象添加元素的方法
	叫做add, 而Map对象添加元素的方法为set)

　[@@iterator] 和entrieds()方法一样， 返回一个迭代器， 迭代器按照对象的插入顺序返回[key, value]；
```

Map的使用demo

```
var myMap = new Map();

var keyString = "a string",
		keyObj = {},
		keyFunc = function (){};

// 我们给myMap设置值

myMap.set(keyString, "字符串");
myMap.set(keyObj, "对象");
myMap.set(keyFunc, "函数");

myMap.size; // 输出长度 3


console.log(myMap.get(keyString));    // 输出：字符串
console.log(myMap.get(keyObj));       // 输出：对象
console.log(myMap.get(keyFunc));      // 输出：函数

console.log(myMap.get("a string"));   // 输出：字符串

console.log(myMap.get({}));           // 输出：undefined
console.log(myMap.get(function() {})) // 输出：undefined


```

`我们也可以把NaN, undefined, 对象， 数组， 函数 等这些作为一个Map对象的key值`:
```
	"use strict"
	let map = new Map();

	map.set(undefined, "0");
	map.set(NaN,  {})
	console.log(map); //输出：Map { undefined => '0', NaN => {} }

```

循环Map实例的方法
```
"use strict";
let map = new Map();
map.set(undefined, "0");
map.set(NaN, {});
map.forEach(function(value,key,map) {
	console.log(key,value,map)
})
```

使用for.. of 循环

```
	"use strict";
	let map = new Map();
	map.set(undefined, "0");
	map.set(NaN, {});

	for(let [key, value] of map) {
		console.log(key,value);
	}

	for(let arr of map){
		console.log(arr)
	}

```

## WeakMap

WeakMap 是弱引用的Map对象，如果对象在js执行环境中不存在 引用的话， 相对应地WeakMap对象内的该对象也会被js执行环境收回;   

WeakMap对象的属性： 无。  


WeakMap对象的方法：   

delete(key) : 删除指定的键/值对；

get(key) ：返回Map对象key相对应的value值；

has(key) ：返回布尔值， 其实就是返回Map对象是否有指定的key；

set(key)：给Map对象设置key/value 键/值对， 返回这个Map对象；

























　