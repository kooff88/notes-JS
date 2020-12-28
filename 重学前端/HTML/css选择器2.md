## 选择器

### 选择器组合

选择器列表是用逗号分隔的复杂选择器序列；复杂选择器则是用空格、大于号、波浪线等符号连接的复合选择器；复合选择器则是连写的简单选择器组合。

```
第一优先级: 无连接符号

第二优先级:“空格” , “~”,“+”, “>”, “||”

第三优先级: “,”

```

复杂选择器是针对节点关系的选择，它规定了五种连接符号

```
“空格”：后代，表示选中所有符合条件的后代节点， 例如“ .a .b ”表示选中所有具有 class 为 a 的后代节点中 class 为 b 的节点。

“>” ：子代，表示选中符合条件的子节点，例如“ .a>.b ”表示：选中所有“具有 class 为 a 的子节点中，class 为 b 的节点”。

“~” : 后继，表示选中所有符合条件的后继节点，后继节点即跟当前节点具有同一个父元素，并出现在它之后的节点，例如“ .a~.b ”表示选中所有具有 class 为 a 的后继中，class 为 b 的节点。

“+”：直接后继，表示选中符合条件的直接后继节点，直接后继节点即 nextSlibling。例如 “.a+.b ”表示选中所有具有 class 为 a 的下一个 class 为 b 的节点。

“||”：列选择器，表示选中对应列中符合条件的单元格。

```

我们在实际使用时，比较常用的连接方式是“空格”和“>”。

逗号表示“或”的关系，实际上，可以把它理解为“两条内容一样的 CSS 规则”的一种简写。

### 选择器的优先级

CSS 标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级

```
id 选择器的数目记为 a；
伪类选择器和 class 选择器的数目记为 b；
伪元素选择器和标签选择器数目记为 c；
```

建议你“根据 id 选单个元素”“class 和 class 的组合选成组元素”“tag 选择器确定页面风格”这样的简单原则来使用选择器，不要搞出过于复杂的选择器。

### 伪元素

是因为伪元素本身不单单是一种选择规则，它还是一种机制。

伪元素的语法跟伪类相似，但是实际产生的效果却是把不存在的元素硬选出来。

目前兼容性达到可用的伪元素有以下几种。

```
::first-line

::first-letter

::before

::after

```

::first-line 和 ::first-letter 是比较类似的伪元素，其中一个表示元素的第一行，一个表示元素的第一个字母。

例子
```html

<p>This is a somewhat long HTML
paragraph that will be broken into several
lines. The first line will be identified
by a fictional tag sequence. The other lines
will be treated as ordinary lines in the
paragraph.</p>

...

p::first-letter { 
    text-transform: uppercase;
    font-size:2em;
    float:left; 
}
```

但是实际上，我们遇到的 HTML 结构要更为复杂，一旦元素中不是纯文本，规则就变得复杂了。

例子二

```html

<div>
  <p id=a>First paragraph</p>
  <p>Second paragraph</p>
</div>

....


div>p#a {
    color:green;
}

div::first-line { 
    color:blue; 
}

// 这段代码的最终结果是绿色，这说明伪元素在 span 之外。



<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>


div>span#a {
    color:green;
}

div::first-line { 
    color:blue; 
}
段代码的最终结果是绿色，这说明伪元素在 span 之外。



<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>


div>span#a {
    color:green;
}

div::first-letter { 
    color:blue; 
}

执行这段代码，我们可以看到，首字母变成了蓝色，这说明伪元素出现在 span 之内。

```

CSS 标准只要求 ::first-line 和 ::first-letter 实现有限的几个 CSS 属性，都是文本相关，这些属性是下面这些。

#### 接下来我们说说 ::before 和 ::after 伪元素。

这两个伪元素跟前面两个不同的是，它不是把已有的内容套上一个元素，而是真正的无中生有，造出一个元素。

::before 表示在元素内容之前插入一个虚拟的元素，::after 则表示在元素内容之后插入。

```html

<p class="special">I'm real element</p>

...


p.special::before {
    display: block;
    content: "pseudo! ";
}

```

这里要注意一点，::before 和 ::after 还支持 content 为 counter，如：

```html

<p class="special">I'm real element</p>
p.special::before {
    display: block;
    content: counter(chapno, upper-roman) ". ";
}

这对于实现一些列表样式是非常有用的

```

::before 和 ::after 中支持所有的 CSS 属性。实际开发中，这两个伪元素非常有用，有了这两个伪元素，一些修饰性元素，  
可以使用纯粹的 CSS 代码添加进去，这能够很好地保持 HTML 代码中的语义，既完成了显示效果，又不会让 DOM 中出现很多无语义的空元素。  


