# padStart

## Description
如果 string 字符串长度小于 length 则在左侧填充字符。

## Params
`(string, length, chars)`

## Return
`string`

## Depend
```js
import createPadding from './.internal/createPadding.js'
import stringSize from './.internal/stringSize.js'
```
> [createPadding 源码分析](../internal/createPadding.md)
> <br/>
> <br/>
> [stringSize 源码分析](../internal/stringSize.md)

## Code
```js
function padStart(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (createPadding(length - strLength, chars) + string)
    : (string || '')
}
```

## Analyze
和 [padEnd](./padEnd.md) 基本一致，除了拼接顺序， `padEnd` 是 `string` 在前， `padStart` 是 `string` 在后

## Remark
1. [String.prototype.padStart() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) 方法用另一个字符串填充当前字符串 (如果需要的话，会重复多次)，以便产生的字符串达到给定的长度。从当前字符串的左侧开始填充

## Example
```js
console.log(padStart('abc', 9, 'e')) // eeeeeeabc
```
