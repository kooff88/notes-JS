##  ref转发

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，  
尤其是可重用的组件库是很有用的。最常见的案例如下所述。  

#### Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。

在下面的示例中，FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button：

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```


以下是对上述示例发生情况的逐步解释：

```
1.我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。

2.我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。

3. React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。

4. 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。

5. 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

```


ts中hooks使用
```ts
// ---------------------------------父
  const combDetailEle = React.useRef<FancyButton>(null);
  <FancyButton  formRef={combDetailEle} />;



//---------------------------子
	const FancyButton = (props) => (
    <button ref={props.formRef} className="FancyButton">
     {props.children}
    </button>
 );
```

