# mapValue

## Description
创建一个对象，这个对象的 key 与 object 对象相同，值是通过 iteratee 运行 object 中每个自身可枚举属性名字符串产生的。 iteratee 调用三个参数： (value, key, object)

## Params
`(object, iteratee)`

## Return
`Object`

## Code
```js
function mapValue(object, iteratee) {
  object = Object(object)
  const result = {}

  Object.keys(object).forEach((key) => {
    result[key] = iteratee(object[key], key, object)
  })
  return result
}
```

## Analyze
和 [mapKey](./mapKey.md) 处理过程差不多，只不过这里是针对 `result` 的值做了处理， `mapKey` 是针对 `result` 的 属性做了处理

## Example
```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

console.log(mapValue(obj, (v) => ++v)) // { a: 2, b: 3, c: 4, d: 5 }
```
