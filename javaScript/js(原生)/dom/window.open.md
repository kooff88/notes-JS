## window.open 拦截问题

现在浏览器一般会默认拦截除了用户点击之外的 window.open 操作。一般解决方法有在 a 标签中写

```html
<a href="javascript:void(0)">点击</a>
```

但是项目里面有很多 a 标签，并且想在 a 标签触发 window.open 之前执行一些操作，如果放在 ajax 里面会被拦截.

解决方法用 `window.location.href=`

```js
var newWin = window.open(url + "&loading=1", "", "width=1024,height=768"); // 不拦截
$.ajax({
  type: "POST",
  url: "***",
  data: {},
  //async: false,
  success: function (res) {
    // var newWin = window.open(url+"&loading=1",'','width=1024,height=768'); // 拦截
    newWin.location.href = url; // 解决方法
  },
});
```
