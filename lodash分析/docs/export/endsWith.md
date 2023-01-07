# endsWith

## Description
检查字符串 string 是否以给定的 target 字符串结尾
## Params
`(string, target, position)`
> position - 搜索位置
> 

## Return
`Boolean`

## Code
```js
function endsWith(string, target, position) {
  const { length } = string
  position = position === undefined ? length : +position
  if (position < 0 || position != position) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  const end = position
  position -= target.length
  return position >= 0 && string.slice(position, end) == target
}
```
## Analyze
1. 首先处理了 `position` 的值
    - 如果没有传入 `position` ，`position` 则取 `length`
    - 如果 `position < 0`,或者 `position` 为 `NaN` ,则取0
    - 如果 `position > length` ，取 `length`
2. 进行截取和对比
    - 将 `end` 设置为 `position`
    - 开始位置就是 `position - target.length`
    - 如果 开始位置小于 0 ，则表示不符合条件， 返回 `false`
    - 在大于等于 0 是，调用 `slice` 方法进行截取，拿截取的值和 `target` 做对比，并返回结果
## Remark
1. [String.prototype.slice() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。
## Example
```js
console.log(endsWith('abcdefg', 'ef')) // false
console.log(endsWith('abcdefg', 'efg')) // true
console.log(endsWith('abcdefg', 'ef', 6)) // true
```
