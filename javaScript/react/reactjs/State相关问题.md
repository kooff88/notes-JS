# 目录

- [setState参数](#setState参数)

# setState参数

- setState()可以接受一个函数，这个函数接受两个参数,第一个参数表示上一个状态值，第二个参数表示当前的props,   

```
 this.setState((prevState,props)=>({
    //do something here 
 }))
```

