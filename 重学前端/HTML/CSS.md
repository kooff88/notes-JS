## CSS

CSS 顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule,也就是at规则，另一种是 qualified rule，普通规则。

at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束。这些 at 规则正是掌握 CSS 的一些高级特性所必须的内容。

### at 规则

CSS 标准里找到所有可能的 at-rule

```
@charset ： https://www.w3.org/TR/css-syntax-3/
@import ：https://www.w3.org/TR/css-cascade-4/
@media ：https://www.w3.org/TR/css3-conditional/
@page ： https://www.w3.org/TR/css-page-3/
@counter-style ：https://www.w3.org/TR/css-counter-styles-3
@keyframes ：https://www.w3.org/TR/css-animations-1
/@fontface ：https://www.w3.org/TR/css-fonts-3/
@supports ：https://www.w3.org/TR/css3-conditional/
@namespace ：https://www.w3.org/TR/css-namespaces-3/

```

@charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。

```css
@charset "utf-8";
```

@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。

```css

@import "mystyle.css";
@import url("mystyle.css");


@import [ <url> | <string> ]
        [ supports( [ <supports-condition> | <declaration> ] ) ]?
        <media-query-list>? ;

// import 还支持 supports 和 media query 形式。
```

media 就是大名鼎鼎的 media query 使用的规则了，它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表。

```css

@media print {
    body { font-size: 10pt }
}

```

page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

```css
@page {
  size: 8.5in 11in;
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }
  @top-right {
    content: "Page " counter(page);
  }
}
```

counter-style 产生一种数据，用于定义列表项的表现。

```css

@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```

keyframes 产生一种数据，用于定义动画关键帧。

```css

@keyframes diagonal-slide {

  from {
    left: 0;
    top: 0;
  }

  to {
    left: 100px;
    top: 100px;
  }

}
```

fontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的。

```css

@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}


support 检查环境的特性，它与 media 比较类似。

用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。

用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。
```

### 普通规则

qualified rule 主要是由选择器和声明区块构成

#### 选择器

任何选择器，都是由几个符号结构连接的：空格、大于号、加号、波浪线、双竖线，这里需要注意一下，空格，即为后代选择器的优先级较低。

然后对每一个选择器来说，如果它不是伪元素的话，由几个可选的部分组成，标签类型选择器，id、class、属性和伪类，它们中只要出现一个，就构成了选择器。

如果它是伪元素，则在这个结构之后追加伪元素。只有伪类可以出现在伪元素之后


```css
div p >a#my:visited:before {
	content:"台词：";
}
```

### 声明：属性和值

声明部分是一个由“属性: 值”组成的序列。

属性是由中划线、下划线、字母等组成的标识符，CSS 还支持使用反斜杠转义。  
我们需要注意的是：属性不允许使用连续的两个中划线开头，这样的属性会被认为是 CSS 变量。  

```css

:root {
  --main-color: #06c;
  --accent-color: #006;
}
/* The rest of the CSS file */
#foo h1 {
  color: var(--main-color);
}
```

CSS 属性值可能是以下类型。

```
CSS 范围的关键字：initial，unset，inherit，任何属性都可以的关键字。

字符串：比如 content 属性。

URL：使用 url() 函数的 URL 值。

整数 / 实数：比如 flex 属性。

维度：单位的整数 / 实数，比如 width 属性。

百分比：大部分维度都支持。

颜色：比如 background-color 属性。

图片：比如 background-image 属性。

2D 位置：比如 background-position 属性。

函数：来自函数的值，比如 transform 属性。

```

CSS 支持一批特定的计算型函数：

```
calc()

max()

min()

clamp()

toggle()

attr()
```

calc() 函数是基本的表达式计算，它支持加减乘除四则运算。在针对维度进行计算时，calc() 函数允许不同单位混合运算，这非常的有用

```css
section {
  float: left;
  margin: 1em; border: solid 1px;
  width: calc(100%/3 - 2*1em - 2*1px);
}
```

max()、min() 和 clamp() 则是一些比较大小的函数，max() 表示取两数中较大的一个，min() 表示取两数之中较小的一个，  
clamp() 则是给一个值限定一个范围，超出范围外则使用范围的最大或者最小值。  

toggle() 函数在规则选中多于一个元素时生效，它会在几个值之间来回切换

```css
ul { list-style-type: toggle(circle, square); }
```

attr() 函数允许 CSS 接受属性值的控制。

### CSS函数种类

```
按照功能，分成以下 5 个类别（可能并不完全准确）：

# 1. 图片

* filter
    * blur()
    * brightness()
    * contrast()
    * drop-shadow()
    * grayscale()
    * hue_rotate()
    * invert()
    * opacity()
    * saturate()
    * sepia()
* cross-fade()
* element()
* image-set()
* imagefunction()

# 2. 图形绘制
* conic-gradient()
* linear-gradient()
* radial-gradient()
* repeating-linear-gradient()
* repeating-radial-gradient()
* shape()

# 3. 布局
* calc()
* clamp()
* fit-content()
* max()
* min()
* minmax()
* repeat()

# 4. 变形/动画
* transform
    * matrix()
    * matrix3d()
    * perspective()
    * rotate()
    * rotate3d()
    * rotateX()
    * rotateY()
    * rotateZ()
    * scale()
    * scale3d()
    * scaleX()
    * scaleY()
    * scaleZ()
    * skew()
    * skewX()
    * skewY()
    * translate()
    * translate3d()
    * translateX()
    * translateY()
    * translateZ()

# 5. 环境与元素
* var()
* env()
* attr()

```