# filterObject

## Description
和 [filter](./filter.md) 基本一致，只不过换成了 object
## Params
`(object, predicate)`
## Return
`Array`

## Code
```js
function filterObject(object, predicate) {
  object = Object(object)
  const result = []

  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (predicate(value, key, object)) {
      result.push(value)
    }
  })
  return result
}
```
## Analyze
也就是通过 `Object.keys` 拿到 `object` 的可遍历属性数组，然后 `forEach` ，根据 `predicate` 的返回结果，将 `value` 放到 `result` 数组中，最后返回 `result`
## Remark
1. [Array.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法对数组的每个元素执行一次给定的函数
## Example
```js
console.log(filterObject({a:1,b:2,c:3}, (v) => v&1)) // [ 1, 3 ]
```
