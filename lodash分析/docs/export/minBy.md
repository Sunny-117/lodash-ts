# minBy

## Description
minBy 的作用是取出一组数据中的最小值，需要传入迭代器 iteratee。

## Params
`(array, iteratee)`

## Return
`{*}`

## Depend
```js
import isSymbol from './isSymbol.js'
```
> [isSymbol 源码分析](./isSymbol.md)

## Code
```js
function minBy(array, iteratee) {
  let result
  if (array == null) {
    return result
  }
  let computed
  for (const value of array) {
    const current = iteratee(value)

    if (current != null && (computed === undefined
      ? (current === current && !isSymbol(current))
      : (current < computed)
    )) {
      computed = current
      result = value
    }
  }
  return result
}
```
## Analyze
和 [maxBy](./maxBy.md) 基本类似，除了 `if` 判断中 取的是 `current < computed`

## Example
```js
console.log(minBy([1,2,3,4,2,0,5,63], (v) => v)) // 0
```
