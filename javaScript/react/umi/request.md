## umi3 request 使用经验

拦截器

`requestInterceptors` 请求拦截器
使用示例

```ts
import { RequestInterceptor } from "umi-request";

const ReqInterceptor: RequestInterceptor[] = [
  (url, options) => {
    // ...拦截操作内容

    return {
      url,
      options: {
        ...options,
        data,
      },
    };
  },
];

export default ReqInterceptor;
```

`responseInterceptors` 返回拦截器

使用示例

```ts
import { ResponseInterceptor } from "umi-request";

let resData;

const ResInterceptor: ResponseInterceptor[] = [
  (response) => {
    return response.text().then((res) => {
      return new Promise((resolve, reject) => {
        // ... 一些操作
        resolve(resData);
      });
    });
  },
];

export default ResInterceptor;
```
