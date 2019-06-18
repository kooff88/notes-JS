# URLSearchParams 配合 axios 提交重复的参数

- URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。其中 URLSearchParams.append() 插入一个  
  指定的键/值对作为新的搜索参数，这个方法可以插入重复的值，但当使用 URLSearchParams.set() 设置同名键值时会  
  覆盖前面的值。  

```js
const params = new URLSearchParams();

params.append('date', '2018')
params.append('date', '8')
params.append('date', '13')
params.set('name', 'mazey')

axios({
  method: 'get',
  url: '/',
  params
}).then((res) => {
   console.log(res.status) // 200
})

// 请求链接为 : http://localhost:8081/?date=2018&date=8&date=13

```