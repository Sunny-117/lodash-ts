# setWith

## Description
这个方法类似 [set](./set.md)，除了它接受一个 customizer，调用生成对象的 path。 如果 customizer 返回 undefined 将会有它的处理方法代替。 customizer 调用 3 个参数： (nsValue, key, nsObject)。

## Params
`(object, path, value, customizer)`

## Return
`Object`

## Depend
```js
import baseSet from './.internal/baseSet.js'
```
> [baseSet 源码分析](../internal/baseSet.md)

## Code
```js
function setWith(object, path, value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return object == null ? object : baseSet(object, path, value, customizer)
}
```

## Analyze
和 [set](./set.md) 基本一致，只不过这里对于 customizer 参数进行了合法性的判断，如果不是一个 方法， 则置为 `undefined`，传递给 `baseSet` 进行 自定义路径的设置

对于自定义路径的函数，如果 `path` 路径是 一个 合法的 `key` ，则不会起作用
## Example
```js
console.log(setWith({}, 'a', 1)) //  { a: 1 }
```
