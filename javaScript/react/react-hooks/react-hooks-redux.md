## react-hooks-redux 使用

```js
import React from "react";
import ReactHooksRedux from "react-hooks-redux";

/*====初始化全局状态====*/
const { Provider, store } = ReactHooksRedux({
  //创建DOM引用全局状态的提供者Provider，全局状态仓库store
  isDev: true,
  initialState: {
    name: "狗蛋",
    age: 18 /*初始化全局状态*/
  }
});
/*====初始化全局状态END====*/

/*====动作改变状态====*/
function actionAgeAdd() {
  return {
    type: "age add",
    reducer(state) {
      //执行动作返回新的状态
      return { ...state, age: state.age + 1 };
    }
  };
}

function Btn() {
  function handleAdd() {
    store.dispatch(actionAgeAdd()); //向仓库dispatch（派出）actionAgeAdd
  }
  return <button onClick={handleAdd}>点我加年龄</button>;
}
/*====动作改变状态END====*/

/*====引用全局状态====*/
function Page() {
  const state = store.useContext(); //从仓库拿到状态给state
  console.log("store", store);
  console.log("state", state);
  return (
    <div>
      <span>
        她的名字是{state.name}，她今年已经{state.age}了。
      </span>
      <Btn />
    </div>
  );
}

function App() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}
/*====引用全局状态END====*/

export default App;


```
