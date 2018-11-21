# React调用百度地图api 

在初始 index.html文件中引入百度地图

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <link rel="shortcut icon" href="./favicon.ico">
  <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
  />
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
  />
  <title>TETEC</title>
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=你的应用key值"></script>
</head>

<body>
  <div id="root"></div>
</body>


</html>

```

```webpack
	
	export.modules = {
		...
		externals: {
      'BMap': 'BMap'
    },
		...
	}

```



```js
import React, { Component } from 'react';
import BMap from 'BMap'

import './index.less'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: ''
    }
  }

 

  componentDidMount() {
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(121.4802869, 31.221998), 14);  // 初始化地图,设置中心点坐标和地图级别


    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint("上海市马当路388号", function (point) {
      if (point) {
        map.centerAndZoom(point, 16);
        let marker = new BMap.Marker(point)
        map.addOverlay(marker);
        var label = new BMap.Label("SOHO复兴广场388号A幢", { offset: new BMap.Size(20, -10) });
        marker.setLabel(label);
      } else {
        alert("您选择地址没有解析到结果!");
      }
    }, "上海市");

    map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }


  render() {
    let { map } = this.state;

    return (
      <div className="root">
        <div ref="allmap" id="allmap"></div>
      </div>
    )
  }
}

export default Map;

```

./index.less
```less
	.root {
		#allmap{
      margin: 0 auto;
      text-align: center;
      width: 60%;
      height:600px;
      line-height: 600px;
    }
	}


```