# vue-loader

vue-loader 是一个 webpack的 loader,可以将用下面这个格式编写的Vue组件转换为 JavaScript模块。   

特性：  

```
  1. 默认支持 ES2015
  2. 允许对 Vue组件的组成部分使用其他 Webpack loader, 比如对 <style> 使用 Sass和对 <templatge> 使用 Jade;
  3. .vue 文件中允许自定义节点，然后使用自定义的loader进行处理。  
  4. 把 <style> 和 <template> 中的静态资源当做模块来对待，并使用 webpack loader进行处理。  
  5. 对每个组件模拟出 CSS 作用域
  6. 支持开发期组件的热重载

```
简而言之，编写 Vue.js 应用程序时，组合使用 webpack和 vue-loader 能带来一个现代，灵活并且非常强大的前端工作流程。  