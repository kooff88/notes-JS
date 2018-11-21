# devServer

devServer中常用的配置对象属性如下：  

1. contentBase: './'   -- 本地服务器在哪个目录搭建页面，一般我们在当前目录即可。  
2. historyApiFallback: true    -- 当我们搭建spa应用非常有用，任意的跳转或404响应可以指向index.html页面。  
3. inline: true    -- 用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，  
   一种是inline模式。 使用iframe模式是不需要再devServer进行配置的，只需使用特定的URL格式访问即可。  
   不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server  
   时仍需要配置inline才能生效.  
4. hot: true   -- 启动webpack热加载模块替换特性，这里也是坑最多的地方.  
5. port: 端口号(默认8080)  

```js
	const path = require("path");
	const webpack = requier ("webpack");

	module.exports = {
     entyr:{
           .......  //设置入口文件
     },
     output:{
           .......  //设置出口文件
     },
     module:{
           .......  //配置loader，注意使用rules而不是loaders
     },
     plugins:[
          new webpack.HotModuleReplacementPlugin()
           .......  //注意是数组
     ],
     devServer:{
          contentBase: "./", 
      historyApiFallback:true,
      inline:true,
      hot:true
     }                
}

```

另外，还有一点值得注意的就是，webpack-dev-server所使用的bundle.js文件并不是webpack.config.js中output打包  
生产的bundle.js，而是webpack-dev-server自己打包生成的,这个文件不存在与output或其他路径中，而是存到了内存  
中，事实上webpack-dev-server所使用的那个bundle.js我们是看不到的！。  
