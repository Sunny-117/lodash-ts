# castPath

## Description 
`castPath` 在 `stringToPath` 之上再次进行了封装，如果传入的 `value` 本身是一个属性的话，就不调用 `stringToPath`， 直接返回 `[value]` , 否则才会调用 `stringToPath` 方法进行转换，返回目标数组
## Params
`(value, object)`

> value: 需要校验的值
>
> {Object} object： isKey 需要用到校验的对象
>

## Return
`Array`
## Depend
```js
import isKey from './isKey.js'
import stringToPath from './stringToPath.js'
```
> [isKey 源码分析](./isKey.md)
> <br/>
> <br/>
> [stringToPath 源码分析](./stringToPath.md)
>

## Code
```js
function castPath(value, object) {
  if (Array.isArray(value)) {
    return value
  }
  return isKey(value, object) ? [value] : stringToPath(value)
}
```

## Analyze
1. 首先判断传入的 `value` 是否为数组，如果是则直接返回 `value`
2. 在判断传入的 `value` 是否为属性，如果为属性，则返回 `[value]`
3. 否则调用 `stringToPath` 进行转换，返回路径数组

## Remark
1. [isArray MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
2. [三元运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

## Example
```js
castPath('a') // ['a']
castPath(['a']) // ['a']
castPath('a.b.c', {"a.b.c": 1}) // ['a.b.c']
castPath('a.b.c') // ['a', 'b', 'c']
```
