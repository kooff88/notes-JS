## csv-loader

React 中使用 csv.loader,  即可以加载 csv文件

```ts
export default (config: any) => {
  config.module
    .rule('csv-loader')
    .test(/\.csv$/)
    .pre()
    .use('csv-loader')
    .loader('csv-loader')
    .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
    })  
};

```



```js

const config = {
  module: {
    rules: [
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  }
};
```