## react 合成事件 与 原生事件

区别： 

React 合成事件一套机制： React 并不是将click 事件直接绑定在dom 上面， 而是采用事件冒泡的形式冒泡到document 上面，  
然后React 将事件 封装给 正式的函数运行和 处理。

### React 合成事件理解

如果 DOM 上绑定了 过多的事件 处理函数， 整个页面相应以及内存占用可能都会受到影响。 React 为了避免这类DOM事件滥用，  
同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层 -- syntheticEvent。

1. 当用户在onClick添加函数时，React 并没有将Click 事件绑定在DOM上面。

2. 而是在 document 处监听所有支持的事件，当事件发生并 冒泡至 document处时， React 将事件内容内容封装交给中间层SyntheticEvent（负责所有事件合成）

3. 所有当事件触发的时候， 对使用统一的分发函数 dispatchEvent 将指定函数执行。


以下用代码来展示两者的区别：

```js
class Test extends Component {
    constructor() {
        super(arguments);
        this.onReactClick.bind(this);
    }
    componentDidMount() {
        const parentDom = ReactDOM.findDOMNode(this);
        const childrenDom = parentDom.queneSelector(".button");
        childrenDom.addEventListen('click', this.onDomClick, false);
    }
    onDomClick() {  // 事件委托
        console.log('Javascript Dom click');
    }
    onReactClick() {  // react合成事件
        console.log('React click');
    }
    render() {
        <div>
            <button className="button" onClick={this.onReactClick()}>点击</button>
        </div>
    }
}

// Dom click
// React click

```

### react 事件机制

react 事件并没有绑定在真实的DOM节点上， 而是通过事件代理，在最外层的 document上对时间进行统一分发，原生事件在目标阶段执行，  
React 在冒泡阶段执行。  

组件挂在更新时， 给 document 注册原生事件回调为 dispatchEvent（统一的事件分发机制）。

事件初始化，添加到 listenerBank, 结构是  listenerBank[registrationName][key]

触发事件时：

```
触发 document 注册原生事件的回调 dispatchEvent 
获取到 触发这个事件最深一级的元素
遍历这个元素的所有父元素， 依次对每一级元素进行处理。
构造合成事件
将每一级的合成事件存储在 eventQueue 事件队列中
遍历 eventQueue
通过 isPropagationStopped 判断当前事件是否执行了 阻止冒泡方法。
如果 阻止了冒泡， 停止遍历， 否则通过 executeDispatch 执行合成事件。
释放处理完成的事件。

```

### DOM 事件传递机制

在 Event 中， 一共有三个阶段( Phase ) , 分别是捕获，目标和冒泡。

而在Event的参数当中，也有参数eventPhase是用来专门表示这三个事件的，通过这个参数我们就可以知道事件处于哪个阶段了。

```
// Webside：
// https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface
// PhaseType
const unsigned short      CAPTURING_PHASE                = 1;
const unsigned short      AT_TARGET                      = 2;
const unsigned short      BUBBLING_PHASE                 = 3;
```

DOM 在事件传递中， 可以概括为三个阶段：

```
首先是从 根节点出发， 到达目标节点， 若此过程中触发了事件， 则被称为捕获 ( CAPTURING ) 事件。

当节点到达 定义点击事件的目标节点时， 此时则处于目标( TARGET ) 阶段。

而在目标节点触发后， 最后就会一路往上回到跟节点， 此时左右事件发生， 则是冒泡( BUBBLING ) 事件。

```

如何决定当前处于捕获阶段还是冒泡阶段？

通过addEventListener这个函数定义事件的类型和监听阶段。

```js

target.addEventListener(type, listener[, useCapture]);

```

其中，这个函数的第三个参数就是用来表示监听的阶段， 若true则表示处于捕获阶段；false表示冒泡阶段。

默认是冒泡阶段。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <ul id="list">
        <li id="list-item">
            <a id="list-item-link" target="_blank" href="http://google.com">
                google.com
            </a>
        </li>
    </ul>
</body>
<script type="text/javascript" src="../JavaScript/DOMEvent.js"></script>
</html>
```

```js

const get = (id) = document.getElementById(id);

const list = get('list')
const listItem = get('list-item')
const listItemLink = get('list-item-link')

// list 的捕获
list.addEventListener('click', (e) => {
    console.log('我是list的捕获事件');
}, true)

// list的冒泡
list.addEventListener('click', (e) => {
    console.log('我是list的冒泡事件')
}, false)


// listItem的捕获
listItem.addEventListener('click', (e) => {
    console.log('我是listItem的捕获事件')
}, true)

// listItem的冒泡
listItem.addEventListener('click', (e) => {
    console.log('我是listItem的冒泡事件')
}, false)

// listItemLink的捕获
listItemLink.addEventListener('click', (e) => {
    console.log('我是listItemLink的捕获事件')
}, true)

// listItemLink的冒泡
listItemLink.addEventListener('click', (e) => {
    console.log('我是listItemLink的冒泡事件')
}, false)


/**
    结果：
    DOMEvent.js:16 我是list的捕获事件，phase value： 1
    DOMEvent.js:26 我是listItem的捕获事件，phase value： 1
    DOMEvent.js:36 我是listItemLink的捕获事件，phase value： 2
    DOMEvent.js:41 我是listItemLink的冒泡事件，phase value： 2
    DOMEvent.js:31 我是listItem的冒泡事件，phase value： 3
    DOMEvent.js:21 我是list的冒泡事件，phase value： 3

*/


```

#### stopPapagation, preventDefault, return false

stopPapagation

当想要取消事件传递时， 就可以选择使用这个函数， 函数加在哪里， 事件就会在哪里停止传递。

```js
const get = (id) => document.getElementById(id);

const list = get('list')
const listItem = get('list-item')
const listItemLink = get('list-item-link')

// list的捕获
list.addEventListener('click', (e) => {
    console.log('我是list的捕获事件，phase value：', e.eventPhase)
}, true)

// list的冒泡
list.addEventListener('click', (e) => {
    console.log('我是list的冒泡事件，phase value：', e.eventPhase)
}, false)

// listItem的捕获
listItem.addEventListener('click', (e) => {
    // e.stopPropagation()
    console.log('我是listItem的捕获事件，phase value：', e.eventPhase)
}, true)

// listItem的冒泡
listItem.addEventListener('click', (e) => {
    // e.preventDefault() // 链接不跳转
    e.stopPropagation() // 跳转还在，但不进行冒泡了
    console.log('我是listItem的冒泡事件，phase value：', e.eventPhase)
}, false)

// listItemLink的捕获
listItemLink.addEventListener('click', (e) => {
    console.log('我是listItemLink的捕获事件，phase value：', e.eventPhase)
}, true)

// listItemLink的冒泡
listItemLink.addEventListener('click', (e) => {
    console.log('我是listItemLink的冒泡事件，phase value：', e.eventPhase)
}, false)


/**
    结果：

    DOMEvent.js:16 我是list的捕获事件，phase value： 1
    DOMEvent.js:27 我是listItem的捕获事件，phase value： 1
    DOMEvent.js:39 我是listItemLink的捕获事件，phase value： 2
    DOMEvent.js:44 我是listItemLink的冒泡事件，phase value： 2
    DOMEvent.js:34 我是listItem的冒泡事件，phase value： 3
*/

// 可以看到，当我在listItem的冒泡过程调用了这个函数之后，事件就没有再继续传递下去了。

```


prenventDefault()

它的作用是取消浏览器的预设行为，但是并不会对事件传递造成影响。但是一旦开始了prebentDefault()函数，在它往下传递的事件当中也会有效果。

