# url-loader

页面图片较多，会发很多http请求，会降低页面性能，可通过url-loader解决。url-loader会将引入的图片编码，生成dataURI。  
相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，  
编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURI，大于limit的还会使用  
file-loader进行copy。  

url-loader封装了file-loader，但不依赖于file-loader。   


## loader中的参数

```js
  module.exports = {  
    // 入口文件路径，__dirname是根目录  
    entry: __dirname + '/src/main.js',  
    // 打包生成文件  
    output: {  
        path: __dirname + '/output',  
        filename: 'main.js'  
    },  
  
    module: {  
        rules: [  
            {  
                test: /\.css$/,  
                use: ['style-loader', 'css-loader']  
            },  
            {  
                test: /\.jpeg$/,  
                use: [  
                    {  
                        loader: 'url-loader',  
                        options: {  
                            limit: '1024'  
                        }  
                    },  
                ]  
            }  
        ]  
    }  
}

```

url-loader的配置中options属性表示的就是url-loader的参数，等价的写法：  

```
{
  test: /\.jpeg$/,
  use: 'url-loader?limit=1024'
}
```

示例：

```js
module.exports = {  
    // 入口文件路径，__dirname是根目录  
    entry: __dirname + '/src/main.js',  
    // 打包生成文件  
    output: {  
        path: __dirname + '/output',  
        filename: 'main.js'  
    },  
  
    module: {  
        rules: [  
            {  
                test: /\.css$/,  
                use: ['style-loader', 'css-loader']  
            },  
            {  
                test: /\.jpeg$/,  
                use:'url-loader?limit=1024&name=[path][name].[ext]&outputPath=img/&publicPath=output/',
            }  
        ]  
    }  
} 
```

其中解释三个参数：name,outputPath,publicPath

name表示输出的文件名规则，如果不添加这个擦数，输出的就是默认值：文件哈希。加上[path]表示输出文件的相对路径与当前文件  
相对路径相同，加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。加上[path]这个参数后，打包文件中引用文件的路径  
也会加上这个相对路径。  

outputPath表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹  
下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。   

publicPath表示打包文件中引用文件的路径前缀，如果你的图片存放在CDSN上，那么你上线时可以加上这个参数，值为CDN地址，这样  
就可以让项目上线后的资源引用路径指向CDN了。  



