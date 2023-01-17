# filter

## Description
遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。 predicate（断言函数）调用三个参数：(value, index|key, collection)。
## Params
`(array, predicate)`
## Return
`Array`

## Code
```js
function filter(array, predicate) {
  let index = -1
  let resIndex = 0
  const length = array == null ? 0 : array.length
  const result = []

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result[resIndex++] = value
    }
  }
  return result
}
```
## Analyze
和 `Array.prototype.filter` 基本一致，接下来看看具体实现

首先拿到了 `array` 的 `length` ，定义了结果 `result` 

通过 `while` 循环，根据 `predicate` 判断，如果 返回 值为 真值，则将 `value` 放到 `result` 对应的索引中

最后 `while` 循环完成，返回 `result`
## Remark
1. [Array.prototype.filter MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
## Example
```js
console.log(filter([1,2,3,4,5], (v) => v>3)) // [ 4, 5 ]
```
