# invoke

## Description
调用 object 对象 path 上的方法。

## Params
`(object, path, args)`

## Return
`{*}`

## Depend
```js
import castPath from './.internal/castPath.js'
import last from './last.js'
import parent from './.internal/parent.js'
import toKey from './.internal/toKey.js'
```
> [castPath 源码分析](../internal/castPath.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)
> <br/>
> <br/>
> [parent 源码分析](../internal/parent.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)

## Code
```js
function invoke(object, path, args) {
  path = castPath(path, object)
  object = parent(object, path)
  const func = object == null ? object : object[toKey(last(path))]
  return func == null ? undefined : func.apply(object, args)
}
```

## Analyze
1. 首先通过 `castPath` 拿到 `path` 路径数组
   
2. 根据 `parent` 方法，拿到 `path` 路径数组倒数第二个值的对象，找不到的话就是 `object` 本身，然后赋值给 `object`
3. 如果 拿到的 `parent` 为 `null` ，则将 `object` 赋值给 `func` ，否则 将 `path` 路径中最后一个取出，也就是方法名，通过 `toKey` 转为合法的 `key` ，拿到值，赋值给 `func`
4. 判断 如果 `func` 为 `null` 或者 `undefined` ，则返回 `undefined`， 否则使用 `apply` 调用 `func`， 这里传入的 `this`  为 `object` ，也就是 `parent` 的值。这样做是为了不改变 `this` 指向，和用原始对象 直接 `.` 的效果一致
5. `args` 传入的应当为 数组

## Remark
1. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

## Example
```js
const obj = {
  a: {
    b: {
      c: [1, 2, 3, 4, ['test','invoke']]
    }
  }
}

console.log(invoke(obj, 'a.b.c.4.join')) // test,invoke
```
