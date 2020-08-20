## H5 跳转 app

1. 获取当前终端的环境

```js
// 方法
// 判断浏览器类型
const getBrowserInfo = () => {
  let isIE = true;
  let isAndroid = false;
  let isIos = false;
  let isWeiXin = false;
  const agent = navigator.userAgent.toLowerCase();
  const regStrIE11 = /windows nt [\d.]+;/gi;
  const regStrIE = /msie [\d.]+;/gi;
  const regStrFF = /firefox\/[\d.]+/gi;
  const regStrChrome = /chrome\/[\d.]+/gi;
  const regStrSaf = /safari\/[\d.]+/gi;
  let browser = {};
  // IE11
  if (agent.indexOf("windows nt") > 0) {
    isIE = true;
    browser = agent.match(regStrIE11);
  }
  // IE
  if (agent.indexOf("msie") > 0) {
    isIE = true;
    browser = agent.match(regStrIE);
  }
  // firefox
  if (agent.indexOf("firefox") > 0) {
    isIE = false;
    browser = agent.match(regStrFF);
  }
  // Chrome
  if (agent.indexOf("chrome") > 0) {
    isIE = false;
    browser = agent.match(regStrChrome);
  }
  // Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    isIE = false;
    browser = agent.match(regStrSaf);
  }
  // android
  if (agent.indexOf("android") > -1 || agent.indexOf("linux") > -1) {
    isIE = false;
    isAndroid = true;
  }
  // ios
  if (agent.match(/\(i[^;]+;( u;)? cpu.+mac os x/)) {
    isIE = false;
    isIos = true;
  }
  // 微信
  if (agent.indexOf("micromessenger") > -1) {
    isIE = false;
    isWeiXin = true;
  }
  return {
    isIE: isIE,
    isAndroid: isAndroid,
    isIos: isIos,
    isWeiXin: isWeiXin,
    browser: browser,
  };
};
```

2. 跳转操作

```js
let browser = getBrowserInfo();
    var openTime = +new Date();
    if (browser.isIos) {
      window.location.href = 'schema://...';

      var timer = setTimeout(function() {
        if (new Date() - openTime < 2200) {
          //加了200ms基准误差
          window.location.href = 'iso下载链接';
        }
        if (new Date() - openTime > 2200) {
          clearTimeout(timer);
        }
      }, 2000);
    }

    if (browser.isAndroid) {
      window.location.href = 'schemaISO://...';
      var timer = setTimeout(function() {
        if (new Date() - openTime < 2200) {
          //加了200ms基准误差
          window.location.href = 'schemaISO://安卓下载链接';
        if (new Date() - openTime > 2200) {
          clearTimeout(timer);
        }
      }, 2000);
    }

```
