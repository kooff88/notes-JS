## scrollIntoView


该scrollIntoView() 方法将调用它的元素滚动到浏览器窗口的可见区域。

```html
var element = document.getElementById('box');

element.scrollIntoView();
element.scrollIntoView(false);
element.scrollIntoView({ block: 'end' });
element.scrollIntoView({ bebavior: 'instant', block: 'end', inline: 'nearest' });


element.scrollIntoView({
  behavior: 'smooth',
  block:'nearest',
  inline: 'center'
});
```
