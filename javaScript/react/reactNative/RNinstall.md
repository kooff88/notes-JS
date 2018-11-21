# 目录   搭建开发环境

[安装](#安装)
[推荐安装的工具](#推荐安装的工具)
[测试安装](#测试安装)
# 安装

- 1.必须的软件  
    ``` 
    Homebrew, Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    译注：在Max OS X 10.11（El Capitan)版本中，homebrew在安装软件时可能会碰到/usr/local目录不可写的权限问题。可以使用下面的命令修复：

    sudo chown -R `whoami` /usr/local
    ```

- 2.Node
    ```
    使用Homebrew来安装node.js

    React Native 目前需要NodeJS5.0或更高版本
    brew install node

    安装完node后建议设置npm镜像已加速后面的过程

      npm config set registry https://registry.npm.taobao.org --global
      npm config set disturl https:// npm.taobao.org/dist --global
    ```

- 3.Yarn , React Natived饿命令行工具 (react-nativr-cli)

    ```
    Yarn 是Fackbook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建，初始化，更新项目，运行打包服务(packager)等任务

    npm install -g yarn react-native-cli
    
    安装完yarn后怒同理也要设置镜像源：

    yarn config set registry https://registry.npm.taobao.org --global
    yarn config set disturl https://npm.taobao.org/dist ---global

    修复/usr/local目录的所有权 
    sudo chown -R `whaomi` /usr/local
    ```

- 4. Xcode 
     React Native 目前需要Xcode8.0或更高版本。
     虽然一般来说命令行工具都是默认安装了，但你最好还是启动Xcode，并在Xcode | Preferences | Locations菜单中检查一下是否装有某个版本的Command Line Tools。Xcode的命令行工具中也包含一些必须的工具，比如git等。


# 推荐安装的工具
-  Watchman 
  Watchman 是由Facebook 提供的见识文件系统变更的工具，安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。

  ```
  brew install watchman 
  ```

- Sublime 

   编辑器下载


# 测试安装

  ```
  reavt-native init AwesomeProject
  cd AwesomeProject
  react-native run-ios
  ```


xcode 8.3bate 错误

https://github.com/ruslanskorb/RSKImageCropper/pull/139