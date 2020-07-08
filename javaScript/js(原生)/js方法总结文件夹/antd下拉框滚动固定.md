## antd 中的 Select, AutoComplete 下拉框 不跟随下拉框移动

解决方案参考下面示例

```js
import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Select, version } from "antd";
import "antd/dist/antd.css";

const Option = Select.Option;

const Hello = () => (
  <div style={{ margin: 10, overflow: "scroll", height: 200 }}>
    <h2>Select in a scrollable area</h2>
    <div
      style={{
        padding: 100,
        height: 1000,
        background: "#eee",
        position: "relative",
      }}
      id="area"
    >
      <h4>可滚动的区域 / scrollable area</h4>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        getPopupContainer={() => document.getElementById("area")}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="yiminghe">yiminghe</Option>
      </Select>
    </div>
  </div>
);

ReactDOM.render(<Hello />, document.getElementById("root"));
```
