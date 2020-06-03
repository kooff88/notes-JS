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

命名空间文件 `test.js`
```js
import { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export interface TestObj {
  aaa?: string;
}


export interface TestState {
    testObj?: TestObj;
}

export interface UserModelType {
  namespace: 'test';
  state: TestState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    save:Reducer<TestState>,
  };
}

const TestModel: UserModelType = {
  namespace: 'test',

  state: {
    testObj: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      console.log('responseresponse',response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        testObj: action.payload || {},
      };
    },
  },
};

export default TestModel;


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
    const testObj = useSelector(state => state.test.testObj);

    console.log('testObj',testObj)
    console.log('use',user)

    // 发起请求
    useEffect(() => {
        dispatch({
            type:'user/fetch',
            payload:{}
        })
    },[])

  /// 发起请求,调多命名空间数据
    useEffect(() => {
        dispatch({
            type:'test/save', // 可调取命名空间中，effects中方法 或者 reducers中方法
            payload:{aaaa:22}
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