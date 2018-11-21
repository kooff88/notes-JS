# Document

Document 接口提供了一些在浏览器服务中作为页面内容入口点而加载的一些页面，也就是DOM树。  
DOM树包括诸如<body>和<table>之类的元素，及其他元素。其也为文档(document)提供了全局性  
的函数，例如获取页面的URL、早文档中创建新的element的函数。 

 EventTarget <---------- Node <--------- Document  

Document接口描述了任何类型的文档的公共属性和方法。根据文档的类型（例如HTML,XML,SVG,...）,可以使用更大的API:  
HTML文档，以text/html内容类型提供，也实现了HTMLDocument接口，而SVG文档实现了SVGDocument接口。  


## 属性

Domcument 接口也继承自Node及 EventTarget几口。  

Document.all 对所有元素进行访问。这是一个遗留的非标准接口，不应该使用。  

Document.async 与document.load一起使用，表示一个异步请求。  

Document.characterSet(只读)   返回文档使用的字符集。  

Document.charset(只读)  Document.characterSet的别名。使用本属性代替别名。 

Document.compatMode(只读)  表示是在 Quirks 模式还是在Stric模式下渲染文档的。  

Document.contentType  从当前文档的MIME 首部返回 Content-Type。  

Document.doctype(只读)  返回当前的 Document Type Definition(DTD)。 

Document.documentElement(只读) 返回document的直属后代元素。对于HTML 文档来说，返回的一半是HTML元素。 

Document.documentURI(只读) 返回文档的URL。 

Document.domConfig  会返回一个DOMConfiguration对象。

Document.hidden(只读)  

Document.implementation(只读)  返回与当前文档相关联的DOM implementation。

Document.inputEncodeing(只读) Document.characterSet的别名。使用本属性代替 Document.characterSet。  

Document.lastStyleSheetSet(只读)  返回样式表集最后使用的名称。其初始值为null,直到设置selectedStyleSheetSet的值改变这些样式表。  

Document.mozSyntheticDocument 当document是人造(synthetic)时，如一个独立的图像，视频，音频文件等，其值为true。  

Document.mozFullScreen  当document出于full-screen mode时，其值为true。  

Document.mozFullScreenElement(只读)  当前document出于全屏模式下的元素。  

Document.mozFullScreenEnabled(只读)  假如在当前document调用element.mozRequestFullscreen()成功，其值为true。  

Document.pointerLockElement(只读)  当指针被锁定时，返回元素集合，作为鼠标事件的目标。如果锁被挂起，或指针解锁，或者目标是在另一个document,则为null。  

Document.preferredStyleSheetSet(只读)  返回网页设计人员所指定的首选样式表集。

Document.scrollingElement(只读)  返回滚动document的Element的一个引用。  

Document.selectedStyleSheetSet  返回当前正在使用的样式表集。  

Document.styleSheets(只读)  返回当前document的样式表对象的列表。  

Document.styleSheetSets(只读) 返回当前document可用的样式表的列表。  

Document.timeline(只读) 

Document.undoManager(只读)

Document.URL(只读)  

Document.visibilityState(只读)  

Document.xmlEncoding  返回XML声明所确定的编码。  


Document接口是 ParentNode接口的扩展：  

ParentNode.children(只读)  返回一个包含父节点所有Element类型的后代的动态 html集合HTMLCollection。  

ParentNode.firstElementChild(只读)  返回父节点的第一个Elment后代，没有时候返回null。   

ParentNode.lastElementChild(只读)  返回父节点的最后一个Element后代，没有时返回null。  

ParentNode.childElementCount(只读)  返回一个无符号长整型，给出对象含有的后代数量。  


## 扩展的HTML文档 

HTML文档的Document接口继承自HTMLDocument接口或者说从HTML5之后扩展了下面的文档：  

Document.activeElement(只读)  返回当前正在操作的元素。  

Document.alinkColor 返回或者设置，document中的活动链接的颜色。  

Document.anchors  返回当前document的所有的锚点的列表。  

Document.applets  返回的document内的applets的有序列表。  

Document.bgColor  获取/设置当前文档的背景颜色。  

Document.body   返回当前文档的<body>元素。  

Document.cookie  返回文档的由分号分隔的cookie列表，或者设置一个单独的cookie值。  

Document.defaultView(只读)  返回对window对象的引用。  

Document.designMode 获取/设置整个文档的编辑功能。  

Document.dir(只读)  Gets/sets directionality(rtl/ltr) of the document.获取/设置文档的文字朝向（rtl从有到左/ltr从左到右）  

Document.domain(只读)  获取/设置当前文档的域名。 

Document.embeds(只读)  返回当前文档的<embed>元素列表。  

Document.fgColor  获取/设置当前文档的前景色或字体颜色。  

Document.forms(只读)  返回当前文档中的<form>元素列表。  

Document.head(只读)  返回当前文档的<head> 元素。  

Document.images(只读) 返回当前文档的图像列表。 

Document.lastModified(只读)  返回文档最后编辑时间。  

Document.linkColor 获取/设置文档的超链接的颜色。  

Document.links(只读)  返回文档中所有超链接的列表。  

Document.location(只读)  返回当前文档的 URI

Document.plugins(只读) 返回可用插件列表。  

Document.readyState(只读)  返回文档的加载状态。  

Document.referrer(只读)  返回着链接到当前页面的那个页面的URL

Document.scripts(只读)  返回文档中所有的<script>元素。  

Document.title 设置或获取当前文档的标题。  

Document.URL(只读)  返回文档的地址字符串。  

Document.vlinkColor 获取/设置访问过的超链接的颜色。  


## 事件句柄

Document.onafterscriptexecute  表示afterscriptexecute事件的事件处理代码  

Document.onbeforescriptexecute  表示beforescriptexecument事件的事件处理代码  

Document.oncopy  表示copy事件的事件处理代码。  

Document.oncut  表示cut事件的事件处理代码。  

Document.onfullscreenchange  表示fullscreenchange 事件的事件处理代码。   

Document.onfullscreenerror  表示fullscreenerror 事件的事件处理代码。  

Document.onpaste  表示paste事件的事件处理代码。  

Document.onpointerlockchage  表示pointerlockchange事件的事件处理代码。 

Document.onpointerlockerror  表示 pointerlockerror事件的事件处理代码。  

Document.onreadystatechange  表示 readystatechange事件的事件处理代码。  

Document.onselectionchange  表示 selectionchange事件的事件处理代码。  

Docuemnt.onvisibilitychange 表示 visibilitychange 事件的事件处理代码。 

Document.onwheel 表示 wheel  事件的事件处理代码。  


Document接口是  GlobalEventHandlers接口的扩展：

GlobalEventHandlers.onabort  表示 onabort 事件的事件处理代码。  

GlobleEventHandlers.onanimationcancel  表示 animationcancel 事件的事件处理代码。 指示一个css动画被取消。  

GlobleEventHandlers.onanimationend 表示 animationend 事件的事件处理代码。指示一个动画结束。 

GlobalEventHandlers.onanimationiteration 表示 animationiteration 事件的事件处理代码。指示一个动画被叠加了一个新动画。  

GlobalEventHandlers.onauxclick 表示 auxclick 事件的事件处理代码。指示一个初级button被安在一个input装置上。  

GlobalEventHandlers.onblur  表示 blur 事件的事件处理代码。  

GlobalEventHandlers.onerror  表示 error 事件的事件处理代码。  

GlobalEventHandlers.onfocus  表示 focus 事件的事件处理代码。 

GlobalEventHandlers.oncancel  表示 cancel 事件的事件处理代码。 

GlobalEventHandlers.oncanplaythrough  表示 canplaythrough 事件的事件处理代码。  

GlobalEventHandlers.onchange  表示 change  事件的事件处理代码。  

GlobalEventHandlers.onclick   表示 click  事件的事件处理代码。  

GlobalEventHandlers.onclose   表示 close 事件的事件处理代码。  

GlobalEventHandlers.oncontextmenu   表示 contextmenu 事件的事件处理代码。  

GlobalEventHandlers.oncuechange  表示 cuechange  事件的事件处理代码。  

GlobalEventHandlers.ondblclick   表示 dblclick   事件的事件处理代码。  

GlobalEventHandlers.ondrag  表示 drag 事件的事件处理代码。  

GlobalEventHandlers.ondragend  表示 dragend  事件的事件处理代码。  

GlobalEventHandlers.ondragenter  表示 dragenter  事件的事件处理代码。  

GlobalEventHandlers.ondragexit  表示 dragexit  事件的事件处理代码。  

GlobalEventHandlers.ondragleave  表示 dragleave  事件的事件处理代码。  

GlobalEventHandlers.ondragover  表示 dragover  事件的事件处理代码。  

GlobalEventHandlers.ondragstart  表示 dragstart  事件的事件处理代码。 

GlobalEventHandlers.ondrop  表示 drop  事件的事件处理代码。  

GlobalEventHandlers.ondurationchange  表示 durationchange  事件的事件处理代码。  

GlobalEventHandlers.onemptied   表示 emptied  事件的事件处理代码。  

GlobalEventHandlers.onended  表示 ended 事件的事件处理代码。  

GlobalEventHandlers.ongotpointercapture 表示 gotpointercapture 事件的事件处理代码。  

GlobalEventHandlers.oninput  表示 input 事件的事件处理代码。  

GlobalEventHandlers.oninvalid   表示 invalid 事件的事件处理代码。  

GlobalEventHandlers.onkeydown  表示 keydown 事件的事件处理代码。  

GlobalEventHandlers.onkeypress  表示 keypress 事件的事件处理代码。  

GlobalEventHandlers.onkeyup  表示 keyup 事件的事件处理代码。  

GlobalEventHandlers.onload   表示 load 事件的事件处理代码。  

GlobalEventHandlers.onloadeddata  表示 loadeddata 事件的事件处理代码。  

GlobalEventHandlers.onloadedmetadata  表示 loadedmetadata 事件的事件处理代码。  

GlobalEventHandlers.onloadend  表示 loadend 事件的事件处理代码。  

GlobalEventHandlers.onloadstart  表示 loadstart 事件的事件处理代码。  

GlobalEventHandlers.onlostpointercapture  表示 lostpointercapture 事件的事件处理代码。  

GlobalEventHandlers.onmousedown  表示 mousedown 事件的事件处理代码。 

GlobalEventHandlers.onmouseenter  表示 mouseenter 事件的事件处理代码。 

GlobalEventHandlers.onmouseleave  表示 mouseleave 事件的事件处理代码。 

GlobalEventHandlers.onmousemove  表示 mousemove 事件的事件处理代码。 

GlobalEventHandlers.onmouseout  表示 mouseout 事件的事件处理代码。 

GlobalEventHandlers.onmouseover  表示 mouseover 事件的事件处理代码。 

GlobalEventHandlers.onmouseup  表示 mouseup 事件的事件处理代码。 

GlobalEventHandlers.onmousewheel  表示 mousewheel 事件的事件处理代码。 

GlobalEventHandlers.onpause  表示 pause 事件的事件处理代码。 

GlobalEventHandlers.onplay  表示 play 事件的事件处理代码。 

GlobalEventHandlers.onplaying  表示 playing 事件的事件处理代码。 

GlobalEventHandlers.onpointerdown  表示 pointerdown 事件的事件处理代码。 

GlobalEventHandlers.onpointermove  表示 pointermove 事件的事件处理代码。 

GlobalEventHandlers.onpointerup  表示 pointerup 事件的事件处理代码。 

GlobalEventHandlers.onpointercancel  表示 pointercancel 事件的事件处理代码。 

GlobalEventHandlers.onpointerover  表示 pointerover 事件的事件处理代码。 

GlobalEventHandlers.onpointerout  表示 pointerout 事件的事件处理代码。 

GlobalEventHandlers.onpointerenter  表示 pointerenter 事件的事件处理代码。 

GlobalEventHandlers.onpointerleave  表示 pointerleave 事件的事件处理代码。 

GlobalEventHandlers.onpointerlockchange  表示 pointerlockchange 事件的事件处理代码。  

GlobalEventHandlers.onpointerlockerror  表示 pointerlockerror 事件的事件处理代码。  

GlobalEventHandlers.onprogress  表示 progress 事件的事件处理代码。  

GlobalEventHandlers.onratechange 表示 ratechange  事件的事件处理代码。  

GlobalEventHandlers.onreset 表示 reset  事件的事件处理代码。  

GlobalEventHandlers.onscroll  表示 scroll  事件的事件处理代码。  

GlobalEventHandlers.onseeked  表示 seeked  事件的事件处理代码。  
   
GlobalEventHandlers.onseeking   表示 seeking  事件的事件处理代码。  

GlobalEventHandlers.onselect   表示 select  事件的事件处理代码。  

GlobalEventHandlers.onselectstart  表示 selectstart  事件的事件处理代码。  

GlobalEventHandlers.onselectionchange  表示 selectionchange  事件的事件处理代码。  

GlobalEventHandlers.onshow  表示 show   事件的事件处理代码。  

GlobalEventHandlers.onsort  表示 sort   事件的事件处理代码。  

GlobalEventHandlers.onstalled  表示 stalled  事件的事件处理代码。  

GlobalEventHandlers.onsubmit  表示 submit  事件的事件处理代码。  

GlobalEventHandlers.onsuspend  表示 suspend  事件的事件处理代码。  

GlobalEventHandlers.ontimeupdate  表示 timeupdate  事件的事件处理代码。  

GlobalEventHandlers.onvolumechange  表示 volumechange  事件的事件处理代码。 

GlobalEventHandlers.ontouchcancel  表示 touchcancel  事件的事件处理代码。 

GlobalEventHandlers.ontouchend  表示 touchend  事件的事件处理代码。 

GlobalEventHandlers.ontouchmove  表示 touchmove  事件的事件处理代码。 

GlobalEventHandlers.ontouchstart  表示 touchstart  事件的事件处理代码。 

GlobalEventHandlers.ontransitioncancel  表示 transitioncancel   事件的事件处理代码。 

GlobalEventHandlers.ontransitionend  表示 transitionend   事件的事件处理代码。 

GlobalEventHandlers.onwaiting  表示 waiting  事件的事件处理代码。 


## 方法

文档接口也继承自Node和EventTarget接口

Document.adoptNode()  从外部文档接受节点。  

Document.captureEvents()  查看window.captureEvents

Document.caretPositionFromPoint()  获取指定坐标下的文档片段的范围对象。  

Document.createAttribute(String name)  创建一个新的Attr对象并返回。  

Document.createAttributebuteNS()  在给定的命名空间内创建一个新的属性节点并返回它。  

Document.createSDATASection()  创建一个新的CDATA节点并返回它。  

Document.createcomment()  创建一个新的注释节点并返回它。  

Document.createDocumentFragment()  创建一个新的文档片段。  

Document.createElement()  用给定的标签名创建一个新的元素。  

Document.createElementNS()  用给定的标签名和命名空间URI创建一个新的元素。  

Document.createEvent()  创建一个事件对象。  

Document.createNodeIterator()  创建一个NodeIterator对象。  

Document.createProcessingInstruction()  创建一个新的ProgressingInstruction对象。  

Document.createRange()  创建一个Range对象。  

Document.createTextNode()  创建一个文字节点。  

Document.createTouch()  创建一个Touch对象。  

Document.createTouchList()  创建一个TouchList对象。  

Document.createTreeWalker()  创建一个TreeWalker对象。  

Document.elementFromPoint()  返回给定坐标出最上面的元素。  

Document.elementsFromPoint()  返回一个指定坐标出左右元素组成的数组。  

Document.enableStyleSheetsForSet()  启用指定样式表集的样式表。  

Document.exitPointerLock()  释放指针锁。  

Document.getAnimations()  但会当前正在生效的所有动画对象的数组，其目标元素是文档的后代。  

Document.getElementByClassName()  返回有给定样式名的元素列表。  

Document.getElementByTagName()  返回有给定标签名的元素列表。  

Document.getElementByTagNameNS()  返回有给定标签名和命名空间的元素列表。  

Document.importNode()  返回一个从外部文档中一个节点的拷贝。  

Document.registerElement()  注册一个web component.  

Document.releaseCapture()  如果是在这个文档中的一个元素上，释放当前鼠标捕获。  

Document.releaseEvent()  查看window.releaseEvent().  

Document.mozSetImageElement()  匀速您更改作为指定元素ID的背景图像的元素。  


The Document interface is extended with the ParentNode interface: 

document.getElementById(String id)  返回一个对识别元素的对象的引用。  

document.querySelector(String selector)  返回文档中第一个匹配指定选择器的元素。  

document.querySelectorAll(String selector)  返回一个匹配指定选择器的元素节点列表。  


The Document interface is extended width the XPathEvaluator interface:  

document.createExpression(String expression, XPathNSResolver resolver)  编译一个XPathExpression,然后可以用于（重复）评估。  

document.createNSResolve(Node resolver) 创建一个XPathNSResolve对象。  

docuemnt.evaluate(String expression, Node contextNode, XpathNSResolver resolver, Number type, Object result)  评估一个XPath表达式。  


### 扩展的HTML文档 

HTML文档的Document接口继承自 HTMLDocument接口或者说从HTML5之后扩展了下面这些文档：  

Document.clear()  在大多数现在浏览器中，包括Firefox和IE的最新版本，这种方法什么都不做。  

Document.close()  关闭文档流以进行编写。  

Document.execCommand(String command[,Boolean showUI[, String value]])  在可编辑文档中，执行一个formating命令。  

Document.getElementByName(String Name)  但会具有给定名称的元素列表。  

Document.getSelection()  返回与文档中选择的文本相关的选择对象。  

Document.hasFocus()  如果当前位于文档的任何位置获得焦点，则返回true.  

Document.open()  为书写打开一个文档流。  

Document.queryCommandEnabled(String command) 如果formating命令可以在当前范围内执行，则返回true。  

Document.queryCommandIndeterm(String command) 如果formating命令处于当前范围的不确定状态，则返回true。  

Document.queryCommandState(String command)  如果在当前范围执行了formating命令，则返回true。  

Document.queryCommandSupported(String command)  如果在当前范围支持formating命令，则返回true。

Document.queryCommandValue(String command)  返回一个formating命令当前范围的当前值。  

Document.write(String text) 将文本写入文档。  

Document.writeln(String text)  在文档中写入一行文本。  


##  浏览器兼容性  

#### Firefox notes  

Mozilla为XUL内容定义了一组非标准属性。  

document.currentScript   返回当前正在执行的<script>元素。  

document.documentURIObject  (Mozilla插件仅仅) 返回表示文档URI的nslURI对象。此属性在特权JavaScript代码中有特殊含义。  

document.popupNode  但会调用弹出窗口的节点。  

document.tooltipNode  返回当前工具提示的目标节点。  

**Mozilla也定义了一些非标准的方法**  

Documeng.loadOverlay   动态加载XUL覆盖。  这只在XUL文档中有效。  


#### IE

Microsolf定义了一些非标准属性。  

document.contents  作为一个工作区，document.body.contains()可以被使用。  

