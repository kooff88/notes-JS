# doc(x) 转 html

js 库

```html
<input
  id="wordFile"
  accept=".docx"
  class="hide"
  type="file"
  @change="getWordFile"
/>

---

<script>
  var mommonth = require('mammoth')

  getWordFile (e){
    const file = e.target?.files[0]
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function (evt){
       const arrayBuffer = evt.target.result
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then((res) => {
          console.log(res)
        })
    }
  }
</script>
```
