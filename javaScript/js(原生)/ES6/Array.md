## Array数组相关

### Array.fill

使用定制的元素填充数组，其实就是用默认内容初始化数组。

```

arr.fill( value, start, end );

value: 填充值
start: 起始位置
end: 结束位置

```

示例：

```js
const arr1 = [1,2,3,4,5,6,7,8,9]

arr1.fill(7);
// 7,7,7,7,7,7,7,7,7

arr1.fill(7,2,5);

// 1,2,7,7,7,6,7,8,9

```