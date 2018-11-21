# 垂直水平居中


### 方法1: table-cell

```html
	<div class='box box1'>
		<span>垂直居中</span>
	</div>
```

```css
	.box1 {
		display: table-cell;
		verticle-align: middle;
		text-align: center;
	}

```

### 方法2: display:flex

```css
	display: flex;
	justify-content: center;
	align-items: center;
```

### 方法3: 绝对定位和负边距

```css
	.box3 {
		position: relative;
	}

	.box span {
		position: absolute;
		width: 100px;
		50px;
		top: 50%;
		left:50%;
		margin-left: -50px;
		margin-top: -25px;
		text-align:center;
	}

```


### 方法4: 绝对定位和0

```css
	box4 span {
		width: 50%;
		height: 50%;
		bacground: #000;
		overflow: auto;
		margin: auto;
		position: absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
	}

```

这种方法跟上面的有些类似，但是这里是通过margin:auto和top,left,right,bottom都设置为0实现居中。  
不过这里得确定内部元素的高度，可以用百分比，比较适合移动端。   

### 方法5: translate

```css
	.box span {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

```

这实际上是方法3的变形，移位是通过translate来实现的。  

### 方法6: display: inline-block

```css
	.box7 {
		text-align: center;
		font-size: 0;
	}

	.box span {
		verticle-align: middle;
		display:inline-block;
		font-size: 16px;
	}
	.box:after {
		content:'';
		width:0;
		height:100%;
		display:inline-block;
		verticle-align:middle;
	}

```

这种方法确实巧妙...通过:after来占位。

### 方法7: display: flex和margin: auto

```css
.box8 {
	display: flex;
	text-align: center;
}

.box span {
	margin: auto;
}

```


### 方法8: display: -webkit-box

```css

.box9 {
	display: -webkit-box;
	-webkit-box-pack: center;
	-webkit-box-align:center;
	-webkit-box-orient:verticle;
	text-align:center;
}

```