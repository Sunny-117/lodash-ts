# split

## Description
根据 separator 拆分字符串 string。

## Params
`(string, separator, limit)`

## Return
`Array`

## Depend
```js
import castSlice from './.internal/castSlice.js'
import hasUnicode from './.internal/hasUnicode.js'
import isRegExp from './isRegExp.js'
import stringToArray from './.internal/stringToArray.js'
```
> [castSlice 源码分析](../internal/castSlice.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](../internal/hasUnicode.md)
> <br/>
> <br/>
> [isRegExp 源码分析](./isRegExp.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)

## Code
```js
const MAX_ARRAY_LENGTH = 4294967295
function split(string, separator, limit) {
  limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0
  if (!limit) {
    return []
  }
  if (string && (
    typeof separator === 'string' ||
    (separator != null && !isRegExp(separator))
  )) {
    if (!separator && hasUnicode(string)) {
      return castSlice(stringToArray(string), 0, limit)
    }
  }
  return string.split(separator, limit)
}
```
## Analyze
1. 针对 `limit` 做了处理，如果没有传入，则默认为数组最大长度，如果传入了，则通过 `>>>` 运算符进行取整，保证其为 `Number` 类型
   
2. 如果 `limit` 为 0，则返回空数组
3. 处理 `unicode` 字符，首先判断了 `string` 是否为真，同时 `separator` 为字符串，或者 `separator` 不为 `null` 、 `undefined` 、 `RegExp`，则进入代码块进行第二次判断
   
    `separator` 为假值，并且 `string` 含有 `unicode` 字符，则使用 `stringToArray` 将 `string` 转为数组，然后通过 `castSlice` 进行分割
4. 其余情况就调用 `split` 方法进行处理即可

## Remark
1. [String.prototype.split() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 方法使用指定的分隔符字符串将一个 String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

## Example
```js
console.log(split('a.b.c.d', '.', 2)) // [ 'a', 'b' ]
```
