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