# ChildNode 

- ChildNode接口包含特定于Node对象的方法，这些对象可以有一个父对象。  

ChildNode是一个原始接口，并且不能创建此类型的对象；它通过Element.DocumentType和CharacterData对象实现。  

### 属性
 没有继承来的方法和属性。  

### 方法
 没有继承的方法。  

ChildNode.remove()  
 将ChildNode从其父节点的子节点列表中移除  

ChildNode.before()  
 在其父节点的子节点列表中插入一些Node或DOMString对象。插入位置为ChildNode之前。DOMString对象会被以Text的形式插入。  

ChildNode.after()  
 在其父节点的子节点列表中插入一些Node或DOMString对象。插入位置为ChildNode之后。DOMString对象会被以Text的形式插入。  

ChildNode.replace()  
 使用一些Node或DOMString对象替换ChildNode. DOMString对象会以Text的形式插入。  


### 浏览器兼容性  

|  Feature                     | Chrome |   Edge     |Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|---------------------         |-------- |---------  |-------------- |----------------|---------|----------|
|基本支持                       |   1.0   |    (yes)  |    23(23)       |   9.0         |   10.0 |   4.0  |
| 支持DocumentType和CharacterData | 23.0 |   未实现  | 23(23)        |  未实现       |     16.0      |   未实现    |
| remove()                    | 29.0    |   (yes)   | 23(23)        |  未实现       |     16.0      |   未实现    |
| before(),after(),replaceWidth()| 54.0  |   未实现   | 49(49)        |  未实现       |     39      |   未实现    |

  

