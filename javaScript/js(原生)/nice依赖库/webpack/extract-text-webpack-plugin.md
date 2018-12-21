# extract-text-webpack-plugin

为了让打包后样式生效，有两种方法，一种是使用style-loader自动将css代码放到生成的style标签中插入到header标签里。  
另一种，使用extract-text-webpack-plugin插件，将样式文件单独打包打包输出的文件由配置文件正的output属性指定。  
然后我们在入口HTML页面写个link标签引入这个打包够的样式文件。  

示例：

```js
	const ExtractTextPlugin = require('extract-text-webpack-plugin');

	module.exports = {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		},
		plugins: [
		    new ExtractTextPlugin("styles.css")
		]
	}

```

ps :   

 use: 只需要生么样的loader去编译文件，这里由于源文件是.css所以选择css-loader   
 fallback: 编译后用什么loader来提取css文件  
 publicfile: 用来覆盖项目路径，生成该css的文件路径  