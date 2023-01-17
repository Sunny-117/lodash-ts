# zipWith

## Description
这个方法类似于 [zip](./zip.md)，不同之处在于它接受一个 iteratee（迭代函数），来 指定分组的值应该如何被组合。 该 iteratee 调用每个组的元素： (...group).

## Params
`(...arrays)`

## Return
`Array`

## Depend
```js
import unzipWith from './unzipWith.js'
```
> [unzipWith 源码分析](./unzipWith.md)

## Code
```js
function zipWith(...arrays) {
  const length = arrays.length
  let iteratee = length > 1 ? arrays[length - 1] : undefined
  iteratee = typeof iteratee === 'function' ? (arrays.pop(), iteratee) : undefined
  return unzipWith(arrays, iteratee)
}
```

## Analyze
针对 `iteratee` 参数做了特殊处理，默认为最后一个参数为 `iteratee` ，所以这里首先判断 参数数组的长度是否大于1，如果大于1，则取出最后一个参数，判断最后一个参数是否为 `function` 类型，如果是 `function` 类型，则从 `arrays` 中删除最后一项，否则将 `iteratee` 置为 `undefined`，这里使用了 逗号操作符，返回了一开始定义的 `iteratee` 值

最后使用 `unzipWith` 拿到结果即可

但是这里会有一个问题，在使用 `unzipWith` 时，不应该传入 `iteratee` 为 `undefined` ，否则会报错，这里合理的做法应该是 传入箭头函数，返回原数组即可
```js
  iteratee = typeof iteratee === 'function' ? (arrays.pop(), iteratee) : (...group) => group
```

## Example
```js
console.log(zipWith([1,2,3],[4,5,6],[7,8,9], (...v) => v.join('.'))) // [ '1.4.7', '2.5.8', '3.6.9' ]
```
