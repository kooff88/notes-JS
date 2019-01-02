# setTimeout

尽量使用setTimeout

```html
<!DOCTYPE html>
<html>
<head>
	<title>使用setTimeout</title>
</head>
<body>
	<div>sada</div>
	<script type="text/javascript">
			
			var num = 0;
			var max = 10;
			var intervalId = null;

			function incrementNumner(){
				num++;

				if (num < max) {
					setTimeout(incrementNumner,500);
					console.log('num',num)
				} else {
					alert("Done!");
				}
			}
			setTimeout(incrementNumner, 500);

	</script>
</body>
</html>

```