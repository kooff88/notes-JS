# DocumentFragment

DocumentFragment 接口表示一个没有父级文件的最小对象。它被当作一个轻量版的Document使用，用于存储已排好版或尚未打理好格式的  
XML 片段。最大的区别是因为DocumentFragment不是真实DOM树的一部分，它的变化不会引起DOM树的重新渲染的操作(reflow)，且不会导  致性能等问题。  

最常用的方法是使用文档片段(DocumentFragment)作为参数（例如，任何Node接口类似Node.appendChild 和 Node.insertBefore的方法），    
这种情况下被添加(append)或被插入（inserted）的是片段的所有子节点，而非片段本身。因为所有的节点会被一次插入到文档中，而这个  
操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重新渲染的操作。  

改接口在Web组件中也非常有用：模版元素在其 HTMLTemplateElement.content属性中包含了一个DocumentFragment.  

可以使用document.createDocumentFragment方法或者构造函数来创建一个空DocumentFragment。  


## 属性

该接口没有特殊的属性，其属性都是继承自Node，并补充了ParentNode接口中的属性。  

ParentNode.children(只读) 返回一个实时（live） HTMLCollection，包含所有属于DocumentFragment的元素类型的子对象。    

ParentNode.firstElementChild(只读) 返回DocumentFragment的第一个Element类型的子对象，如果没有则返回null。  

ParentNode.lastElementChild(只读)  返回DocumentFragment的最后一个Element类型的子对象，如果没有则返回null。  

ParentNode.childElementElementCount(只读)  返回一个未签名的长时间给文档片段所拥有的子数量。  

## 构造函数

DocumentFragment()  返回空的 DocumentFragment对象。  

## 方法  

改接口继承Node的全部方法，并实现了ParentNode接口中的方法。  

DocumentFragment.find()  返回DocumentFragment树里第一个匹配的元素Element。  

DocumentFragment.findAll()  返回DocumentFragment树里所有匹配的元素NodeList。  

DocumentFragment.querySelector()  返回与指定的选择器匹配的DocumentFragment中的第一个元素节点。  

DocumentFragment.querySelectorAll() 返回与指定选择器匹配的DocumentFragment中所有元素的节点烈点。  

DocumentFragment.getElmentById()  以文档顺序返回与指定ID相匹配的文档片段中的第一个元素节点。  

## 浏览器兼容性  

## 浏览器兼容性

|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|---------------------|-------- |---------------- |----------------|---------|----------|
|基本支持               |   1.0   | 1.0(1.7 or earlier)|   (yes)      |   (yes) |   (yes)  |
| querySelector() and querySelectorAll() |   1.0   |   3.5(1.9.1)  |   8.0  |   10.0  |  3.2(525.3) |
| findAll() and find()   |   未实现   |   未实现  |   未实现  |   未实现  |  未实现  |
| DocumentFragment() constructor  |  28.0 |  24.0(24.0) |   未实现  |  15.0 |  未实现  |
| ParentNode properities  |  28.0 |  25.0(25.0) |   未实现  |  15.0 |  未实现  |
| ParentNode methods |  未实现|  未实现 |   未实现  |  未实现|  未实现  |