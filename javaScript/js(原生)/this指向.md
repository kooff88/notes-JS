# THIS

- 只有函数执行的时候,this指向调用他的对象  

- 例子一  

```
  function a(){
    var user = "追梦子";
    console.log(this.user);// underfined
    console.log(this); //Window
  }

  window.a();
```

- 例子二  

```
  var o = {
    user:'追梦子',
    fn:function(){
      console.log(this.user);//追梦子
    }
  }

  o.fn();
```

ps : this.的指向在函数创建的时候是决定不了的，在调用的时候才能决定，谁调用的指向谁。

- 例子三  


```
var o = {
  user:'追梦子',
  fn:function(){
    console.log(this.user);//追梦子
  }
}

window.o.fn();

```

这段代码 this没有指向window  



```
var o = {
  a:10,
  b:{
    a:12,
    fn:function(){
      console.log(this.a);//12
    }
  }
}

o.b.fn()
```


情况1  如果一个函数中有this,但是它没有被上一级的对象所调用，那么this指向的就是window。  
情况2  如果一个函数中有this,这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象.  
情况3  如果一个函数中有this,这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象.  

```
  var o = {
    a:10,
    b{
      //a:12,
      fn:function(){
        console.log(this.a) //undefined
      }
    }
  }

  a.b.fn()
```

尽管对象b中没有属性a,这个this指向的也是对象b,因为this只会指向他的上一级对象，不管这个对象中有没有this要的东西  

- 例子四  

```
  var o = {
    a:10,
    b:{
      a:12,
      fn:function(){
        console.log(this,a) //undefined
        console.log(this); //window
      }
    }
  }


  var j = o.b.fn;
  j();
```

这里this指向的是window，  

```
  function Fn(){
    this.user = '追梦子';
  }

  var a = new Fn();
  console.log(a.user); //追梦子
```

这里的对象可以点出函数Fn里面的user是因为new关键字可以改变this的指向,将这个this指向对象a.   
用new关键字就是创建一个对象实例.  
我们这里用变量a创建了一个Fn的实例(相当于复制了一份Fn到对象a里面),此时仅仅只是创建，并没有执行，  
而调用这个函数Fn的是对象a,那么this指向的自然是对象a,那么为什么对象Fn中会有user,因为你已经肤质了一份Fn函数到对象a中，  
用了new关键字就等同于复制了一份.  

```
  function fn(){
    this.user= '追梦子';
    return {};
  }

  var a = new fn();
  console.log(a.user);//undefined
```


```
  function fn(){
    this.user = '追梦子',
    return function(){};
  }

  var a = new fn;
  console.log(a.user);//undefined
```

```
 function fn(){
  this.user = '追梦子',
  return 1;
 }

 var a = new fn;
 console.log(a.user); //追梦子
```

```
 function fn(){
  this.user = '追梦子',
  return undefined;
 }

 var a = new fn;
 console.log(a.user); //追梦子
```

返回值如果是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例  

null 比较特殊  


```
 function fn(){
  this.user = '追梦子',
  return null;
 }

 var a = new fn;
 console.log(a.user); //追梦子
```


另外  


```
 function fn(){
  this.num = 1
 }

 var a = new fn;
 console.log(a.num); //1
```

为什么this会指向a? 首先new关键字会创建一个空的对象，然后会自动调用一个函数apply方法，将this指向这个空对象，这样的话  
函数内部的this就会被这个空的对象代替    