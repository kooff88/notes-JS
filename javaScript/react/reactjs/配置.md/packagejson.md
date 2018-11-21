# package.json 

-[peerDependences](#peerDependences)  

## peerDependences

1. 应用运行依赖的宿主包。典型的就是插件，本身不包含运行环境，需要使用它的项目安装环境即可。  
2. 用来供插件指定其所需要的主工具的版本。    


```json
{
  "name":"chai-as-promised",
  "peerDependences":{
    "chai": "1.x"
  }
}
```

上面代码指定，安装chai-as-promised模块时，主程序chai必须一起安装，而且chai的版本必须时1.x。如果你的项目指定的依赖是chai的2.0版本，就会报错。  

注意从3.0版开始，peerDependences不再默认安装了。
