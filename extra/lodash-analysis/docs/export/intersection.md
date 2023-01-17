# intersection

## Description
创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用 SameValueZero进行相等性比较。（注：可以理解为给定数组的交集）

## Params
`arrays`

## Return
`Array`

## Depend
```js
import map from './map.js'
import baseIntersection from './.internal/baseIntersection.js'
import castArrayLikeObject from './.internal/castArrayLikeObject.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [baseIntersection 源码分析](../internal/baseIntersection.md)
> <br/>
> <br/>
> [castArrayLikeObject 源码分析](../internal/castArrayLikeObject.md)

## Code
```js
function intersection(...arrays) {
  const mapped = map(arrays, castArrayLikeObject)
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped)
    : []
}
```

## Analyze
1. 首先通过 `map` 函数，对传入的 `arrays` 进行和参数合法化的处理，这里传入的函数为 `castArrayLikeObject` ，即 如果 `value` 为数组，则返回 `value` ，否则返回空数组
   
2. 这里进行了判断，如果 `mapped` 有长度，并且 `mapped[0] === arrays[0]`，如果传入的 `arrays` 第一项都不合法的话，那肯定没有交集，返回空数组即可

## Example
```js
console.log(intersection([1,2,3,4,5], [2,3,4,5,6], [3,4,5,6,7])) // [ 3, 4, 5 ]
```
