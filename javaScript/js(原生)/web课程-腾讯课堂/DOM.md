## DOM

Document Object Model

DOM定义了表示和修改文档所需要的方法。 DOM对象即为宿主对象，由浏览器厂商定义，用来操作html和xml功能的一类对象的集合。  
也有人称DOM是对HTML以及XML的标准编程接口。


```js
<div></div>



```


```
节点的类型

1. 文本节点
2. 注释节点
3. 元素节点
4. 属性节点
5. document
7. documentFragment

```


### DOM继承树

```js
Node <- Document <- HTMLDocument;
Node <- Document <- XMLDocument;

Node <- CharacterData <- Text;
Node <- CharacterData <- Comment; // 注释


Node <- Element <- HTMLElement <- HTMLHeadElement;
Node <- Element <- HTMLElement <- HTMLBodyElement;
Node <- Element <- HTMLElement <- HTMLTitleElement;
Node <- Element <- HTMLElement <- HTMLParagraphElement;
Node <- Element <- HTMLElement <- HTMLInputElement;
Node <- Element <- HTMLElement <- HTMLTableElement;
Node <- Element <- HTMLElement <- ...;


Node <- Attr;
```


元素： 
```
增: 
document.createElement()

document.createTextNode();

document.createComment();

document.createDocumentFragment();


插
PARENTNODE.appendChild()

PARENTNODE.insertBefore(a,b)


删
parent.moveChild();

child.remove();


替换
parentNode.replaceChild( new, origin );

```


```js
// insertAfter 在元素后插入

Element.prototype.insertAfter = function( targetNode, afterNode ) {
  var beforeNode = afterNode.nextElementSibling;
  if ( beforeBode == null ){
    this.appendChild( targetNode )
  }else {
    this.insertBefore( targetNode, beforeNode )
  }
}


```
