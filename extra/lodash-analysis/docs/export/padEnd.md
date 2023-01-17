# padEnd

## Description
如果 string 字符串长度小于 length 则在右侧填充字符。

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
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)
    ? (string + createPadding(length - strLength, chars))
    : (string || '')
}
```

## Analyze
判断是否传入了 `length` ，如果 `length` 为真值，则通过 `stringSize` 取到 `string` 的长度

判断，如果 `length` 存在，并且 `strLength < length` ，则通过 `createPadding` 创建需要拼接的字符，最终 返回 `string` 加上要拼接的字符

否则的话，就返回 `string || ''`

## Remark
1. [String.prototype.padEnd() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) 方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

## Example
```js
console.log(padEnd('abc', 9, 'e')) // abceeeeee
```
