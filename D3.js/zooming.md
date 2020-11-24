# Zooming (d3-zoom)

缩放
```js
let svg = d3.select("body")
		.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.call(d3.zoom().on("zoom",() => {
			return svg.attr("transform", d3.event.transform)
		}))

```