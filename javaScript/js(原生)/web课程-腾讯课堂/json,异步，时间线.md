## JSON


```js
  // json ----> {}
  var obj = {};

  var str = JSON.stringify(obj)

  var obj1 = JSON.parse(str);

```


```
解析 dom树

下载 (异步)


domTree  +  cssTree   =  renderTree

优化： 减少domtree 更换

reflow 重排 (renderTree) 
1. dom节点  增加，删除; dom节点 宽高变化,位置变化,display:none -> block; offsetWidth offsetLeft;


repaint 重绘 
1. 改变颜色

```


## 异步加载

```js
  
// 1. defer 异步加载 -- 只有IE能用
  <script defer="defer">
    
  </script>


// 2. 浏览器都能用  W3C标准方法 asynchronous
  <script async="async" src="tools.js">
     这里不能写代码
  </script>

  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "tools.js"; // 请求 异步下载


  script.onload = function(){
    // Safari chrome firefox opera
    test();
  }

  // IE
  script.onreadystatechange = function(){
    script.readyState = 'loading'; //loaded
    if (script.readyState == 'complete' || script.readyState == 'loaded') {
      test();
    }
  }


  document.head.appendChild( script );

  test()

...

function test(){
  console.log('a');
}

// 3.  

```


```js

// 封装 
function loadScript(url, callback){
  var  script = document.createElement('script');
  script.type = 'text/javascript';
  if ( script.readyState ){
    // IE
    script.onreadystatechange = function(){
      script.readyState = 'loading'; //loaded
      if (script.readyState == 'complete' || script.readyState == 'loaded') {
        callback();
      }
    }

  }else {
    script.onload = function(){
      // Safari chrome firefox opera
      callback();
    }
  }
  script.src = url;
  document.head.appendChild( script );
}

// 使用
loadScript('demo.js', function(){
  test();
})

```


js加载时间线
```
1. 创建Document对象, 开始解析web页面，解析HTML元素和他们的文本内容后添加Element对象和 Text节点到文档中,
   这个阶段document.readyState = 'loading'

2. 遇到link外部css, 创建线程加载，并继续解析文档。

3. 遇到script外部js, 并且没有设置 async,defer,浏览器加载，并阻塞,等待js加载完成并执行该脚本，然后继续解析文档。

4. 遇到script外部js, 并且设置有async, defer, 浏览器创建线程加载，并继续解析文档。
  对于async属性的脚本，脚本加载完成后立即执行。(异步禁止使用document.write(), document.write()清除文档流功能);

5. 遇到img等，先正常解析dom结构，然后浏览器异步加载src,并继续解析文档。

6. 当文档解析完成，document.readyState = 'interactive'; (活跃的)

7. 文档解析完成后，所有设置有defer的脚本会按照顺序执行。( 注意与acync )

8. document对象触发DOMContentLoaded事件, 这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段。

9. 当所有async的脚本加载完成并执行后，img等加载完成后，document.readState = 'complete',window对象触发事件load

10. 从此，以异步响应方式处理用户输入，网络事件等。

```

```js

  console.log(document.readyState);

  document.onreadystatechange = function(){
    console.log(document.readyState);
  }

  document.addEventListener('DOMContentLoaded', function(){
    console.log('a')
  },false)

```