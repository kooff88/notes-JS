# DocumentType

DocumentType 接口 表示一个包含文档类型的节点 Node  

## 属性  

DocumentType.name(只读)  一个DOMString,例如<!DOCTYPE HTML>  

DocumentType.publicId(只读)  一个DOMString,如“-//W3C//DTD HTML 4.01//EN”, 用于HTML5的空字符串。  

DocumentType.systemId(只读)  一个DOMString,如“http://www.w3.org/TR/html4/strict.dtd, 用于HTML5的空字符串。 

## 方法

继承自父节点，Node,并实现了 ChildNode接口。  

ChildNode.remove()  从父节点的子节点的列表中移除这个对象。  

## 浏览器兼容性 

|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari | Edge |
|---------------------|-------- |---------------- |----------------|---------|----------|------|
|基本支持               |   1.0   | 1.0(1.7 or earlier)|   (yes)      |   (yes) |   (yes)  |(yes) |
| entities and notations |   1.0   |1.0 (1.7 or earlier)未实现6.0 (6.0) | ?  |   10.0  |  (yes) | ? |
| implements ChildNode  |   29.0   |   25.0(25.0)  |   未实现  |   16.0  |  未实现  |  ?    |
