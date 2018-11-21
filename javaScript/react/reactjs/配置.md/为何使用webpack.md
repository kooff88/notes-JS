# Webpack

假设有这样的场景：  

1. 有一个很大的单页应用，为了提高开发效率，要将这个项目拆成多个模块，开发完成后，这个项目可以正常跑了。但应为多了模块  
   是存在不同文件中的，因此加载这个单页应用时，会发出多次请求。这时我们希望能够把所有模块打包成一个文件，这样可以减少  
   请求次数，提升体验。  
2. 在开发这个单页应用中，同样是为了提高开发效率，使用了一些js和css的扩展语言，如TypeScript及Less,Stylus,这些扩展  
   是我们更简洁优雅的写代码，但是开发完成部署时，需要将它们进行相应的转换，转换成浏览器支持的语言。这时，我们希望能够  
   有个工具可以以很大的自动化程度去完成这个转换工作。  
3. 在这个单页应用开发完成后，为了提高其性能，希望做一些列处理，比如把js进行压缩。  

webpack可以满足我们上述三种场景的需求。  

## demo 

希望这个demo实现这样的效果：有一个入口页面，也就是我们访问的html页面，交互逻辑用的模块化dejs实现，最终（css也会被打包）  
会被打包到一个文件中。这样html页面只需要一个script标签引用这个打包好的js就可以。  

index.html时入口页面:

```html
<!DOCTYPE html>  
<html>  
<head>  
    <title>webpack-demo</title>  
    <link rel="stylesheet" type="text/css" href="./src/main.css">  
    <script type="text/javascript" src="./output/main.js"></script>  
</head>  
<body >  
    <div id="container">  
        <div class="button">  
            点击弹出问候  
        </div>  
    </div>  
</body>  
<script type="text/javascript">  
    var btnElement = document.getElementsByClassName('button')[0];  
    bindButtonElementEvent(btnElement);  
</script>  
</html>
```

greet.js: 

```js
/**
  弹框问候
*/

  define(function (require, exports) {  
    return function () {  
        alert('Hello, webpack!')  
    }  
}); 

```


main.js:

```js
  var greet =require('./greet.js');
  /**
  * 为按钮绑定弹框问候 
  */

  function bindButtonElementEvent(btnElement){
    btnElement.addEventListener('click', function () {  
        greet();  
    }); 
  }

window.bindButtonElementEvent = bindButtonElementEvent;  
```


配置webpack: 
在项目根目录创建名为webpack.config.js的文件

```js
  module.exports = {  
    // 入口文件路径，__dirname是根目录  
    entry: __dirname + '/src/main.js',  
    // 打包生成文件  
    output: {  
        path: __dirname + '/output',  
        filename: 'main.js'  
    },  
}
```

运行后,webpack将会根据webpack.config.js文件，将以./src/main.js为入口的模块打包，输出到./output/main.js中。这样   
index.html将会引入打包后的js文件，从未实现了相互的交互。  
