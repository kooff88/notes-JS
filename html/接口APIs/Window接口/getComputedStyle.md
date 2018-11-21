# getComputedStyle

getComputedStyle 是一个可以获取当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。  

**语法** 

> var style = window.getComputedStyle("元素","伪类")  
> 第二参数如果不是伪类 ，则写null。  

## getComputedStyle与style的区别

1. 只读和可写。  
   getComputedStyle方法是只读，只能获取样式，不能设置；而element.style能读能写，能屈能伸。  

2. 获取的对象范围。
   getComputedStyle 方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会显示默认的属性）；  
   而element.style只能获取元素style属性中的CSS样式。  
example: 光秃秃的<p>元素，getComputedStyle返回对象中length为190+，element.style就是0。  


