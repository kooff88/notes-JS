# 示例

一：  

```js
	import jsPDF from 'jspdf';

	let doc = new jsPDF('p','pt', 'a4');
	doc setFont('times')
	doc.setFontType("italic")

	doc.text(20,20, 'This is the times font.')

	doc.save('Test.pdf');
```
