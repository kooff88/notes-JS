## createElementNS

创建一个具有指定的命名空间 URI 和限定名称的元素.

要创建一个元素而不指定命名空间 URI，请使用`createElement`方法。

### 有效的命名空间 URI

```
    HTML - 参阅 http://www.w3.org/1999/xhtml
    SVG - 参阅 http://www.w3.org/2000/svg
    XBL - 参阅 http://www.mozilla.org/xbl
    XUL - 参阅 http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul

```

SVG 示例

```
    document.createElementNS("http://www.w3.org/2000/svg","g")

```
