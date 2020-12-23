## 语句

语句是任何编程语言的基础结构，与 JavaScript 对象一样，JavaScript 语句同样具有“看起来很像其它语言，但是其实一点都不一样”的特点。

常见语句： 变量声明、表达式、条件、循环。

JavaScript 语句执行机制涉及的一种基础类型：Completion 类型。

### Completion 

```js

function foo(){
  try{
    return 0;
  } catch(err) {

  } finally {
    return 1;
  }
}

console.log(foo());
```

finally 中的 return “覆盖”了 try 中的 return。

这一机制的基础正是 JavaScript 语句执行的完成状态，我们用一个标准类型来表示：  
Completion Record（我在类型一节提到过，Completion Record 用于描述异常、跳出等语句执行过程）  

Completion Record 表示一个语句执行完之后的结果，它有三个字段：

```
[[type]] 表示完成的类型， 有break continue return throw和 normal几种类型。
[[value]] 表示语句的返回值，如果语句没有，则是empty;
[[target]] 表示语句的目标， 通常一个Javascript标签
```

### 语句块

```js
// Completion Record
{
  var i = 1; // normal, empty, empty
  i ++; // normal, 1, empty
  console.log(i) //normal, undefined, empty
} // normal, undefined, empty
```

```js
{
  var i = 1; // normal, empty, empty
  return i; // return, 1, empty
  i ++; 
  console.log(i)
} // return, 1, empty

//这个结构就保证了非 normal 的完成类型可以穿透复杂的语句嵌套结构，产生控制效果。
```

### 控制型语句

控制类语句分成两部分，一类是对其内部造成影响，如 if、switch、while/for、try。

另一类是对外部造成影响如 break、continue、return、throw，

这两类语句的配合，会产生控制代码执行顺序和执行逻辑的效果，这也是我们编程的主要工作。

一般来说， for/while - break/continue 和 try - throw   
实际上，我们需要控制语句跟 break 、continue 、return 、throw 四种类型与控制语句两两组合产生的效果。  

而当 finally 执行也得到了非 normal 记录，则会使 finally 中的记录作为整个 try 结构的结果。

```
穿透和消费，报错应该是连贯的，“穿透”就是指不在当前这一层处理，向外逐层寻找可以“消费”的那一层，直到最后都没找到就报错

消费指对应的代码被有效的执行了，穿透指对应代码被跳过了，也就是对应控制的语句体被有效执行比如try catch,当try中出现了throw,
能被有效捕获进而执行catch，这在我理解就是try被消费执行了，而当catch中还有throw时，由于catch不具备处理throw的能力，
于是catch被中断跳出，也就是作者所说的穿透，希望能帮到你
```


### 带标签的语句

`firstStatement: var i = 1;` 大部分时候，这个东西类似于注释，没有任何用处

```js
	outer: while(true) {
		inner: while(true) {
				break outer;
		}
	}
	console.log("finished")
```

break/continue 语句如果后跟了关键字，会产生带 target 的完成记录。  
一旦完成记录带了 target，那么只有拥有对应 label 的循环语句会消费它。  

