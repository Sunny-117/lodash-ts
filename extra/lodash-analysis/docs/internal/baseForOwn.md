# baseForOwn 

## Description 
forOwn的基本实现, baseForOwn 会遍历 object 所有的 key 值，并调用 iteratee 方法进行迭代处理，如果 iteratee 返回false 则会停止迭代
## Params
`(object, iteratee)`
> iteratee - 每次迭代调用的函数
>

## Return
`Object`
## Depend
```js
import baseFor from './baseFor.js'
import keys from '../keys.js'
```
> [baseFor 源码分析](./baseFor.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)

## Code
```js
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys)
}
```
## Analyze
判断如果传入的 `object` 为真，则调用 `baseFor` 方法进行遍历处理， 传给 `baseFor` 获取 `key` 值的方法为 `keys`
## Remark
[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 返回一个字符串数组，该字符串映射到目标对象自己的（可枚举）属性键。如果目标不是对象，则在 ES5 中抛出 TypeError，但将非对象目标强制为 ES2015 中的对象

keys 会针对传入值类型的不同做不同的处理
## Example
```js
const a = []
baseForOwn({a:1, b:2,c:3}, (value, key) => a.push([value, key]))
console.log(a) // [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]
```
