# charsStartIndex

## Description
charsEndIndex 是一个内部方法，会在 trim 和 trimEnd 中使用，作用是找出 strSymbols 字符串数组中，从左往右查找第一个不在 charSymbols 字符串数组中出现的字符的位置。
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
function charsStartIndex(strSymbols, chrSymbols) {
  let index = -1
  const length = strSymbols.length

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index
}
```
## Analyze
也就是 `++ index < length`， 并且通过 `baseIndexOf` 查找 在 `chrSymbols` 中是否存在当前数组索引对应的值，如果这两个条件有任何一个不符合，都会返回

如果找不到的话，最终会返回 `strSymbols.length`
## Remark
while 循环这里，并没有需要执行的代码块，只是用作循环，可以将后面的 `{}` 改为 `;`
## Example
```js
console.log(charsStartIndex([1,2,3,4,5], [1,2,3,4,5])) // 5
console.log(charsStartIndex([1,2,3,4,5], [1,2,4,4,5])) // 2
```
