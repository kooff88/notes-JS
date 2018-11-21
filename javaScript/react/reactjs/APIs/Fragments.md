# Fragments

React 中一个常见模式是为一个组件返回多个元素。 Fragments可以让你聚合一个字元素列表，并且不在DOM中增加额外节点。  

Fragments 看起来像空的JSX标签:  
```
render(){
	<>
		<ChildA />
		<ChildB />
		<ChildC />
	<>
}
```

注意在React中， <>< /> 是 <React.Fragment /> 