# requestAnimationFrame

```
与setTimeout相比， requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，
如果屏幕刷新频率是60Hz, 那么回调函数就每16.7ms被执行一次，如果刷新频率是75Hz,那么这个时间间隔就变成了
1000/75 = 13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统刷新步伐走。它能保证回调函数
在屏幕每一次的刷新间隔中只被执行一次，这样就会引起丢帧现象，也不会导致动画出现卡顿的问题。

```

```
var progress = 0

// 回调函数
function render(){
	progress += 1; // 修改图像的位置

	if (progress < 100) {
		 // 在动画没有结果前，递归渲染
		 window.requestAnimationFrame(render);
	}
}

// 第一帧渲染
window.requestAnimationFrame(render)

```

优势：

```
1. cpu节能： 当页面被最小化时，setTimeout仍然在执行动画任务。requestAnimationFrame则不同，当页面处理未激活
						的状态，屏幕刷新任务也会被系统暂停。所以页面最小化时，动画任务也停止，节省了cpu开支。

2. 函数节流： 在高频率事件(resize, scroll等)中，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，
						这样既能保证流畅性，也能更好的节能函数执行的开销。

```

另外总结

```
1. 屏幕刷新频率: 屏幕每秒出现图像的次数，普通笔记本为60Hz

2. 动画原理： 计算机每16.7ms 刷新一次，由于人眼的视觉停留， 所以看起来是流畅的移动。


```
