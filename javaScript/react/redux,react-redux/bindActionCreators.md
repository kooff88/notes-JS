# 目录

- [redux中的bindActionCreators](#redux中的bindActionCreators)

# redux中的bindActionCreators

- 简要介绍: Redux 中的bindActionCreators,是通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法,   
  直接调用dispatch(action)(隐式调用)  

- 主要用处:一般情况下，我们可以通过Provider将store通过React的 connect 属性向下传递,bindAcrionCreators的唯一用处就是需要传递  
  action creater到子组件,并且改子组件并没有接收到父组件上传递的store和dispatch.  

1.bindActionCreators的参数

```
  let newAction = bindActionCreators(oldActionCreator,dispatch)
```

- 来看一下形参所表示的意思 ：  
  (1) 行参oldActionCreator  
 这个参数就是创建的action的集合:  

 ```
    //action.js


    function action1(){
      return {
        type:'type1'
      }
    }

    function action2(){
      return {
        type:'type2'
      }
    }

 ```

```
  import * as oldActionCreator from './action.js'

  let newAction = bindActionCreators(oldActionCreator,dispatch)
```

- 从上述的例子中我们可以看到oldActionCreator的形式为key:function的形式,其中function必须返回一个action(包含type表示标识的唯一对象)  
  
(2) 形参dispatch  

- 这里的dispatch,等同于store中的 store.dispatch,用于组合action   

2.最后结果

```
  <child>{...newAction}</child>
```

- 我们将组合oldAction和dispatch的对象传递给子组件,在子组件中,调用newAction.action1,相当于实现了dispacth(action1).  
  于是我们就实现了在没有store和dispatch组件中,如何调用dispatch(action)  

- 后面发现这个接口并没有什么用，因为一般都会import react-redux…. 目前还未发现bindActionCreators的用处，估计唯一的用处就是在子组件未察觉redux的情况下，将dispatch传递给子组件。