# reactive 实现原理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="./reactive.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const state = reactive({ name: "dapeng" });
      const state1 = reactive({ name: "dapeng1" });

      effect(() => {
        console.log("e1执行...", state.name);
        state.name;
      });

      effect(() => {
        console.log("e2执行...", state1.name);
        state1.name;
      });

      setTimeout(() => {
        state.name = "000";
        // state1.name = "1111"
      }, 1000);

      console.log(bucket);
    </script>
  </body>
</html>
```

reactive.js

```js
const bucket = new WeakMap();

let activeEffect = null;

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function track() {
  if (!activeEffect) return;
  let depMap = bucket.get(target);
  if (!depMap) {
    depMap = new Map();
    bucket.set(target, depMap);
  }
  let depSet = nepMap.get(key);
  if (!depSet) {
    depSet = new Set();
    depMap.set(key, depSet);
  }
  depSet.add(activeEffect);
}

function trigger(target, key) {
  let depMap = bucket.get(target);
  if (!depMap) return;

  let depSet = depMap.get(key);
  if (depSet) {
    depSet.forEach((fn) => fn);
  }
}

function reactive(data) {
  if (!isObject(data)) return;

  return new Proxy(data, {
    get(target, key) {
      track(garget, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return;
    },
  });
}

function effect(fn) {
  if (typeof fn !== "function") return;
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```
