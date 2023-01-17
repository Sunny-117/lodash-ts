# baseIsEqualDeep 

## Description 
数组和对象的baseIsEqual的专用版本，它执行深度比较并跟踪遍历的对象，从而可以比较具有循环引用的对象。
## Params
`(object, other, bitmask, customizer, equalFunc, stack)`
> {object} object - 需要比较的对象
>
> {Array} other - 另外一个需要比较的对象
>
> {number} bitmask - 标志位，可以用来控制 部分比较(1) 和 无序的比较(2)
>
> {Function} customizer - 自定义比较的函数。
>
> {Function} equalFunc - 判断值是否相等的函数
>
> {Object} stack - Stack 实例，用来防止循环引用
>

## Return
`Boolean`
## Depend
```js
import Stack from './Stack.js'
import equalArrays from './equalArrays.js'
import equalByTag from './equalByTag.js'
import equalObjects from './equalObjects.js'
import getTag from './getTag.js'
import isBuffer from '../isBuffer.js'
import isTypedArray from '../isTypedArray.js'
```
> [Stack 源码分析](./stack.md)
> <br/>
> <br/>
> [equalArrays 源码分析](./equalArrays.md)
> <br/>
> <br/>
> [equalByTag 源码分析](./equalByTag.md)
> <br/>
> <br/>
> [equalObjects 源码分析](./equalObjects.md)
> <br/>
> <br/>
> [getTag 源码分析](./getTag.md)
> <br/>
> <br/>
> [isBuffer 源码分析](../export/isBuffer.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](../export/isTypedArray.md)

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  let objIsArr = Array.isArray(object)
  const othIsArr = Array.isArray(other)
  let objTag = objIsArr ? arrayTag : getTag(object)
  let othTag = othIsArr ? arrayTag : getTag(other)

  objTag = objTag == argsTag ? objectTag : objTag
  othTag = othTag == argsTag ? objectTag : othTag

  let objIsObj = objTag == objectTag
  const othIsObj = othTag == objectTag
  const isSameTag = objTag == othTag

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false
    }
    objIsArr = true
    objIsObj = false
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack)
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__')
    const othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__')

    if (objIsWrapped || othIsWrapped) {
      const objUnwrapped = objIsWrapped ? object.value() : object
      const othUnwrapped = othIsWrapped ? other.value() : other

      stack || (stack = new Stack)
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
    }
  }
  if (!isSameTag) {
    return false
  }
  stack || (stack = new Stack)
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
}

```
## Analyze
1. 首先定义变量获取了 `object` 和 `other` 的类型和是否为数组，判断了类型是否相同
```js
  let objIsArr = Array.isArray(object)
  const othIsArr = Array.isArray(other)
  let objTag = objIsArr ? arrayTag : getTag(object)
  let othTag = othIsArr ? arrayTag : getTag(other)

  objTag = objTag == argsTag ? objectTag : objTag
  othTag = othTag == argsTag ? objectTag : othTag

  let objIsObj = objTag == objectTag
  const othIsObj = othTag == objectTag
  const isSameTag = objTag == othTag
```
可以看到 `argument` 和 `object` 使用的是同一种处理逻辑

也根据 `objTag` 和 `othTag` 来判断了 二者的类型是否相同

数组在这里也是定义到变量 `objTag` 和 `othTag` 中了

2. 处理 `buffer`
```js
  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false
    }
    objIsArr = true
    objIsObj = false
  }
```
如果 二者类型相同，并且 `obj` 为 `buffer` 类型，则判断 `oth` 是否为 `buffer`，如果 `oth` 不是 `buffer` ，则直接返回 `false`，证明二者不相等

否则的话，将 objIsArr 置为 true，将 `objIsObj` 置为 `false`，做一个标识

3. 处理非 `object` 类型
```js
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack)
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack)
  }
```
如果 `object` 不是一个 `Object` 对象，并且 `object` 和 `other` 类型相同的情况下

这里首先判断了是否传入了 `stack`，如果没有传入 则 `new` 一个新的 `Stack` 实例

这里会根据是否为数组、`buffer`、 `TypedArray` 做不同的判断逻辑

如果为数组、`buffer`、 `TypedArray` 则调用 `equalArrays` 作为判断是否相等，否则使用 `equalByTag` ，传入 `objTag` 来做判断相等逻辑

4. 判断如果不是部分比较，则处理包装对象
```js
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__')
    const othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__')

    if (objIsWrapped || othIsWrapped) {
      const objUnwrapped = objIsWrapped ? object.value() : object
      const othUnwrapped = othIsWrapped ? other.value() : other

      stack || (stack = new Stack)
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
    }
  }
```
包装对象是 lodash 所定义的一种数据格式，会有 `__wrapped__` 属性，这种对象会延迟计算，只有在显示调用 `value` 方法时才会计算值。

因此会判断对象本身是否含有 `__wrapped__` 字段，如果有，则显式调用 `value` 方法取值，然后调用 `equalFunc` 来进行对比。这里同样也判断了是否存在 `stack`  实例，不存在就 `new` 一个

5. 判断是否相同类型
```js
  if (!isSameTag) {
    return false
  }
```
如果 两个值 `tag` 不同，则返回 `false`
6. 最后处理对象类型
```js
  stack || (stack = new Stack)
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
```
不存在 `stack` 实例就新 `new` 一个。调用 equalObjects 来进行相等性判断
## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
2. baseIsEqualDeep 就是根据不同的数据类型做了不同的处理，调用了 数组的对比 对象的对比 等等
## Example
```js
const a = [1]
const b = [1]
a.push(a)
b.push(b)

const stack = new Stack
const fun = (arrValue, othValue, bitmask, customizer, stack) => {
  return equalArrays(arrValue, othValue, bitmask, customizer, fun, stack)
}

console.log(baseIsEqualDeep(a, b, 1, undefined, fun)) // true
```
