## Transformations

转换 方法

`d3.range`: 生成一组有规律的数。
```js
  d3.range(0 , 1, 0.2)  // [ 0, 0.2, 0.4, 0.6000000000000000000001, 0.8]; 参数1起始数; 参数2终止数;参数三数间距
```

`d3.ticks`: 设置一组数 一个刻度个数。 


`d3.nice`: 改变函数的domain, 能自动把 0.00000000000001 变为最接近它的 0 ， 9.999999991 变为最接近它的 10 

`selection.transition `: 给一个选中的元素设置一个过渡。

`transition.duration`: 过渡状态持续时间。

`transition.delay`: 延迟 一定时间 后执行。

`d3.ease` : 扭曲时间控制动画中的运动的方法，是动画过渡更加平滑。
 ```js
  var curtomElastic = d3.easeElastic.period(0.4);

  var te = customElastic(t);
 ```