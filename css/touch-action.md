## touch-action

- 规定用户能否以及如何操作页面上的指定区域  
- 注意：在IE11使用属性，在IE10应使用-ms-touch-action，IE10之前的浏览器不支持  

```
语法:
  touch-action:auto|none[[[pan-x||pan-y||pinch-zoom?]|manipulation] || double-tap-zoom?]
```

- 属性值:  

- auto：默认值。浏览器允许一些手势（touch）操作在设置了此属性的元素上，例如：对视口（viewport）平移、缩放等操作。  
none：禁止触发默认的手势操作。  
pan-x：可以在父级元素(the nearest ancestor)内进行水平移动的手势操作。  
pan-y：可以在父级元素内进行垂直移动的手势操作。  
manipulation：允许手势水平/垂直平移或持续的缩放。任何auto属性支持的额外操作都不支持。  
注：touch-action只支持具有CSS   
width和height属性的元素。这个限制的目的是帮助浏览器优化低延时的手势操作。对于默认不支持此属性的元素，如<span>  这种内联元素，可以给它设置display:block这样的CSS属性来支持width和height。未来W3C规范会将此API扩展到支持所有元素。  
