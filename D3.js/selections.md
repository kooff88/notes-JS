## Selections

选择DOM节点元素 并且添加数据。

`d3.select`: 从页面中选择一个节点。

`select.append`: 创建并且添加一个节点。

`d3.selectAll`: 从页面中选择一组节点。相同名

`select.enter`: 1. 当绑定的数据的数量大于选择的元素的数量时，添加元素使它们完全匹配 2.使数据和元素一一绑定

`slection.datum`: 将指定数据赋值给被选择元素(覆盖)

`slection.data`: 将数据组合与选择的元素结合(集合操作)

`selection.call`: 将当前选择结点传入 某方法中。
```js
function name(selection, first, last) {
  selection
      .attr("first-name", first)
      .attr("last-name", last);
}

// 式子1:
 d3.selectAll("div").call(name, "John", "Snow");

// 式子2:
 name(d3.selectAll("div"), "John", "Snow");

// 式子1 等价于 式子2

```

## Joining Data

`selection.join`: 根据数据 删除或者添加元素。 