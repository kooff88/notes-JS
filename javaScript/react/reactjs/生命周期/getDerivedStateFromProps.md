# getDerivedStateFromProps

react@16.4 出现此声明周期  


```
static getDerivedStateFromProps(nextProps, prevState);

组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，
或者返回null来表明新属性不需要更新任何状态。 

注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，
你可能想去比较新旧值。

调用this.setState()通常不会触发getDerivedStateFromProps()。

```