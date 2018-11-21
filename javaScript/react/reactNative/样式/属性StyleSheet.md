# StyleSheet

- [StyleSheet.hairlineWidth](#hairlineWidth)


StyleSheet提供了哟中类似CSS样式表的抽象。  

```js
  var styles = StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
    },
    activeTitle: {
      color:'red',
    },
  });
```


## hairlineWidth 

这一常量定义了当前平台上的最细的宽度。可以用边框或是两个元素间的分割线。例如：  

> { borderBottomColor: '#bbb', borderBottomWidth:StyleSheet.hairlineWidth }  

这一常量始终是一个整数的像素值（先看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。然而，  
你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。  