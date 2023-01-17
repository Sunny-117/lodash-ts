# mapKey

## Description
反向版 [mapValues](./mapValue.md)。 这个方法创建一个对象，对象的值与 object 相同，并且 key 是通过 iteratee 运行 object 中每个自身可枚举属性名字符串 产生的。iteratee 调用三个参数： (value, key, object)。
``
## Params
`(object, iteratee)`

## Return
`Object`

## Code
```js
function mapKey(object, iteratee) {
  object = Object(object)
  const result = {}

  Object.keys(object).forEach((key) => {
    const value = object[key]
    result[iteratee(value, key, object)] = value
  })
  return result
}
```

## Analyze
通过 `Object.keys` 拿到所有的可遍历 `key` 值数组，通过 `forEach` 遍历，取出当前的 `value` 值

在每次遍历时，`result` 的 `key` 值是 通过传入的 `iteratee` 函数生成的，将拿到的 `value` 值设置给 `result` 对应的 `key`

最终拿到结果 `result`

## Example
```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

console.log(mapKey(obj, (v, k) => `${k}${v}`)) // { a1: 1, b2: 2, c3: 3, d4: 4 }
```
