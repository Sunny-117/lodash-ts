# values

## Description
values 的作用是将 object 上所有自身可枚举属性（Symbol 属性除外）的值取出。
## Params
`object`
## Return
`Array`
## Depend
```js
import baseValues from './.internal/baseValues.js'
import keys from './keys.js'
```
> [baseValues 源码分析](../internal/baseValues.md)
> <br/>
> <br/>
> [keys 源码分析](./keys.md)

## Code
```js
function values(object) {
  return object == null ? [] : baseValues(object, keys(object))
}
```
## Analyze
如果 `object` 为 `null` 或者没有传入，则返回空数组，否则使用 `keys` 将所有的可遍历属性组成数组，调用 `baseValues` 拿出 `object` 上对应的属性值

## Example
```js
let a,b,c,d,e,f;
a = b = c = d = e = f = 1
console.log(values({a,b,c,d,e,f})) // [ 1, 1, 1, 1, 1, 1 ]
```
