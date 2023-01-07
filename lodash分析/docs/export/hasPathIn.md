# hasPathIn

## Description
hasPathIn 用于检测 object 上是否存在路径 path ，和 hasPath 不同的是，hasPathIn 会检测原型链上的属性

## Params
`(object, path)`

## Return
`Boolean`

## Depend
```js
import castPath from './.internal/castPath.js'
import isArguments from './isArguments.js'
import isIndex from './.internal/isIndex.js'
import isLength from './isLength.js'
import toKey from './.internal/toKey.js'
```
> [castPath 源码分析](../internal/castPath.md)
> <br/>
> <br/>
> [isArguments 源码分析](./isArguments.md)
> <br/>
> <br/>
> [isIndex 源码分析](../internal/isIndex.md)
> <br/>
> <br/>
> [isLength 源码分析](./isLength.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)

## Code
```js
function hasPathIn(object, path) {
  path = castPath(path, object)

  let index = -1
  let { length } = path
  let result = false
  let key

  while (++index < length) {
    key = toKey(path[index])
    if (!(result = object != null && key in Object(object))) {
      break
    }
    object = object[key]
  }
  if (result || ++index != length) {
    return result
  }
  length = object == null ? 0 : object.length
  return !!length && isLength(length) && isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object))
}
```
## Analyze
源码和 [hasPath](./hasPath.md) 基本一致，只不过在进行属性检测的时候，使用的是 `in` 操作符，会进行原型链属性的检测，`hasPath` 使用的是 `Object.prototype.hasOwnProperty.call` ，只进行自身属性的检测。

其实这么看起来，完全没有必要写两个方法，可以写一个内部方法，然后通过传入不同的检测函数即可

## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
   
   如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true。 

## Example
```js
const a = {
  a: {
    b: 1
  }
}
const temp = {
  a: {
    b: {
      c: new Array(5)
    }
  }
}
const arr = new Array(5)
console.log(hasPathIn(arr, 4)) // true
console.log(hasPathIn(a, ['a', 'b'])) // true
console.log(hasPathIn(temp, 'a.b.c.4')) // true
```
