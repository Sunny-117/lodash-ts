# stringSize

## Description
获取 string 的长度，兼容 unicode 字符
## Params
`string`
## Return
`number`
## Depend
```js
import asciiSize from './asciiSize.js'
import hasUnicode from './hasUnicode.js'
import unicodeSize from './unicodeSize.js'
```
> [asciiSize 源码分析](./asciiSize.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](./hasUnicode.md)
> <br/>
> <br/>
> [unicodeSize 源码分析](./unicodeSize.md)

## Code
```js
function stringSize(string) {
  return hasUnicode(string) ? unicodeSize(string) : asciiSize(string)
}
```
## Analyze
如果存在 `unicode` 字符，则使用 `unicodeSize` 获取长度，否则通过 `asciiSize` 获取，也就是获取 `string.length`
## Remark
1. [String.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length) 该属性返回字符串中字符编码单元的数量。JavaScript 使用 UTF-16 编码，该编码使用一个 16 比特的编码单元来表示大部分常见的字符，使用两个代码单元表示不常用的字符。因此 length 返回值可能与字符串中实际的字符数量不相同。
## Example
```js
console.log(stringSize('macOS 🍎')) // 7
```
