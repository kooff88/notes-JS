# DOMImplementation

DOMImplementation 接口代表了一个对象，这个对象提供了不依赖于任何document的方法。这个对象可以通过 Document.implementation属性获得。  

## 属性 

这个接口没有特定的属性，并且也没有继承到任何属性。  

## 方法

没有继承的方法。  

DOMImplementation.createDocument()  创建并且返回一个 XMLDocument。  

DOMImplementation.createDocumentType()  创建并且返回一个 DocumentType.   

DOMImplementation.createHTMLDocument()  创建并且返回一个HTML Document. 

DOMImplementation.hasFeature()  返回一个布尔值，指定是否支持给定的特性。这个函数是不可靠的，  
仅用于兼容目的：除了与svg相关的查询，它总是返回true。旧的浏览器在行为上非常的不一致。  

## 浏览器兼容性  

|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari |
|---------------------|-------- |---------------- |----------------|---------|----------|
|基本支持               |   1.0   | 1.0(1.7 or earlier)|   6.0    |   (yes) |   (yes)  |
| createHTMLDocument()|   (yes) | 4.0(2.0)        |   9.0       |   (yes)    |  (yes)   |
| createDocument()    |   (yes)  | 1.0(1.7 or earlier) |   9.0  |   (yes)    |   (yes)  | 
| hasFeature()       |   (yes)  | 1.0(1.7 or earlier) |   6.0  |   (yes)    |   (yes)  | 
| createDocumentType()  |   (yes)  | 1.0(1.7 or earlier) |   9.0  |   (yes)    |   (yes)  | 
