# findKey

## Description
findKey 可以传入一个 object 和断言函数 predicate ， 返回第一个找到元素的 key ，predicate（断言函数）调用 3 个参数： (value, index|key, collection)。
## Params
`(object, predicate)`
## Return
`{string|undefined}`

## Code
```js
function findKey(object, predicate) {
  let result
  if (object == null) {
    return result
  }
  Object.keys(object).some((key) => {
    const value = object[key]
    if (predicate(value, key, object)) {
      result = key
      return true
    }
  })
  return result
}
```
## Analyze
如果 `object` 为 `null` 或者 `undefined` ，则返回 `undefined` 

使用 `Object.keys` 拿到属性数组，然后通过 `some` 遍历，拿到第一个 符合 `predicate` 条件的 `key` ，最终返回

如果最终都没有找到，返回 `undefined`
## Remark
1. [Array.prototype.some() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
## Example
```js
console.log(findKey({a:1,b:2,c:3,d:4}, (v) => v>3)) // d
```
