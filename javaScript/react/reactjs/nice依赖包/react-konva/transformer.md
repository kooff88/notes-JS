# transformer


```
import React, { Component } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import Konva from 'konva';


class Rectangle extends React.Component {
  state = { color: 'green' };
  componentDidMount() {
    this.rect.cache()
  }

  handleClick = () => {
    this.setState(
      {
        color: Konva.Util.getRandomColor()
      },
      () => {
        this.rect.cache();
      }
    )
  }

  render() {
    return (
      <Rect
        filters={[Konva.Filters.Noise]}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={this.state.color}
        name={this.props.name}
        ref={node => { this.rect = node }}
        onClick={this.handleClick}
        draggable
      />
    )
  }
}

class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne('.' + selectedShapeName)

    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }

    this.transformer.getLayer().batchDraw()

  }

  render() {
    return (
      <Transformer
        ref={node => { this.transformer = node }}
      />
    )
  }
}

export default class App extends Component {
  state = {
    rectangles: [
      {
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        fill: 'red',
        name: 'rect1'
      },
      {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'green',
        name: 'rect2'
      }
    ],
    selectedShapeName: ''
  }

  handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ''
      });
      return;
    }

    console.log('eee', e.target)

    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    const rect = this.state.rectangles.find(r => r.name === name);

    if (rect) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ''
      })
    }
  }


  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleStageMouseDown}
      >
        <Layer>
          {this.state.rectangles.map((rect, i) => (
            <Rectangle key={i} {...rect} />
          ))}
          <TransformerComponent
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    )
  }
}
```