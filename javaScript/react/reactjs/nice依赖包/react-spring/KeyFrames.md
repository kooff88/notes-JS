
# KeyFrames

```
import React, { Component, Fragment } from 'react';
import { Keyframes, animated, config } from 'react-spring';
import { Avatar, Form, Icon, Input, Button, Checkbox } from 'antd'
import delay from 'delay'
import 'antd/dist/antd.css';
import './styles.css'

const SiderBar = Keyframes.Spring({
  peek: [{ y: 0, from: { y: -100 }, delay: 500 }],

  open: { y: 0 },

  close: async call => {
    await delay(400);
    await call({ y: -100 })
  }
})

const Content = Keyframes.Trail({
  peek: [{ y: 0, opacity: 1, from: { y: -100, opacity: 0 }, delay: 600 }],
  open: { y: 0, opacity: 1, delay: 100 },

  close: { y: -100, opacity: 0 }
})

const items = [
  <Avatar src="https://semantic-ui.com/images/avatar2/large/elyse.png" />,
  <Input size="small" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
  <Input
    size="small"
    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    type="password"
    placeholder="Password"
  />,
  <Fragment>
    <Checkbox size="small">Remember me</Checkbox>
    <a className="login-form-forgot" href="#" children="Forgot password" />
    <Button size="small" type="primary" htmlType="submit" className="login-form-button" children="Log in" />
  </Fragment>
]


export default class MessageHub extends Component {
  state = { open: undefined }

  toggle = () => this.setState(state => ({ open: !state.open }))


  render() {
    const state = this.state.open === undefined ? 'peek' : this.state.open ? 'open' : 'close';
    const icon = this.state.open || this.state.open === undefined ? 'fold' : 'unfold'
    return (
      <div style={{ background: 'lightblue', width: '100%', height: '100%' }}>
        <Icon type={`menu-${icon}`} className="sidebar-toggle" onClick={this.toggle} />

        <SiderBar native state={state}>
          {({ y }) => {
            console.log('xxxx', y)
            return (
              <animated.div
                className="sidebar"
                style={{
                  transform: y.interpolate((y) => {

                    console.log('yyyyyxxx', y)
                    return `translate3d(0,${y}%,0)`
                  })
                }}
              >
                <Content native items={items} keys={items.map((_, i) => i)} reverse={!this.state.open} state={state}>
                  {(item, i) => ({ y, ...props }) => (
                    <animated.div
                      style={{
                        transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
                        ...props
                      }}
                    >
                      <Form.Item className={i === 0 ? 'middle' : ''}>{item}</Form.Item>
                    </animated.div>
                  )}
                </Content>
              </animated.div>
            )
          }}

        </SiderBar>
      </div>
    )
  }
}
```


css
```
* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #2b4b64;
}

.sidebar {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: white;
  padding: 50px;
  font-size: 16px;
}

.sidebar-toggle {
  position: absolute;
  margin: 20px;
  color: #a0a0a0;
  z-index: 100;
  font-size: 1.5em;
  cursor: pointer;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}

.ant-avatar {
  width: 150px;
  height: 150px;
  line-height: 50px;
  border-radius: 50%;
  font-size: 3em !important;
  margin-bottom: 20px;
}

.middle .ant-form-item-control {
  display: flex;
  justify-content: center;
}

.sidebar .ant-form-item {
  margin: 0;
}

.sidebar .ant-form-item-control {
  line-height: 29px;
}



```