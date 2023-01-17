# trim

## Description
从 string 字符串中移除前面和后面的 空格 或 指定的字符。

## Params
`(string, chars)`

## Return
`string`

## Depend
```js
import castSlice from './.internal/castSlice.js'
import charsEndIndex from './.internal/charsEndIndex.js'
import charsStartIndex from './.internal/charsStartIndex.js'
import stringToArray from './.internal/stringToArray.js'
```
> [castSlice 源码分析](../internal/castSlice.md)
> <br/>
> <br/>
> [charsEndIndex 源码分析](../internal/charsEndIndex.md)
> <br/>
> <br/>
> [charsStartIndex 源码分析](../internal/charsStartIndex.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)

## Code
```js
function trim(string, chars) {
  if (string && chars === undefined) {
    return string.trim()
  }
  if (!string || !chars) {
    return (string || '')
  }
  const strSymbols = stringToArray(string)
  const chrSymbols = stringToArray(chars)
  const start = charsStartIndex(strSymbols, chrSymbols)
  const end = charsEndIndex(strSymbols, chrSymbols) + 1

  return castSlice(strSymbols, start, end).join('')
}
```

## Analyze
对于没有传入 `chars` 的情况，直接调用了原生的 `trim` 方法，返回了结果

再往下，如果 `string` 为假值 或者 `chars` 为假值 则返回 `string` 或 空字符串

使用 `stringToArray` 将 `string` 和 `chars` 都转为数组，然后 通过 `charsStartIndex` 获取到左侧的 索引值，通过 `charsEndIndex` 获取到右侧的索引值

然后截取数组，右侧索引 + 1，不加 1 会多截取一位， 得到截取后的数组，然后 `join` 为字符串即可
## Remark
1. [String.prototype.trim() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR 等）。

## Example
```js
console.log(trim('12345678987654321', '123')) // 45678987654
```
