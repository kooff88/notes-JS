## React 优化

优化的方向有两个， 一个减少render次数， 也就是减少diff 计算。 另一个是 减少计算量，主要减少重复计算，对于函数组件来说，  
每次render都会重新从头开始执行函数调用。在类组建中主要使用 shouldComponentUpdate 生命周期和PureCompnent 组件去减少  
render次数，函数组件主要使用：

```
React.memo: 等同于 PureComponent, 用它包裹子组件, 当父组件需要重新render时，如果传递给自己的props不变, 就不会触发重新render。  
memo 可以添加第二个参数， 是个函数，参数为前后props，返回true不需要重新 render。

useCallback：应用场景是父组件向子组件传递方法，当父组件重新渲染时， 代码都会重新执行，所以就算子组件包裹了React.memo，
也会重新渲染。 可以通过 useCallback 进行记忆传递的方法， 并将记忆方法传递给子组件。

useMemo: 如果在组件有个变量的值需要大量的计算才可以得出， 因为函数组件重新渲染就会重新执行代码，所以该变量的值也会重新计算
         就可以useMemo做出计算结果缓存。


```