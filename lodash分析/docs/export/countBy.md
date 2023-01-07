# countBy 

## Description 
创建一个组成对象，key（键）是经过 iteratee（迭代函数） 执行处理 collection 中每个元素后返回的结果，每个 key（键）对应的值是 iteratee（迭代函数）返回该 key（键）的次数（注：迭代次数）。 iteratee 调用一个参数：(value)。
## Params
`(collection, iteratee)`
> {Array|Object} collection
>
> {Function} iteratee - 每次迭代调用的函数
>

## Return
`Object`
## Depend
```js
import baseAssignValue from './.internal/baseAssignValue.js'
import reduce from './reduce.js'
```
> [baseAssignValue 源码分析](../internal/baseAssignValue.md)
> <br/>
> <br/>
> [reduce 源码分析](./reduce.md)
>

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty

function countBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      ++result[key]
    } else {
      baseAssignValue(result, key, 1)
    }
    return result
  }, {})
}
```
## Analyze
1. 调用 `reduce` 进行迭代，默认值为一个空对象，每次先通过传入的 `iteratee` 拿到 `key` 值
2. 通过 `hasOwnProperty` 判断 `result` 上是否已经有当前 `key` 值，如果有，则将值 `+1`，否则就是第一次出现，通过 `baseAssignValue` 将 `key` 值设置到 `result` 上，将值置为 `1`
3. 迭代完成后 返回 `result`
## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
2. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
## Example
```js
const users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'betty', 'active': true },
  { 'user': 'fred', 'active': false }
]

countBy(users, value => value.active); // => { 'true': 2, 'false': 1 }
```
