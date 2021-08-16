## Fiber

在页面元素很多，且需要频繁刷新的场景下，React 15 会出现掉帧的现象.解决主线程长时间被 JS 运算占用这一问题的基本思路，是将运算切割为多个步骤，分批完成.

旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。  
而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务

```
window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响。函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。
```

### React 的答卷

React 框架内部的运作可以分为 3 层：

```
1. Virtual DOM层， 描述页面长什么样。
2. Reconciler 层，负责调用组件生命周期方法， 进行 Diff算法等。
3. Renderer层, 根据不同的平台，渲染出相应的页面， 比较常见的是 ReactDOM和 ReactNative.

```

这次改动最大的当属 Reconciler 层了，React 团队也给它起了个新的名字，叫Fiber Reconciler

Fiber 其实指的是一种数据结构

```js
const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```

以前的 Reconciler 被命名为Stack Reconciler。Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑

而 Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行：

为了达到这种效果，就需要有一个调度器 (Scheduler) 来进行任务分配。任务的优先级有六种：
```
synchronous，与之前的Stack Reconciler操作一样，同步执行
task，在next tick之前执行
animation，下一帧之前执行
high，在不久的将来立即执行
low，稍微延迟执行也没关系
offscreen，下一次render时或scroll时才执行
```

Fiber Reconciler 在执行过程中，会分为 2 个阶段。

```js
//阶段一： 
	componentWillMount
	componentWillReceiveProps
	shouldComponentUpdate
	componentWillUpdate

// 阶段二：
	componentDidMount
	componentDidUpdate
	componentWillUnmount

//阶段一，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
//阶段二，将需要更新的节点一次过批量更新，这个过程不能被打断。

```

阶段一可被打断的特性，让优先级更高的任务先执行，从框架层面大大降低了页面掉帧的概率。


Fiber Reconciler 在阶段一进行 Diff 计算的时候，会生成一棵 Fiber 树。这棵树是在 Virtual DOM 树的基础上增加额外的信息来生成的，它本质来说是一个链表。

这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程：

如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍