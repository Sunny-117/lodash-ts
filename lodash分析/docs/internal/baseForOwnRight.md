# baseForOwnRight 

## Description 
和 [baseForOwn](./baseForOwn.md) 基本类型，区别就是从右到左

## Params
`(object, iteratee)`
> iteratee - 每次迭代调用的函数
>

## Return
`Object`
## Depend
```js
import baseForRight from './baseForRight.js'
import keys from '../keys.js'
```
> [baseForRight 源码分析](./baseForRight.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)
>

## Code
```js
function baseForOwnRight(object, iteratee) {
  return object && baseForRight(object, iteratee, keys)
}
```
## Analyze
和 [baseForOwn](./baseForOwn.md) 源码类似，区别就是在于调用的方法不同 baseFor 和 baseForRight 的不同
## Remark
[Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 返回一个字符串数组，该字符串映射到目标对象自己的（可枚举）属性键。如果目标不是对象，则在 ES5 中抛出 TypeError，但将非对象目标强制为 ES2015 中的对象

keys 会针对传入值类型的不同做不同的处理
## Example
```js
const a = []
baseForOwnRight({a:1, b:2,c:3}, (value, key) => a.push([value, key]))
console.log(a) // [ [ 3, 'c' ], [ 2, 'b' ], [ 1, 'a' ] ]
```
