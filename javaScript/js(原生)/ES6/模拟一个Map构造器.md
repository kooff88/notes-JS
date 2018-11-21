# 模拟一个Map 构造器

html
```html
	<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>222</title>
	<link rel="stylesheet" type="text/css" href="index.css">
</head>
<body>
	<script type="text/javascript">
		class Map {
		  static refresh(arg) {
		    for (let [key, value] of arg) {
		      // 判断是否重复了;
		      let index = Map.has.call(this, key);
		      if (index === false) {
		        this._keys.push(key);
		        this._values.push(value)
		      } else {
		        // 如果有重复的值，那么我们执行覆盖
		        this._keys[index] = key;
		        this._values[index] = value;
		      }
		    }
		    this.size = this._keys.length;
		  }

		  static has(key) {
		    var index = this._keys.indexOf(key);
		    if (index === -1) {
		      return false;
		    } else {
		      return index;
		    }
		  }

		  constructor(arg) {
		    this._keys = [];
		    this._values = [];
		    Map.refresh.call(this, arg);
		  }

		  set(key, value) {
		    Map.refresh.call(this, [[key, value]]);
		    return this;
		  }

		  clear() {
		    this._keys = [];
		    this._values = [];
		    return this;
		  }

		  delete(key) {
		    var index = Map.has.call(this, key);
		    if (index !== false) {
		      this._keys.splice(index, 1);
		      this._values.splice(index, 1);
		    }
		    return this;
		  }

		  entries() {
		    return this[Symbol.iterator]()
		  }

		  has(key) {
		    return Map.has.call(this, key) == false ? false : true;
		  }

		  *keys() {
		    for (let k of this._keys) {
		      yield k;
		    }
		  }
		  *values() {
		    for (let v of this._values) {
		      yield v;
		    }
		  }

		  // 直接使用数组的forEach方便啊
		  forEach(fn, context) {
		    return this;
		  }

		  // 必须支持生成器的写法
		  *[Symbol.iterator]() {
		    for (var i = 0; i < this._keys.length; i++) {
		      yield [this._keys[i], this._values[i]]
		    }
		  }
	}

	var map = new Map([["key", "value"]]);
	map.set("heeh", "dada");
	console.log(map.has("heeh"));


	</script>>	 		
</body>
</html>


```