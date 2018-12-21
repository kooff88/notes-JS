# 日志中间件  redux-logger

```js
	import { applyMiddleware, createStore } from 'redux';
	import createLogger from 'redux-logger';

	const logger = createLogger();

	const store = createStore (
		reducer,
		applyMiddleware(logger)
	)

```

上面代码中，redux-logger提供一个生成器createLogger,可以生成日志中间件logger。然后，将它放在  
applyMiddleware方法中，传入createStore方法，就完成了store.dispatch的功能增强。  
