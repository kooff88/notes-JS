# Juicer

Juicer 是一个高效，轻量的前端(Javascipt)模板引擎，使用Juicer可以是你的代码实现数据和试图模型的  

分离(MVC)。除此之外，它还可以在Node.js环境中运行。  

## 例子

```
<script type="text/javascript" src="juicer-min.js></script>


HTML 代码:
	
	<div id="example"></div>

<script id="tpl" type="text/template">
	<ul>
		{@each list as it,index}
			<li>${it.name} (index: ${index})</li>
		{@/each}
		{@each blah as it}
			<li>
				num: ${it.num} <br />
				{@if it.num==3}
					{@each it.inner as it2}
						${it2.time} <br />
					{@/each}
				{@/if}
			</li>
		{@/each}
	</ul>
</script>

Javascript 代码:

var data = {
	list: [
		{name:' guokai', show: true},
		{name:' benben', show: false},
		{name:' dierbaby', show: true}
	],
	blah: [
		{num: 1},
		{num: 2},
		{num: 3, inner:[
			{'time': '15:00'},
			{'time': '16:00'},
			{'time': '17:00'},
			{'time': '18:00'}
		]},
		{num: 4}
	]
};

var tpl = document.getElementById('tpl').innerHTML;
var html = juicer(tpl, data);

$('#example').append(html);
```
