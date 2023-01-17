# toPath

## Description
转化 value 为属性路径的数组 。
## Params
`value`
## Return
`Array`
## Depend
```js
import map from './map.js'
import copyArray from './.internal/copyArray.js'
import isSymbol from './isSymbol.js'
import stringToPath from './.internal/stringToPath.js'
import toKey from './.internal/toKey.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [copyArray 源码分析](../internal/copyArray.md)
> <br/>
> <br/>
> [isSymbol 源码分析](./isSymbol.md)
> <br/>
> <br/>
> [stringToPath 源码分析](../internal/stringToPath.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)
> 

## Code
```js
function toPath(value) {
  if (Array.isArray(value)) {
    return map(value, toKey)
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(value))
}
```
## Analyze
1. 如果传入的 `value` 是 `array`， 则使用 `map`，调用 `toKey` 方法，将其转为 路径值数组返回
2. 否则会判断 `value` 是不是 `Symbol` 类型，如果是 `symbol` ，则 返回 `[value]`
3. 如果不是 `Symbol` ，则使用 `stringToPath` 将 `value` 转为数组，因为 `stringToPath` 会缓存相同字符串转换出来的结果值，因此使用 `copyArray` 赋值一份返回
## Remark
1. [Array.isArray() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 用于确定传递的值是否是一个 Array。
## Example
```js
console.log(toPath(['a', 'b', 4])) // [ 'a', 'b', '4' ]
console.log(toPath('a.b[4]')) // [ 'a', 'b', '4' ]
```
