# DOM

## 文档对象模型 (DOM)  
  将web页连接到脚本或编程语言。 通常这意味着javascript,但将HTML,SVG或XML文档建模为对象不是javascript语言的一部分。  
  它给文档（结构树）提供了一个结构化的表述并且定义了一种方式-程序可以对结构树进行访问，以改变文档的结构，样式和内容。  
  DOM提供了一种表述形式-将文档作为一个结构化的节点组以及包含属性和方法的对象。从本质上说，它将web页面和脚本或编程语言  
  连接起来了。  

  尽管通常会使用JavaScript来访问DOM,但它并不是JavaScript的一部分，它也可以被其他语言使用。  

  所有操作和创建web页面的属性，方法和事件都会被组织成对象的形式（例如，document对象表示文档本身，table对象实现了特定的  
  HTMLTableElement DOM接口来访问HTML表格等）。下面介绍基于Gecko浏览器的DOM面向对象引用。  
    ps: Gecko是套开放源代码的，以C++编写的网页排版引擎。使用的浏览器有Netscape 6以后版本、Mozilla Firefox等.  



## DOM和JavaScript

  DOM并不是一个编程语言，但如果没有DOM,JavaScript语言也不会有任何网页，XML页面以及涉及到的元素的概念或模型。  
  在文档中的每个元素-包括整个文档，文档头部，文档中表格，表头，表格中的文本-都是文档所属于的文档对象模型（DOM）的一部分，  
  因此它们和一个脚本语言如JavaScript,来访问和处理。  

  开始的时候，JavaScript和DOM是交织在一起的，但它们最终演变成了两个独立的实体。  
  JavaScript可以访问和操作存储在DOM中的内容，因此我们可以写成这个近似的等式：  

>> API(web或 XML页面) = DOM + JS(脚本语言)  

  DOM被设计成与特定编程语言相独立，使用文档的结构化表述可以通过单一，一致的API获得。  
  尽管我们在本参考文档中会专注于使用JacaScript,但DOM也可以使用其他的语言来实现，以Python为例，代码如下：  

```
  # Python DOM example
  import xml.dom.minidom as m
  doc = m.parse("C:\\Projects||Py\\chap1.sml");
  doc.nodeName # DOM property of document object;
  p_list = doc.getElementsByTagName('para');

```

## 如何访问DOM ? 

  在使用DOM时，您不需要做任何其他特殊的操作。不同的浏览器都有对DOM不同的实现，这些实现对当前的DOM标准而言，都会  
  呈现不同程度的一致性，每个web浏览器都会使用一些文档模型，从而使页面可以被脚本语言访问。  

  当您在创建一个脚本时-无论时使用内嵌<script>元素或者使用在web页面脚本加载的方法-您都可以是用document或window  
  元素的APId 来操作文档本身或获取文档的子类(web页面中的元素)。  

  您的DOM编程代码可能会像下面例子一样非常简单，如使用window对象的alert()函数显示一个警告信息，或者使用比较复杂  
  的方法来创建一个新的内容，如下面内容较长的实例所示。  

```
  <body onload="window.alert('welcome to my home page!');">
```

  除了定义JavaScript的<script>元素外，当文档被装载(以及当整个DOM可以被有效使用时)，JavaScript可以设定一个函数  
  来运行。下面的函数会创建一个新的H1元素，为元素添加文本，并将H1添加在文档树中。  

```
  <html>
    <head>
      <script>
        //  run this function when the document is loaded
            window.onload = function(){
        //  create a couple of elements
        //  in an otherwise empty HTML page
            heading = document.createElement("h1");
            heading_text = document.createTextNode('Big Head');
            heading.appendChild(heading_text);
            document.body.appendChild(heading);
          }
      </script>
    </head>
  </html>
```


## 重要的数据类型

  本参考文档会试图以尽可能简单的方式描述各种对象和类型。但在API中传入的不同的数据类型需要我们去注意。为简单起见，在API  
  参考文档中的语法实例通常会使用element(s)指代节点，使用nodeList(s)或element(s)来指代节点数组，使用attribute(s)  
  来指代属性节点。   

  下面的表格简单则描述了这些数据类型。   

```
  document    当一个成员返回document对象(例如，元素的ownerDocument属性返回它所属于document),这个对象就是document
              对象本身。

  element     element是指由 DOM API中成员返回的类型为element的一个元素或节点。例如，document.createElement()
              方法会返回一个node的对象引用，也就是说这个方法返回了在DOM中创建的element。element 对象实现了DOM Element
              接口以及更基本的Node接口。

  nodeList    nodeList 是一个元素的数组，如从document.getElementsByTagName()方法返回的就是这种类型。nodeList中  
              的条目由通过下标有两种方式进行访问：
              list.item(1)
              list[1]
              两种方式是等价的，第一种方式中item()是nodeList对象中的单独方法。后面的方式则使用了经典的数组语法来获取
              列表中的第二个条目

  attribute   当attribute通过成员函数（例如，通过createAttribute()方法）返回时，它是一个为属性暴露出专门接口的对象
              引用。DOM中的属性也是节点，它就像元素一样，只不过您可能会很少用到它。

  namedNoedMap namedNodeMap 和数组类似，但是条目是由name或index访问的，虽然后一种方式仅仅是为了枚举方便，因为在list
               中本来就没有特定的顺序。出于这个目的，namedNodeMap 又一个item()方法，你也可以从namedNodeMap 添加或
               移除条目。
```

## DOM 接口

[Attr](./DOM接口/attr.md)

