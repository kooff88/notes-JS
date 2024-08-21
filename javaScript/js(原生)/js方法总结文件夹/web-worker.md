# web-workder

1. webworker不能使用本地文件，必须是网络上的同源文件

2. webworker不能使用window上的dom操作，也不能获取dom对象，dom相关的东西只有主线程有，只能做一些计算相关的操作

3. 有的东西是无法通过主线程传递给子线程的，比如方法，dom节点，一些对象里的特殊设置(freeze,getter,setter这些，所以vue响应式对象是不能传递的)

4. 模块的引入问题

使用场景

常见于一些耗时计算功能
```
1. webgl, canvas等一些前端可视化操作。比如在线滤镜，在线绘图，web游戏等等。

2. 一些后台管理系统 电子表单，大量的数据计算。10万条数据导出为excel表格
```



主线程文件
```js
  let canvas;
  let ctx;
  let img = new Image();
  img.src = reactImg;
  img.onload = function () {
    canvas = document.getElementById("imgCanvas");
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 1800, 900);
  }
  let worker2 = new Worker('http://localhost:5174/picworker.js');
  worker2.addEventListener("message", (e) => {
    let imageData = e.data;
    ctx.putImageData(imageData, 0, 0)
  })

  ...

  <canvas id="imgCanvas" width="1800" height="900"></canvas>


```


worker 文件
```js
self.addEventListener("message", (e) => {
  if (e.data.data.length) {
    console.log(e.data)
    let imageData = e.data;
    for (let i = 0; i < imageData.data.length; i++) {
      for (let j = 0; j < 100; j++) {
        if (imageData.data[i] !== 255) {
          imageData.data[i] = Math.min(imageData.data[i] + j, 0)
        }
      }
    }

    self.postMessage(imageData)
  }

})


```