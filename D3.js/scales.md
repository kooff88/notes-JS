## Scales (d3-scale)

映射数据 成 图。

`d3.scaleLinear`: 创建一个定量的线映射。

`d3.tickFormat`: 格式化 刻度ticks 供使用。



### 对比

domain是定义域，就是坐标系下的值

range是值域，就是映射到svg画布上的值

1. d3.scaleLinear() 线性比例尺
```
domain: 连续型
range: 连续型

scale_l = d3.scaleLinear().domain([1,10]).range([0,100])

// 线性比例尺超出定义域的部分会按映射拓展
```

2. d3.scaleBand() 序数比例尺
```
domain: 离散型
range: 连续型

scale_b= d3.scaleBand().domain([1,2,3,4]).range([0,100])

// 可以理解为 domain 将 range的平均分割
```

3. d3.scaleOrdinal() 序数比例尺
```
domain: 离散型
range: 离散型

scale_o = d3.scaleOrdinal().domain(['a', 'b', 'c']).range([10, 20, 30])

// 可以简单理解为 map映射
```

4. d3.scaleQuantize() 量化比例尺
```
domain: 连续型
range:离散型

scale_q = d3.scaleQuantize().domain([0, 10]).range(['s', 'm', 'l'])

// scaleBand的逆变换
```

5. d3.scaleTime() 时间比例尺
```
domain： 连续型，时间类型
range: 连续, 刻度

let scale = d3.scaleTime()
              .domain([new Date(2018, 0, 1, 0), new Date(2018, 0, 1, 2)])
              .range([0,100])
```

6. 颜色比例尺

```
d3.schemeCategory10
d3.schemeCategory20
d3.schemeCategory20b
d3.schemeCategory20c
// 定义一个序数颜色比例尺
let color = d3.scaleOrdinal(d3.schemeCategory10)

```

7. 其他比例尺

```
d3.scaleIdentity() // 恒等比例尺
d3.scaleSqrt() // 乘方比例尺
d3.scalePow() // 类似scaleSqrt的乘方比例尺
d3.scaleLog() // 对数比例尺
d3.scaleQuantile() // 分位数比例尺

```