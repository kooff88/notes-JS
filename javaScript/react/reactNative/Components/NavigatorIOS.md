# NavigatorIOS 导航 

NavigatorIOS是React Native自带的导航组件，下面是它的简单应用。  

- 第一个场景     

```js
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigatorIOS, Text } from 'react-native';
import { NextScene } from 'react-native';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: '初始化第一个场景',
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  _onForward = () => {
    this.props.navigator.push({
      component:NextScene
      title: '第二个场景'
    });
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>前往下一个场景</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
```

- 第二个场景   

```js
export default  class NextScene extends Component {

  render() {
    return (
      <View>
        <Text>这是第二个场景</Text>
      </View>
    )
  }
}
```

