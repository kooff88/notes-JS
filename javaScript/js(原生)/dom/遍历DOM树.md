## 遍历DOM树，打印所有元素tagName


```js
//深度优先
function deepLogTagNames( parentNode ) {
	console.log(parentNode.tagName);

	const childNodes = parentNode.childNodes;
  // 过滤没有tagName的节点，遍历输出
	Array.prototype.filter.call(childNodes, item => item.tagName)
	.forEach(itemNode => {
		deepLogTagNames(itemNode)
	})
}

deepLogTagNames(document.body);


// 广度优先
function breadLogTagNames(root) {
	const queue = [root];
	while (queue.length) {
		const currentNode = queue.shift();

    const { childNodes, tagName } = currentNode;
		tagName && console.log(currentNode.tagName);
		// 过滤没有tagName的节点
		Array.prototype.filter.call(childNodes, item => item.tagName)
		.forEach(itemNode => {
			queue.push(itemNode);
		})
	}
}

breadLogTagNames(document.body);

```