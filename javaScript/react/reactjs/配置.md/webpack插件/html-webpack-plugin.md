# html-webpack-plugin

该插件可以简化创建调用webpack bundles的html文件。在每次编译后，文件名会包含有hash值的bundles特别有用。  
你可以让插件为您生成一个HTML文件，也可以提供您自己使用lidash模版的模版，或是用您自己的装载机。 

## 基本配置

该插件将为您生成一个HTML5文件，这个文件用script标签引用所有的webpack包。只需要将插件添加到您的webpack配置，如下：  

```js
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var webpackConfig = {
    entry: 'index.js',
    output: {
      path: 'dist',
      filename: 'index_bundle.js'
    },
    plugins: [ new HtmlWebpackPlugin()]
  }

```


这样就会生成一个文件 dist/index.html,如下： 

```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Webpack App</title>
    </head>
    <body>
      <script src="index_bundle.js"></script>
    </body>
  </html>
```

如果您有多个webpack入口点，他们都将包括在生成的HTML文件script标签中。  
如果你有用webpack产出css文件（例如用ExtractTextPlugin提取的css文件），那么html-webpack-plugin会在html的head中  
插入link标签引入这些css文件。  

## 完整配置

你可以穿一个配置选项的散列到 HtmlWebpackPlugin，允许的值如下：

```
  title: 用于生成的HTML文件的标题。  
  filename: 用于生成HTML文件的名称，默认是index.html。你可以在这里指定子目录（例如：assets/admin.html）
  template: 模板的路径。支持加载器，例如 html!./index.html。
  inject: true/ 'head' / 'body' / false。把所有产出文件注入到给定的template或templateContent。当传入
          true或者'body'时所有javascript资源将被放置在body元素的底部，'head'则会放在head元素内。  
  favicon: 给定的图标路径，可将其添加到输出html中。  
  minify: {...}/false。传一个html-minifier配置object来压缩输出。  
  hash: true/false。如果是true,会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用
  cache: true/false。 如果传入true(默认)，只有在文件变化时才发送（emit）文件。
  showErrors: true/false。如果传入true（默认）。错误信息将写入html页面。  
  chunks: 只允许你添加chunks。（例如：只有单元测试块）。
  chunksSortMode: 在chunk被插入到html之前，你可以控制它们的排序。允许的值
                  'none'/'auto'/'dependency'/{function}默认为'auto'
  excludeChunks: 允许你跳过一些chunks（例如，不要单元测试的chunk）。
  xhtml: 用于生成的HTML文件的标题。  

```

下面是一个示例：  

```js
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    })
  ]
}
```


## 生成多个html文件 

生成多个html文件，多次声明这个插件在plugins数组中。如下：

```js
  {
    entry: 'index.js',
    output: {
      path: 'dist',
      filename: 'index_bundle.js'
    },
    plugins: {
      new HtmlWebpackPlugin(), // 生成默认 index.html
      new HtmlWebpackPlugin({  // 生成test.html文件
        filename: 'text.html',
        template: 'src/assets/test.html'
      })
    }
  }

```


## 自定义模版

如果默认生成的HTML不能满足你的需求，你可以自己写模版。 最简单的方法是使用插入选项，并传入一个自定义的html文件。  
html-webpack-plugin将自动注入所需的css，js，manifest和favicon到标签中。  

```js
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template:'my-index.ejs',
      inject: 'body'
    })
  ]
```

my-index.ejs:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

如果你已经有模板的loader，你可以用它来解析模板。请注意，如果您指定html-loader并且用了.html文件作为模板，它也会发生。  

```
module: {
  loaders:[
    {test: /\.hbs/, loader: 'handlebars'}
  ]
},

plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template using Handlebars',
    template: 'my-index.hbs'
  })
]
```

htmlWebpackPlugin:这个插件的特定数据   
htmlWebpackPlugin.files 它包含一个从入口点名称映射到包的文件名   

```js
  "htmlWebpackPlugin": { 
    "files": { 
      "css": [ "main.css" ], 
      "js": [ "assets/head_bundle.js", "assets/main_bundle.js"], 
      "chunks": { 
        "head": { 
          "entry": "assets/head_bundle.js", 
          "css": [ "main.css" ] 
        }, 
        "main": { 
          "entry": "assets/main_bundle.js", 
          "css": [] 
        }, 
      } 
    } 
  } 

```


如果你在webpack配置文件中设置了publicPath。htmlWebpackPlugin.files将会正确映射到资源散列。  
htmlWebpackPlugin.options:传给插件的配置项。除了插件本身使用这个些配置项外，你也可以在模板中使用这些配置项。  
webpack: webpack的统计对象。注意：这是stats对象，因为它是在HTML模板时发出，因此webpack运行完成后可能没有完整的  
数据集可用。  
webpackConfig: 插件编译用的webpack配置项。例如它可以用来获取publicPath(webpackConfig.output.publicPath)。  

## 过滤Filtering chunks

只包括某些模块(chunk),你可以限制这些模块的使用。  

```js
  new HtmlWebpackPlugin({
    chunks:['app']
  })
```

通过excludeChunks选项还可以排除某些块：

```js
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ['dev-helper']
    })
  ]
```

## 事件

允许其他插件篡改这个插件执行的方法：  

1. html-webpack-plugin-before-html-generation  
2. html-webpack-plugin-before-html-processing  
3. html-webpack-plugin-after-html-processing  
4. html-webpack-plugin-after-emit  

用法：  

```js
  function MyPlugin(options){
    // ...
  }

  MyPlugin.prototype.apply = function(compiler){
    // ..

    compiler.plugin('compilation', function(compilation){
      console.log('The compiler is starting a new compilation...');
    
      compilation.plugin('html-webpack-plugin-before-html-processing',function(htmlPluginData,callback){
        htmlPluginData.html += 'The magic footer';
        callback(null,htmlPluginData);
      });
    });
  };


module.exports = MyPlugin;

```

然后在webpack.config.js中这样写:  

```
plugins:[
  new MyPlugin({ options:'' })
]
```

 