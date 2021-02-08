## router路由

路由(routing) 是指 分组从源到目的地时，决定端到端路径的网络范围的进程。

我们这里使用 Hooks API 来创建 App 组件的自身状态。UI 代表了当前显示的是哪个组件的名字。



我们先用 url 里的 hash 做尝试：
```js
function Login(){
	return <div>Register</div>
}

function Register(){
	return <div>Login</div>
}

function App(){

	  // 进入页面时，先初始化当前 url 对应的组件名
  let hash = window.location.hash
   let initUI = hash === '#login' ? 'login' : 'register'


	let [ UI, setUI ] = useState('Login');

	let onClickLogin = () => {
    setUI('Login');
		window.location.hash = 'login'

  }
  let onClickRegister = () => {
    setUI('Register') 
		window.location.hash = 'register'
  }

	let showUI = () => {
    switch(UI) {
      case 'Login':
        return <Login/>
      case 'Register':
        return <Register/>
    }
  }

	return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}

```

如果我在地址栏里输入 localhost:8080/#login，就会显示 <Login/>;

### 使用 pathname 切换

```js

function App() {
  // 进入页面时，先初始化当前 url 对应的组件名
  let pathname = window.location.pathname
  let initUI = pathname === '/login' ? 'login' : 'register'

  let [UI, setUI] = useState(initUI);
  let onClickLogin = () => {
    setUI('Login')
    window.location.pathname = 'login'
  }
  let onClickRegister = () => {
    setUI('Register') 
    window.location.pathname = 'register'
  }
  let showUI = () => {
    switch(UI) {
      case 'Login':
        return <Login/>
      case 'Register':
        return <Register/>
    }
  }
  return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}
```

但是这里有个问题，每次修改 pathname 的时候页面会刷新，这是完全不符合我们的要求的，还不如用 hash 好。

### 使用 history 切换

幸运的是 H5 提供了一个好用的 history API，使用 window.history.pushState() 使得我们即可以修改 url 也可以不刷新页面，一举两得。

```js
function App() {
  // 进入页面时，先初始化当前 url 对应的组件名
  let pathname = window.location.pathname
  let initUI = pathname === '/login' ? 'login' : 'register'

  let [UI, setUI] = useState(initUI);
  let onClickLogin = () => {
    setUI('Login')
    window.history.pushState(null, '', '/login')
  }
  let onClickRegister = () => {
    setUI('Register') 
    window.history.pushState(null, '', '/register')
  }
  let showUI = () => {
    switch(UI) {
      case 'Login':
        return <Login/>
      case 'Register':
        return <Register/>
    }
  }
  return (
    <div className="App">
      <button onClick={onClickLogin}>Login</button>
      <button onClick={onClickRegister}>Register</button>
      <div>
          {showUI()}
      </div>
    </div>
  );
}
```

当然这个 Router 功能不多，不过这就是 Vue Router 和 React Router 的思想，他们是基于此来开发更多的功能而已。