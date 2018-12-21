# call 和  apply

-[区别](#区别)  
-[将参数转为一个数组](#将参数转为一个数组)  

## 区别

1. 每个函数都包含两个非继承来的方法： call()方法和 apply()方法。  
2. 相同点： 这两个方法的作用是一样的。  

都是在特定的作用域中调用函数，等于设置函数体this对象的值，以匡冲函数赖以运行的作用域。  

一般来说，this总是指向调用某个方法的对象，但是使用call()和apply()方法时，就会改变this的指向。  


## call() 方法使用示例  


例一：  

```html

	<script type="text/javascript">
		window.color = 'red';
		document.color = 'yellow';

		var s1 = { color: 'blue' };
		function changeColor(){
			console.log(this.color)
		}

		changeColor.call;              // red(默认传递参数)
		changeColor.call(window)       // red
		changeColor.call(document)     // yellow
		changeColor.call(this)         // red
		changeColor.call(s1)           // blue

	</script>
```

例二:  

```html
	var Pet = {
		words : '...',
		speak : function (say){
			console.log(say + '' + this.words)
		}
	}

	Pet.speak('Speak');   //结果: Speak...


	var Dog = {
		words: 'Wang'
	}

	// 将this的指向改变成了 Dog

	Pet.speak.call(Dog, 'Speak'); // 结果 SpeakWang

```

## apply()方法使用示例  

例一：  

```html
	<script type="text/javascript">
		window.number = 'one';
		document.number = 'two';

		var s1 = { number: 'three' };
		function changeColor(){
			console.log(this.number)
		}

		changeColor.apply();           // one (默认传参)
		changeColor.apply(window);     // one
		changeColor.apply(document);   // two
		changeColor.apply(this);       // one
		changeColor.apply(s1);         // three
	</script>
```

例二：
```html
	function Pet(words){
		this.words = words;
		this.speak = function (){
			console.log(this.words);
		}
	}

	function Dog(words){
		// Pet.call(this,works);  // 结果： Wang
		Pet.apply(this, arguments);  // 结果： Wang
	}

	var dog = new Dog('Wang');

	dog.speak();
```


## 不同点：接受参数的方式不同  

- apply()方法 接受两个参数，一个是函数运行的作用域(this),另一个是参数数组。  

语法： apply([thisObj [,argArray]]), 调用一个对象的一个方法，22两一个对象替换当前对象。  

说明： 如果argArray不是一个有效数组或不是 arguments对象，那么将导致一个 TypeError,如果  
       没有提供argArry和 thisObj 任何一个参数，那么Globle对象将用作 thisObj。   

- call()方法 第一个参数和 apply()方法的一样，但是传递给函数的参数必须列举出来。  

语法： call([thisObject[,arg1 [,arg2 [,...,argn]]]]), 应用某一对象的一个方法，用另一个   
       对象替换当前对象。  

说明： call方法可以用来替代另一个调用一个方法， call方法可以将一个函数的对象上下文从初始  
       的上下文改变为thisObj指定的新对象，如果没有提供thisObj参数，那么Global对象被用于thisObj。  


使用示例1：  

```js
	function add (c, d){
		return this.a + this.b + c + d;
	}

	var s = { a:1, b:2 };

	console.log(add.call(s,3,4)); // 1+2+3+4 = 10;

	console.log(add.apply(s, [5,6])); // 1+2+5+6 = 14;

```

使用示例2：  

```html
	<script type="text/javascript">
		window.firstName = 'Cynthia';
		window.lastName = '_xie';

		var myObject = { firstName: 'my', lastName: 'Object' }

		function getName(){
			console.log(this.firstName + this.lastName);
		}

		function getMessage(sex, age){
			console.log(this.firstName + this.lastName + ' 性别：' + sex + ' age： ' + age);
		}

		getName.call(window);      // Cynthia_xie
		getName.call(myObject);    // myObject

		getName.apply(window);     // Cynthia_xie
		getName.apply(myObject);   // myObject

		getMessage.call(window,"女",21)      // Cynthia_xie 性别：女 age：21
		getMessage.apply(window,["女",21])   // Cynthia_xie 性别：女 age：21

		getMessage.call(myObject, "未知", 22)   // Cynthia_xie 性别：女 age：22 myObject 
		getMessage.apply(myObject, ["未知", 22])   // Cynthia_xie 性别：女 age：22 myObject 

	</script>
```

## 将参数转为一个数组

```
	function test(){
		// 将参数转为一个数组
		var args = Array.prototype.slice.apply(arguments);
		return args;
	}

	test(22,33,'test')   //[22,33,'test']

```









