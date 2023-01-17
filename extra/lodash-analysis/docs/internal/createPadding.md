# createPadding

## Description
createPadding 其实也可以理解成 repeat 和 slice 的组合，它接收一个字符串 chars 和长度 length ，最终会返回一个长度为 length 的字符串。

如果 chars 的长度不足 length ， 会重复 chars ，得到一个长度为 length 的字符串，如果 chars 的长度大于 length ，则会对 chars 进行截断。
## Params
`(length, chars)`
## Return
`string`
## Depend
```js
import repeat from '../repeat.js'
import baseToString from './baseToString.js'
import castSlice from './castSlice.js'
import hasUnicode from './hasUnicode.js'
import stringSize from './stringSize.js'
import stringToArray from './stringToArray.js'
```
> [repeat 源码分析](../export/repeat.md)
> <br/>
> <br/>
> [baseToString 源码分析](./baseToString.md)
> <br/>
> <br/>
> [castSlice 源码分析](./castSlice.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](./hasUnicode.md)
> <br/>
> <br/>
> [stringSize 源码分析](./stringSize.md)
> <br/>
> <br/>
> [stringToArray 源码分析](./stringToArray.md)

## Code
```js
function createPadding(length, chars) {
  chars = chars === undefined ? ' ' : baseToString(chars)

  const charsLength = chars.length
  if (charsLength < 2) {
    return charsLength ? repeat(chars, length) : chars
  }
  const result = repeat(chars, Math.ceil(length / stringSize(chars)))
  return hasUnicode(chars)
    ? castSlice(stringToArray(result), 0, length).join('')
    : result.slice(0, length)
}
```
## Analyze
1. 如果 `chars` 为 `undefined` ，则将其转为 一个空格的字符串，否则 使用 `baseToString` 进行转换
2. 判断如果 `charsLength` 小于 2，也就是 0 或者 1，如果为 1，则调用 `repeat` 进行拼接，否则 返回 `chars`
3. 使用 `stringSize` 获取 `chars` 的长度，有可能包含 `unicode` ，然后 使用 `length` 除以获取到的长度，计算需要重复多少次，有可能有小数，所以使用 `Math.ceil` 向上取整
4. 最终返回结果
    - 如果含有 unicode字符，则先使用 `stringToArray` 将其转为 数组，在使用 `castSlice` 进行截取，最终在使用 `join` 拼接成字符串返回
    - 不含有 unicode字符，则直接使用 `slice` 截取即可
    - unicode字符使用 `slice` 截取，可能会有乱码
5. `createPadding` 在不传入 `chars` 时，会返回空格 `repeat` 的结果
## Remark
1. [Math.ceil() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)  函数返回大于或等于一个给定数字的最小整数
2. [String.prototype.slice() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
## Example
```js
console.log(createPadding(3) + '1') // '   1'
console.log(createPadding(3, 'a') + '1') // 'aaa1' 
```
