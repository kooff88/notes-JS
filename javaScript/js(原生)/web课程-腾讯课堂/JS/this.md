## this

1. 函数预编译过程 this --> window

2. 全局作用域里  this --> window

3. call/apply 可以改变函数运行时this指向

4. obj.func(); func()里面的this指向 obj


```js
function test(c){

  // var this = Object.create( test.prototype );


  var a = 123;
  function b(){}

}
AO {
  arguments:[1],
  this: window, // 如果是new test() 则 this指向 改变当前对象
  c: 1,
  a: undefined,
  b: function(){}
}

test(1)
// new test(1);


```


```js
var name = "222";
var a = {
  name: "111",
  say: function(){
    console.log(this.name);
  }
}
var  fun = a.say;
fun() // 222
a.say(); // 111
var b = {
  name: "333",
  say: function(fun){
    fun()
  }
}

b.say(a.say); // 222
b.say = a.say;
b.say(); // 333



```


```js
function test(){
  
  console.log(arguments.callee); // 打印自己
  
}

test();


var num = (function(n) {

  if (n == 1) {
    return 1;
  }
  return n * arguments.callee(n-1); // 调用自己

}(100))




function test1(){
  demo();
}

function demo(){
  console.log(demo.caller)// 调用test1
}


// "use strict" 严格模式下 arguments 和 caller 不能用

```

```js

var foo = 123;
function print(){

  this.foo = 234;
  console.log(foo) //1. print() 234  ; 2. new print() 123

}

print();

// new print()  

```