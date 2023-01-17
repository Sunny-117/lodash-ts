# truncate

## Description
截断 string 字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."

## Params
`(string, options)`
> [options.length=30] (number) - 允许的最大长度。
> 
> [options.omission='...'] (string) - 超出后的代替字符
> 
> [options.separator] (RegExp|string) - 截断点，可以为正则，也可以为字符串，在原字符串长度超出 length 时，不止是按长度来截断，还要在截断点处拼接上省略符 ，因此结果字符串可能会比 length 要小。

## Return
`string`

## Depend
```js
import baseToString from './.internal/baseToString.js'
import castSlice from './.internal/castSlice.js'
import hasUnicode from './.internal/hasUnicode.js'
import isObject from './isObject.js'
import isRegExp from './isRegExp.js'
import stringSize from './.internal/stringSize.js'
import stringToArray from './.internal/stringToArray.js'
import toString from './toString.js'
```
> [baseToString 源码分析](../internal/baseToString.md)
> <br/>
> <br/>
> [castSlice 源码分析](../internal/castSlice.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](../internal/hasUnicode.md)
> <br/>
> <br/>
> [isObject 源码分析](./isObject.md)
> <br/>
> <br/>
> [isRegExp 源码分析](./isRegExp.md)
> <br/>
> <br/>
> [stringSize 源码分析](../internal/stringSize.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)
> <br/>
> <br/>
> [toString 源码分析](./toString.md)

## Code
```js
const DEFAULT_TRUNC_LENGTH = 30
const DEFAULT_TRUNC_OMISSION = '...'

/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/
function truncate(string, options) {
  let separator
  let length = DEFAULT_TRUNC_LENGTH
  let omission = DEFAULT_TRUNC_OMISSION

  if (isObject(options)) {
    separator = 'separator' in options ? options.separator : separator
    length = 'length' in options ? options.length : length
    omission = 'omission' in options ? baseToString(options.omission) : omission
  }

  string = toString(string)

  let strSymbols
  let strLength = string.length
  if (hasUnicode(string)) {
    strSymbols = stringToArray(string)
    strLength = strSymbols.length
  }
  if (length >= strLength) {
    return string
  }
  let end = length - stringSize(omission)
  if (end < 1) {
    return omission
  }
  let result = strSymbols
    ? castSlice(strSymbols, 0, end).join('')
    : string.slice(0, end)

  if (separator === undefined) {
    return result + omission
  }
  if (strSymbols) {
    end += (result.length - end)
  }
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      let match
      let newEnd
      const substring = result

      if (!separator.global) {
        separator = RegExp(separator.source, `${reFlags.exec(separator) || ''}g`)
      }
      separator.lastIndex = 0
      while ((match = separator.exec(substring))) {
        newEnd = match.index
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd)
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    const index = result.lastIndexOf(separator)
    if (index > -1) {
      result = result.slice(0, index)
    }
  }
  return result + omission
}
```
## Analyze
### 参数处理
```js
  let separator
  let length = DEFAULT_TRUNC_LENGTH
  let omission = DEFAULT_TRUNC_OMISSION

  if (isObject(options)) {
    separator = 'separator' in options ? options.separator : separator
    length = 'length' in options ? options.length : length
    omission = 'omission' in options ? baseToString(options.omission) : omission
  }

  string = toString(string)
```
首先 定义 `length` 为 默认值 `30` ，拼接符为 默认的 `...`

对于 `options` 进行处理，如果 `options` 是一个对象，通过 `in` 操作符判断 对应的属性是否在 `options` 中，如果存在则重新赋值，否则不改变之前的赋值

### 处理 unicode 字符
```js
  let strSymbols
  let strLength = string.length
  if (hasUnicode(string)) {
    strSymbols = stringToArray(string)
    strLength = strSymbols.length
  }
```
如果 `string` 中存在 `unicode` 字符，则使用 `stringToArray` 将其转为数组，重新定义 `strLength` 为 数组的长度

### 长度不足
```js
  if (length >= strLength) {
    return string
  }
```
如果传入的 `length` 或者 默认的 `length` 长度大于 `string` 的长度，则直接返回 `string` 即可

### 省略符长度太长
```js
  let end = length - stringSize(omission)
  if (end < 1) {
    return omission
  }
```
如果 省略符的长度 已经超过 或者 等于 `length` 了 则直接返回 `omission`

### 没有传入 separator
```js
  let result = strSymbols
    ? castSlice(strSymbols, 0, end).join('')
    : string.slice(0, end)

  if (separator === undefined) {
    return result + omission
  }
```
这里会根据 是否含有 `unicode` 字符使用不同的方法对 `string` 进行截取，得到结果

含有 `unicode` 时，使用 `castSlice` 进行截取，然后使用 `join` 拼接为 字符串返回

不含有 `unicode` 时，使用 `string.slice` 即可

如果没有传入 `separator` ，则返回 `result + omission` 即可

### 计算 unicode 字符串截断的索引
```js
  if (strSymbols) {
    end += (result.length - end)
  }
```
因为 `unicode` 编码的字符串的长度和索引是不对应的，因此先用结果的长度减去现在的截断点的长度，得到差值，再将截断点的长度加上差值，即可得到截断点的索引值

### separator 为正则
```js
  if (isRegExp(separator)) {
    if (string.slice(end).search(separator)) {
      let match
      let newEnd
      const substring = result

      if (!separator.global) {
        separator = RegExp(separator.source, `${reFlags.exec(separator) || ''}g`)
      }
      separator.lastIndex = 0
      while ((match = separator.exec(substring))) {
        newEnd = match.index
      }
      result = result.slice(0, newEnd === undefined ? end : newEnd)
    }
  } else if (string.indexOf(baseToString(separator), end) != end) {
    // ...
  }
```
如果为正则，则使用字符串的 `search` 方法，来判断字符串到截断点索引的位置有没有匹配该正则的字符串。

如果没有，则不需要继续处理。

因为后面会使用 `exec` 来匹配，并且是全局匹配，因此判断传入的正则是否为 `global` 的，如果不是全局的，则先将正则转换成全局匹配。

可以看到，这里只能上面已经处理过的 `result` 进行匹配，因为 `result` 的长度加上省略符的的长度刚好是目标长度，因此只需要匹配 `result` 最后一个截断点即可，所以如果有截断点，则得到的结果可能会比目标长度要小。

使用 `exec` 方法来对 `result` 进行截断点的匹配，直至最后一个截断点，如果 `newEnd` 不为 `undefined` ，表示有截断点，再调用 `result` 的 sl`ice 方法来进行截断。

### separator 为字符串
```js
  if (string.indexOf(baseToString(separator), end) != end) {
    const index = result.lastIndexOf(separator)
    if (index > -1) {
      result = result.slice(0, index)
    }
  }
```
使用 `indexOf` 方法检测从 `end` 开始到结尾范围内，`separator` 的索引，如果索引值和 `end` 不相等，则表示可能有截断点，当然，如果没有截断点也是不相等的，因为得到的是 `-1` 。

接下来，使用 `lastIndexOf` 找出最后一个截断点在 `result` 中的位置，如果位置大于 `-1` ，表示有截断点，使用 `slice` 对 `result` 进行截断。

## Remark
1. [String.prototype.indexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
   
2. [String.prototype.lastIndexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) 法返回调用 String 对象的指定值最后一次出现的索引，在一个字符串中的指定位置 fromIndex 处从后向前搜索。如果没找到这个特定值则返回 - 1 。
3. [RegExp.prototype.exec() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。

    在设置了 global 或 sticky 标志位的情况下（如 /foo/g or /foo/y），JavaScript RegExp 对象是有状态的。他们会将上次成功匹配后的位置记录在 lastIndex 属性中。使用此特性，exec() 可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配），而相比之下， String.prototype.match() 只会返回匹配到的结果。


## Example
```js
truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'
 
truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'
 
truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'
 
truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
```
