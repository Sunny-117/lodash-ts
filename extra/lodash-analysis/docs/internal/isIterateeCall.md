# isIterateeCall 

## Description 
检查给定的参数是否来自iteratee调用。
## Params
`(value, index, object)`
> value - 潜在的iteratee值参数。
>
> index - 潜在的iteratee索引或关键参数。
>
> object - 潜在的iteratee对象参数。
>

## Return
`Boolean`
## Depend
```js
import isArrayLike from '../isArrayLike.js'
import isIndex from './isIndex.js'
import isObject from '../isObject.js'
import eq from '../eq.js'
```
> [isArrayLike 源码分析](../export/isArrayLike.md)
> <br/>
> <br/>
> [isIndex 源码分析](./isIndex.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> <br/>
> <br/>
> [eq 源码分析](../export/eq.md)

## Code
```js
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false
  }
  const type = typeof index
  if (type === 'number'
    ? (isArrayLike(object) && isIndex(index, object.length))
    : (type === 'string' && index in object)
  ) {
    return eq(object[index], value)
  }
  return false
}
```
## Analyze
1. `iteratee` 函数 会接受三个值，第一个为当前值，第二个为当前值所对应的索引或者key，第三个为原对象或原数组，有了这些了解之后，判断条件就清晰了许多
2. 首先判断 `object` 是否为 `'object'` 类型，如果不是 `object` 类型，返回 `false` 
3. 判断 `index` 类型，如果为 `number`，则有可能是数组的索引，然后判断 `object` 是否为类数组，并且 `index` 是否为一个符合规则的 索引；如果 `index` 类型为 `string`，则需要判断 在 `object` 及其原型链上是否存在 `index`
4. 在符合 第三条的判断条件后，要判断 `value` 和 `object[index]` 是否是相等的值，相等会返回 `true`，否则返回 `false`
5. 如果不通过第三条的判断，直接返回 `false`
## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
    如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true。
2. `eq` 的比较，如果二者都为 `NaN` , 会返回 `true`
## Example
```js
const a = [1,2,3,4]

console.log(isIterateeCall(1, 0 , a)) // true
```
