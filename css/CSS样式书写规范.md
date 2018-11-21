# 样式书写规范

- CSS样式一些规则  
  
##编码设置

```
 @charset "utf-8";
```

## 命名空间规范

- 布局:以g为命名空间，例如: .g-wrap, .g-header, .g-content   
- 状态:以s为命名空间,表示动态的，具有交互性质的状态,例如:.s-current, .s-selected   
- 工具:以u为命名空间，表示不耦合业务逻辑的，可复用的工具，例如：u-clearfix,u-dropMenu    
- 组件:以m为命名空间,以m为命名空间,表示可复用的，移植的组件模块，例如 m-slider,m-dropMenu   
- 钩子:以j为命名空间，以j为命名空间，表示特定给javascript调用的类名，例如:j-request,j-open    


## CSS书写顺序

1. 位置属性（position, top, right, z-index, display, float等）  
2. 大小（width, height, padding, margin）
3. 文字系列（font, line-height, letter-spacing, color, text-align等）
4. 背景（background, border等）  
5. 其他（animation, transition等）


```css

// 不好的书写方式 
	.example {
		color: red;
		z-index: -1;
		background-color: #9e0;
		display: inline-block;
		font-size: 1.5em;
	}

// 好的书写方式
	.example {
		x-index: -1;
		display: inline-block;
		font-size: 1.5em;
		color: red;
		background-color: #9e0;
	}

```


## 使用CSS缩写属性

CSS有些属性是可以缩写的，比如padding,margin,font等等，这样精简代码同时又能提高用户的阅读体验。  

```css
	// 不好的书写方式

	.list-box {
		border-top-style: none;
		font-family:serif;
		font-size: 100%;
		line-height:1.6;
		padding-bottom: 2em;
		padding-left: 1em;
		padding-right: 1em;
		padding-top: 0;
	}

	// 好的书写方式 

	.list-box {
		border-top: 0;
		font: 100%/1.6 serif;
		padding: 0 1em 2em;
	}

```

## 去掉小数点前的“0”  

```css
	font-size: 0.8em;   =>  font-size: .8em;

```

## 简写命名

很多用户都喜欢简写类名，但前提是要让人看懂你的命名才能简写！  

```css
 // 待优化
 .navigation{
 	margin: 0 0 1em 2em;
 }
 .atr {
 	color: #93c;
 }

 // 优化后
 .nav {
 	margin: 0 0 1em 2em;
 }
 .author {
 	color: #93c;
 }

```

## 16进制颜色代码缩写

有些颜色代码是可以所写的.  

```css
	color: #eebbcc  => color: #ebc;

```

##  连字符CSS选择器命名规范

1. 长名称或词组可以使用中横线来为选择器命名。  
2. 不建议使用" _ " 下划线来命名CSS选择器，为啥？  
  输入的时候少按一个shift键；  
  浏览器兼容问题（比如使用_tips的选择器命名，在IE6是无效的）  
  能良好区分JavaScript变量命名（JS变量命名是用" _ "）  

```css
	
	// 不好的书写方式
	maintitle {
		color: #e3c;
	}
	main_title {
		color：#e3c;
	}

	// 好的书写方式

	main-title {
		color: #e3c;
	}


```


## 不要随意用ID

id 在JS是唯一的，不能多次使用，而使用class类选择器却可以重复使用，另外id的优先级优先于class，  
所以id应该按需使用，而不能滥用。  

```css
	
	// 不好
	#info-title {
		font-size: 3em;
	}

	// 改进

	.info-title {
		font-size: 3em;
	}

```


## 为选择器添加状态前缀

有时候可以给选择器添加一个表示状态的前缀，让语义更明了，比如下图是添加了 ".is-"前缀。  

```css
	.withdrawal{
		background-color: #ccc;
	}

	.is-withdrawal {
		background-color: #ccc;
	}

```

CSS命名规范（规则）常用的CSS命名规则  

| 内容 | 命名  |
|------|--------|
| 头   | header|
| 内容 | content/container |
| 尾   | footer|
| 导航 | nav   |
| 侧栏 | sidebar|
| 栏目 | column|
| 页面外围控制整体布局宽度   | wrapper|
| 左右中   | left right center|
| 登陆条  | loginbar|
| 标志   | logo|
| 广告   | banner|
| 页面主体  | main |
| 热点   | hot |
| 新闻   | news|
| 下载   | download|
| 子导航 | submenu|
| 搜索   | search |
| 友情链接   | friendlink |
| 页脚   | footer|
| 版权   | copyright|
| 滚动  | scroll|
| 内容  | content|
| 标签  | tags |
| 文章列表  | list|
| 提示信息  | msg |
| 小技巧  | tips |
| 栏目标题  | title |
| 加入  | joinus |
| 指南  | guide  |
| 服务  | service|
| 注册  | regsiter|
| 状态  | status|
| 投票  | vote |
| 合作伙伴  | partner|


## 注释的写法

```
/* Header */

内容区

/* End Header */

```

## 注意事项：

1. 一律小写；  
2. 尽量用英文；  
3. 不加下划线；
4. 尽量不缩写，除非一看就明白的单词。  

## CSS样式表文件命名

| 名称 | 命名 |
|------|------|
|主要的|master.css|
|模块  |module.css|
|基本共用|base.css|
|布局，版面|layout.css|
|主题  |themes.css|
|专栏  |columns.css|
|文字  |font.css|
|表单  |forms.css|
|补丁  |mend.css|
|打印  |print.css|
