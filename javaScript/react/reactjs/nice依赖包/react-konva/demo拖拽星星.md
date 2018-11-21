
# 示例

```js
import React, { Component } from 'react';
import Konva from 'konva';
import { Text, Stage, Layer, Star } from 'react-konva'


export default class StarDemo extends Component {

  // 拖拽开始
  handleDragStart = (e) => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  }

  // 拖拽结束
  handleDragEnd = (e) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    })
  }


  renderStarts = () => {

    return [...Array(10)].map((item, i) => {
      console.log('i', i)
      return (
        <Star
          key={i}
          x={Math.random() * window.innerWidth}
          y={Math.random() * window.innerHeight}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="pink"
          opacity={0.8}
          draggable
          rotation={Math.random() * 180}
          shadowBlur={10}
          shadowOpacity={0.3}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        >
        </Star>
      )
    })
  }

  render() {

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try to dray a start" />
          {this.renderStarts()}

        </Layer>
      </Stage>
    )
  }
}
```