# startsWith

## Description
检查字符串 string 是否以 target 开头，也可以指定开始检测的位置 position

## Params
`(string, target, position)`

## Return
`Boolean`

## Code
```js
function startsWith(string, target, position) {
  const { length } = string
  position = position == null ? 0 : position
  if (position < 0) {
    position = 0
  }
  else if (position > length) {
    position = length
  }
  target = `${target}`
  return string.slice(position, position + target.length) == target
}
```

## Analyze
和 [endsWith](./endsWith.md) 基本类似，首先是针对于 `position` 进行了处理，然后将 `target` 通过模板字符串转为了字符串格式，然后 通过 `string.slice` 进行截取，从 `position` 到 `position + target.length` ，如果和 `target` 相等，则认为是 由 `target` 开头的 

## Remark
1. [String.prototype.slice() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

## Example
```js
console.log(startsWith('startsWith', 'starts')) // true
```
