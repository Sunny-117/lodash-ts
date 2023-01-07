# intersectionBy

## Description
这个方法类似 [intersection](./intersection.md)，区别是它接受一个 iteratee 调用每一个 arrays 的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：(value)。

## Params
`arrays`

最后一个参数为 `iteratee`

## Return
`Array`

## Depend
```js
import map from './map.js'
import baseIntersection from './.internal/baseIntersection.js'
import castArrayLikeObject from './.internal/castArrayLikeObject.js'
import last from './last.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [baseIntersection 源码分析](../internal/baseIntersection.md)
> <br/>
> <br/>
> [castArrayLikeObject 源码分析](../internal/castArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)

## Code
```js
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  if (iteratee === last(mapped)) {
    iteratee = undefined
  } else {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

## Analyze
和 [intersection](./intersection.md) 基本类似，不过这里对于 `iteratee` 做了处理

首先通过 `last` 函数，拿到 `arrays` 的最后一项，定义为 `iteratee` 

然后 通过 `map` 和 `castArrayLikeObject` 对 `arrays` 数组进行处理，拿到返回值 `mapped`

接着有了一个判断

```js
  if (iteratee === last(mapped)) {
    iteratee = undefined
  } else {
    mapped.pop()
  }
```

但是这个判断并不严谨，这里只是判断了 `iteratee === last(mapped)` 的情况下，将 `iteratee` 置为 `undefined`

言外之意，如果不等于，`lodash` 就等同于认定传入了 `iteratee` 函数，但是这是不对的 

在 [intersection](./intersection.md) 函数中，如果传入这样的值 `[1,2,3,4,5], [2,3,4,5,6], 5`

```js
intersection([1,2,3,4,5], [2,3,4,5,6], 5)
```

会得到的是空数组，但是如果在 `intersectionBy` 中传入，则会报错，因为 `lodash` 把最后一个参数 `5` 当做了 `iteratee` 方法，这个时候 使用 `iteratee` 去调用时，就会报错

正确的判断应该是和 [intersectionWith](./intersectionWith) 一样

```js
  iteratee = typeof iteratee === 'function' ? iteratee : undefined
  if (iteratee) {
    mapped.pop()
  }
```

应当判断 `iteratee` 的合法性，所以最终修改为

```js
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  iteratee = typeof iteratee === 'function' ? iteratee : undefined
  if (iteratee) {
    mapped.pop()
  }
  
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

## Example
```js
console.log(intersectionBy([1,2,3,4], [2,3,4,5], (v) => v*v)) // [ 2, 3, 4 ]
```
