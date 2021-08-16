## CSSOM API

正如 HTML 和 CSS 分别承担了语义和表现的分工，DOM 和 CSSOM 也有语义和表现的分工。

DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性，width 和 height 这类显示相关的属性，都属于CSSOM。

CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），  
和跟元素视图相关的 View 部分（CSSOM View）。  

在实际使用中，CSSOM View 比 CSSOM 更常用一些，因为我们很少需要用代码去动态地管理样式表。


### CSSOM

首先我们来介绍下 CSS 中样式表的模型，也就是 CSSOM 的本体。

我们用 style 标签和 link 标签创建样式表，例如：

```html

<style title="Hello">
a {
  color:red;
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">

```

我们首先了解一下 CSSOM API 的基本用法，一般来说，我们需要先获取文档中所有的样式表：

```js
document.styleSheets
//document 的 styleSheets 属性表示文档中的所有样式表，这是一个只读的列表


//我们虽然无法用 CSSOM API 来创建样式表，但是我们可以修改样式表中的内容。
document.styleSheets[0].insertRule("p { color:pink; }", 0)
document.styleSheets[0].removeRule(0)

//更进一步，我们可以获取样式表中特定的规则（Rule），并且对它进行一定的操作，具体来说，就是使用它的 cssRules 属性来实现：
document.styleSheets[0].cssRules

```

不过，这里的 Rules 可就没那么简单了，它可能是 CSS 的 at-rule，也可能是普通的样式规则。不同的 rule 类型，具有不同的属性。

已经为你整理过 at-rule 的完整列表，多数 at-rule 都对应着一个 rule 类型：

```
CSSStyleRule

CSSCharsetRule

CSSImportRule

CSSMediaRule

CSSFontFaceRule

CSSPageRule

CSSNamespaceRule

CSSKeyframesRule

CSSKeyframeRule

CSSSupportsRule

```

CSSStyleRule 有两个属性：selectorText 和 style，分别表示一个规则的选择器部分和样式部分。

selector 部分是一个字符串，这里显然偷懒了没有设计进一步的选择器模型，我们按照选择器语法设置即可。

style 部分是一个样式表，它跟我们元素的 style 属性是一样的类型，所以我们可以像修改内联样式一样，  
直接改变属性修改规则中的具体 CSS 属性定义，也可以使用 cssText 这样的工具属性。  


此外，CSSOM 还提供了一个非常重要的方法，来获取一个元素最终经过 CSS 计算得到的属性：
```js
window.getComputedStyle(elt, pseudoElt);
```

其中第一个参数就是我们要获取属性的元素，第二个参数是可选的，用于选择伪元素。

### CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，  
这些功能，又可以分成三个部分：窗口部分，滚动部分和布局部分，下面我来分别带你了解一下。  

### 窗口 API

窗口API用于操作浏览器窗口的位置，尺寸等。

```
moveTo(x, y) 窗口移动到屏幕的特定坐标；

moveBy(x, y) 窗口移动特定距离;

resizeTo(x, y) 改变窗口大小到特定尺寸；

resizeBy(x, y) 改变窗口大小特定尺寸；

```

此外，窗口 API 还规定了 window.open() 的第三个参数：

```js
window.open( "about:blank", "_blank", "width=100, height=100,left=100, right=100")
```

一些浏览器出于安全考虑没有实现，也不适用于移动端浏览器，这部分你仅需简单了解即可

### 滚动 API

在 PC 时代，浏览器可视区域的滚动和内部元素的滚动关系是比较模糊的，但是在移动端越来越重要的今天，  
两者必须分开看待，两者的性能和行为都有区别。  

#### 视口滚动 API

```
scrollX 是视口的属性， 表示X方向上的当前滚动距离，有别名 pageXOffset;

scrollY 是视口的属性， 表示Y方向上的当前滚动距离， 有别名 pageYOffset;

scroll(x, y) 使得页面滚动到特定的位置， 有别名scrollTo, 支持传入配置型参数{ top,left };

scrollBy(x,y) 使得页面滚动特定的距离， 支持传入配置型参数 { top, left };

```

通过这些属性和方法，我们可以读取视口的滚动位置和操纵视口滚动。不过，要想监听视口滚动事件，  
我们需要在 document 对象上绑定事件监听函数：  

```js

document.addEventListener("scroll", function(event){
  //......
})
```

视口滚动 API 是页面的顶层容器的滚动，

#### 元素滚动 API

在 Element 类（参见 DOM 部分），为了支持滚动，加入了以下 API。

```
scrollTop 元素的属性，表示Y方向上额当前滚动距离。

scrollLeft 元素的属性， 表示X方向上的当前滚动距离。

scrollWidth 元素的属性， 表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。

scrollHeight 元素的属性， 表示元素内部的滚动内容的高度， 一般来说会大于等于元素高度。

scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo, 支持传入配置型参数{top, left};

scrollBy( x, y ) 使得元素滚动到特动的位置，支持传入配置型参数{ top, left };

scrollIntoView(arg) 滚动元素所在的父元素， 使得元素滚动到可见区域， 可以通过 arg来指定滚动到中间，开始或者就近。

```

除此之外，可滚动的元素也支持 scroll 事件，我们在元素上监听它的事件即可：

```js
element.addEventListener("scroll", function(event){
  //......
})
```

### 布局 API

这是整个 CSSOM 中最常用到的部分，我们同样要分成全局 API 和元素上的 API。

#### 全局尺寸信息

```
window.innerHeight, window.innerWidth 这两个属性表示视口的大小。

window.outerHeight, window.outerHeight 这两个属性表示浏览器窗口占据的大小， 很多浏览器没有实现。


window.devicePixelRatio  这个属性非常重要，表示物理像素和CSS像素单位的倍率关系,Retina屏这个值是2，后有3倍Android屏

window.screen   ( 屏幕尺寸相关信息 )
    window.screen.width, window.screen.height 设备的屏幕尺寸。
		window.screen.availWidth,window.screen.availHeight 设备屏幕的可渲染区域尺寸。
		window.screen.colorDepth, window.screen.pixelDepth 这两个属性的固定值是24，为以后预留。
```

我们主要使用的是 innerHeight、innerWidth 和 devicePixelRatio 三个属性，因为我们前端开发工作只需要跟视口打交道，其它信息大概了解即可。

#### 元素的布局信息

我们首先应该从脑中消除“元素有宽高”这样的概念，我们课程中已经多次提到了，有些元素可能产生多个盒，事实上，只有盒有宽和高，元素是没有的。

所以我们获取宽高的对象应该是“盒”，于是 CSSOM View 为 Element 类添加了两个方法：

```
getClientRects();

getBoundingClientRect()。

```

getClientRects 会返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，  
这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。  

getBoundingClientRect ，这个 API 的设计更接近我们脑海中的元素盒的概念，它返回元素对应的所有盒的包裹的矩形区域，  
需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。  

这两个 API 获取的矩形区域都是相对于视口的坐标，这意味着，这些区域都是受滚动影响的。

```js
//如果我们要获取相对坐标，或者包含滚动区域的坐标，需要一点小技巧：
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```

这两个 API 的兼容性非常好，定义又非常清晰，建议你如果是用 JavaScript 实现视觉效果时，尽量使用这两个 API。