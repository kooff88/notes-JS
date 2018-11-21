## createElement

- 官方  

```
  ReactElement.createElement(
    string/ReactClass type,
    [onject props],
    [children ...]
  )
```

- 此方法创建并返回一个给定类型的ReactElement元素.  
- type可以是一个html标签名称字符串，也可以是一个ReactClass.第二个参数是该标签的属性，这个参数是可选的.  
- 第三个参数是该元素的子节点，同样也是可选的  

# type参数为html 标签名称

```
var child1 = React.createElement('li', null, 'First Text Content');
var child2 = React.createElement('li', null, 'Second Text Content');
var child3 = React.createElement('li', null, 'Third Text Content');
{var root = React.createElement('ul', { className: 'my-list' }, child1, child2, child3);
 || var root = React.createElement('ul', { className: 'my-list' }, [child1, child2, child3]);}
ReactDOM.render(
    root,
    document.getElementById('content')
);
```

# type参数为 ReactClass

```
  var cli = React.createClass({
    render:function(){
      return (
        <li>
        {this.props.text}
        </li>
      )
    }
  })

  var child1 = React.createElement(cli, {key:'F',text:'First Text Content'});
  var child2 = React.createElement(cli, {key:'S',text:'Second Text Content'});
  var child3 = React.createElement(cli, {key:'T',text:'Third Text Content'});
  var root = React.createElement('ul', { className: 'my-list' }, [child1, child2, child3]);
  ReactDOM.render(
    root,
    document.getElementById('content')
  );
```

- 在这里我们看第一个参数cli就是createClass的返回值。需要注意的是，对于前三个li的createElement第二个参数要加上key:’value’ 这里的value彼此都不相同，如果不指定此属性——虽然也能按照逻辑正常显示——会报如下的警告  

```
Warning: Each child in an array or iterator should have a unique "key" prop. Check the top-level render call using <ul>. See https://fb.me/react-warning-keys for more information.
```

