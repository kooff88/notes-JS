## CSS选择器

选择器是由 CSS 最先引入的一个机制（但随着 document.querySelector 等 API 的加入，选择器已经不仅仅是 CSS 的一部分了）

基本意义：选择器的基本意义是：根据一些特征，选中元素树上的一批元素。

我们把选择器的结构分一下类，那么由简单到复杂可以分成以下几种。

```
简单选择器：针对某一特征判断是否选中元素。

复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素。

复杂选择器：由“（空格）”“ >”“ ~”“ +”“ ||”等符号连接的复合选择器，根据父元素或者前序元素检查单个元素。

选择器列表：由逗号分隔的复杂选择器，表示“或”的关系。

```

### 简单选择器

#### 类型选择器和全体选择器

```css
/*
	类型选择器和全体选择器:
	还必须要考虑 HTML 或者 XML 元素的命名空间问题。
*/
	div {

	}

```

svg 和 HTML 中都有 a 元素，我们若要想区分选择 svg 中的 a 和 HTML 中的 a，就必须用带命名空间的类型选择器

```html

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
<svg width="100" height="28" viewBox="0 0 100 28" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <desc>Example link01 - a link on an ellipse
  </desc>
  <a xlink:href="http://www.w3.org">
    <text y="100%">name</text>
  </a>
</svg>
<br/>
<a href="javascript:void 0;">name</a>
</body>
</html>
<style>
	@namespace svg url(http://www.w3.org/2000/svg);
	@namespace html url(http://www.w3.org/1999/xhtml);
	svg|a {
		stroke:blue;
		stroke-width:1;
	}

	html|a {
		font-size:40px
	}
</style>

```

这里有一个特殊的选择器，就是“ * ” ，它称为全体选择器，可以选中任意元素。它的用法跟类型选择器是完全一致的

#### id 选择器与 class 选择器

```css
#myid {
  stroke:blue;
  stroke-width:1;
}

.mycls {
  font-size:40px
}
```


class 选择器识别的是：用空格分隔的 class 语法。

```
<a class="a b c">xxx</a>
.a {
    color:red;
}
```

#### 属性选择器

属性选择器根据 HTML 元素的属性来选中元素。属性选择器有四种形态。

```
第一种，[att] 
直接在方括号中放入属性名，是检查元素是否具有这个属性，只要元素有这个属性，不论属性是什么值，都可以被选中。

第二种，[att=val]
精确匹配，检查一个元素属性的值是否是 val。

第三种，[att~=val]
多种匹配，检查一个元素的值是否是若干值之一，这里的 val 不是一个单一的值了，可以是用空格分隔的一个序列。

第四种，[att|=val]
开头匹配，检查一个元素的值是否是以 val 开头，它跟精确匹配的区别是属性只要以 val 开头即可，后面内容不管。

```

#### 伪类选择器

树结构关系伪类选择器

:root 伪类表示树的根元素，在选择器是针对完整的 HTML 文档情况，我们一般用 HTML 标签即可选中根元素。  
但是随着 scoped css 和 shadow root 等场景出现，选择器可以针对某一子树来选择，这时候就很需要 root 伪类了。  

:empty 伪类表示没有子节点的元素，这里有个例外就是子节点为空白文本节点的情况。

:nth-child 和 :nth-last-child 这是两个函数型的伪类，CSS 的 An+B 语法设计的是比较复杂的，我们这里仅仅介绍基本用法。我们还是看几个例子：

```
:nth-child(even) : 选中偶数节点

:nth-child(4n-1): 选中第3个，第7个，第11个。。。

:nth-child(3n+1 of li.important): 选中第1个，第4个，第7个li.important, 注意这里只有li.important会被计数。
```

:nth-last-child 的区别仅仅是从后往前数。

:first-child :last-child 分别表示第一个和最后一个元素。

:only-child 按字面意思理解即可，选中唯一一个子元素。

of-type 系列，是一个变形的语法糖，S:nth-of-type(An+B) 是:nth-child(|An+B| of S) 的另一种写法。

以此类推，还有 nth-last-of-type、first-of-type、last-of-type、only-of-type。

#### 链接与行为伪类选择器

```
:any-link 表示任意的链接，包括 a、area 和 link 标签都可能匹配到这个伪类

:link 表示未访问过的链接， :visited 表示已经访问过的链接。

:hover 表示鼠标悬停在上的元素。

:active 表示用户正在激活这个元素，如用户按下按钮，鼠标还未抬起时，这个按钮就处于激活状态。

:focus 表示焦点落在这个元素之上。

:target 用于选中浏览器 URL 的 hash 部分所指示的元素。


在 Selector Level 4 草案中，还引入了 target-within、focus-within 等伪类，用于表示 target 或者 focus 的父容器。
```

#### 逻辑伪类选择器

这个伪类是个函数型伪类，它的作用时选中内部的简单选择器命中的元素。

```css
*|*:not(:hover)
```

#### 其它伪类选择器

```
国际化：用于处理国际化和多语言问题。dir  lang

音频 / 视频：用于区分音视频播放状态。 play  pause

时序：用于配合读屏软件等时序性客户端的伪类。current  past  future

表格：用于处理 table 的列的伪类。 nth-col  nth-last-col

```

伪类是很大的一类简单选择器，它是选择器能力的一种补充。在实际使用中，我还是建议你尽量通过合适的 id 和 class 来标识元素，  
约束伪类的使用。最好只在不得不使用伪类的场景使用伪类，这对于 CSS 代码的性能和可读性都有好处。  


### 其他

选择器 描述

```
[attribute] 用于选取带有指定属性的元素。
[attribute=value] 用于选取带有指定属性和值的元素。
[attribute~=value] 用于选取属性值中包含指定词汇的元素。
[attribute|=value] 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。
[attribute^=value] 匹配属性值以指定值开头的每个元素。
[attribute$=value] 匹配属性值以指定值结尾的每个元素。
[attribute*=value] 匹配属性值中包含指定值的每个元素。

```