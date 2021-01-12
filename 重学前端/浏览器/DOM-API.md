## DOM-API

不过今天这里我们要介绍的 DOM，指的就是狭义的文档对象模型。

### DOM API 介绍

文档对象模型是用来描述文档，这里的文档，是特指 HTML 文档（也用于 XML 文档，但是本课不讨论 XML）。  
同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。  

DOM API 大致会包含 4 个部分。

```
节点：DOM 树形结构中的节点相关 API。

事件：触发和监听事件相关 API。

Range：操作文字范围相关 API。

遍历：遍历 DOM 需要的 API。
```

### 节点

```
Node:

1. Element
2. Document
3. CharacterData
4. DocumentFragment
5. DocumentType

```

在这些节点中，除了 Document 和 DocumentFrangment，都有与之对应的 HTML 写法，我们可以看一下。

```
Element: <tagname>...</tagname>
Text: text
Comment: <!-- comments -->
DocumentType: <!Doctype html>
ProcessingInstruction: <?a 1?>
```

就会在内存中得到这样一棵 DOM 树，HTML 的写法会被转化成对应的文档模型，而我们则可以通过 JavaScript 等语言去访问这个文档模型。

这里我们每天都需要用到，要重点掌握的是：Document、Element、Text 节点。

DocumentFragment 也非常有用，它常常被用来高性能地批量添加节点。  
因为 Comment、DocumentType 和 ProcessingInstruction 很少需要运行时去修改和操作，所以有所了解即可。  

### Node

Node 是 DOM 树继承关系的根节点，它定义了 DOM 节点在 DOM 树上的操作，首先，Node 提供了一组属性，  
来表示它在 DOM 树中的关系，它们是：  

```
parentNode

childNodes

firstChild

lastChild

nextSibling

previousSibling

```
从命名上，我们可以很清晰地看出，这一组属性提供了前、后、父、子关系，有了这几个属性，我们可以很方便地根据相对位置获取元素

然，Node 中也提供了操作 DOM 树的 API，主要有下面几种。

```
appendChild

insertBefore

removeChild

replaceChild

```

所有这几个修改型的 API，全都是在父元素上操作的，比如我们要想实现“删除一个元素的上一个元素”，  
必须要先用 parentNode 获取其父元素。  

除此之外，Node 还提供了一些高级 API，我们来认识一下它们。

```
compareDocumentPosition 是一个用于比较两个节点中关系的函数。

contains 检查一个节点是否包含另一个节点的函数。

isEqualNode 检查两个节点是否完全相同。

isSameNode 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用“===”。

cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

```

DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算。于是 document 对象有这些方法。

```
createElement

createTextNode

createCDATASection

createComment

createProcessingInstruction

createDocumentFragment

createDocumentType

```

### Element 与 AttributeNode 

Node 提供了树形结构上节点相关的操作。而大部分时候，我们比较关注的是元素。Element 表示元素，它是 Node 的子类。

首先，我们可以把元素的 Attribute 当作字符串来看待，这样就有以下的 API：

```
getAttribute

setAttribute

removeAttribute

hasAttribute

```

如果你追求极致的性能，还可以把 Attribute 当作节点：

```
getAttributeNode

setAttributeNode

```

此外，如果你喜欢 property 一样的访问 attribute，还可以使用 attributes 对象，比如

```
document.body.attributes.class = “a” 等效于
document.body.setAttribute(“class”, “a”)。
```

### 查找元素

document 节点提供了查找元素的能力。比如有下面的几种。

```
querySelector

querySelectorAll

getElementById

getElementsByName

getElementsByTagName

getElementsByClassName
```

getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，  
这几个 API 的性能高于 querySelector。  

而 getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。

```js
var collection = document.getElementsByClassName('winter');
console.log(collection.length);
var winter = document.createElement('div');
winter.setAttribute('class', 'winter')
document.documentElement.appendChild(winter)
console.log(collection.length);
```

### 遍历

前面已经提到过，通过 Node 的相关属性，我们可以用 JavaScript 遍历整个树。  
实际上，DOM API 中还提供了 NodeIterator 和 TreeWalker 来遍历树。  

NodeIterator 的基本用法示例如下：

```js

var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
var node;
while(node = iterator.nextNode())
{
    console.log(node);
}
```

我们再来看一下 TreeWalker 的用法。

```js
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
var node;
while(node = walker.nextNode())
{
    if(node.tagName === "p")
        node.nextSibling();
    console.log(node);
}
```

建议需要遍历 DOM 的时候，直接使用递归和 Node 的属性。

### Range

Range API 是一个比较专业的领域，如果不做富文本编辑类的业务，不需要太深入

Range API 表示一个 HTML 上的范围，这个范围是以文字为最小单位的，所以 Range 不一定包含完整的节点，  
它可能是 Text 节点中的一段，也可以是头尾两个 Text 的一部分加上中间的元素。  

我们通过 Range API 可以比节点 API 更精确地操作 DOM 树，凡是 节点 API 能做到的，Range API 都可以做到，而且可以做到更高性能，

创建 Range 一般是通过设置它的起止来实现，我们可以看一个例子：

```js
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)

var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))
```