# babel-plugin-import 实现antd组件库中的组件按需加载


Ant Design是蚂蚁金服基于react实现的一个UI设计库，基于npm + webpack +babel 的工作流，支持ES2015。  
而babel-plugin-import 可以从组件库中仅仅引入需要的模块，而不是把整个库都引入，从而提高性能。  

如果使用import { Button } from 'antd'; 的写法会引入antd下所有的模块。  

为了提高打包编译的速度和浏览器下载资源的速度，可以通过以下的写法来只加载需要的组件：  

```
import Button from 'antd/lib/button';  
import 'antd/lib/button/style';

```


更好的办法是使用babel,用 babel-plugin-import 来实现同样的按需加载效果： 

1. 安装插件 npm i babel-plugin-import --save-dev

2. 修改.babelrc文件，在plugins节点下，添加下面这个配置项：  

```
 "plugins": ["transform-runtime", [ "import", { "libraryName": "antd", "style": true } ]]
```

现在插件会帮你转换成 antd/lib/xxx的写法了，同事因为设置了style属性，模块样式也可以按需自动加载，  
不需要手动添加css或者less文件了。  

所以只需要这样写：  

> import { Button } from 'antd';  
