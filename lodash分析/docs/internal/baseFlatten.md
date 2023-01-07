# baseFlatten

## Description 
`flatten` 的基本实现，`baseFlatten` 用来展平数组，可以指定展平的深度。
## Params
`(array, depth, predicate, isStrict, result)`
> {Array} array: 要展平的数组
>
> {Number} depth: 展平的深度（最大递归深度）
>
> {Function} predicate: 每次迭代时都会调用的检查函数，回调参数为每次迭代的值, 默认调用 `isFlattenable`
>
> {Boolean} isStrict: 是否严格模式，在严格模式下，迭代的值必须要通过 `predicate` 函数的检查才存入结果数组中
>
> {Array} result: 结果数组
>

## Return
`Array`
## Depend
```js
import isFlattenable from './isFlattenable.js'
```
> [isFlattenable 源码分析](./isFlattenable.md)
>

## Code
```js
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}
```

## Analyze
1. 首先判断是否传入了 `predicate` 和 `result` ，如果没有传入则使用默认值
2. 如果传入的 数组为 `null` ， 则直接返回 `result`
3. 调用 for...of 对 array 进行遍历，这里分成了两部分
4. 第一部分： 如果递归深度 `depth > 0` 并且 `value` 值通过了 `predicate` 的校验，如果 `depth > 1` ,然后会递归调用 `baseFlatten` , 并且每都递减 `depth` ，直到为 `0` 为止，每次递归也会将 数组 `result` 传递进去，将展平的结果存入 `result` 中
5. 第二部分： 进行 `isStrict` 的判断，如果值为 `true` 的话， 那么 `result` 数组只会 push 满足第一部分的值

## Remark
1. [短路计算 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E7%9F%AD%E8%B7%AF%E8%AE%A1%E7%AE%97)
2. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
3. [递归 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions#%E9%80%92%E5%BD%92)
## Example
```js
baseFlatten([[1,2,3,4], [5,6,7,8]], 1, undefined, true) // [1,2,3,4,5,6,7,8]
baseFlatten([[1,2,3,4], [5,6,7,8]], 0, undefined, true) // []
baseFlatten([[1,2,3,4], [5,6,7,8]], 0, undefined, false) // [[1,2,3,4], [5,6,7,8]]
baseFlatten([[1,2,3,4], [5,6,7,8], [9], [10]], 1, function(key){ return key.length > 1}, true) // [1,2,3,4,5,6,7,8]
baseFlatten([[1,2,3,4], [5,6,7,8], [9], [10]], 1, function(key){ return key.length > 1}, false) // [1,2,3,4,5,6,7,8,[9],[10]]
baseFlatten([[1,2,3,4], [5,6,7,8], [9], [10]], 1, undefined, true) // [1,2,3,4,5,6,7,8,9,10]
```
