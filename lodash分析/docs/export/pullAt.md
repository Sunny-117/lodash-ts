# pullAt

## Description
根据索引 indexes，移除 array 中对应的元素，并返回被移除元素的数组。
## Params
`(array, ...indexes)`
## Return
`Array`
## Depend
```js
import map from './map.js'
import baseAt from './.internal/baseAt.js'
import basePullAt from './.internal/basePullAt.js'
import compareAscending from './.internal/compareAscending.js'
import isIndex from './.internal/isIndex.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [baseAt 源码分析](../internal/baseAt.md)
> <br/>
> <br/>
> [basePullAt 源码分析](../internal/basePullAt.md)
> <br/>
> <br/>
> [compareAscending 源码分析](../internal/compareAscending.md)
> <br/>
> <br/>
> [isIndex 源码分析](../internal/isIndex.md)

## Code
```js
function pullAt(array, ...indexes) {
  const length = array == null ? 0 : array.length
  const result = baseAt(array, indexes)

  basePullAt(array, map(indexes, (index) => isIndex(index, length) ? +index : index).sort(compareAscending))
  return result
}
```
## Analyze
1. 首先根据 `array` 是否存在，拿到 `length`
2. 通过 `baseAt` 拿到该返回的结果，被删除元素的数组
3. 调用 `basePullAt` 进行删除，这里对于 `indexes` 进行了排序和索引转换的处理，也就达到了 `basePullAt` 的条件，升序排列
    - `isIndex(index, length) ? +index : index` 是索引，则转为 `number` 类型，否则不做处理
    - 通过 `compareAscending` 进行排序
## Remark
1. 这里 和 basePullAt 不同的是， basePullAt 返回的是经过处理的原数组，pullAt需要返回的是被删除元素的数组，所以通过 baseAt 来进行返回值的生成，而通过 basePullAt 来处理原数组

2. 这里的排序会有一点问题，lodash 还没有修复，具体可见 [compareAscending](../internal/compareAscending.md) 中
## Example
我们按照 compareAscending 正确返回的情况下示例
```js
const a = [1,2,3,4,5,6]

console.log(pullAt(a, 0,1,2)) // [ 1, 2, 3 ]

console.log(a) // [ 4, 5, 6 ]
```
