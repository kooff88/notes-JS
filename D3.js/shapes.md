# Shapes (d3-shape)

## Arcs

`d3.arc`： 创建一个饼图 或者同心圆。

`arc.innerRadius`: 内圆的边角 

`arc.outerRadius`： 外圆的边角

`arc.startAngle`: 开始角度

`arc.endAngle`: 结束角度

`arc.padAngle`: 设置相邻两个环之间的间隙角度。

`arc.padRadius`: 设置半径间隔。

`arc.centroid`: 取 饼图 或环形图中心点 

## Links

cubic bezier 连接线

`d3.linkHorizontal`: 创建水平连接线。

`link.source`: 起始点。

`link.target`: 结束点。

## Lines 线

`d3.lineRadial`: 创建辐射线条 ,径向线生成器

`lineRadial.angle`: 设置辐射线条角度

`lineRadial.radius`: 设置辐射线条半径

`lineRadial.curve`: 设置曲线 插入器,达到不同的效

`d3.line`: 线图

`line.x`: x轴数据

`line.y`: y轴数据


## Pies 饼

`d3.pie`: 创建饼图。

`pie.value` - set the value accessor.

`pie.sort` - set the sort order comparator.

`pie.sortValues` - set the sort order comparator.

`pie.startAngle` - set the overall start angle.

`pie.endAngle` - set the overall end angle.

`pie.padAngle` - set the pad angle between adjacent arcs.