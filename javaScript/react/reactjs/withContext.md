### 目录

- [React.withContext](#React.withContext)

# React.withContext

- React.withContext 会执行一个指定的上下文信息的回调函数，任何在这个回调函数里面渲染的组件都有这个context的访问权限。  

```
  var A = React.createClass({
    contextTypes:{
      name:React.PropTypes.string.isRequired,
    },
    render:function(){
      return <div>My name is: {this.context.name}</div>
    }
  });

  React.withContext({'name':'Jonas'},function(){
    React.render(<A/>,document.body);
  })
```

- 任何想访问context里面的属性的组件都必须显示的指定一个contextTypes的属性,如果没有指定改属性，那么组件通过 this.context访问属性将会出错.  

- 如果你为一个组件指定了context,那么这个组件的子组件只要定义了contextTypes属性，就可以访问到父组件指定的context了

```
  var A = React.createClass({
    render:function(){
      return <B />;
    }
  });

  var B = React.createClass({
    contextTypes:{
      name:React.PropTypes.string
    },
    render:function(){
      return <div>My name is: {this.context.name}</div>
    }
  });

  React.withContext({'name':'Jonas'},function(){
    React.render(<A/ >,document.body);
  })
```

- 为了减少文件的引用，你可以为contextTypes放到一个minx中,这样用到的组件饮用这个minx就行了。

```
  var ContextMixin = {
    contextTypes:{
      name:React.PropTypes.string.isRequired
    },
    getName:function(){
      return this.context.name;
    }
  };

  var A = React.createClass({
    mixins:[ContextMixin],

    render:function(){
      return <div>My name is {this.getName()}</div>;
    }
  });

  React.withContext({'name':'Jsons'},function () {
    React.render(<A />,document.body);
  })
```

## getChildContexrt

- 和访问context的属性是需要通过 contextTypes 指定可访问的元素一样.getChildContext指定的传递给子组件的属性需要优先  
  通过 childContextTypes 来指定，不然会产生错误  

```
  var A = React.createClass({
    childContextTypes:{
      name:React.PropTypes.string.isRequired
    },
    getChildContext:function(){
      return {
        name:'Jones',
        fruit:'Banana'
      }
    },

    render : function(){
      return <B/>;
    }
  });

  var B = React.createClass({
    contextTypes:{
      fruit:React.PropTypes.string.isRequired
    },
    render:function(){
      return <div>My favorite fruit is: {this.context.fruit}</div>;
    }
  })

  // Errors: Invariant Violation: A.getChildContext(): key "fruit" is not defined in childContextTypes.
React.render(<A />, document.body);
```


- 假如你的应用程序有多层的context.通过withContext和getChildContent 指定的context元素都可以被子组件引用。但是子组件是需要  
  通过contextTypes来指定所需要的context元素的。

```
 var A = React.createClass({
  childContextTypes:{
    fruit:React.PropTypes.string.isRequired
  },
  getChildContext:function(){
    return {fruit:"Banana"}
  },
  render:function(){
    return <B />;
  }
});

var B = React.createClass({
  contextTypes:{
    name:React.PropTypes.string.isRequired,
    fruit:React.PropTypes.string.isRequired
  },

  render:function(){
    return <div>My name is: {this.context.name} and my favorite fruit is: {this.context.fruit}</div>
  }
});

React.withContext({'name':'Jonas'},function(){
  React.render(<A />,document.body);
})
```

- context 是就近引用的，如果你通过withContext指定了context元素，然后又通过getChildContext指定了该元素,该元素的值  
  将会被覆盖.  

```
  var A =React.createClass({
    childContextTypes:{
      name:React.PropTypes.string.isRequired
    },
    getChildContext:function(){
      return {name:"Sallu"}
    },
    render:function(){
      return <B/>;
    }
  })

  var B = React.createClass({
    contextTypes:{
      name: React.PropTypes.string.isRequired
    },
    render:function(){
      return <div>My name is : {this.context.name}</div>
    }

  });

React.withContext({'name': 'Jonas'}, function () {
    // Outputs: "My name is: Sally"
    React.render(<A />, document.body);
});
```

