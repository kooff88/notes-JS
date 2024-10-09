# 监听 storage

```js
window.addEventListener("storage", (e) => {
  if (e.key === "key") {
    // 变化的 storage key
    if (e?.newValue !== something) {
      // 变化storage value
      // 做些其他的逻辑处理
    }
  }
});
```
