# reduceRight

## Description
这个方法类似 [reduce](./reduce.md) ，除了它是从右到左遍历 collection（集合）中的元素的

## Params
`(collection, iteratee, accumulator)`

accumulator - 初始值

## Return
`{*}`

## Depend
```js
import arrayReduceRight from './.internal/arrayReduceRight.js'
import baseEachRight from './.internal/baseEachRight.js'
import baseReduce from './.internal/baseReduce.js'
```
> [arrayReduceRight 源码分析](../internal/arrayReduceRight.md)
> <br/>
> <br/>
> [baseEachRight 源码分析](../internal/baseEachRight.md)
> <br/>
> <br/>
> [baseReduce 源码分析](../internal/baseReduce.md)

## Code
```js
function reduceRight(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduceRight : baseReduce
  const initAccum = arguments.length < 3
  return func(collection, iteratee, accumulator, initAccum, baseEachRight)
}
```

## Analyze
首先判断了 传入的 `collection` 是否为数组，如果是数组 则使用 `arrayReduceRight`， 否则使用 `baseReduce` 来定义 `func` 方法

如果是 数组 ，调用 `arrayReduceRight` , 如果不是 数组，则会使用 `baseReduce` 方法来调用

而 `initAccum` 参数则是根据在调用 `reduceRight` 方法时传入的参数数量决定的，如果参数数量小于 3， 则表示并没有传入初始值，此时 `initAccum` 为 `true` ，表示以第一项元素作为初始值，最后传入了 遍历方法 `baseEachRight`

## Example
```js
console.log(reduceRight([0,1,2,3,4,5], (r, v) => (r+=v, r), 0)) // 15
```
