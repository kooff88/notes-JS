# Attr

该类型使用对象来表示一个DOM元素的属性。在大大多数DOM方法中，你节能会直接通过字符串的方式获取属性值(例如Element.getAttribute()),  
但是一些函数(例如Element.getAttributeNode())或通过迭代器访问时则返回Attr类型。  

- EventTarget   <-------   Node  <--------   Attr  

```
Warning: 在DOM Core1,2和3中，Attr继承自Node。在DOM4有所改变，为了规范化Attr的实现，它将不再继承自Node。此项工作正在进行中,
不应该使用任何Attr对象上有关Node的属性和方法。从Gecko7.0开始(Firefox7.0/Thunderbird7.0/SeaMonkey2.4),控制台会输出这些方
法和属性将会被移除的警告信息。你应该对代码进行相应的修正。
```


## 属性

- name 只读  
  该属性的名称

- namespaceURI 只读   
  表示该属性的命名空间URIDOMString,如果该元素不在命名空间中，则返回null.  

- localName 只读  
  表示该属性的命名空间限定的本地名称DOMString.  

- prefix 只读  
  表示该属性的命名空间前缀DOMString,如果没有前缀指定则返回null.  

- specified 只读  
  该属性将返回真。如果这个属性你在源代码或者在脚本中明确指定的话，它总是返回真。否则他是由文档的DTD默认定义的，将总是返回假。  

- value  
  属性的值


## 规格

|  规格  | 状态 | 注释 |
|--------- |-------- |--------- |
|DOM| Living Standard | 加回ownerElement属性 |


## 浏览器兼容

- Desktop  

|  Feature  | Chrome | Edge     | Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|--------- |-------- |--------- |
|基本支持   |   (yes)   |   (yes)   |    (yes)       |   (yes)       |   (yes) |   (yes)  |


  


