### 目录

- [webpack](#webpack)
- [sourcemap](#sourcemap)

# webpack

本质上，webpack是一个现代 JavaScript应用程序的 静态模块打包器(module bundler)。当webpack处理应用程序时,  
它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。  

- 一个常见的Webpack配置文件  

```
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  module.exports = {
    devtool:'eval-source-map', //配置生产Source Maps,选择合适的选择
    entry:__dirname + "/app/main.js",
    output:{
      path: __dirname + "/build",
      filename:"[name]-[hash].js"
    },

    module:{
      loaders: [
        {
          test:/\.json$/,
          loader:'json'
        },
        {
          test:/\.js$/,
          exclude:/node_modules/,
          loader:'babel',
          query:{
            presets:['es2015',react] //允许使用es6以及JSX语法 
          }
        },
        {
          test:/\.css$/,
          loader:ExtractTextPlugin.extract('style','css?module!postcss')
        }
      ]
    },
    postcss:[ // css预处理器
      require('autoprefixer') //调用autoprefixer插件
    ],

    plugins:[
      new HtmlWebapkPlugin({
        template: __dirname + "/app/index.tmpl.html"
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin("[name]-[hash].css")
    ],
    devServer:{
      contentBase:"./public", //本地服务器所加载的页面所在目录
      colors:true, //终端中输出结果为彩色
      historyApiFallback:true, //不跳转
      inline:true //实时刷新
    }
  }
```

# Loaders 
- :使用不同的 loader,webpack通过调用外部的脚本或工具可以对 各种各样的格式的文件进行处理  


```
  //config.json (创建带问候信息的json文件)
  {
    "greetText":"hi there and greeting from JSON"
  }
```

```
  var config = require('./config.json');

  module.exports = function(){
    var greet = document.createElement('div');
    greet.textContext = config.greetText;
    return greet;
  }
```

```
  //index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```

# Bable 
- 其实是一个编译JavaScript的平台 , 几个模块化的包  

```
  //.babelsrc
  {
    "presets":["react","es2015"]
  }
```

# 一切皆模块：  
- Webpack把所有的文件都可以当作模块处理,包括你的JavaScript代码,也包括CSS和fonts以及图片等等,  
  只有通过合适的loaders,他们都可以被当作模块处理  

# css
- webpack提供两个工具处理样式表,css-loader和style-loader,二者处理的任务不同，css-loader使你  
  能够使用类似@import和url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式  
  加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中  
 
# 插件 - Plugins
- 用来拓展Webpack功能的,它们会在整个构建过程中生效,执行相关任务  
  Loaders :是在打包构建过程中用来处理源文件(JSX,Scss,Less...),一次处理一个  
  Plugins并不直接操作单个文件，它直接对整个构建过程起作用.  

```
  ...
  plugins:[
    new webpack.BannerPlugin("Copyright Flying Unicorns inc.")
  ]
  ...
```

- HtmlWebpackPlugin  
  这个插件依据一个简单的模版m,最终生成Html5文件,这个文件中自动引用了你的大包后的js文件,  
  每次编辑都在文件名中插入一个不同的哈希值  

## sourcemap

难用 ，有七种!  

- eval : 文档解释的很明白，每个模块都封装到eval包裹起来，并在后面加 //# sourceURL  

- source-map : 这时最原始的source-map实现方式，其实现在是打包代码同时创建一个新的sourcemap文件，并在打包文件的末尾添加  
  //# sourcemap  注释行告诉JS引擎文件在哪儿  

- hidden-source-map 文档上也说了，就是sourcemap但没注释，没注释怎么找文件呢？貌似只能靠后缀，譬如  
  xx/bundle.js文件，某些引擎会尝试去找 xxx/bundle.js.map  

- inline-source-map 为每个文件添加sourcemap的DataUrl,注意这里的文件是打包前的每一个文件而不是最后打包出来的，  
  同时这个DataUrl是包含一个文件完整sourcemap信息的Base64格式化后的字符串，而不是一个url.  

- eval-source-map : 这个就是把eval的sourceURL换成了完整sourcemap信息的DataUrl  

- cheap-source-map : 不包含列信息，不包含loader的sourcemap,(譬如 babel的sourcemap)  

- cheap-module-source-map : 不包含列信息，同时loader的sourcemap也被简化为只包含对应行的。最终的sourcemap只有一份  
  它是webpack对 loader生产的sourcemap进行简化，然后再次生成的。  

webpack不仅支持这7种，而且他们还是可以任意组合的，就如文档所说，你可以设置sourcemap选项为cheap-module-inline-source-map.  

cheap-module-eval-source-map 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。  


相关解释：  

1. 大部分情况我们调试并不关心列信息，而且就算sourcemap没有列，有些浏览器引擎(例如v8)也会给出列信息，所以我们使用cheap模式可以  
  大幅度提高sourcemap生成的效率  

2. 使用eval方式可以大幅度提升构建效率，这对经常需要边改边调的前端开发而言，非常重要！  

3. 使用module可支持babel这种编译工具(在webpack里做为loader).  

4. eval-source-map使用DataUrl本身包含完整sourcemap信息，并不需要像sourceURL那样，浏览器需要发送一个完整请求  
   去获取sourcemap文件，这会略微提高点效率  

