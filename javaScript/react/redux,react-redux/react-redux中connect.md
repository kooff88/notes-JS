## react-redux connect 

- react-redux提供了两个重要的对象, Provider和 connect ,前者使React组件可被链接(connectable),后者把 React组件和 Redux 的store真正链接起来.  
  
# 预备知识

- 首先回顾一下redux的基本用法   [链接](http://www.redux.org.cn/)    

```
  const reducer = (state = {count:0},action) => {
    switch (action.type){
      case 'INCREASE': return {count:state.count + 1};
      case 'DECREASE': return {count:state.count - 1};
      default:return state;
    }
  }


  const actions = {
    increase: ()=>({type:'INCREASE'}),
    decrease: ()=>({type:'DECREASE'})
  }

  const store = creaseStore(reducer);

  store.subscribe(()=>
    console.log(store.getState())
  );

  store.dispatch(actions.increase()) // {count 1}
```

- 通过 reducer 创建一个store,每当我们在 store 上 dispatch 一个action,store内的数据就会相应的发生变化  
  
  我们当然可以直接在React 中使用Redux :在最外层容器组件中初始化store,然后将 state上的属性作为props层层传递下去  

```
  class App extends Component{
    componentWillMount(){
      store.subscribe((state)=>this.setState(state))
    }

    render(){
      return <Comp
          onIncrease={()=>store.dispatch(action.increase())}
          onDecrease={()=>store.dispatch(action.decrease())}
      />
    }
  }
```

- 但这并不是最佳的方式。最佳的方式是使用 react-redux 提供的 Provider 和 connect 方法。

# 使用 react-redux

- 首先在最外层容器中,把所有内容包裹在Provider组件中,将之前创建的store作为prop传给Provider.  

```
  const App = () => {
    return (
      <Provider store={store}>
        <Comp/>
      </Provider>  
    )
  }
```

- Provider 内的任何一个组件(比如这里的Comp), 如果需要使用state中的数据，就必须是[被connect过的]组件--使用connect方法对[你编写的组件(MyComp)]   
  进行包装后的产物  

```
class MyComp extends Component {
  // content...
}

const Comp =connect(...args)(MyComp)
```

- 可见 ,connect方法是重中之重.  

# connect 详解  

- 首先看下函数的签名:  

- connect([mapStateToProps],[mapDispatchToProps],[mergeProps],[options])  
 
- connect() 接收四个参数,他们分别是 mapStateToProps, mapDispatchToProps ， mergeProps 和 options   

- mapStateToProps(state,ownProps) : stateProps  
  这个函数允许我们将store 中的数据作为 props 绑定到组件上   

```
  const mapStateToProps = (state) =>{
    return {
      count : state.count
    }
  }
```

- 这个函数的第一个参数就是Redux的store,我们从重摘取了count属性,因为返回了具有count属性的对象,所以MyComp 会有名为count的props字段   

```
  class MyComp extends Component{
    render(){
      return <div>计数:{this.props.count}次</div>
    }
  }

  const Comp = connect(...args)(MyComp);
```

- 当然，你不必将 state中的数据原封不动地传入组件,可以根据state中的数据,动态地输出组件需要的(最小)属性.   

```
  const mapStateToProps = (state) =>{
    return {
      greaterThanFive:state.count > 5
    }
  }
```

- 函数的第二个参数 ownProps, 是 MyComp自己的Props.有的时候,ownProps 也会对其产生影响.  
  比如，当你在 store中维护了一个用户列表,而你的组件MyComp只关心一个用户(通过props中的userId体现)  

```
  const mapStateToProps = (state,ownProps) => {
    //state是 {userList:[{id:0,name:'王二'}]}
    return {
      user:_.find(state.userList,{id:ownProps.userId})
    }
  }

  class MyComp extends Component {
    static PropsTypes = {
      userId:PropsTypes.string.isRequired,
      user:PropTypes.object
    };
    render(){
      return <div>用户名:{this.props.user.name}</div>
    }
  }

  const Comp =connect(mapStateToProps)(MyComp)
```

-  当state变化，或者oweProps 变化的时候,manStateToProps都会被调用，计算出一个新的stateProps,(在与ownProps merge后) 更新给MyComp.  
-  这就是将Redux store中的数据连接到组件的基本方式。  

- mapDispatchToProps(dispatch,ownProps):dispatchProps  
- connect 的第二个参数是mapDispatchToProps,它的功能是,将action作为props绑定到MyComp上.

```
  const mapDispatchToProps = (dispatch,ownProps) => {
    return {
      increase:(...args) => dispatch(actions.increase(...args)),
      decrease:(...args) => dispatch(actions,decrease(...args))
    }
  }

  class MyComp extends Component {
    render(){
      const {count , increase , decrease} = this.props;
      return (
        <div>
          <div>计数:{this.props.count}</div>
          <button onClick={increase}>增加</button>
          <button onClick={decrease}>减少</button>
        </div>
      )
    }
  }

  const Comp = connect(mapStateToProps,mapDispatchToProps)(MyComp);

```

- 由于 mapDispatchToProps 方法返回了具有increase属性和decrease属性的对象,这两个属性也会成为 MyComp 的 props.  

- 如上所示，调用 actions.increase()只能得到一个action对象{type:'INCREASE'}, 要触发这个action必须在store上调用dispatch方法.  
  dispatch正是mapDispathcToProps的第一个参数.但是,为了不让MyComp组件感知到dispatch的存在，我们需要将increase和decrease两个函数包装一下,  
  使之成为直接可以被调用的函数(即，调用该方法就会触发dispatch).  

- Redux本身提供了 bindActionCreators函数,来将action包装成直接可被调用的函数.  

```
  import {bindActionCreators} from 'redux';

  const mapDispatchToProps = (dispatch,ownProps) => {
    return bindActionCreators({
      increase:action.increase,
      decrease:action.decrease
    });
  }
```

- 同样,当ownProps变化的时候,该函数也会被调用,生成一个新的dispatchProps,都需要和ownProps merge之后才会被赋给MyComp.  
  connect 的第三个参数就是用来做这件事.通常情况下，你可以不传这个参数，connect就会使用Object.assign替代该方法.  





