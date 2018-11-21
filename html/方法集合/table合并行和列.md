# table合并行和列

rowspan 合并列  
colspan 合并行  

```
  <tr>
    <th>考察技能</th>
    <th colspan="2">学习内容</th>
    <th>学习水平</th>
    <th>题型</th>
    <th>难度</th>
    <th>章节</th>
    <th>题量</th>
    <th>权重</th>
  </tr>
  <tr>
    <td rowspan="4">Part1 listening</td>
    <td>语音</td>
    <td>A</td>
    <td>I、Listen and choose</td>
    <td>中等题</td>
    <td rowspan="4">5</td>
  </tr>
  <tr>
    <td>词汇</td>
    <td>A</td>
    <td>II、Listen and choose</td>
    <td>难度题</td>
    <td>6</td>
  </tr>
```