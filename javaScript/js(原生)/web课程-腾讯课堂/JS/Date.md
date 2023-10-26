## Date


```js
var date = new Date();



minutes: <input/>
seconds: <input/>


var minutesNode = document.getElementsByTagName('input')[0];
var secondesNode = document.getElementsByTagName('input')[1];

var minutes = 0,
    seconds = 0;

var timer = setInterval( function(){
    seconds ++;
    if ( seconds == 60 ) {
      seconds = 0;
      minutes ++
    }

    secondsNode.value = seconds;
    minutesNode.value = minutes;
    if ( minutes == 3 ) {
      clearInterval(timer);
    }

},1000)

```