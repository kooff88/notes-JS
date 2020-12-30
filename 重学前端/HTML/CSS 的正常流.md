## CSS 的正常流

我们能够在网上看到关于正常流的各种资料，比如：块级格式化上下文、margin 折叠等等……这一系列的概念光是听起来就令人非常头痛。

### 正常流的行为

今天在我们的 CSS 中，排版需要处理的内容，不再是简单的大小相同的木字或者铅字，而是有着不同字体和字号的富文本，以及插入在富文本中大小不等的盒

我们可以用一句话来描述正常流的排版行为，那就是：依次排列，排不下了换行。

在正常流基础上，我们有 float 相关规则，使得一些盒占据了正常流需要的空间，我们可以把 float 理解为“文字环绕”。

我们还有 vertical-align 相关规则规定了如何在垂直方向对齐盒。

margin 折叠是很多人非常不理解的一种设计，但是实际上我们可以把 margin 理解为“一个元素规定了自身周围至少需要的空间”

### 正常流的原理

在 CSS 标准中，规定了如何排布每一个文字或者盒的算法，这个算法依赖一个排版的“当前状态”，CSS 把这个当前状态称为“格式化上下文（formatting context）”。

我们可以认为排版过程是这样的：

```
格式化上下文 + 盒 / 文字 = 位置

formatting context + boxes/charater = positions
```

我们需要排版的盒，是分为块级盒和行内级盒的，所以排版需要分别为它们规定了块级格式化上下文和行内级格式化上下文。

块级格式化上下文顺次排列元素：从上到下

行内级格式化上下文顺次排列元素： 从左到右

当我们要把正常流中的一个盒或者文字排版，需要分成三种情况处理。

```
当遇到块级盒：排入块级格式化上下文。

当遇到行内级盒或者文字：首先尝试排入行内级格式化上下文，如果排不下，那么创建一个行盒，
先将行盒排版（行盒是块级，所以到第一种情况），行盒会创建一个行内级格式化上下文。

遇到 float 盒：把盒的顶部跟当前行内级上下文上边缘对齐，然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘，之后重排当前行盒。

```

一些元素会在其内部创建新的块级格式化上下文，这些元素有：

```
浮动元素；

绝对定位元素；

非块级但仍能包含块级元素的容器（如 inline-blocks, table-cells, table-captions）；

块级的能包含块级元素的容器，且属性 overflow 不为 visible。

```

### 正常流的使用技巧

#### 等分布局问题

```html

<div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
</div>

...

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}

//但是这段代码执行之后，效果跟我们预期不同，我们可以发现，每个 div 并非紧挨，中间有空白，

// 解决方案是修改 HTML 代码，去掉空格和换行：



<div class="outer"><div class="inner"></div><div class="inner"></div><div class="inner"></div></div>


//但是这样做影响了源代码的可读性，一个变通的方案是，改变 outer 中的字号为 0。

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
    font-size:30px;
}
.outer {
    font-size:0;
}


// 我们给最后一个 div 加上一个负的右 margin：

.outer {
    width:101px
}

.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
}

.inner:last-child {
    margin-right:-5px;
}

```
#### 自适应宽

自适应宽（一个元素固定宽度，另一个元素填满父容器剩余宽度）是个经典的布局问题

```html

<div class="outer">
    <div class="fixed"></div>
    <div class="auto"></div>
</div>

...

.fixed {
    width:200px;
}
.fixed, .auto {
    height:300px;
    outline:solid 1px blue;
}

// 这里 fixed 这个 div 宽度已经被指定好，我们需要添加 css 代码尝试让.auto 填满剩余宽度。

// 使用正常流解决这个问题的思路是，利用负 margin：


.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    width:100%;
    display:inline-block;
    vertical-align:top;
}

// 但是，这样做会导致 auto 中的内容位置不对，所以我们还需要使用 padding 把内容挤出来，最终完整代码如下：

.fixed {
    display:inline-block;
    vertical-align:top;
}
.auto {
    margin-left:-200px;
    padding-left:200px;
    box-sizing:border-box;
    width:100%;
    display:inline-block;
    vertical-align:top;
}


```