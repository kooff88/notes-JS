# Parallax 实例

```
import React, { Component, Fragment } from 'react';
// import { Parallax, ParallaxLayer } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/dist/addons';
import './styles.css'

const Page = ({ offset, caption, first, second, gradient, onClick }) => (
  <Fragment>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
      <div className="slopeBegin" />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </ParallaxLayer>

    <ParallaxLayer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </ParallaxLayer>

    <ParallaxLayer className="text header" offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: 20 }}>{caption}</p>
        <div className={`stripe ${gradient}`} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </ParallaxLayer>

  </Fragment>
)


export default class MessageHub extends Component {

  scroll = to => this.refs.parallax.scrollTo(to);

  render() {
    return (
      <Parallax className="container" ref="parallax" pages={3} horizontal scrolling={false}>
        <Page offset={0} gradient="pink" caption="素质三连" first="谁说的？" second="呵呵" onClick={() => this.scroll(1)} />
        <Page offset={1} gradient="teal" caption="素质三连" first="我没说过." second="呵呵" onClick={() => this.scroll(2)} />
        <Page offset={2} gradient="tomato" caption="素质三连" first="告辞!" second="呵呵" onClick={() => this.scroll(0)} />
      </Parallax>

    )
  }
}
```

```css
	.container > div > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  pointer-events: none;
  justify-content:  start !important;
  font-family: 'Kanit', sans-serif;
  line-height: 0px;
  text-transform: uppercase;
}

.number {
  font-size: 250px;
  color: #373c4c;
}

.number span {
  display: inline-block;
  position: relative;
  transform: translate3d(-35%,0,0)
}

.header {
  margin-left: 350px;
  font-size: 70px;
  color: white;
}

.stripe {
  height: 2px;
  width: auto;
}

.slopeBegin {
  background-color: #20232f;
  clip-path: polygon(20vw 0, 70% 0, calc(70% - 20vw) 100%, 0 100%);
}

.slopeEnd {
  clip-path: polygon(70% 0, 100% 0, calc(100% - 20vw) 100%, calc(70% - 20vw) 100%);

}


.slopeBegin,
.slopeEnd{
  position: absolute;
  width: 140%;
  height: 100%;
  cursor: pointer;
}

.pink {
  background: linear-gradient(to right, deeppink 0%, coral 100%)
}

.teal {
  background: linear-gradient(to right, SlateBlue 0%, DeepSkyBlue 100%);
}

.tomato {
  background: linear-gradient(to right, tomato 0%, gold 100%);
}

```

