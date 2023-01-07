# over

## Description
创建一个函数，传入提供的参数的函数并调用 iteratees 返回结果。

## Params
`iteratees`

## Return
`Function`

## Depend
```js
import map from './map.js'
```
> [map 源码分析](./map.md)

## Code
```js
function over(iteratees) {
  return function(...args) {
    return map(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

## Analyze
最终会返回 一个 函数

这个函数内部 是通过 `map` 遍历 iteratees ，将每个迭代器的结果返回，`this` 绑定的是 函数创建时 的 `this`

## Example
```js
const func = over([(...v)=>v.reverse(), (...v)=>v[v.length - 1]**2])

console.log(func(1,2,3,4)) // [ [ 4, 3, 2, 1 ], 16 ]
```
