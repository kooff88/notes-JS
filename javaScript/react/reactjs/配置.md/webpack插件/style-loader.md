# style-loader

webpack可以把以指定入口的一系列相互依赖的模块打包成一个文件，这里的模块指的不只是js，也可以是css。也就是说，   
当你用CommonJs规范去引用css文件时，webpack会把你引用的css文件也打包到最终的生成文件中里。  
两种引入方式：   
  1. 在引入css时，在最后生成的js文件中进行处理，动态创建style标签，塞到head标签里。这样html页面引用这个js文件时，就可以让样式生效了。  
  2. 打包时把css文件拆出来，css相关模块最终打包到一个指定的css文件中，我们手动用link标签去引入这个css文件就可以了。

## 示例

```js
  module.exports = {  
  
    entry: __dirname + '/src/main.js',  
  
    output: {  
        path: __dirname + '/output',  
        filename: 'main.js'  
    },  
  
    module: {  
        loaders: [  
            {  
                test: /\.css$/,  
                use:['style-loader', 'css-loader']
            }  
        ]  
    }  
} 

```


css-loader和style-loader作用？  

css-loader使你能够使用类似@import和url(...) 的方法实现require的功能，style-loader将所有的计算后的样式加入页面中，  
二者组合在一起使你能够把样式表嵌入webpack打包后的js文件中。  

因此，我们这样配置后，遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到"@import"等语句就将相应  
样式文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成一个内容为最终  
解析完的代码的style标签，放到head标签里。  

注意 loader有顺序。  style-loader在css-loader前。 (webpack loader的执行顺序时从右到左)。 