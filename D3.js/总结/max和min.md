# 最大值 与 最小值

## max

```tsx
let dataset = [ 30, 20, 52, 2, 11 ];

let result = d3.max( dataset );  

// result = = 52;

let dataset1 = [
 [ 30 , 20 ],
 [ 52 , 2 ],
 [ 90 , 11 ],
]

let result1 = d3.max( dataset1, d = > d[0] )

// result1  90

```

## min 

类似max

