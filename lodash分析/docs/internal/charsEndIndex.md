# charsEndIndex

## Description
charsEndIndex 是一个内部方法，会在 trim 和 trimEnd 中使用，作用是找出 strSymbols 字符串数组中，从右往左查找第一个不在 charSymbols 字符串数组中出现的字符的位置。

## Params
`(strSymbols, chrSymbols)`
## Return
`Number`
## Depend
```js
import baseIndexOf from './baseIndexOf.js'
```
> [baseIndexOf 源码分析](./baseIndexOf.md)
> 

## Code
```js
function charsEndIndex(strSymbols, chrSymbols) {
  let index = strSymbols.length

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index
}
```
## Analyze
和 [charsStartIndex](./charsStartIndex.md) 基本一致，区别在于从右往左，所以最终如果找不到符合条件的会返回 -1
## Remark
和 charsStartIndex 一样， while 的 `{}` 也可以省略，改为 `;`
## Example
```js
console.log(charsEndIndex([1,2,3,4,5], [1,2,3,4,5])) // -1
console.log(charsEndIndex([1,2,3,4,5], [1,3,3,4,5])) // 1
```
