# isValidElement

React提供了 isValidElement()方法，用于判断传入对象是否是有效的ReactElement。  

```js
  var div = React.createElement('div);
  React.isValidElement(div);   // true
  React.isValidElement(document.getElementById('example'))  //false
```


