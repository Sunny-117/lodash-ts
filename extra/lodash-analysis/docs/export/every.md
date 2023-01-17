# every

## Description
检查 array 中的所有元素是否返回 truthy。一旦 predicate 返回 falsey，则停止迭代。predicate 的调用有三个参数。(value, index, array).
## Params
`(array, predicate)`
## Return
`Boolean`

## Code
```js
function every(array, predicate) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false
    }
  }
  return true
}
```
## Analyze
和 `Array.prototype.every` 用法基本一致，我们来看看是怎么实现的

首先会拿到 `array` 的 `length`

然后 `while` 循环遍历，通过 `if` 判断 `predicate` 的返回值，如果为 假值，则返回 `false` ，结束循环

整个循环完成后，都通过了测试，则返回 `true`
## Remark
1. [Array.prototype.every() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
## Example
```js
console.log(every([1,2,3,4,5], (v) => v>3)) // false
console.log(every([1,2,3,4,5], (v) => v>0)) // true
```
