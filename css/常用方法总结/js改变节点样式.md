# js改变节点样式


```html
<div id="el"><div>

...

var el = document.getElementById('el');

第一种: 用 cssText

el.style.cssText = 'width: 250px;height: 250px; border: 1px red solid;';


第二种: 用setProperty()

el.style.setProperty('width', '250px');
el.style.setProperty('height', '250px');
el.style.setProperty('border', '1px red solid');


第三种： 使用css 属性对应的 style属性 

el.style.width ='250px';
el.style.height = '250px';
el.style.border = '1px solid red';

```