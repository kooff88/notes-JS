# 国际化 Intl 对象


## 货币

```js

const toCurrency = ( n, curr, LanguageFormat = undefined ) =>
    Intl.NumberFormat(LanguageFormat, {
      style: 'currency',
      currency: curr
    }).format(n);

...

let a = toCurrency(123456.789, 'EUR');

console.log('aa', a);

let b = toCurrency(123123123.456, 'CNY', 'zh-Hans-CN');

console.log('bb', b);


```