# unzipWith

## Description
此方法类似于 [unzip](./unzip.md)，除了它接受一个 iteratee 指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： (...group)。
## Params
`(array, iteratee)`

## Return
`Array`

## Depend
```js
import map from './map.js'
import unzip from './unzip.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [unzip 源码分析](./unzip.md)

## Code
```js
function unzipWith(array, iteratee) {
  if (!(array != null && array.length)) {
    return []
  }
  const result = unzip(array)
  return map(result, (group) => iteratee.apply(undefined, group))
}
```

## Analyze
首先使用 `unzip` 得到结果数组 `result` ，然后在通过 `map` 对于 `result` 中的每一个数组进行处理，这里使用了 `iteratee` 进行处理

这里 `iteratee` 接受的参数是数组的每一项，而不是一个数组，需要使用 剩余参数 语法 组成数组

## Example
```js
console.log(unzipWith([[1,2,3],[4,5,6],[7,8,9]],(...v) => v.join(''))) // [ '147', '258', '369' ]
```
