# Flex

[阮一峰Flex讲解](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  

- [flex-grow](#flex-grow)   
- [flatten](#flatten)   

## flex-grow

flex-grow属性用于设置或检索弹性盒的扩展比率。  

示例：  
  让第二个元素的宽度为其他元素的三倍  

```css
  {
    div:ntd-of-type(1) { flex-grow: 1;}
    div:ntd-of-type(2) { flex-grow: 3;}
    div:ntd-of-type(3) { flex-grow: 1;}
  }
```

## flatten  

压缩样式对象相同属性  

```js
  var styles = styleSheet.create({
    listItem:{
      flex: 1,
      fontSize: 16, 
      color: 'white',
    },
    selectedListItem:{
      color: 'green',
    },
  });

  StyleSheet.flatten([styles.listItem, styles,selectedListItem]); // return { flex: 1, fontSize: 16, color: 'green'}

```
