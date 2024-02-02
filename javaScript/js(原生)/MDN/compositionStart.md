## compositionstart

文本合成系统，（输入法编辑器） 开始新的输入合成时会触发 compositionstart事件

```html
<div class="control">
  <label for="name"
    >On macOS, click in the textbox below,<br />
    then type <kbd>option</kbd> + <kbd>`</kbd>, then <kbd>a</kbd>:</label
  >
  <input type="text" id="example" name="example" />
</div>

<div class="event-log">
  <label>Event log:</label>
  <textarea readonly class="event-log-contents" rows="8" cols="25"></textarea>
  <button class="clear-log">Clear</button>
</div>

```
```js
const inputElement = document.querySelector('input[type="text"]');
const log = document.querySelector(".event-log-contents");
const clearLog = document.querySelector(".clear-log");

clearLog.addEventListener("click", () => {
  log.textContent = "";
});

function handleEventStart(event) {
  event.target.composing = true; // 防止输入框抖动
  log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
}

function handleEvent(event) {
  log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
}

function handleEventEnd(event) {
  event.target.composing = false;
  log.textContent = log.textContent + `${event.type}: ${event.data}\n`;
}

inputElement.addEventListener("compositionstart", handleEventStart);
inputElement.addEventListener("compositionupdate", handleEvent);
inputElement.addEventListener("compositionend", handleEventEnd);
```