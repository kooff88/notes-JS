# Transitions 使用.


```js
import ReactDOM from 'react-dom'
import React from 'react'
import { Transition, animated, config } from 'react-spring'
import './styles.css'

class MultistageTransitions extends React.PureComponent {
  state = { items: [] }

  componentDidMount() {
    // Add 😅 🚀 🎉
    setTimeout(() => this.setState({ items: ['😅', '🚀', '🎉'] }), 0)
    // Remove 🚀
    setTimeout(() => this.setState({ items: ['😅', '🎉'] }), 2000)
    // Add ✨
    setTimeout(() => this.setState({ items: ['😅', '✨', '🎉'] }), 4000)
    // Delete all
    setTimeout(() => this.setState({ items: [] }), 6000)
    // Repeat
    setTimeout(() => this.componentDidMount(), 8000)
  }

  render() {
    return (
      <Transition
        native
        items={this.state.items}
        from={{ opacity: 0, height: 0, transform: 'scale(1)' }}
        enter={[{ opacity: 1, height: 'auto' }, { transform: 'scale(1.5)' }]}
        leave={[{ transform: 'scale(1)', opacity: 0.5 }, { opacity: 0 }, { height: 0 }]}
        config={{ ...config.default, precision: 0.01 }}>
        {item => props => <animated.div style={props} className="item" children={item} />}
      </Transition>
    )
  }
}

ReactDOM.render(<MultistageTransitions />, document.getElementById('root'))

```

styles.css
```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
    sans-serif;
  background: #272727;
}

#root {
  height: auto;
  background-color: #373737;
}

.item {
  overflow: hidden;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  font-size: 4em;
  line-height:2.25em;
}



```