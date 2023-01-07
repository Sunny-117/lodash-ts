# equalObjects 

## Description 
equalObjects 用来比较两个对象是否相等，会深度比较
## Params
`(object, other, bitmask, customizer, equalFunc, stack)`

> {object} object - 需要比较的对象
>
> {object} other - 另外一个需要比较的对象
>
> {number} bitmask - 标志位，可以用来控制 部分比较(1)
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
import getAllKeys from './getAllKeys.js'
```
> [getAllKeys 源码分析](./getAllKeys.md)
>

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG
  const objProps = getAllKeys(object)
  const objLength = objProps.length
  const othProps = getAllKeys(other)
  const othLength = othProps.length

  if (objLength != othLength && !isPartial) {
    return false
  }
  let key
  let index = objLength
  while (index--) {
    key = objProps[index]
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false
    }
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(object)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let result = true
  stack.set(object, other)
  stack.set(other, object)

  let compared
  let skipCtor = isPartial
  while (++index < objLength) {
    key = objProps[index]
    const objValue = object[key]
    const othValue = other[key]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack)
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
      ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
      : compared
    )) {
      result = false
      break
    }
    skipCtor || (skipCtor = key == 'constructor')
  }
  if (result && !skipCtor) {
    const objCtor = object.constructor
    const othCtor = other.constructor

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor === 'function' && objCtor instanceof objCtor &&
          typeof othCtor === 'function' && othCtor instanceof othCtor)) {
      result = false
    }
  }
  stack['delete'](object)
  stack['delete'](other)
  return result
}

```
## Analyze
1. 首先定义常量，是否部分比较和 `hasOwnProperty`
2. 判断长度如果不同，又不是部分比较，直接返回 `false`
```js
const isPartial = bitmask & COMPARE_PARTIAL_FLAG
const objProps = getAllKeys(object)
const objLength = objProps.length
const othProps = getAllKeys(other)
const othLength = othProps.length

if (objLength != othLength && !isPartial) {
    return false
}
```
3. 判断取出的 `key` 是否在 `other` 上存在，如果开启部分比较，则在原型链上即可，否则判断是否在 `other` 对象上，如果不存在就返回 `false`
```js
  let key
  let index = objLength
  while (index--) {
    key = objProps[index]
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false
    }
  }
```
4. 紧接着处理循环引用的问题，这里和 [equalArrays](./equalArrays.md) 一致
```js
  // Assume cyclic values are equal.
  const stacked = stack.get(object)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let result = true
  stack.set(object, other)
  stack.set(other, object)
```
5. 接着判断是否传入了自定义比较函数
```js
  let compared
  let skipCtor = isPartial
  while (++index < objLength) {
    key = objProps[index]
    const objValue = object[key]
    const othValue = other[key]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack)
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
      ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
      : compared
    )) {
      result = false
      break
    }
    skipCtor || (skipCtor = key == 'constructor')
  }
```
如果传入了 `customizer` 函数，则使用 `customizer` 函数进行处理，如果开始了部分比较，object和other的值以及对象位置是互换的

紧接着判断 `compared` 是否为 `undefined` ，如果为 `undefined`，则进行比较逻辑。即使经过了 `customizer` 的处理，也有可能返回 `undefined`

首先直接 `===` 判断值是否相等，如果 `===` 判断不过，则使用 传入的 `equalFunc` 来进行相等性的判断，如果不相等，则将 `result` 置为 `false`，并跳出循环

`skipCtor` 这里一开始赋值是 `isPartial` 的值，也就是说，如果没有开启部分比较，就判断 `key` 是否为 `constructor`，将结果赋值给 `skipCtor`

6. `constructor` 的比较过程
```js
  if (result && !skipCtor) {
    const objCtor = object.constructor
    const othCtor = other.constructor

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor === 'function' && objCtor instanceof objCtor &&
          typeof othCtor === 'function' && othCtor instanceof othCtor)) {
      result = false
    }
  }
```

如果在之前的比较结果中 `result` 为 `true` ，并且 `skipCtor` 为 `false` 的情况下，会进行 `constructor` 的比较
 - 如果 `object` 和 `other` 的 `constructor` 相等，则认为二者相等
 - 如果 `object` 和 `other` 的 `constructor` 不相等，但是 二者的原型链上都有 `constructor` 属性，也认为 二者相等
 ```js
    const a = Object.create(null)
    a.a = 1

    b = {a:1}
 ```
 - 如果 `object` 和 `other` 的 `constructor` 不想等，但是 二者的 `constructor` 都是函数，并且都是由 `Object` 直接创建的，则认为是相等的，也就是跨域对象，但是都是由 `Object` 创建，比较常见的就是 `iframe`
    - 这里是根据 `Object.constructor instanceOf Object.constructor` 为 `true` 这一特性来判断 `iframe` 的不同对象的比较
    - [instanceof 和多全局对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_%E5%92%8C%E5%A4%9A%E5%85%A8%E5%B1%80%E5%AF%B9%E8%B1%A1%E4%BE%8B%E5%A6%82%EF%BC%9A%E5%A4%9A%E4%B8%AA_frame_%E6%88%96%E5%A4%9A%E4%B8%AA_window_%E4%B9%8B%E9%97%B4%E7%9A%84%E4%BA%A4%E4%BA%92)

## Remark
1. [instanceof MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
2. [Object.prototype.constructor MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
## Example
```js
const a = Object.create(null)
a.a = a.b = a.c = a.d = a

const b = {}
b.a = b.b = b.c = b.d = b

const stack = new Stack


const fun = (arrValue, othValue, bitmask, customizer, stack) => {
  return equalObjects(arrValue, othValue, bitmask, customizer, fun, stack)
}

console.log(equalObjects(a, b, 0, undefined, fun, stack)) // true

```
