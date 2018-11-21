# 利用@media screen实现网页布局自适应

- 优点： 无需插件和手机主题，对移动设备友好，能够适应各种窗口大小。  
        只需在CSS中添加@media screen属性，根据浏览器宽度判断并输出不同的长宽值  
        以下是针对自用主题而写的css,对宽度768以下设备只保留主要文章框架,以便在有限的空间里获得最佳阅读体验  

```
@media screen and (min-width:1200px){
  #page{ 
    width: 1100px;
  }
  #content,
    .div1{
    width: 730px;
  }
  #secondary{
    width:310px
  }
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
  #page{ width: 960px; }#content,.div1{width: 650px;}#secondary{width:250px}select{max-width:200px}
}
@media screen and (min-width: 768px) and (max-width: 959px) {
  #page{ width: 900px; }#content,.div1{width: 620px;}#secondary{width:220px}select{max-width:180px}
}
@media only screen and (min-width: 480px) and (max-width: 767px){
  #page{ width: 450px; }#content,.div1{width: 420px;position: relative; }#secondary{display:none}#access{width: 450px; }#access a {padding-right:5px}#access a img{display:none}#rss{display:none}#branding #s{display:none}
}
@media only screen and (max-width: 479px) {
  #page{ width: 300px; }#content,.div1{width: 300px;}#secondary{display:none}#access{width: 330px;} #access a {padding-right:10px;padding-left:10px}#access a img{display:none}#rss{display:none}#branding #s{display:none}#access ul ul a{width:100px}
}
```


