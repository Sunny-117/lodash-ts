# equalByTag 

## Description 
equalByTag 会根据 tag 类型的不同来比较 object 或者 array 是否相等

此函数仅支持将值与Boolean，Date，Error，Number，RegExp或String的标签进行比较。
## Params
`(object, other, tag, bitmask, customizer, equalFunc, stack)`
> {Object} object - 需要比较的对象
>
> {Object} other - 另外一个需要比较的对象
>
> tag - Object.prototype.toString.call 的值
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
import eq from '../eq.js'
import equalArrays from './equalArrays.js'
import mapToArray from './mapToArray.js'
import setToArray from './setToArray.js'
```
> [eq 源码分析](../export/eq.md)
> <br/>
> <br/>
> [equalArrays 源码分析](./equalArrays.md)
> <br/>
> <br/>
> [mapToArray 源码分析](./mapToArray.md)
> <br/>
> <br/>
> [setToArray 源码分析](./setToArray.md)
>

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

/** `Object#toString` result references. */
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'

/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf

```
## Analyze
```js
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false
      }
      object = object.buffer
      other = other.buffer

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false
      }
      return true

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other)

    case errorTag:
      return object.name == other.name && object.message == other.message

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == `${other}`

    case mapTag:
      let convert = mapToArray

    case setTag:
      const isPartial = bitmask & COMPARE_PARTIAL_FLAG
      convert || (convert = setToArray)

      if (object.size != other.size && !isPartial) {
        return false
      }
      // Assume cyclic values are equal.
      const stacked = stack.get(object)
      if (stacked) {
        return stacked == other
      }
      bitmask |= COMPARE_UNORDERED_FLAG

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other)
      const result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack)
      stack['delete'](object)
      return result

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other)
      }
  }
  return false
}
```
## Remark
整个函数根据 switch 的不同 case 来做不同的处理逻辑，在函数一开始定义了一些常量，来表示 Object.prototype.toString.call 的值，也就是数据类型

### [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
```js
  if ((object.byteLength != other.byteLength) ||
      (object.byteOffset != other.byteOffset)) {
    return false
  }
  object = object.buffer
  other = other.buffer
```
1. byteLength - 此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配 buffer 的长度。
2. byteOffset - 此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始。

如果两个 DataView 相等的话， byteLength 和 byteOffset 的值应当是相等的，如果不相等，则返回 false，表示两个值不匹配，如果这两个值相等了，接下来就该比较 buffer 的值了，在 DataView
 的 case 中，只是取出了两个 buffer 的值，赋值给了 object 和 other，但是也没有 break ，所以会走接下来的 case
 
### [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

```js
  if ((object.byteLength != other.byteLength) ||
      !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
    return false
  }
  return true
```
1. byteLength - 只读属性，表示 ArrayBuffer 的 byte 的大小，在 ArrayBuffer 构造完成时生成，不可改变。

判断两个值 byteLength 是否相等，如果 byteLength 相等，还会使用 equalFunc 函数来判断 [Uint8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) 视图是否相等

###  [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 、[Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 、 [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
```js
  // Coerce booleans to `1` or `0` and dates to milliseconds.
  // Invalid dates are coerced to `NaN`.
  return eq(+object, +other)
```
会将 boolean 转换为 1， 0；date 转为毫秒的时间戳，这里使用[一元正号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7) 进行转换，无效的时期会转为NaN，调用一元正号来转换Date 对象时，会调用到 Date.prototype.valueOf ，返回时间戳

然后调用 eq 来判断是否相等

### [Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
```js
  return object.name == other.name && object.message == other.message
```
只要 Error 的 name 和 message 相等，就认为这两个 Error 对象相等

### [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 、[String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
```js
  // Coerce regexes to strings and treat strings, primitives and objects,
  // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
  // for more details.
  return object == `${other}`
```
1. [RegExp.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString)

在这里是将正则转换为了字符串，如果转为字符串后，二者相等，则认为是相等的

### [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
```js
  let convert = mapToArray
```
Map 这里也只是定义了将 Map 转换为 array，并没有break，没有return，所以会走到后面的 case

### [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
```js
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG
  convert || (convert = setToArray)

  if (object.size != other.size && !isPartial) {
    return false
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(object)
  if (stacked) {
    return stacked == other
  }
  bitmask |= COMPARE_UNORDERED_FLAG

  // Recursively compare objects (susceptible to call stack limits).
  stack.set(object, other)
  const result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack)
  stack['delete'](object)
  return result
```
1. 首先判断了是否部分比较，其次定义了转换方法，承接上一个 `case` 的 `map`，这里 `set` 使用的是 `setToArray` ，`Set` 和 `Map` 不同的也就是这里的转换函数的不同
2. 判断了 `object` 和 `other` 二者的 `size` 长度，如果 `size` 不同，又没有开启部分比较，则二者是不相等的，返回 `false`
3. 这里也是使用 `stack` 来处理了循环引用的问题，这里的判断过程和 [equalArrays](./equalArrays.md) 的一致
4. 取或赋值，`Map` 和 `Set` 都是无序的，这里直接将 `bitmask` 包含了无序比较的模式
5. 使用 `equalArrays` 来比较 `object` 和 `other` 二者数组的相等性，最终返回结果

### [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
```js
  if (symbolValueOf) {
    return symbolValueOf.call(object) == symbolValueOf.call(other)
  }
```
Symbol.prototype.valueOf - 返回 Symbol 对象的初始值.

如果存在 Symbol.prototype.valueOf ，则使用 Symbol.prototype.valueOf 来获取二者的值进行比较，如果相等，则认为两个 Symbol 是相等的
## Example
```js
const a = new Map
const b = new Map

a.set('k', 'v')
b.set('k', 'v')

const stack = new Stack
const fun = (arrValue, othValue, bitmask, customizer, stack) => {
  return equalArrays(arrValue, othValue, bitmask, customizer, fun, stack)
}

console.log(equalByTag(a,b,'[object Map]',undefined,undefined,fun,stack)) // true
```
