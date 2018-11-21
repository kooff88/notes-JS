# React.Children

- this.props.children

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是this.props.children属性.  
它表示组件的所有子节点  

```
  var NotesList = React.createClass({
    render: function(){
      return(
        <ol>
          {
            React.Children.map(this.props.children,function(child){
              return <li>{child}</li>
            })
          }
        </ol>
      )
    }
  });

  ReactDOM.render (
    <NotesList>
      <span>hello</span>
      <span>world</span>
    </NotesList>,
    document.body
  )

```

ps: this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，  
数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心  

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点  
，而不用担心 this.props.children 的数据类型是 undefined 还是 object  