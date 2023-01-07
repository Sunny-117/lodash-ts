# zipObjectDeep

## Description
这个方法类似 [zipObject](./zipObject.md)，除了它支持属性路径。

## Params
`(props, values)`

## Return
`Object`

## Depend
```js
import baseSet from './.internal/baseSet.js'
import baseZipObject from './.internal/baseZipObject.js'
```
> [baseSet 源码分析](../internal/baseSet.md)
> <br/>
> <br/>
> [baseZipObject 源码分析](../internal/baseZipObject.md)

## Code
```js
function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet)
}
```

## Analyze
和 `zipObject` 基本类似，除了设置值的方法使用了 `baseSet`，支持路径

## Example
```js
console.log(zipObjectDeep(['a.b', 'a.b.c', 'a.b.c[0].c'], [{}, [], 3])) // { a: { b: { c: [ { c: 3 } ] } } }
```
