# zipObject

## Description
它接受 2 个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。

## Params
`(props, values)`

## Return
`Object`

## Depend
```js
import assignValue from './.internal/assignValue.js'
import baseZipObject from './.internal/baseZipObject.js'
```
> [assignValue 源码分析](../internal/assignValue.md)
> <br/>
> <br/>
> [baseZipObject 源码分析](../internal/baseZipObject.md)

## Code
```js
function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue)
}
```

## Analyze
其实就是调用了 `baseZipObject` 方法，这里设置值的 `assignFunc` 为 `assignValue`，对于 props 和 values 都做了 `|| []` 的处理，在没有传入或者传入为假值时，使用空数组

## Example
```js
console.log(zipObject(['a','b','c'], [1,2,3])) // { a: 1, b: 2, c: 3 }
```
