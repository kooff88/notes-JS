# Element

Element(元素)接口是Document的一个对象。这个接口描述了所有相同种类的元素所普遍具有的方法和属性。这些继承自Element并且  
增加了一些额外功能的接口描述了具体的行为。例如，HTMLElement接口是所有HTML元素的基础接口，而SVGElement接口是所有SVG  
元素的基本接口。  

在web以外的语言，像XUL可以通过XULElement的API,也能实现它。  

## 属性  

所有属性继承它的祖先接口Node,和它所扩展的接口EventTarget,并且从以下部分继承了属性ParentNode,ChildNode,  
NonDocumentTypeChildNode,和Animatable.  

Element.assignedSlot(只读)  返回元素对应的HTMLSlotElement接口。  

Element.attributes(只读)  返回一个与该元素相关的所有属性集合NamedNodeMap。  

Element.classList(只读)  返回该元素包含的class属性是一个DOMTokenList。  

Element.className 他是一个 DOMString表示这个元素的class。  

Element.clientHeight(只读)  返回Number表示内部相对于外层元素的高度。  

Element.clientTop(只读) 返回Number 表示该元素距离它边届的宽度。  

Element.clientWidth(只读)  返回Number表示该元素内部的宽度。  

Element.id  是一个DOMString表示这个元素的id。  

Element.innerHTML  是一个DOMString表示这个元素的内容文本。  

Element.localName(只读)  是一个DOMString表示这个元素名称本地化的部分。  

ParentNode.lastElementChild(只读)  是一个Element,直接获取该元素下最后一个子元素没如果为null表示不存在。  

Element.namespaceURI(只读)  元素对应的namespaceURI,如果没有则返回null。  

NonDocumentTypeChildNode.nextElementSibling(只读) 是一个Element,该元素下一个兄弟节点，如果为null表示不存在。  

Element.outerHTML 是一个DOMString获取该DOM元素及其后代的HTML文本，当设置它的时候，会从给定的字符串开始解析，替换自身。  

NonDocumentTypeChildNode.previousElementSiBling(只读) 是一个Element,该元素上一个兄弟节点，如果为null表示不存在。  

Element.scrollHeight(只读)  返回类型为：Number,表示该元素可见高度的滚动条。    

Element.scrollLeft  返回类型为：Numberr,表示该元素横向滚动条距离最左的位移。  

Element.scrollLeftMax(只读)  返回类型为：Number,表示该元素横向滚动条可移动的最大值。  

Element.scrollTop  返回类型为： Number,表示该元素纵向滚动条距离。  

Element.scrollTopMax(只读)  返回类型为：  Number,表示该元素纵向滚动条可移动的最大值。  

Element.scrollWidth(只读)  返回类型为：Number,表示该滚动窗口的宽度。  

Element.shadowRoot(只读)  返回由元素承载的最年轻的影子根。  

Element.tabStop  返回类型为：Boolean，表示元素是否可以通过tab键接受输入焦点。  

Element.tagName(只读)  返回类型为：String,表示该元素的标签名。  

Element.undoManager(只读) 返回与元素有关的UndoManager。  

Element.undoScope  返回类型为： Boolean, 表示元素是否为撤销范围host,或者不是。  

### 事件句柄  

Element.ongotpointercapture  返回gotpointercapture事件类型的事件处理程序。  

Element.onlostpointercapture  返回lostpointercapture事件类型的事件处理程序。  

Element.onwheel  返回回调事件的事件处理代码。  

## 方法
继承父节点，父级，EventTarget，的方法，并且实现了ParentNode，ChildNode，NonDocumentTypeChildNode，可以做成动画。  

EventTarget.addEventListener()  将事件处理程序注册到元素的特定事件类型。  

Element.closest()  返回该元素的子代（或该元素本身），它是在给定参数选择器所选择的最近的祖先。  

Element.createshadowRoot() 在元素上创建一个浅DOM，将其转换为一个shadow host. 返回一个ShadowRoot。  

EventTarget.dispatchEvent() 将事件分派给DOM中的这个节点，并返回一个布尔值，表明至少有一个处理程序没有取笑它。  

Element.getAnimations()  返回当前在元素上活动的一个动画对象数组。  

Element.getAttribute()  从当前节点检索命名属性的值，并将其作为对象返回。  

Element.getAtrributeNames() 从当前元素返回一个属性名称数组。  

Element.getAttriButeNS()  从当前节点检索具有指定名称和名称空间的属性值，并将其作为对象返回。    

Element.getBoundingClientRect() 返回元素的大小及其相对于viewport的位置。  

Element.getClientRects()  返回一个矩形集合，它表示客户端中每一行文本的边框。   

Element.getElementsByClassName()  返回一个动态的HTMLCollection，它包含当前元素的所有子元素，该子元素拥有参数中给定的类的列表。  

Element.getElementsByTagName()  从当前元素返回一个包含所有子代元素的动态的HTMLCollection，其中包含一个特定的记名。  

Element.getElementsByTagNameNS()  从当前元素返回一个包含所有子代元素的live HTMLCollection，其中包含一个特定的标记名称和名称空间。  

Element.hasAttribute()  返回一个布尔值，指示元素是否具有指定的属性。  

Element.hasAttributeNS()  返回一个布尔值，指示元素是否在指定的名称空间中具有指定的属性。  

Element.insertAdjacentElement  相当于所调用的元素，在给定位置插入给定的元素节点。  

Element.matches()  返回一个布尔值，指示该元素是第一由指定的选择器字符串选择。  

Element.querySelector()  返回与元素相匹配的指定选择器字符串的第一个节点。  

Element.querySelectorAll()  返回与元素相匹配的指定选择器字符串的节点的节点列表。  

Element.releasePointerCapture() 为特定指针事件设置的释放(停止)指针捕获。  

ChildNode.remove()  从其父元素列表中移除元素。  

Element.removeAttribute()  从当前节点中删除已命名的属性。  

Element.removeAttributeNS()  从当前节点删除具有指定名称和名称空间的属性。  

EventTarget.removeEventListener()  删除一个元素的监听事件。  

Element.requestFullscreen()  异步请求浏览器使元素全屏。  

Element.requestPointerLock()  允许异步地要求指针锁定在给定的元素上。  

Element.scrollIntoView()  滚动页面，直到元素进入视图。  

Element.setAttribute()  设置当前节点的命名属性的值。  

Element.setAttributeNS()  从当前节点设置具有指定名称和名称空间的属性的值。  

Element.setCapture()  设置鼠标事件捕获，将所有鼠标事件重定向到该元素。  

Element.setPointerCapture()  指定一个特定的元素作为未来指针事件的捕获目标。  

