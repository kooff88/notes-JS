# babel-polyfill  

几种使用方式  

## 前言  
preset与plugin的关系  

- preset中已经包含了一组用来转换ES@next的语法的插件，如果只使用少数新特性而非大多数新特性，  
  可以不使用preset而只使用对应的转换插件。  
- babel默认只转换语法，而不转换新的API，如需使用新的API，还需要使用对应的转换插件或者polyfill。  

## 1.使用转换插件:babel-plugin-transform-xxx  

- 使用方法  
   - 缺啥补啥，在package.json添加所需的依赖（非dev）babel-plugin-transform-xxx  
   - 在.babelrc中的plugins项指定使用babel-plugin-transform-xxx插件  
   - 代码中不需要显示import/require,.babelrc中需要指定useBuiltlns,webpack.config.js中不需要做   
   	 额外处理，一切由babel插件完成转换。  

- 优点  
   - 作用域是模块，避免全局冲突。  
   - 是按需引入，避免不必要引入造成及代码臃肿。  

- 缺点  
   - 每个模块内单独引用和定义polyfill函数，造成了重复定义，使代码产生冗余。  

- 附：转换插件列表（摘自babel官网）[点击进入](https://babeljs.cn/docs/plugins/)  

## 2.babel-runtime & babel-plugin-transform-runtime  
相比方法1，相当于抽离了公共模块避免了重复引入，从一个叫core.js的库中引入所需polyfill（一个外国大神用ES3写的ES5/6/7 polyfill）  

- 使用方法  
   - package中添加开发依赖babel-plugin-transform-runtime以及生产依赖babel-runtime  
   - .babelrc中指定插件："plugins":["transform-runtime"]  
   - 代码中可以直接使用ES2015+的特性，无需import/require额外东西，webpack也不需要做额外配置。  

- 优点  
   - 无全局污染  
   - 依赖统一按需引入，无重复引入，无多余引入  
   - 适合用来编写lib（第三方库）类型的代码。  

- 缺点  
   - 被polyfill的对象是临时构造并被import/require的，并不是真正挂载到全局。  
   - 由于不是全局生效，对于实例化对象的方法，如[].include(x)，依赖于Array.prototype.include扔无法使用。  

## 全局babel-polyfill(不使用useBuiltlns)  

- 使用方法  
   - 法3.1：（浏览器环境）单独在html的<head>标签中引入babel-polyfill.js（CDN或本地文件均可）  
   - 法3.2：在webpack配置文件增加入口：如entry:["babel-polyfill",'./src/app.js']，polyfill将会被打包进去，  
     记得在package.json中添加生产babel-polyfill依赖。   
   - 法3.3：在webpack入口文件顶部使用import/require引入，如import 'babel-polyfill',同时package.json添加生产  
   	 依赖babel-polyfill   

- 优点   
   - 一次性解决所有兼容性问题，而且是全局的，浏览器的console也可以使用。  

- 缺点  
   - 一次性引入了ES@next的所有polyfill,打包后的js文件会偏大。  
   - 对于现代的浏览器，有些不需要polyfill，造成流量浪费。  
   - 污染了全局对象  
   - 不适合框架或库的开发。  

## 全局babel-polyfill(使用babel-preset-env和useBuiltlns)  

- 使用方法  
   - package.json引入开发依赖babel-preset-env  
   - .babelrc中使用preset-env  
   - 指定useBuiltins选项为true  
   - 指定浏览器环境或node环境  
   - 在webpack入口文件中使用import/require引入polyfill，如import 'babel-polyfill'  

- .babelrc示例  

```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["ie >=6"]
      },
      "useBuiltIns": false,
      "debug": true
    }]
  ]
}

```

- 优点  
   - 按需（按照指定的浏览器环境所需，并非按照代码所需）引入polyfll，一定程度上减少了不必要polyfill的引入。  
   - 配置简单，无需对webpack\html做额外的配置\引入  
   - 注意：  
      - 不可与方法3混用，否则会引起冲突。  
      - 全局方式要保证polyfill在所有其他脚本之前被执行（首行import或者设置为html的第一个<head>标签）。  

