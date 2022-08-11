## WeekSet

weekSet 对象允许你将保持对象存储在一个集合中。

```js
var ws = new WeakSet();
var foo = {};
var bar = {};

ws.add(foo);
ws.add(bar);

ws.has(foo);    // true
ws.has(bar);   // true

ws.delete(foo); // 从 set 中删除 foo 对象
ws.has(foo);    // false, foo 对象已经被删除了
ws.has(bar);    // true, bar 依然存在

```

### 描述 

WeakSet 对象是一些对象值的集合，并且其中的每个对象值都只能出现一次。

它 和 Set 对象的区别有两点:

```
1. 与Set对比， WeakSet 只能是对象的集合，而不能是任何类型的任意值。
2. WeakSet持弱引用：集合中对象的引用为弱引用。 如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着 WeakSet 中没有存储当前对象的列表。 正因为这样，WeakSet 是不可枚举的。

```

为此，WeakSet 非常适合处理这种情况：

```js
function execRecursively( fn, subject, _refs = null ) {
    if ( !_refs ) _refs = new WeakSet();

    if (_refs.has( subject )) return;

    fn(subject);
    if ( "object" === typeof subject ) {
        _refs.add( subject );
        for ( let key in  subject ) {
            execRecursively( fn, subject[key], _refs);
        }
    }
}

const foo = {
    foo:"Foo",
    bar: {
        bar: "Bar"
    }
}

foo.bar.baz = foo; // 循环

execRecursively(obj => console.log(obj), foo)

```