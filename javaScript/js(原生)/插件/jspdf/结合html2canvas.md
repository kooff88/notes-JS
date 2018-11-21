# 结合 图片

依赖库: html2canvas , jspdf

```js
	html2canvas(document.body).then(function(canvas) {
      document.body.appendChild(canvas);
      var dataURL = canvas.toDataURL("image/png");
      var doc = new jsPDF('p','pt', 'a4');
      console.log('dataURL',dataURL)
      
      // doc.setFont("times")
      // doc.setFontType("italic")
  
      // doc.text(20, 20, 'This is the default font.');
      doc.setFontSize(40);
      doc.text(35, 25, "Octonyan loves jsPDF");
      doc.addImage(dataURL, 'PNG', 59, 80, 180, 180);
      doc.save('Test.pdf');
    });

```
