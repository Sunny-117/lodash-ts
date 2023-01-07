# createCaseFirst 

## Description 
创建一个类似于 `lowerFirst` 的方法，针对于传入字符串的首个字符进行处理
## Params
`{String} methodName` -- 对首字母进行大小写转换的方法名。
## Return
`Function`
## Depend
```js
import castSlice from './castSlice.js'
import hasUnicode from './hasUnicode.js'
import stringToArray from './stringToArray.js'
```
> [castSlice 源码分析](./castSlice.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](./hasUnicode.md)
> <br/>
> <br/>
> [stringToArray 源码分析](./stringToArray.md)
>

## Code
```js
function createCaseFirst(methodName) {
  return (string) => {
    if (!string) {
      return ''
    }

    const strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined

    const chr = strSymbols
      ? strSymbols[0]
      : string[0]

    const trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1)

    return chr[methodName]() + trailing
  }
}
```
## Analyze
1. 最终会返回一个方法给调用者
2. 判断是否传入了 `string` ，如果没有则返回 空字符串
3. 定义 `strSymbols` 用来接收 `Unicode` 字符的数组，如果不包含 `Unicode` 字符，则为 `undefined`
4. 获取传入字符串的第一个字符 chr , 如果存在 `Unicode` 字符，则使用 `strSymbols[0]` , 否则取数组第一位（`string[0]`）
5. 定义除首字母剩余的字符串 `trailing` ， 如果存在 `Unicode` 字符，则调用 `castSlice` 进行截取，并 `join` 为一个新的字符串， 否则调用 `string.slice`
6. 调用传入的 `methodName` 方法对首字母进行处理，并拼接 `trailing` 后返回
## Remark
1. [属性访问 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors)
2. [String.prototype.slice MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)
3. 假设传入的 `methodName` 为 `toUpperCase` ， 那么在第6步时，就相当于 `'a'['toUpperCase']()`，通过属性访问调用方法是可以成功的（一个方法就是一个可以被调用的属性而已）
## Example
```js
const upperFirst = createCaseFirst('toUpperCase')

upperFirst('fee') // Fee
upperFirst('Fee') // Fee
```
