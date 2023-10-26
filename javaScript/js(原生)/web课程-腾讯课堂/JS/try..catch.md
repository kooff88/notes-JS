## try catch

```js
// 防止我们报错
// 在try里面的发生错误，不会执行错误后面的try里面的代码
try{
  console.log('a');
  console.log(b);
  console.log('a1');

}catch(e){
  // e.messge,  e.name
  console.log(e);


  /**
   * e.name 的六种值对应的信息
   * 
   * 1. EvaError: eval()的使用与定义不一致
   * 
   * 2. RangeError: 数值越界
   * 
   * 3. ReferenceError: 非法或不能识别的引用数值
   * 
   * 4. SyntaxError: 发生语法解析错误
   * 
   * 5. TypeError: 操作数类型错误
   * 
   * 6. URIError: URI 处理函数使用不当
  */
}

console.log('d')

```

```js

 var obj = {
   name: 'obj'
 }

 var name = 'window';

 function test(){
  var name = 'scope'

// with 将传入的obj当 AO - 执行期上下文
  with(obj){
    console.log(name)
  }
 }

test();

```

```
'use strict'

1. 不再兼容 es3的一些不规则语法。使用全新的 es5规范

2. 两种语法： 
    全局严格模式
    局部函数内严格模式(推荐)

3. 就是一行字符串，不会对不兼容严格模式的浏览器产生影响。

4. 不支持 with, arguments.callee, func.caller, 变量赋值前必须声明，必须被赋值( Person.call(null/undefined)赋值声明就是什么)
    拒绝重复性和参数

```