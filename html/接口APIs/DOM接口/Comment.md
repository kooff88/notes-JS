# Comment

-  Comment接口代表标签(markup)之前的文本符号(textual notations)。 尽管它通常不显示出来，但在产看源码里可以看到。  
  在HTML和XML里，注释(Comments)为 '<!--' 和 '-->'之间的内容。在XML里，字符序列 '--'不能用于一个注释中。  

## 属性

- 该接口没有特点的属性，但是从其父类(its parent),CharacterData继承，以及间接从Node继承。  

## 构造函数（）

- 文本内容作为参数，返回一个commnet对象。  

##  方法

- 该接口没有特定的方法，但是从其父类(its parent),CharacterData继承，以及间接从Node继承。  


## 浏览器兼容性

|  Feature            | Chrome |  Firefox(Gecko) | Internet Explorer | Opera | Safari | 
|---------------------|-------- |---------------- |----------------|---------|----------|
|基本支持               |   1.0   | 1.0(1.7 or earlier)|   (yes)      |   (yes) |   (yes)  |
| Comment() constructor |   ?   | 24.0 (24.0)      |  未实现       |   ?    |  ?    |

