# pdf2json 将pdf文件转为文本  


[链接](https://github.com/modesty/pdf2json)  


## 结合express使用

```

var fs = require('fs');
var express = require('express');
var multer = require('multer');
const PDFParser = require("pdf2json");
const os = require('os');
const path = require('path');
var router = express.Router();
var upload = multer({ dest: 'upload/' }).any();

router.post('/api/upload-file', function (req, res, next) {
  upload(req, res, function (err) {
    //添加错误处理
    if (err) {
      console.log(err);
      return;
    }
    req.file = req.files[0];
    var tmp_path = req.file.path;
    var target_path = 'uploads/' + req.file.originalname;

    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/');
    }

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    var pdfParser = new PDFParser(this, 2);
    console.log('dest', dest.path);
    pdfParser.loadPDF(tmp_path);
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let dt = pdfParser.getRawTextContent();
      res.json({
        dt: dt,
      });
    })
  });
});

module.exports = router;

```