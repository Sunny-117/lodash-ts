# isEmpty

## Description
检查 value 是否为一个空对象，集合，映射或者 set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类 jquery 选择器。

对象如果被认为为空，那么他们没有自己的可枚举属性的对象。

类数组值，比如 arguments 对象，array，buffer，string 或者类 jQuery 集合的 length 为 0，被认为是空。类似的，map（映射）和 set 的 size 为 0，被认为是空。

## Params
`value`

## Return
`Boolean`

## Depend
```js
import getTag from './.internal/getTag.js'
import isArguments from './isArguments.js'
import isArrayLike from './isArrayLike.js'
import isBuffer from './isBuffer.js'
import isPrototype from './.internal/isPrototype.js'
import isTypedArray from './isTypedArray.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isArguments 源码分析](./isArguments.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)
> <br/>
> <br/>
> [isBuffer 源码分析](./isBuffer.md)
> <br/>
> <br/>
> [isPrototype 源码分析](../internal/isPrototype.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](./isTypedArray.md)

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty
function isEmpty(value) {
  if (value == null) {
    return true
  }
  if (isArrayLike(value) &&
    (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
      isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length
  }
  const tag = getTag(value)
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
```
## Analyze
### null 和 undefined
```js
  if (value == null) {
    return true
  }
```
如果 value 是 null 或者 undefined ，则返回 true

### 类数组对象
```js
  if (isArrayLike(value) &&
    (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
      isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length
  }
```
如果 是类数组对象，则通过 `length` 来判断是否是空

`Array.isArray(value)` - 数组

`typeof value === 'string'` - 字符串

`typeof value.splice === 'function'` - 用来判断是否为 `jquery-like` 对象，`jquery-like` 对象会有这个 `splice` 方法

`isBuffer(value)` - `Buffer` 类型

`isTypedArray(value)` - `TypedArray` 类型

`isArguments(value)` - `arguments`

以上都会通过 `length` 属性来判断是否为空

### Map 和 Set
```js
  const tag = getTag(value)
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size
  }
```

`Map` 和 `Set` 对象则使用 `size` 来判断

### 原型对象
```js
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
```

原型对象则判断其存在不存在 `key` 值

### 其他可枚举对象
```js
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
```
使用 `for...in` 遍历，如果自身有可遍历属性，则表示不是空，这里使用 `Object.prototype.hasOwnProperty` 来进行判断

使用 `for...in` 不是用 `Object.keys` 是因为在 ES5 里，如果 `Object.keys` 的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在 ES2015 中，非对象的参数将被强制转换为一个对象。

## Remark
1. [Object.keys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。

## Example
```js
isEmpty(null)
// => true

isEmpty(true)
// => true

isEmpty(1)
// => true

isEmpty([1, 2, 3])
// => false

isEmpty('abc')
// => false

isEmpty({ 'a': 1 })
// => false

```
