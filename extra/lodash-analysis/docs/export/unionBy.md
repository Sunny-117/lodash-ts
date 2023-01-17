# unionBy

## Description
这个方法类似 [union](./union.md) ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 会传入一个参数：(value)。

## Params
`(...arrays)`

## Return
`Array`

## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
import baseUniq from './.internal/baseUniq.js'
import isArrayLikeObject from './isArrayLikeObject.js'
import last from './last.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [baseUniq 源码分析](../internal/baseUniq.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)

## Code
```js
function unionBy(...arrays) {
  let iteratee = last(arrays)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), iteratee)
}
```

## Analyze
这里取出了 `arrays` 的最后一个参数，当做 `iteratee` ， 然后又判断了 `iteratee`， 如果是一个类数组，那么就将其置为 `undefined`

然后使用 `baseFlatten` 展开数组，这里是只有 通过 `isArrayLikeObject` 校验的值才回返回，通过 `baseUniq` 进行去重，传入自定义函数 `iteratee`

这里的判断有一点问题，只判断了 `isArrayLikeObject(iteratee)`，如果 传入的最后一个参数为字符串的话，也是不会通过这个校验的，但是字符串传递给 `baseUniq` 使用的话，会报类型错误，需要的是一个 `function` 类型，所以这里保险起见，应该加

```js
isArrayLikeObject(iteratee) || typeof iteratee !== 'function'
```

## Example
```js
console.log(unionBy([1.1,2.1,3.1],[2.2,3.2,4.2],(v) => v|0)) // [ 1.1, 2.1, 3.1, 4.2 ]
```
