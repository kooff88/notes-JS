# webpack@4 mode

mode 分为development/production，默认为production。  
common 指两个配置项都存在的属性。  

### common 

```js
	// parent chunk中解决了的chunk会被删除
	optimization.removeAvailableModules: true

	// 删除空的chunks
	optimization.removeEmptyChunks:true

	// 合并重复的chunk
	optimization.mergeDuplicateChunks: true

```


### development
```js

   // 调试
   devtool:eval

   // 缓存模块，避免在未更改时重建它们。
   cache: true

   // 缓存已解决的依赖项，避免重新解析它们
   module.unsafeCache: true

   // 在 bundle中引入[所包含模块信息]的相关注释
   output.pathinfo: true

   // 在可能的情况下确定每个模块的导出，被用于其他优化或代码生成。
   optimization.providedExports:true

   // 找到chunk中共享的模块，取出来生成单独的chunk
   optimization.splitChunk:true

   // 为webpack运行时代码创建单独的chunk
   optimization.runtimeChunk: true

   // 编译错误时不写入到输出
   optimization.noEmitOnErrors:true

   // 给模块有意义的名称代替ids
   optimization.namedModules: true

   // 给模chunk有意义的名称代替ids
   optimization.namedChunks:true

```


### production

```js
	// 性能相关配置
	performance: {hints: "error"...}

	// 某些chunk的子chunk已一种方式被确定和标记，这些子chunks在加载更大的块时不必加载
	optimization.flagIncludedChunks: true

	// 给经常使用的ids更短的值
	optimization.occurrenceOrder: true

	// 确定每个模块下被使用的导出
	optimization.usedExports:true

	// 识别package.json or rules sideEffects标志
	optimization.sideEffects: true

	// 尝试查找模块图中可以安全连接到单个模块中的段。
	optimization.concatenateModules: true

	// 使用uglify-js压缩代码
	optimization.minimize: true

```


