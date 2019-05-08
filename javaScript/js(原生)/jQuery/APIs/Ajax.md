# Ajax 

## Ajax.Request

```
new Ajax.Request(
  url, // 必选项。数据发送的目标地址
  method:method,  // 可选项。数据提交的方式，默认值为get。常用的post。
  parameters:para,  // 当method为get时时可选项，为post时是必选项。
  postBody,  // 可选项。客户端发送的xml格式字符串。如果启用postBody,那么parameters将被忽略。
  asynchronous, // 可选项。指定请求是否异步，默认为true（异步）。
  requestHeaders:["Authorization",''aaa'], // 可选，请求头。
  onComplete: function(data) {}, // 可选项，成功时回调函数。
  onError: function(data){}, 可选项，失败时回调函数。
)
```