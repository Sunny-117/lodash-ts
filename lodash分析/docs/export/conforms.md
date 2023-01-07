# conforms 

## Description 
创建一个函数。 这个函数会 调用 source 的属性名对应的 predicate 与传入对象相对应属性名的值进行断言处理。 如果都符合返回 true ，否则返回 false 。
## Params
`{Object} source`
## Return
`Function`
## Depend
```js
import baseClone from './.internal/baseClone.js'
import baseConforms from './.internal/baseConforms.js'
```
> [baseClone 源码分析](../internal/baseClone.md)
> <br/>
> <br/>
> [baseConforms 源码分析](../internal/baseConforms.md)
>

## Code
```js
const CLONE_DEEP_FLAG = 1

function conforms(source) {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG))
}

```
## Analyze
会对传入的 `source` 做一个深拷贝 ，将值传给 `baseConforms` 创建一个校验函数并返回 
## Remark
1. conforms 会创建一个函数返回，用于判断一个对象的字段是否满足条件，source key 值对应的 value 应当为 function
2. conforms 和 baseConforms 实现基本一致，不同点在于 会使用 baseClone 深拷贝 source 对象
3. 校验函数也只会 校验 source 的 key值，如果需要校验的 object keys 大于 source ，但是校验通过，也是会返回 true
4. 偏应用，又称作部分应用，它允许开发者部分地应用函数参数。实际上，偏应用是为一个多元函数预先提供部分参数，从而在调用时可以省略这些参数。
5. 柯里化是把一个多参数函数转换为一个嵌套的一元函数的过程
6. [简明 JavaScript 函数式编程 —— 入门篇](https://juejin.cn/post/6844903936378273799)
## Example
```js
const a = conforms({b: x => x > 1, c: x => x < 0})
const b = {b: 2, c: -1}
const c = {a: 1, b: 2, c: -1}
const d = {a: 1, b: 2, c: 0}

a(b) // true
a(c) // true
a(d) // false
```
