# 注意点(一些坑)

- [桑基图sankey](#sankey)
- [图形大小自适应](#图形大小自适应)

## sankey

桑基图坑：  数据 nodes和 links 中 的单双引号必须统一。  即nodes和links中的值 都是单引号或者 都是双引号 才可以！

## 图形大小自适应

```
myChart.setOption(option);
window.addEventListener("resize",function(){
	myChart.resize();
	})
```