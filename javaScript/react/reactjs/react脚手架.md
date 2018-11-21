##一、安装最新的node.js

npm install -g n //首先安装n模块   
n stable //升级Node.js到最新稳定版   
n 5.0.0 //或者指定版本升级   
node -v //检查更新是否成功  
我自己是去重新下了一个最新版的node.js  

##二、修改npm源为淘宝源  

npm config set registry http://registry.cnpmjs.org  

加快npm下载速度，不这样做的话npm install会卡很久。  

##三、安装脚手架  

首先确保自己安装了nodejs，然后全局安装yeoman  
npm install -g yo  

然后直接安装脚手架  
npm install -g generator-reactpackage  

##四、创建React项目

在合适的地方新建一个文件夹，在文件夹下运行：  
yo reactpackage  
 
然后就会在此目录下生成以下目录结构：  
  
├── data  
│ └── test.json  
├── src  
│ ├── components  
│ │ └── App.js  
│ ├── images  
│ │ └── yeoman.png  
│ ├── styles  
│ │ └── app.scss  
│ ├── vendor  
│ │ └── jquery.js  
│ ├── views  
│ │ └── home.html  
├── node_modules  
├── index.html  
├── package.json  
└── webpack.config.js  

五、调试打包React项目  

然后使用以下命令：  
npm run dev //项目开发过程使用，启动服务，实时刷新  
npm run build //开发完成之后打包文件（js、css分开打包）  

六、测试预览项目  

本项目默认监听端口是8888，所以在浏览器输入 http://localhost:8888，或者index.html->右键打开方式->chrome 就能看到效果了  
如果执行上述命令提示错误：Error: getaddrinfo ENOTFOUND localhost，在host文件里面添加127.0.0.1 localhost即可  
监听端口和实时刷新的功能都能在webpack.config.js文件中修改配置  