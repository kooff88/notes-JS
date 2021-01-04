## 小实验

```js

Object.keys(document.body.style).filter(e => !e.match(/^webkit/))
```

我们这个爬虫的思路是：用 iframe 来加载所有标准的网页，然后用 JavaScript 找出它们中间定义的属性。


我们来到 W3C 的 TR 页面：

```
https://www.w3.org/TR/?tag=css
```

打开它的代码，我们会发现它是有规律的，这个页面由一个巨大的列表构成，我们只需要根据 tag 选取需要的标准即可

```js

document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)")
```

...


第二步：分析每个标准中的 CSS 属性

这里我不得不感慨，W3C 的标准写得真的是十分严谨，这给我们带来了很大的方便。我们用以下代码获取属性：

```js
document.querySelectorAll(".propdef [data-dfn-type=property]")
```

对于第一个标准 CSS Lists Module Level 3 得到了这个列表：

```
list-style-image
list-style-type
list-style-position
list-style
marker-side
counter-reset
counter-set
counter-increment
```

好了，接下来，我们来用 iframe 打开这些标准，并且用我们分析好的规则，来找出里面的属性就可以了。最终成品代码如下：

```js
var iframe = document.createElement("iframe");

document.body.appendChild(iframe);

iframe.src = "https://www.w3.org/TR/2019/WD-css-lists-3-20190425/"

function happen(element, type){
  return new Promise(resolve => {
    element.addEventListener(type, resolve, {once: true})
  })
}

happen(iframe, "load").then(function(){
  //Array.prototype.map.call(document.querySelectorAll("#container li[data-tag~=css] h2"), e=> e.children[0].href + " |\t" + e.children[0].textContent).join("\n")
  console.log(iframe.contentWindow);
})
async function start(){
  var output = []
  for(let standard of  Array.prototype.slice.call(document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)"))) {
    console.log(standard.children[0].href);
    iframe.src = standard.children[0].href;
    await happen(iframe, "load");
    var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
    if(properties.length)
        output.push(standard.children[0].textContent + " | " + properties.join(", "));
  }
  console.log(output.join("\n"))
}
start();
```



