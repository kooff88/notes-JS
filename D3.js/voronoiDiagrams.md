# Voronoi Diagrams (d3-delaunay)

泰森多边形法图(有道翻译)

`delaunay.from` :
const delaunay = Delaunay.from([[0, 0], [0, 1], [1, 0], [1, 1]]);

`delaunay.voronoi`: 计算与三角剖分相关的 voronoi 图解。

`voronoi.render`: 将 voronoi 单元格的网格线渲染到指定的上下文处。或者返回svg路径字符串。