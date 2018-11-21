# DOMTokenList

DOMTokenList 接口表示一组空格分隔的符号(tokens)。如由Element.classList、HTMLLinkElement.relList、HTMLAnchorElment.relList或HTMLAreaElement.relList返回的一组值。  
它和JavaScript Array对象一样，索引从0开始。DOMTokenList总是区分大小写(case-senditive)。  

## 属性

该接口没有继承任何属性。    

DOMTokenList.length(只读)  一个整数，表示存储在该对象里值的个数。  

## 方法

该接口没有继承任何方法。  

DOMTokenList.item()  根据传入的索引值返回一个值，如果索引值大于等于符号列表的长度（length），则返回undefined。  

DOMTokenList.contains()  如果DOMTokenList列表中包括相应的字符串，则返回true,否则返回false。 

DOMTokenList.add()  添加一个符号（token）到DOMTokebList列表中。  

DOMTokenList.remove()  从DOMTokenList列表中移除一个符号（token）。

DOMTolenList.toggle()  从DOMTokenList字符串中移除符号字符串（token），并返回false。如果传入的符号字符串（token）  
不存在，则将其添加进去，并返回true。  

