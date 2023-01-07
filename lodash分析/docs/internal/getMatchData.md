# getMatchData 

## Description 
获取对象的属性名称，值和比较标志。
## Params
`{Object} object`
## Return
`Array`
## Depend
```js
import isStrictComparable from './isStrictComparable.js'
import keys from '../keys.js'
```
> [isStrictComparable 源码分析](./isStrictComparable.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)

## Code
```js
function getMatchData(object) {
  const result = keys(object)
  let length = result.length

  while (length--) {
    const key = result[length]
    const value = object[key]
    result[length] = [key, value, isStrictComparable(value)]
  }
  return result
}
```
## Analyze
1. 使用  `keys` 获取 `object` 所有可枚举属性，组成一个数组，拿到数组的 `length`
2. `while` 循环，取出，对应的 `key` ，`value`， 以及通过 isStrictComparable 来判断当前 `value` 是否适合 `===` 比较
3. 将 `key`，`value`，`isStrictComparable` 的结果组成一个新的数组，赋值给 `result` 对应的下标
## Remark
1. [严格相等 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89)
## Example
```js
const a = {a: 1, b:2, c:3}
Object.defineProperty(a, Symbol(1),{
  value: 'symbol'
})

console.log(getMatchData(a)) // [ [ 'a', 1, true ], [ 'b', 2, true ], [ 'c', 3, true ] ]
```
