# mean

## Description
计算 array 的平均值。

## Params
`array`

## Return
`Number`

## Depend
```js
import baseMean from './meanBy.js'
```
> [meanBy 源码分析](./meanBy.md)

## Code
```js
function mean(array) {
  return baseMean(array, (value) => value)
}
```

## Analyze
使用 `meanBy` 方法，只不过传入的函数就是取出当前值

## Example
```js
console.log(mean([1,2,3,4])) // 2.5
```
