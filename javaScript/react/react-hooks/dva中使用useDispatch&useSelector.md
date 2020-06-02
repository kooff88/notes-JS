## dva中使用useDispatch 和 useSelector


命名空间文件 `user.js`
```js
// models
import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
```


// 使用hooks文件
```js
import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';

const Home = props => {
    const dispatch = useDispatch();
    
    const loadingEffect = useSelector(state => state.loading);
    const loading = loadingEffect.effects['user/fetch']
    const user = useSelector(state => state.user.currentUser);

    console.log('use',user)

    // 发起请求
    useEffect(() => {
        dispatch({
            type:'user/fetch',
            payload:{}
        })
    },[])

    // 渲染
    if (loading) return <div>loading...</div>
    return (
      <div>{ user.name }</div>
    )

}

export default Home;


```