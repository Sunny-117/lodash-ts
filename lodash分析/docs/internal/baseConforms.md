# baseConforms 

## Description 
会对 object 的属性做检查，检查函数由source提供，但是并不会拷贝 source
## Params
`{Object} source`
## Return
`Function`
## Depend
```js
import baseConformsTo from './baseConformsTo.js'
import keys from '../keys.js'
```
> [baseConformsTo 源码分析](./baseConformsTo.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)
>

## Code
```js
function baseConforms(source) {
  const props = keys(source)
  return (object) => baseConformsTo(object, source, props)
}
```
## Analyze
`baseConforms` 会对 传入的 `source` 获取可枚举的 `key` 值，最终返回一个调用 `baseConformsTo` 的函数
## Remark
1. [箭头函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承this
## Example
```js
const a = baseConforms({b: x => x > 1, c: x => x < 0})

const b = {b: 2, c: -1}
const c = {a: 1, b: 2, c: -1}
const d = {a: 1, b: 2, c: 0}

a(b) // true
a(c) // true
a(d) // false
```
