# 目录 各种sdk

- [cookie-parser](#cookie-parser)
- [morgan](#morgan)
- [dotenv](#dotenv)
- [chalk](#chalk)
- [connect-history-api-fallback](#connect-history-api-fallback)
- [http-proxy-middleware](#http-proxy-middleware)
- [detect-port](#detect-port)
- [react-dev-utils](#react-dev-utils)
- [extract-text-webpack-plugin](#extract-text-webpack-plugin)
- [promise](#promise)
- [object-assign](#object-assign)
- [react-cropper](#react-cropper)
- [loading-cli](#loading-cli)
- [bodyParser](#bodyParser)
- [cross-evn安装&使用](#cross-evn安装&使用)
- [jsonwebtoken](#jsonwebtoken)
- [req.session.regenerate](#reqreq.session.regenerate)
- [classnames](#classnames)
- [react-slick](#react-slick)
- [react-transition-group](#react-transition-group)
- [multer](#multer)
- [react-thunk](#react-thunk)
- [async-validator](#async-validator)
- [object-assign](#object-assign)
- [hotkeys-js](#hotkeys-js)
- [express-sessions](#express-sessions)


# cookie-parser

- 这个插件通常当作中间件使用，app.use(cookieParser()), 这样就可以处理每一个请求的cookie。  

cookie-parser的主函数cookiePaser。  
```
  exports =module.exports = function.cookieParser(secret,options){
    return function cookieParser(req,res,next){ //从请求中得到req,res对象
      if(req.cookies) return next(); //如果已经有cookie对象，则推出中间件继续运行
      var cookies = req.headers.cookie;//从headers中取cookie

      req.secret = secret; //如果有传入secret,则设置到req对象
      req.cookies = Object.create(null) //创建空对象给req.cookies
      req.signedCookies = Object.create(null) //创建空对象给req.signedCookies

      //no cookies
      if(!coolies){ //如果没有从headers得到cookies
        return next()//退出中间件继续运行
      }

      req.cookies = cookies.parse(cookies,options); //调用cookies的parse方便把cookies字符串转换成cookies对象.

      // parse signed cookies
      if(secret){
        req.signedCookies = parse.signedCookies(req.cookies,secret);
        req.signedCookies = parse.JSONCookies(req.signedCookies);
      }

      //parse JSON cookies
      req.cookies = parse.JSONCookies(req.cookies); //把req.cookies对象转化

      next();
    }
  }


```

# morgan

(http://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html)

- 是express默认的日志中间件，也可以脱离express,作为node.js的日志组件单独使用  

```
  核心API 
  morgan(),作用是返回一个express日志中间件

  morgan(format,options)

  参数说明：
    1. format:可选，morgan与定义了几种日志格式，每种格式都有对应的名称，比如combined,short等，默认是default.
    2. options:可选，配置项，包含stream(常用),skip,immediate
    3. stream:日志输出流配置，默认时process.stdout
    4. skip:是否跳过日志记录。
    5. immediate:布尔值，默认是false。当为true时，一收到请求，就记录日志；如果为false,则在请求返回后，再记录日志

  自定义日志格式
  首先搞清楚morgan中两个概念：format跟token.
    format:日志格式，本质是代表日志格式的字符串，比如 :method :url :status :res[content-length] - :response-time ms
    token: format的组成部分，比如上面的:method  ,  :url即所谓的token 

  日志格式关键API
    * morgan.format(name,format); //自定义日志格式
    * morgan.token(name,fn); //自定义token

  自定义format
  首先通过morgan.format()定义名为joke的日志格式，然后通过morgan('joke')调用即可.

    var express = require('express');
    var app = express();
    var morgan = require('morgan');
    morgan.format('joke','[joke] : method :url :status');

    app.use(morganp('joke'));

    app.use(function(req,res,next){
      res.send('OK');
    })

    app.listen(3000);

  上面代码运行结果：

    ➜  2016.12.11-advanced-morgan git:(master) ✗ node morgan.format.js
    [joke] GET / 304
    [joke] GET /favicon.ico 200

  自定义token
  通过morgan.token()自定义token,然后将自定义的token,加入自定义的format中即可  

    var express = require('express');
    var app = express();
    var morgan = require('morgan');  
    //自定义token 
    morgan.token('from',function(req,res){
      return req.query.from || '-'
    })

    // 自定义format，其中包含自定义的token
    morgan.format('joke', '[joke] :method :url :status :from');

    // 使用自定义的format
    app.use(morgan('joke'));

    app.use(function(req, res, next){
        res.send('ok');
    });

    app.listen(3000);

  运行程序，并在浏览器里先后访问 http://127.0.0.1:3000/hello?from=app 和 http://127.0.0.1:3000/hello?from=pc
  
    ➜  2016.12.11-advanced-morgan git:(master) ✗ node morgan.token.js 
    [joke] GET /hello?from=app 200 app
    [joke] GET /favicon.ico 304 -
    [joke] GET /hello?from=pc 200 pc
    [joke] GET /favicon.ico 304 -  
```


# dotenv

- 加载环境变量  
```
npm install dotenv --save

DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3

...

var db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

## chalk

- 样式处理sdk

```
$ npm install --save chalk

console.log(chalk.blue('Hello world!'));
console.log(chalk.blue('Hello') + 'World' + chalk.red('!'));

console.log(chalk.blue.bgRed.bold('Hello world!'));

console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

console.log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

console.log(chalk.green(
  'I am a green line ' +
  chalk.blue.underline.bold('with a blue substring') +
  ' that becomes green again!'
));

console.log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

const chalk = require('chalk');
const error = chalk.bold.red;
console.log(error('Error!'));
```

## connect-history-api-fallback
- 单页面路由处理更自然

```
npm install --save connect-history-api-fallback


var history = require('connect-history-api-fallback');


var connect = require('connect');
var app = connect()
  .use(history())
  .listen(3000);



var express = require('express');
var app = express();
app.use(history());
```

## http-proxy-middleware

- http-proxy-middleware 是一套 Node.js 代理中间件 for connect, express 和 browser-sync。

```
var proxy = require('http-proxy-middleware');
 
var apiProxy = proxy('/api', {target: 'http://www.example.org'});

var apiProxy = proxy('http://www.example.org/api');

```

## detect-port

- 测试端口是否被占用  

```
  $ npm i detect-port --save
  const detect = require('detect-port');

  detect(port, (err, _port) => {
    if (err) {
      console.log(err);
    }
   
    if (port == _port) {
      console.log(`port: ${port} was not occupied`);
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`);
    }
  });
```

## react-dev-utils

- webpack2插件 ,清理屏幕  

```
   var clearConsole = require('react-dev-utils/clearConsole');
   clearConsole();
   console.log('Just cleared the screen!');
```

```
  var path = require('path');
  var checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

  if (!checkRequiredFiles([
    path.resolve('public/index.html'),
    path.resolve('src/index.js')
  ])) {
    process.exit(1);
  }
```

```
var webpack = require('webpack');
var config = require('../config/webpack.config.dev');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
 
var compiler = webpack(config);
 
compiler.plugin('invalid', function() {
  console.log('Compiling...');
});
 
compiler.plugin('done', function(stats) {
  var rawMessages = stats.toJson({}, true);
  var messages = formatWebpackMessages(rawMessages);
  if (!messages.errors.length && !messages.warnings.length) {
    console.log('Compiled successfully!');
  }
  if (messages.errors.length) {
    console.log('Failed to compile.');
    messages.errors.forEach(e => console.log(e));
    return;
  }
  if (messages.warnings.length) {
    console.log('Compiled with warnings.');
    messages.warnings.forEach(w => console.log(w));
  }
});  

```

```
var getProcessForPort = require('react-dev-utils/getProcessForPort');
 
getProcessForPort(3000);

```

```
var path = require('path');
var openBrowser = require('react-dev-utils/openBrowser');

if (openBrowser('http://localhost:3000')) {
  console.log('The browser tab has been opened!');
}
```

```
var path = require('path');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

// Webpack config
module.exports = {
  // ...
  plugins: [
    // ...
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules'))
  ],
  // ...
}
```

```
var path = require('path');
var HtmlWebpackPlugin = require('html-dev-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// Webpack config
var publicUrl = '/my-custom-url';

module.exports = {
  output: {
    // ...
    publicPath: publicUrl + '/' 
  },
  // ...
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
      // You can pass any key-value pairs, this was just an example.
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    // ...
  ],
  // ...
}
```



##extract-text-webpack-plugin

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary 
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
    //if you want to pass in options, you can do so: 
    //new ExtractTextPlugin({ 
    //  filename: 'style.css' 
    //}) 
  ]
}
```

## promise

- $ npm install promise

```
var Promise = require('promise');
 
var promise = new Promise(function (resolve, reject) {
  get('http://www.google.com', function (err, res) {
    if (err) reject(err);
    else resolve(res);
  });
});

```

```
var Promise = require('promise/setimmediate');
```

```
var Promise = require('promise/lib/es6-extensions');
```



## object-assign

```
$ npm install --save object-assign


const objectAssign = require('object-assign');
 
objectAssign({foo: 0}, {bar: 1});
//=> {foo: 0, bar: 1} 
 
// multiple sources 
objectAssign({foo: 0}, {bar: 1}, {baz: 2});
//=> {foo: 0, bar: 1, baz: 2} 
 
// overwrites equal keys 
objectAssign({foo: 0}, {foo: 1}, {foo: 2});
//=> {foo: 2} 
 
// ignores null and undefined sources 
objectAssign({foo: 0}, null, {bar: 1}, undefined);
//=> {foo: 0, bar: 1} 
```

# react-cropper
- 图片修剪

```
  import React, {Component} from 'react';
  import Cropper from 'react-cropper';
  import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
  // If you choose not to use import, you need to assign Cropper to default
  // var Cropper = require('react-cropper').default

  class Demo extends Component {
    _crop(){
      // image in dataUrl
      console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    render() {
      return (
        <Cropper
          ref='cropper'
          src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
          style={{height: 400, width: '100%'}}
          // Cropper.js options
          aspectRatio={16 / 9}
          guides={false}
          crop={this._crop.bind(this)} />
      );
    }
  }
```

# loading-cli
- 加载中动画

```
  var loading =  require('loading-cli');
  var load = loading("loading text!!")
   
  load.start()
   
  setTimeout(function(){
      load.color = 'yellow';
      load.text = ' Loading rainbows';
  },2000)
   
  // stop 
  setTimeout(function(){
      load.stop()
  },3000)
```


# bodyParser

```
- bodyParser.json(options)
  options可选 ， 这个方法返回一个仅仅用来解析json格式的中间件。这个中间件能接受任何body中任何Unicode编码的字符。支持自动的解析gzip和 zlib
- bodyParser.urlencoded(options)
  options可选，这个方法也返回一个中间件，这个中间件用来解析body中的urlencoded字符， 只支持utf-8的编码的字符。同样也支持自动的解析gzip和 zlib。
```


# cross-evn安装&使用

- 这个迷你的包能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。   
  在NODE_ENV=xxxxxxx前面添加cross-env就可以了。   

  ```例子
  "scripts": {
    "development": "cross-env NODE_ENV=development node ./bin/aaa",
  },
  ```

# jsonwebtoken

```
  var JWT = require('jsonwebtoken');

  exports.generateToken = function(key){
    var payload = key || Date.now();
    return JWT.sign(payload,Date.now() + "")
  }

  var aa = this.generateToken()
  console.log('aa',aa)
```

# req.session.regenerate

```
  req.session.regenerate(function(){ 
      req.session.captcha = captcha.text;
      req.session.save();                      //保存一下修改后的Session
      req.set('Content-Type','image/svg+xml'); //在html中动态插入 svg +xml格式文件
      res.status(200).send(captcha.text);      //何种状态下发送什么信息
  })
```


#classnames
- className 处理工具  

```
/* components/submit-button.js */
import { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './submit-button.css';
 
let cx = classNames.bind(styles);
 
export default class SubmitButton extends Component {
  render () {
    let text = this.props.store.submissionInProgress ? 'Processing...' : 'Submit';
    let className = cx({
      base: true,
      inProgress: this.props.store.submissionInProgress,
      error: this.props.store.errorOccurred,
      disabled: this.props.form.valid,
    });
    return <button className={className}>{text}</button>;
  }
};
```

# react-slick

[react-slick](https://github.com/akiran/react-slick)

- 轮播图的包  

- 安装:  

>> npm install react-slick

Also install slick-carousel for css and font 

>> npm install slick-carousel
@import "~slick-carousel/slick/slick.css";
@import "~slick-carousel/slick/slick-theme.css";

or add cdn link in your html

```
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
```

Example 

```
var React = require('react');
var Slider = require('react-slick');

class SimpleSlider extends React.Component {
  render: function () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
        <div><h3>5</h3></div>
        <div><h3>6</h3></div>
      </Slider>
    );
  }
}
```

## react-transition-group

- 过渡动画

```
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm A fade Transition!
      </div>
    )}
  </Transition>
);
```

# multer

- 图片上传模块(node)  

```
单图上传
  
  /* app.js
    var fs = require('fs');
    var express = require('express');
    var multer  = require('multer')

    var app = express();
    var upload = multer({dest:'upload/'})

    //单图上传

    app.post('/upload',upload.single('logo'),function(req,res,next){
      res.send({ret_code:'0'})
    })

    app.get('/form',function(req,res,next){
      var form = fs.readFileSync('./form.html',{encoding:'utf8'})
      res.send(form)
    });

    app.listen(3000);
  */

  /* form.html
    <form action="/upload-single" method="post" enctype="multipart/form-data">
      <h2>单图上传</h2>
      <input type="file" name="logo">
      <input type="submit" value="提交">
    </form>
  */

```

## react-thunk

```
  源码:

  function createThunkMiddleware(extraArgument){
    return ({ dispatch,getState }) => next => action => {
      if (typeof action==='function'){
        return action(dispatch,getState,extraArgument)
      }

      return next(action);
    }
  }

  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;

  export default thunk;

```

上 是redux-thunk所有的源代码，默认情况下redux只能dispatch一个plain object,例如  

```
  dispatch ({
    type:'SOME_ACTION_TYPE',
    data : 'xxxx'
  })
```

使用redux-thunk之后，可以dispatch一个函数了，这个函数会接受dispatch,getState作为参数，在这个函数里尼就可以干  
你想干的事情，在任何地方随意dispatch了，例如下面这个ajax请求:  

```
  dispatch(function(dispatch){
    $.get('/api/users',function(users){
      dispatch({
        type:"FETCH_USERS_SUCCESS",
        users:users
      })
    })
  })
```


## async-validator
- 验证包 

```
var schema = require('async-validator');
var descriptor = {
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);
validator.validate({name: "muji"}, (errors, fields) => {
  if(errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    return handleErrors(errors, fields);
  }
  // validation passed
});
```

## object-assign

```
const objectAssign = require('object-assign');
 
objectAssign({foo: 0}, {bar: 1});
//=> {foo: 0, bar: 1} 
 
// multiple sources 
objectAssign({foo: 0}, {bar: 1}, {baz: 2});
//=> {foo: 0, bar: 1, baz: 2} 
 
// overwrites equal keys 
objectAssign({foo: 0}, {foo: 1}, {foo: 2});
//=> {foo: 2} 
 
// ignores null and undefined sources 
objectAssign({foo: 0}, null, {bar: 1}, undefined);
//=> {foo: 0, bar: 1}
```

## hotkeys-js

设置快捷键  

react 使用   

```
import React, { Component } from 'react';
import Hotkeys from 'react-hot-keys';
 
export default class HotkeysDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'Hello, I am a component that listens to keydown and keyup of a',
    }
  }
  onKeyUp(keyName, e, handle) {
    console.log("test:onKeyUp", e, handle)
    this.setState({
      output: `onKeyUp ${keyName}`,
    });
  }
  onKeyDown(keyName, e, handle) {
    console.log("test:onKeyDown", keyName, e, handle)
    this.setState({
      output: `onKeyDown ${keyName}`,
    });
  }
  render() {
    return (
      <Hotkeys 
        keyName="shift+a,alt+s" 
        onKeyDown={this.onKeyDown.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)}
      >
        <div style={{ padding: "50px" }}>
          {this.state.output}
        </div>
      </Hotkeys>
    )
  }
}
```

## express-sessions

```
  app.use(express.session({
    secret:'a4f8071f-c873-4447-8ee2',
    cookie:{maxAge:2628000000},
    resave: false,
    saveUninitialized: true,
  }))
```
