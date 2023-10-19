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

```js

// 获取 滚动条 距离
function getScrollOffset(){
  
  if ( window.pageXOffset ) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.Top,

    }
  }
}

```


```js
// 可视区域 宽高
function getViewportOffset(){
  if ( window.innerWidth ) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  }else {
    if ( document.compatMode === 'BackCompat' ) {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      }
    }else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}


```


```js

div.getBoundingClientRect();



```


```js

// scroll()   scrollTo()   scrollBy()

// 自动阅读
<div>内容。。。</div>
<div>start</div>

var start = document.getElementsByTagName('div')[1];

start.onclick = function(){

  clearInterval(timer);
  let timer = setInterval( function(){
    window.scrollBy(0, 10)
  }, 100);

}



```


```js

<div>start</div>

window.getComputedStyle(div, null) // 获取最终展示样式，权重最高的

// 获取伪元素
window.getComputedStyle(div,'after').width;

// 获取样式方法， 兼容ie
function getStyle(elem, prop){
  if ( window.getComputedStyle ) {
    return window.getComputedStyle( elem, null )[prop];
  }else {
    return ele.currentStyle[prop];
  }
}




```