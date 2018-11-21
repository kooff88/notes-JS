# kindeditor文本编辑器

 - [下载地址](http://kindeditor.net/down.php)  

### 使用


```html

<script src="../kindeditor.js"></script>

...

<textarea cols="0" rows="5" name="introduction" class="form-control" id="demo"></textarea>
<p class="word_count1"></p>
...

<script type="text/javascript">
	initkindEditor();

	function initkindEditor(){
		KindEditor.ready(function(K){
			var editor = K.create('#demo', {
				themeType:"simple",
				uploadJson: 'jsp/upload_json.jsp', //或者写自己的后台接口存储图片
				resizeType: 1,
				pasteType:2,
				syncType: "",
				filterMode: true,
				allowPreviewEmoticons:false,
				items:['source', 'undo', 'redo', 'plainpaste', 'wordpaste', 'clearhtml', 'quickformat',
                    'selectall', 'fullscreen', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor',
                    'bold', 'italic', 'underline', 'hr', 'removeformat', '|', 'justifyleft', 'justifycenter',
                    'justifyright', 'insertorderedlist', 'insertunorderedlist', '|', 'link', 'image',
                    'unlink', 'baidumap', 'emoticons','table'
                ],
                afterCreate: function (){
                	this.sync();
                },
                afterBlur: function(){
                	this.sync();
                },
                afterChange: function(){
                	// 富文本输入区域的改变事件，一般用来编写统计字数等判断
                	K('.word_count1').html("最多20000个字符，已输入" + this.count() + '个字符');
                },
                afterUpload: function(url){
                	// 上传图片后的代码
                },
                allowFileManager: false,
                allowFlashUpload: false,
                allowMediaUpload: false,
                allowFileUpoad: false
			})
		})
	}
</script>

```