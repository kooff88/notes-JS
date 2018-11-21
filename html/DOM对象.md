# DOM对象
-[Event对象](Event对象)

Event对象代表事件的状态,比如事件在其中发生的元素，键盘按键的状态，鼠标的位置，鼠标按钮的状态。  
事件通常与函数结合使用，函数不会在事件发生前被执行！  

### 事件句柄(Event Handlers)

- onabout  
```
  onabout : 事件会在图像加载被中断时发生。
  当用户在图像完成载入之前放弃图像的装载(如单击了stop按钮)时，就会调用该句柄.

  <img src="aaa.gif" onabout = "alert('Error:Loading of the image was aborted')" />
```


- onblur
```
  onblur: 事件会在对象失去焦点时发生。

  upperCase(){
    var x=document.getElementById("fname").value
    document.getElementById("fname").value=x.toUpperCase()
  }

  <input id="fname" onblur={this.upperCase}/>
```


- onchange
```
onchange : 事件会在域的内容改变时发生.

upperCase(x){
    var y=document.getElementById(x).value
    document.getElementById(x).value=y.toUpperCase()
  }

<input type="text" id="fname" onchange="upperCase(this.id)" />
```


- onclick
```
onclick : 事件会在对象被电击时发生。

Field1: <input type="text" id="field1" value="Hello World!">
Field2: <input type="text" id="field2">
点击下面的按钮，把 Field1 的内容拷贝到 Field2 中：
  
<button onclick="document.getElementById('field2').value=document.getElementById('field1').value">Copy Text</button>
```


- ondbclick
```
ondblclick 事件会在对象被双击时发生。

Field1: <input type="text" id="field1" value="Hello World!">
Field2: <input type="text" id="field2">
双击下面的按钮，把 Field1 的内容拷贝到 Field2 中：


<button ondblclick="document.getElementById('field2').value=
document.getElementById('field1').value">Copy Text</button>

```


- onerror
```
onerror : 事件会在文档或图像加载过程中发生错误时被触发。

<img src="aaa.gif" onerror = "alert('The image could not be loaded')" />
```


- onfocus
```
onfocus : 事件在对象获得焦点时发生.

setStyle(x){
  document.getElementById(x).style.backgroud="yellow"
}

<input type="text" onfocus="setStyle(this.id)" id="fname">
```


- onkeydown
```
onkeydown : 事件会在用户 按下一个键盘键时发生.

// 用户无法在输入框中输入数字：

function noNumbers(e){
  var keynum,keychar,numcheck

  if(window.event){
    keynum = e.keyCode
  }else(e.which){
    keynum = e.which
  }

  keychar = String.fromCharCode(keynum)
  numcheck=/\d/
  return !numcheck.test(keychar)

}


<form>
  <input type='text' onkeydown="return noNumbers(event)" />
</form>

```


- onkeypress
```
  onkeypress : 事件会在键盘被按下并释放一个键时发生

  noNumbers(e){
    var keynum
    var keychar
    var numcheck

    if(window.event){
      keynum = e.keyCode
    }eles if(e.which){
      keynum = e.which
    }

    keychar = String.fromCharCode(keynum) 
    numcheck=/\d/
    return !numcheck.test(keychar) 
  }


  <form>
  <input type='text' onkeypress="return noNumbers(event)"/>
  </form>
```


- onkeyup
```
onkeyup 事件会在键盘按键被松开时发生

upperCase(x){
  var y = document.getElementById(x).value = y.toUpperCase()
}

...

<input type="text" id="fname" onkeyup="upperCase(this.id)"/>
```


- onload
```
onload事件会在页面或图像加载完成后立即发生

load(){
  window.status = "Page is loaded"
}

<body onload="load()"></body>
```


- onmousedown
```
onmousedown 事件会在鼠标按键被按下时发生

<img src="asda.gif"  onmousedown="alert('You clicked the picture!')"/>

```


- onmousemove
```
  onmousemove 事件会在鼠标指针移动时发生

<img src="asda.gif"  onmousemove="alert('您的鼠标刚才经过了图片!')"/>

```


- onmouseover
```
onmouseout 事件会在鼠标指针移出指定的对象时发生

<img src="asda.gif"  onmouseover="alert('您的鼠标在图片上!')"/>

```


- onmouseup
```
onmouseup 事件会在鼠标按键被松开时发生

<img src="/i/eg_mouse2.jpg" alt="mouse" onmouseup="alert('您点击了图片！')" />
```


- onreset
```
onreset 事件会在表单中的重置按钮被点开时发生

<form onreset="alert(The form will be reset) ">
  Firstname: <input type="text" name="fname" value="John" />
  Lastname: <input type="text" name="lname" />
  <input type="reset" value="Reset" />
</form>

```


- onresize
```
onresize 事件会在窗口或框架被调整大小时发生

<body onresize="alert('You have changed the size of the window')">

</body>

```


- onsubmit
```
onsubmit 事件会在表单中的确定按钮被电击时发生

<form name="testform" action="jsref_onsubmit.asp"onsubmit="alert('Hello ' + testform.fname.value +'!')">
  
  What is your name?<br />
<input type="text" name="fname" />
<input type="submit" value="Submit" />

</form>
```


- onunload
```
onunload 事件在用户退出页面时发生

<body onunload="alert('The onunload event was triggered')">
</body> 
```


### 鼠标/键盘属性

- altKey
```
altKey 事件属性返回一个布尔值。指示在指定的事件发生时，Alt 键是否被按下并保持住了。

function isKeyPressed(event){
  alert("The ALT key was pressed!")
}else{
  alert("The ALT key was Not pressed!")
}

<body onmousedown="isKeyPressed(event)">

<p>Click somewhere in the document.
An alert box will tell you if you 
pressed the ALT key or not.</p>

</body>
```


- button
```
button事件属性可返回一个整数，指示当事件被触发时哪个鼠标按键被点击。

event.button = 0|1|2

0 规定鼠标左键
1 规定鼠标中键
2 规定鼠标右键

Internet Explorer 拥有不同的参数：

0 规定鼠标左键
4规定鼠标中键
2 规定鼠标右键


function whichButton (event){
  if(event.button === 2){
    alert("You clicked the right mouse button!")
  }else {
    alert("You clicked the left mouse button!")
  }
}

<body onmousedown="whichButton(event)">
<p>Click in the document. An alert box will 
alert which mouse button you clicked.</p>
</body>

```


- clientX
```
clientX事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标.

客户区指的是当前窗口
  
function show_coords(event){
  x= event.clientX
  y= event.clientY
  alert("X coords: " + x + ",Y coords:" + y)
}  

<body onmousedown="show_coords(event)">
  <p>Click in the document. An alert box will alert 
the x and y coordinates of the mouse pointer.</p>
</body>
```


- clientY
```
clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面(客户区)的垂直坐标。

客户区指的是当前窗口


同上
```


- ctrlKey
```
ctrlKey 事件属性可返回一个布尔值，指示当事件发生时，Ctrl 键是否被按下并保持住。

event.ctrlKey = true|false|1|0

function isKeyPressed(event){
  if(event.ctrlKey === 1){
    alert("The CTRL key was pressed!")
  }else {
    alert("The CTRL key was NOT pressed!")
  }
}


<body onmousedown="isKeyPressed(event)">
  
  <p>Click somewhere in the document.
An alert box will tell you if you 
pressed the CTRL key or not.</p>

</body>
```


- metaKey
```
metaKey 事件属性可返回一个布尔值，指示当事件发生时

function isKeyPressed(event){
  if (event.metaKey==1)
  {
  alert("The meta key was pressed!")
  }
else
  {
  alert("The meta key was NOT pressed!")
  }
}


<body onmousedown="isKeyPressed(event)">
  
<p>Click somewhere in the document.
An alert box will tell you if you 
pressed the meta key or not.</p>

</body>
```


- relatedTarget
```
relatedTarget 事件属性返回与事件的目标节点相关的节点

对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。

对于 mouseout 事件来说。该属性是离开目标时，鼠标指针进入的节点。

对于其他类型的事件来说，这个属性没用.

function getRelElement(event){
  var txt = "The cursor just exited the";
  txt = txt + event.relatedTarget.tagName + "element";
  alert(txt);
}

<p onmouseover="getRelElement(event)"> Mouse over this paragraph</p>

```


- screenX
```
screenX 事件属性可返回事件发生时鼠标指针相对于屏幕的水平坐标.

show_coords(event){
  x=event.screenX
  y=event.screenY
  alert("X coords:" + x +", Y coords:" + y)
}


<p>Click in the document. An alert box will alert 
the x and y coordinates of the cursor.</p>
```


- screenY
```
screenY 事件属性可返回事件发生时鼠标指针相对于屏幕的垂直坐标

同上
```


- shiftKey
```
shiftKey 事件属性可返回一个布尔值，指示当事件发生时，“SHIFT”键是否被按下并保持住

event.shiftKey = true|false|1|0

isKeyPressed(event){
   if (event.shiftKey==1)
    {
    alert("The shift key was pressed!")
    }
  else
    {
    alert("The shift key was NOT pressed!")
    }
}


<body onmousedown="isKeyPressed(event)">
  
<p>Click somewhere in the document.
An alert box will tell you if you 
pressed the shift key or not.</p>

</body>
```


### IE属性

 
```
cancelBubble 如果事件句柄阻止事件传播到包容对象，必须把该属性设为true

fromElement 对于mouseover 和 mouseout事件，fromElement 引用移出鼠标的元素.

keyCode 对于keypress事件, 该属性声明了被敲击的键生成的Unicode字符码。对于keydown和keyup事件，它指定了
被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。

offsetX,offsetY  发生事件的地点在事件源元素的坐标系中的x坐标和y坐标。

returnValue  如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为false,可以取消
发生事件的源元素的默认动作

srcElement  对于生成事件的Window对象，Document对象或Element对象的引用。

toElement 对于 mouseover和 mouseout事件，该属性引用移入鼠标的元素

x,y  事件发生的位置的x坐标和y坐标，它们相对于用CSS动态定位的最内层包容元素。 

```



### 标准Event 属性

下面列出2级 DOM事件标准定义的属性.   
```
  bubbles  返回布尔值，指示时间是否是起泡事件类型

  cancelable  返回布尔值， 指示事件是否可拥有可取消的默认动作

  currentTarget  返回其事件监听器触发该事件的元素。

  eventPhase    返回事件传播的当前阶段。

  target  返回触发此事件的元素(事件的目标节点).

  timeStamp  返回事件生成的日期和时间。

  type  返回当前Event 对象表示的事件的名称。
```


- bubbles 
```
getEventType(event){
  alert(event.bubbles)
}

<body onmousedown="getEventType(event)">

<p>Click somewhere in the document. 
An alert box will tell if the event is a bubbling event.</p>

</body>

```


- cancelable
```
isEventCancelable(event){
  alert(event.cancelable)
}


<body onmousedown="isEventCancelable(event)">
  
<p>Click somewhere in the document. 
An alert box will tell if the 
event is a cancelable event.</p>

</body>
```


- currentTarget
```
getEventTrigger(event){
  x = event.currentTarget;
  alert('The id of the triggered element:' + x.id)
}

<p id="p1" onmousedown="getEventTrigger(event)">
Click on this paragraph. An alert box will
show which element triggered the event.</p>
```


- target
```
target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素，文档或窗口.

function getEventTrigger(event){ 
  x=event.target; 
  alert("The id of the triggered element: "
  + x.id);
}

<p id="p1" onmousedown="getEventTrigger(event)">
Click on this paragraph. An alert box will
show which element triggered the event.</p>
```


- timeStamp
```
timeStamp 事件属性可返回一个时间戳。指示发生事件的日期和时间(从epoch开始的毫秒数)
epoch 是一个事件参考点。在这里，它是客户机启动的时间。
并非所有系统都提供该信息，因此，timeStamp属性并非对所有系统/事件都是可用的。 


ps : Epoch指的是一个特定的时间：1970-01-01 00:00:00 UTC。


showTimestamp(event){
  var minutes = 1000 * 60
  x = event.timeStamp;
  alert(x/minutes)
}


<body onmousedown="showTimestamp(event)">
  <p>Click in the document. An alert 
  box will alert the timestamp.</p>
</body>

```


- type
```
type 事件属性返回发生的事件的类型，即当前Event对象表示的事件的名称.
它与注册的事件句柄同名，或者是事件句柄属性删除前缀“on”比如"submit","load"或"click"


function getEventType(event){ 
  alert(event.type);
  }
</script>
</head>

<body onmousedown="getEventType(event)">

<p>Click somewhere in the document.
An alert box will tell what event 
type you triggered.</p>

</body>
```


###  标准 Event 方法

下面列出了2级 DOMd事件标准定义的方法。IE的事件模型不支持这些方法。

- initEvent
```
event.iniEvent(eventType,canBubble,cancelable)

eventType  字符串值。事件的类型
canBubbe   事件是否起泡
cancelable  是否可以用 preventDefault()方法取消事件

```


- preventDefault()
```
取下事件的默认动作

该方法将通知 Web 浏览器不要执行与事件关联的默认动作(如果存在这样的动作)。
例如,
如果type属性是"submit",在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
注意，如果Event对象cancelable 属性是false,那么久没有默认动作，或者不能阻止默认动作。
无论哪种情况，调用该方法都没有作用.
```

