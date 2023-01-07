# isMatchWith

## Description
这个方法类似 [isMatch](./isMatch.md)。 除了它接受一个 customizer 定制比较的值。 如果 customizer 返回 undefined 将会比较处理方法代替。 customizer 会传入 5 个参数：(objValue, srcValue, index|key, object, source)。

## Params
`(object, source, customizer)`

## Return
`Boolean`

## Depend
```js
import baseIsMatch from './.internal/baseIsMatch.js'
import getMatchData from './.internal/getMatchData.js'
```
> [baseIsMatch 源码分析](../internal/baseIsMatch.md)
> <br/>
> <br/>
> [getMatchData 源码分析](../internal/getMatchData.md)
>

## Code
```js
function isMatchWith(object, source, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return baseIsMatch(object, source, getMatchData(source), customizer)
}
```

## Analyze
和 [isMatch](./isMatch.md) 基本一致，除了 对 `customizer` 参数做了一定处理之外

这里判断了 `customizer` 是否是 `function` 类型，如果不是 则置为 `undefined`

## Example
```js
const object = { 'a': 1, 'b': 2 }
isMatch(object, { 'b': 2 })  // => true 
isMatch(object, { 'b': 1 })  // => false
```
