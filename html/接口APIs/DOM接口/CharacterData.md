# CharacterData

- CharacterData抽象接口（abstract interface）代表Node对象包含的字符。这是一个抽象接口，  
  意味着没有CharacterData类型的对象。它是在其他接口中被实现的，如Text,Comment或ProcessingInstructiong  
  这些非抽象接口。  


### 属性

从其父级Node继承属性，并且实现了ChildNode和NonDocumentTypeChildNode接口。  

**CharacterData.data**  
  一个DOMString,表示该对象中包含的文本数据。  

**CharacterData.length**  
  返回一个unsigned long的表示CharacterData.data包含的字符串大小。  

**NonDocumentTypeChildNode.nextElementSibling**  
  返回其父节点所在的子节点列表（children list）中紧跟着的元素节点Element,或着null.  

**NonDocumentTypeChildNode.previousElementSibling**  
  但会其父节点所在的子节点列表（children list）中前一个元素节点Element,或者null.  


### 方法

从其父级Node继承方法，并且实现了ChildNode和NonDocumentTypeChildNode接口。    

CharacterData.appendData()  
  为CharacterData.data字符串追加指定的DOMString;当方法返回时，data包含的是已合并的DOMString.  

CharacterData.insertData()  
  在 CharacterData.data 字符串中，在指定的位置，插入指定的字符；当方法返回时，data包含的是已修改的DOMString.  

ChildNode.remove()  
  把对象从其父节点的children list中删除。  

CharacterData.replaceData()  
  在CharacterData.data字符串中，从指定位置开始，把指定数量的字符替换为指定的DOMString;  
  当方法返回时，data包含的是已修改的DOMString.  

CharacterData.substringData()  
  返回一个包含了从 CharacterData.data中的指定位置开始，指定长度的DOMString.  


## 规范

[https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData)  


## 浏览器兼容性


|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|---------------------|-------- |---------------- |----------------|---------|----------|
|基本支持               |   1.0   | 1.0(1.7 or earlier)|   6         |   (yes) |   (yes)  |
|Implements ChildNode interface.   |   ?   | 25.0 (25.0) [1]|  未实现       |   ? |   未实现    |
