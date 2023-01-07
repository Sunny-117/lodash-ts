# groupBy

## Description
创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
## Params
`(collection, iteratee)`
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

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty

function groupBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      baseAssignValue(result, key, [value])
    }
    return result
  }, {})
}
```
## Analyze
最终返回的结果是 `reduce` 执行的结果，所以具体可以看一下 `reduce` 做了什么

首先 根据 `iteratee` 的处理，拿到 `key` ， 然后通过 `Object.prototype.hasOwnProperty` 来判断 `result` 对象上有没有当前的 `key` ，如果有，则取 `key` 对应的结果，然后 `push` `value` 。 否则的话，就通过 `baseAssignValue` 方法，在 `result` 的 `key` 上 设置属性值 `[value]`

经过 `reduce` 遍历完成后，就得到了结果对象 `result`，返回即可
## Remark
1. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法对数组中的每个元素执行一个由您提供的 reducer 函数 (升序执行)，将其结果汇总为单个返回值。
## Example
```js
console.log(groupBy([1,2,3,4,5,6,7,8,9,0], (v) => v&1)) // { '0': [ 2, 4, 6, 8, 0 ], '1': [ 1, 3, 5, 7, 9 ] }
```
