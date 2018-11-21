# CustomEvent

- CustomEvent 事件是由程序员创建的，可是有任意自定义功能的事件。  

  ps: 此特性在Web Worker中可用。

##  构造函数

- CustomEvent()创建一个自定义事件。  

## 属性

- CustomEvent.detail(只读) 创建此事件时任何数据都可以通过。  

这个接口继承父级属性。  

- Event.bubbles(只读) 一个布尔值，指示事件是否在DOM中冒泡。  

- Event.cancelBubble  

- Event.cancelable(只读)  一个布尔值，指示是否可取消的事件。  

- Event.composed(只读)  一个布尔值，该值指示事件是否可以在浅DOM和常规DOM的边界上冒泡。  

- Event.currentTarget(只读) 对当前注册的事件目标的引用。  

- Event.deepPath  冒泡事件的DOM节点数组.  

- Event.defaultPrevented(只读)  指示event.preventDefault() 是否在此事件被触发。  

- Event.eventPhase 指示正在处理的事件流在那个阶段。  

- Event.explicitOriginalTarget  事件的明确原始目标（Mozilla特定）。 

- Event.originalTarget(只读) 事件的明确原始目标(Mozilla-specific).  

- Event.returnValue 从一个没有标准（微软IE的旧版本）到 Event.preventDefault() and Event.defaultPrevented.  

- Event.target(只读) 对事件最初分发的目标的引用。  

- Event.timeStamp 创建事件的时间戳，以毫秒为单位。  

- Event.type 事件的名称。(不区分大小写)  

- Event.isTrusted 指示是否该事件是由浏览器发起的(比如用户点击后）或通过脚本（使用一个事件的创作方法，如event.initEvent） 


## 方法概述

无效的 initCustomEvent(in DOMString type, in boolean canBubble, in boolean cancelable, in any detail);  


### 属性

| Attribute | Type | Description |
|-----------|--------|------------|
| detail    |  any   | 当事件初始化时传递的数据 |


### 方法

initCustomEvent()  初始化一个自定义事件的方式和初始化一个标准DOM事件的方式非常相似。  

```
  void iniCustomEvent(
    in DOMString type,
    in boolean canBubble,
    in boolean cancelable,
    in any detail
  )

```


### 参数

type  事件的类型名称  

canBubble  一个布尔值，表明该事件是否会冒泡。 

cancelable  一个布尔值，表明该事件是否可以被取消。  

detail  当事件初始化时传递的数据.


## 构造函数

DOM4 规范 添加了对CustomEvent构造函数的支持。  

```
  CustomEvent(
    DOMString type,
    optional CustomEventInit eventInitDict
  )
```


### 参数

type 事件的类型名称  

eventInitDict 一个对象，提供了事件的配置信息。


#### CustomEventInit 

bubbles  一个布尔值,表明该事件是否会冒泡.    

cancelable  一个布尔值,表明该事件是否可以被取消.  

detail  当事件初始化时传递的数据.  


### CustomEvent用法示例  

```
  // 添加一个适当的事件监听器
  obj.addEventListerner("cat",function(e) {process(e.detail)})

  // 创建并分发事件
  var event = new CustomEvent("cat", {"detail":{"hazcheeseburger":true}})
  obj.dispatchEvent(event)
```


## 浏览器兼容性


|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|---------------------|-------- |---------------- |----------------|---------|----------|
|     基本支持      |  (yes)  |     6         |       9        |   ?    |   (yes)(533.3)  |
| CustomEvent() constructor |   15   |   11   |     ?     |   11.60   |   Nightly build(535.2)  |
