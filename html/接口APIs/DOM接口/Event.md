# Event

Event接口表示在DOM中发生的任何事件；一些是用户生成的（例如鼠标或键盘事件），而其其他由API生成（例如指示动画已经完成运行的事件，视频已被暂停等等）。  
有许多类型的事件，其中一些使用基于主要事件接口的其他接口。事件本身包含所有事件通用的属性和方法。  



## 基于Event的接口

```
AnimationEvent  |   AudioProcessingEvent  |  BeforeInputEvent  |  BeforeUnloadEvent
BlobEvent  |  ClipboardEvent  |  CloseEvent  |  CompositionEvent  
CSSFontFaceLoadEvent  |  CustomEvent  |  DeviceLightEvent  |  DeviceMotionEvent  
DeviceOrientationEvent  |  DeviceProximityEvent  |  DOMTransactionEvent  |  DragEvent
EditingBeforeInputEvent  |  ErrorEvent  |  FetchEvent  |  FocusEvent  
CamepadEvent  |  HashChangeEvent  |  IDBVersionChangeEvent  |  InputEvent 
KeyboardEvent  |  MediaStreamEvent  |  MessageEvent  |  MouseEvent
MutationEvent  |  OfflineAudioCompletionEvent  |  PageTransitionEvent  |  PointerEvent
PopStateEvent  |  progressEvent  |  RelatedEvent  |  RTCDataChannelEvent
RTCIdentityErrorEvent  |  RTCIdentityEvent  |  RTCPeerConnectionIceEvent  |  SensorEvent
StorageEvent  |  SVGEvent  |  SVGZoomEvent  |  TimeEvent  
TouchEvent  |  TrackEvent  |  TransitionEvent  |  UIEvent
UserProximityEvent  |  WebGLContextEvent  |  WeelEvent  

```

## 注册事件监听器

有三种方式可以为DOM元素注册事件处理函数。  

> EventTarget.addEventListener  

```
  // Assuming myButton is a button element
  MyButton.addEventListener('click',funcion(){console.log('Hello world')},false);
```

您可以在现代web页面中使用该方法。  

```
注意： Internet Explorer 6-8 并不支持这个方法，而是提供了类似的element.attachEvent API。
如果要进行跨浏览器使用，请考虑使用有效的JavaScript库。  
```


## HTML属性

> <button onClick="alert('Hello world!')" />  

在属性中的JavaScript代码，是通过event参数传入Event对象的。   

我们应该避免使用这种方式。因为它会使标记数量变大，而可读性却较差。内容/结构和行为之间没有很好的分离，使得在处理bug时非常困难。  



## 属性

Event.bubbles（只读） 一个布尔值，指示事件是否在DOM中出现。  

Event.cancelBubble  Event.stopPropagation()的一个历史的别名。在从事件处理程序返回之前将其值设置为true,可以防止事件的传播。  

Event.cancelable（只读） 一个布尔值，指示该事件是否可取消。  

Event.composed（只读）  一个布尔值，指示事件是否可以在浅DOM和规则DOM之间的边届上冒泡。  

Event.currentTarget（只读）  引用当前注册的事件目标。这是当前将要发送的事件的对象；这是有可能的，这已经改变了，通过重新定位。  

Event.deepPath 一组DOM节点，通过这些节点，事件发生了气泡。  

Event.defaultPrevented（只读）   指示 event.preventDefault()是否在事件中被调用。  

Event.eventPhase（只读）  指示正在处理时间流的哪个阶段。  

Event.explicitOriginalTarget（只读）  事件的现实原始目标(Mozilla-specific)。  

Event.originalTarget（只读）  事件的原始目标，在任何重新目标(Mozilla-specific)之前。   

Event.returnValue  一个非标准的代替方案。  

Event.srcElement （只读） 一个非标准的别名。  

Event.target （只读） 对事件最初发出的目标的引用。  

Event.timeStamp （只读） 创建时间的时间戳。按规范，这个值是时间，但实际上浏览器的定义是不同的；此外，正在进行的工作将其改为DOMHighResTimeStamp.   

Event.type （只读） 时间的名称。  

Event.isTrusted （只读） 指示事件是否由浏览器发起或脚本出发。  

## 方法

Event.createEvent()  创造一个新事件，然后调用它的initEvent()方法来初始化它。  

Event.composedPath()  返回事件的路径（侦听器将被调用的对象）。如果阴影根是用它的浅表根创建的，这就不包括浅表树中的节点。模式关闭。  

Event.initEvent()  初始化创建的事件的值。如果事件已经被发送，则此方法不执行任何操作。  

Event.preventDefault()  取消事件（如果可以取消）。  

Event.stopImmediatePropagation()  对于这个特定的事件，不会调用其它侦听器。即不附加在同一元素上，也不附加在稍后将遍历的元素上（例如，在捕获阶段）。  

Event.stopPropagation()  停止在DOM中进一步传播事件。  

## 浏览器兼容性  

|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari |
|---------------------|-------- |---------------- |----------------|---------|----------|
|基本支持               |  (Yes)     | (Yes)       |   (Yes)         |   (Yes) |   (yes)  |
| cancelBubble defined on Event|   ?  |    (Yes) |  ?  |   ?    |   ?    |
