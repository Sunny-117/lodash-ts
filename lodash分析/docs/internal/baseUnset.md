# baseUnset 

## Description 
移除 object 对象 path 路径上的属性。
## Params
`(object, path)`
## Return
`Boolean`
## Depend
```js
import castPath from './castPath.js'
import last from '../last.js'
import parent from './parent.js'
import toKey from './toKey.js'
```
> [castPath 源码分析](./castPath.md)
> <br/>
> <br/>
> [last 源码分析](../export/last.md)
> <br/>
> <br/>
> [parent 源码分析](./parent.md)
> <br/>
> <br/>
> [toKey 源码分析](./toKey.md)

## Code
```js
function baseUnset(object, path) {
  path = castPath(path, object)
  object = parent(object, path)
  return object == null || delete object[toKey(last(path))]
}
```
## Analyze
1. 首先将传入的 `path` 通过 `castPath` 转为 数组
2. 通过 `parent` 拿到 `path` 路径最后一个元素的父级
3. 如果拿到的 父级本身就是 `null` 或者 `undefined`，则 返回 `true`
4. 或者通过 `delete` 操作符 删除 `path` 数组的最后一个元素，这里通过 `toKey` 做了合规化处理
## Remark
1. [delete操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete) 对于所有情况都是 true，除非属性是一个自身的 不可配置的属性，在这种情况下，非严格模式返回 false。
2. 和 parent 一样，没有对 path 做合法性校验
## Example
```js
const a = {
  a: {
    b: {
      c: 1
    }
  }
}

console.log(baseUnset(a, 'a.b.d')) // true

console.log(a) // { a: { b: { c: 1 } } }

console.log(baseUnset(a, 'a.b.c')) // true

console.log(a) // { a: { b: {} } }
```
