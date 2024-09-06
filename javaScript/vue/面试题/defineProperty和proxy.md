# vue2 Object.defineProperty 和 vue3 proxy 区别

## vue2 Object.defineProperty

```js

var obj = {
  a:1,
  b:2,
  c:{
    a:1,
    b:2
  }
}

function _isObject(v){
  return typeof v === 'object' && v !== null;
}

function observe(obj) {
  for(const k in obj ) {
    let v = obj[k];
    if (_isObject(v)) {
      observe(v);
    }

    Object.defineProperty(obj, k, {
      get(){
        console.log(k, '读取')
        return v;
      }
      set(val){
        if (val !== v) {
          console.log(k, '更改');
          v = val
        }
      }
    })
  }
}

observe(obj)

let v =obj.a;


```

vue3 Proxy

```js
const proxy = new Proxy(obj, {
  get(target, k) {
    let v = target[k];
    console.log(k, "读取");
    return v;
  },
  set(target, k, val) {
    if (target[k] !== val) {
      target[k] = val;
      console.log(k, "更改");
    }
  },
});
```
