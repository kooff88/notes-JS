# 事件的捕获和冒泡阶段

事件模型： IE事件模型与DOM事件模型  

IE内核浏览器的事件模型是冒泡事件（没有捕获事件过程），事件句柄的触发顺序是从ChildNode到ParentNode.  

```
<div id="ancestor">
  <button id="child">
    open the console and click me 
  </button>
</div>
```

```
以上的HTML代码在IE内核下，事件是这样传播的：{
  1.Button # child
  2.div # ancestor
  3.Body;
  4.Document
}
```

```
DOM标准的浏览器事件是：捕获事件和冒泡事件。
捕获事件过程: {
  1.Window
  2.Document
  3.Body
  4.Div#ancestor
  5.Button#child
}

冒泡事件过程：{
  6.Div # ancestor
  7.Body
  8.Document
  9.Window
}
```

- 事件的注册机制：  
  DOM标准的浏览器事件注册方法是通过addEventListener方法注册，而IE内核的浏览器则是通过attachEvent方法注册。   
  这两个方法的区别：  
  addEventListener方法带有三个参数，分别是：eventType、handler、useCapture。   
  eventType不带有on字符串；   
  handler参数是一个事件句柄，这个函数或方法带有一个事件对象参数；   
  useCapture参数决定了事件句柄触发在哪种事件传播阶段，如果useCapture为true则为捕获阶段，反之则为冒泡阶段。   

```
var ancestorHandler = function (e){ 

//...... 

 }, 

 childHandler = function (e){ 

//...... 

}; 

 document.querySelector('#ancestor').addEventListener('click',ancestorHandler,false);//注意第三个参数 ，注册了一个在冒泡阶段触发的事件句柄

 document.querySelector('#child').addEventListener('click',childHandler,true);//注意第三个参数 ，注册了一个在捕获阶段的事件句柄
```

## 使用

html
```
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>

```

如果给上面的标签li 绑定事件，例如点击改变背景，正常情况下我们可以这样写:  

```js
  var li = document.querySelectorAll('#ul > li');

  for (var i =0; i< li.length; i++ ) {
    li[i].index = i;
    li[i].onclick= function (){
      this.style.background = 'red';
    }
  }

```

当然这样也是没有什么问题的，但是如果 li非常多，那么利用事件冒泡就会方便很多，实现方法就是在li的父元素上绑定事件：  

```js
  var ul = document.querySelector('#ul');
  ul.addEventListener('click',function(e){
    var ev= e || event;
    var li = ev.target;
    li.style.background = 'blue';
    console.log('ev.currentTarget'); // 事件监听的对象，ul

  }, false);

```
类似 jquery事件委托
```js
  
  $('#ul').on('click', 'li', function(){
    $(this).css('background', 'blue');
  })

```
























