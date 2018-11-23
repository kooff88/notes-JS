# animation

语法:   

```
  animation: name duration timing-function delay iteration-conut direction;
```


子属性:  

> animation-name  
> animation-duration  
> animation-timing-function  
> animation-delay  
> animation-iteration-count  
> animation-direction  

animation-name 指定@keyframes的名字,CSS加载时会应用该名字的@keyframes规则来实现动画  

animation-duration动画持续时间,默认时0表示无动画，单位可以是s秒或ms毫秒  

animation-timing-function动画播放方式，默认值ease,可以设linear,ease,ease-in,ease-out,ease-in-out,cubic-bezier(n,n,n,n),steps.  

animation-delay延迟开市动画时间，默认时0,表示不延迟，立即播放动画。单位时s秒或ms。允许设负时间，意思是让动画从时间点开始启动，之前的动画不现实  

例如-2s使用动画马上开始，但2秒的动画被跳过。

animation-iteration-count动画循环播放的次数，默认值是1，即放完一遍后不循环播放，除数字外也可以设关键字infinite表示无限次播放  

animation-direction动画播放的方向，可设normal,alternate,alternate-reverse.默认值是normal表示动画正常播放。alternate表示轮转反向播放  
动画，即动画会在奇数次(1,3,5...)正常播放，而在偶数次(2,4,6...)反向播放。alternate-reverse正常反过来，奇数次反向播动画，偶数次正向播动画。  

```
.myDIv1 {
  width : 75px;
  height:75px;
  background-color:red;
  position:relative;
  animation:aDirection 5s infinite;
}
@keyframes aDirection {
  from {left:0px;}
  to {left:200px;}
}

.alter { animation-direction:alternate; }
.alterR { animation-derection:alternate-reserve }

<div class="myDiv1"></div>
<div class="myDiv1 alter"></div>
<div class="myDiv1 alterR"></div>
```


闪烁：text-decoration : blink;  

```
@keyframes blink {
  to { color: transparent }  //文字色平滑过渡到透明
}
.blink {
  animation .5s blink 6; //触发动画6次，因为设了alternate,所以看上去闪烁了3次
  animation-direction : alternate;
}
```

animation-play-state动画的状态，可设running,paused。默认值running表示正在播放动画。paused表示暂停动画。通常在js端使用该属性  
object.style.animationPlayState="paused" 来暂停动画。

animation-fill-mode动画的时间外属性，可设none,forwards,backwords,both。默认值none表示动画播完后，恢复到初始状态。forwards当  
动画播完后，保持@keyframes里最后一帧的属性。backwords表示开始播动画时，应用@keyframes里第一帧的属性，要看出效果，通常要设animation-delay  
延迟时间。both表示forwards和backforwards都应用。

例如设置2s的延迟时间。初始为红色，第一帧动画变为绿色，最后一帧动画变为蓝色。

```
.myDiv2 {
    width: 75px;
    height: 75px;
    background-color: red;
    position:relative;
    animation:mymove 5s 1 2s;
}

@keyframes mymove {
  from { left:0; background-color:green; }
  to {left:200px;backfround-color:blue;}
}
.forwards { animation-fill-mode:forwards; }
.bkforwards { animation-fill-mode:backwards; }
.both { animation-fill-mode:both }

<div class="myDiv2"></div>
<div class="myDiv2 forwards"></div>
<div class="myDiv2 bkforwards"></div>
<div class="myDiv2 both"></div>
```

@keyframes动画帧就是区别animation和transition的关键。在transition中是无法更细致地控制时间段内执行的动作的，而在animation中用@keyframes   
可以细致的指定第一帧要干什么，第二帧要干什么。  

语法：@keyframes开头，后接animation-name。实体内可以创建%百分比来划分时间段。关键字from等于0%,to等于100%.  

```
@keyframes mymove {
  0%   {top:0;left:0;background:red;}
  25%  {top:0;left:100px;background:blue;}
  50%  {top:100px;left:100px;background:yellow;}
  75%  {top:100px;left:0;background:green;}
  100%  {top:0;left:0;background:red;}
}
```

ps: @keyframes只是定义了一个动画效果，但是要使动画生效，必须用animate属性将动画绑定到具体某DOM元素上才行  

你可以单独指定上面这些子属性，也可以像background等属性一样，合并在animation属性里指定。例如:  

> animation:moveten 1s step(10,end) infinite alternate 3s backwords;

但合并时需要注意，因为有animation-duration和animation-delay都是时间，浏览器会根据先后顺序，将第一个时间人作为animation-duration,  
第二个时间认作为animation-delay  

分开指定可能代码清晰点，但因为页面需要适应各浏览器时，每个都要加上-ms，-moz等前缀的话代码会变的很多，合并在一起代码稍微少点。  

量外也可以同时指定多个动画效果，例如 animation: moveten1 1s ease .5s,moveten2 2s ease 1s forwards;


text-decoration: alternate 表示动画会在奇数次数(1,3,5等等)正常播放，而在（2，4，6等等）向后播放。 





