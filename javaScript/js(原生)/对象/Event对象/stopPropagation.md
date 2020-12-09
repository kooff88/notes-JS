# event.stopPropagation

阻住事件流： event.stopPropagation; 只考虑冒泡时间，才有意义，如果添加给捕捉时间，监听就没意义。

```
里的span添加onlick事件时，同时加上了event.stopPropagation();然后给div,p也添加了onlick的监听，那么当在页面上点击span元素区域时，就不会执行span的function（）{}内容，而是由于捕捉事件从最外层向内捕捉，仅仅执行了最外层的div的监听事件，而后就被阻止了，span的监听就无效了。
```