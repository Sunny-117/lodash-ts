# mapObject

## Description
通过 iteratee 处理对象的每个属性来创建一个值数组。
iteratee 有三个参数:(value, key, object)。

## Params
`(object, iteratee)`

## Return
`Array`

## Code
```js
function mapObject(object, iteratee) {
  const props = Object.keys(object)
  const result = new Array(props.length)

  props.forEach((key, index) => {
    result[index] = iteratee(object[key], key, object)
  })
  return result
}
```

## Analyze
通过 `Object.keys` 拿到可遍历的属性数组，然后 通过 `forEach` 给 `result` 对应的 索引 赋值，值是由 `iteratee` 函数返回的结果

## Example
```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

console.log(mapObject(obj, (v) => ++v)) // [ 2, 3, 4, 5 ]
```
