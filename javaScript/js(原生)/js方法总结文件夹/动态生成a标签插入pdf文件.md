# 动态生成a标签插入pdf文件

可传递请求头信息　  
code 
```js
import axios from 'axios';

export function getPDF(params, elementId, url){
	let token = localStroage.getItem('token');
	axios({
		method: 'get',
		url: `${url}?params=${params}`,
		headers: { token: token },
		responseType:"arraybuffer"
	}).then(res => {
		let blob = new Blob([res.data], { type: "application/pdf" });
		let objectUrl = URL.createObjectURL(blob);

		let a = document.createElement('a');
		a.href = objectUrl;
		a.target = "view_window";
		document.getElementById(elementId).appendChild(a);
		a.click();
		a.remove();
	})
} 

```