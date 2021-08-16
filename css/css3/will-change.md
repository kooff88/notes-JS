## will-Change

改属性允许你提前通知浏览器你可能会对某个元素做什么类型的操作， 以便于浏览器在需要的时候采取适当的优化方案。  
因此，避免了可能对页面的响应性产生负面影响的非不要成本，使元素可以更快的呈现。

举个例子，当对元素使用CSS transfrom时， 元素及其内容可能会提升为图层，如之前所言，之后会将他们合成(composited)   
(绘制在屏幕上)，但是将一个元素提升到一个新的图层是很消耗性能的，这可能会使  transform 动画的开始延迟明显的几分之一秒，  
从而引起明显的“闪烁”。

为了避免这种情况发生，我们可以提前告知浏览器， 让浏览器可以提前做准备， 那么当同样的操作发生时，因为元素图层已经准备  
就绪，然后就可以立刻执行转换动画，从而渲染元素并快速更新页面。  

语法： 
```css
will-change: transform;

will-change: transfrom, opacity;

```

变更生效后移除掉 will-change

```js

var el = document.getElementById("element");

el.addEventListener("mouseenter", hintBrowser);

el.addEventListener("animationEnd", removeHint);

function hintBrowser(){
	this.style.willChange = 'transform, opacity';
}

function removeHint(){
	this.style.willChange = 'auto';
}


```