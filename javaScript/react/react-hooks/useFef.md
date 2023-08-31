## useRef

```js

import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}

```


工作原理
```
1. <MyInput ref={inputRef} /> 告诉 React 将对应的DOM节点放入 inputRef.current中。但是，这取决于MyInput 组件是否允许这种行为，默认情况是不允许的。
2. MyInput 

```