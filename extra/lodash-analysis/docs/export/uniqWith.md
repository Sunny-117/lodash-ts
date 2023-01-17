# uniqWith

## Description
这个方法类似 [uniq](./uniq.md)， 除了它接受一个 comparator 调用比较 arrays 数组的每一个元素。 comparator 调用时会传入 2 个参数： (arrVal, othVal)。

## Params
`(array, comparator)`

## Return
`Array`

## Depend
```js
import baseUniq from './.internal/baseUniq.js'
```
> [baseUniq 源码分析](../internal/baseUniq.md)

## Code
```js
function uniqWith(array, comparator) {
  comparator = typeof comparator === 'function' ? comparator : undefined
  return (array != null && array.length)
    ? baseUniq(array, undefined, comparator)
    : []
}
```

## Analyze
对于 `comparator` 做了判断，如果不是 `function` 类型，则置为 `undefined`

判断了 `array` 是否为一个有值的数组，如果不是，则返回 空数组，否则使用 `baseUniq` 进行处理，传入了 `comparator`

## Example
```js
console.log(uniqWith([1,2,2,3,'3',4,'4',5,'3','2','1'], (x,y) => x==y)) // [ 1, 2, 3, 4, 5 ]
```
