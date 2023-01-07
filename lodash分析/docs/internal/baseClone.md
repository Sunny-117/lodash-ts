# baseClone 

## Description 
 [clone](../export/clone.md) 和 [cloneDeep](../export/cloneDeep.md) 的基本实现，会处理循环引用的问题。
## Params
`(value, bitmask, customizer, key, object, stack)`
> value 要拷贝的值
>
> bitmask： 1 深拷贝  2 是否拷贝原型链上的属性 4 是否拷贝 symbol
>
> customizer 自定义拷贝函数
>
> key value属性对应的key
>
> object value属性的父对象
>
> stack Stack 类的实例，用来存储引用类的 value ，会用来避免循环依赖。
>

## Return
`{*}` -- 拷贝好的值
## Depend
```js
import Stack from './Stack.js'
import arrayEach from './arrayEach.js'
import assignValue from './assignValue.js'
import cloneBuffer from './cloneBuffer.js'
import copyArray from './copyArray.js'
import copyObject from './copyObject.js'
import cloneArrayBuffer from './cloneArrayBuffer.js'
import cloneDataView from './cloneDataView.js'
import cloneRegExp from './cloneRegExp.js'
import cloneSymbol from './cloneSymbol.js'
import cloneTypedArray from './cloneTypedArray.js'
import copySymbols from './copySymbols.js'
import copySymbolsIn from './copySymbolsIn.js'
import getAllKeys from './getAllKeys.js'
import getAllKeysIn from './getAllKeysIn.js'
import getTag from './getTag.js'
import initCloneObject from './initCloneObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import isTypedArray from '../isTypedArray.js'
import keys from '../keys.js'
import keysIn from '../keysIn.js'
```
> [Stack 源码分析](./stack.md)
> <br/>
> <br/>
> [arrayEach 源码分析](./arrayEach.md)
> <br/>
> <br/>
> [assignValue 源码分析](./assignValue.md)
> <br/>
> <br/>
> [cloneBuffer 源码分析](./cloneBuffer.md)
> <br/>
> <br/>
> [copyArray 源码分析](./copyArray.md)
> <br/>
> <br/>
> [copyObject 源码分析](./copyObject.md)
> <br/>
> <br/>
> [cloneArrayBuffer 源码分析](./cloneArrayBuffer.md)
> <br/>
> <br/>
> [cloneDataView 源码分析](./cloneDataView.md)
> <br/>
> <br/>
> [cloneRegExp 源码分析](./cloneRegExp.md)
> <br/>
> <br/>
> [cloneSymbol 源码分析](./cloneSymbol.md)
> <br/>
> <br/>
> [cloneTypedArray 源码分析](./cloneTypedArray.md)
> <br/>
> <br/>
> [copySymbols 源码分析](./copySymbols.md)
> <br/>
> <br/>
> [copySymbolsIn 源码分析](./copySymbolsIn.md)
> <br/>
> <br/>
> [getAllKeys 源码分析](./getAllKeys.md)
> <br/>
> <br/>
> [getAllKeysIn 源码分析](./getAllKeysIn.md)
> <br/>
> <br/>
> [initCloneObject 源码分析](./initCloneObject.md)
> <br/>
> <br/>
> [isBuffer 源码分析](../export/isBuffer.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](../export/isTypedArray.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)
> <br/>
> <br/>
> [keysIn 源码分析](../export/keysIn.md)
>

## Code
```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}

function initCloneArray(array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

function baseClone(value, bitmask, customizer, key, object, stack) {
  let result
  const isDeep = bitmask & CLONE_DEEP_FLAG
  const isFlat = bitmask & CLONE_FLAT_FLAG
  const isFull = bitmask & CLONE_SYMBOLS_FLAG

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value)
  }
  if (result !== undefined) {
    return result
  }
  if (!isObject(value)) {
    return value
  }
  const isArr = Array.isArray(value)
  const tag = getTag(value)
  if (isArr) {
    result = initCloneArray(value)
    if (!isDeep) {
      return copyArray(value, result)
    }
  } else {
    const isFunc = typeof value === 'function'

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep)
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value)
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value))
      }
    } else {
      if (isFunc || !cloneableTags[tag]) {
        return object ? value : {}
      }
      result = initCloneByTag(value, tag, isDeep)
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack)
  const stacked = stack.get(value)
  if (stacked) {
    return stacked
  }
  stack.set(value, result)

  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
  }

  if (tag == setTag) {
    value.forEach((subValue) => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
  }

  if (isTypedArray(value)) {
    return result
  }

  const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys)

  const props = isArr ? undefined : keysFunc(value)
  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue
      subValue = value[key]
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
  })
  return result
}
```
## Analyze
### bitmask
```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1 // 0001
const CLONE_FLAT_FLAG = 2 // 0010
const CLONE_SYMBOLS_FLAG = 4 // 0100
```
```js
function baseClone (value, bitmask, customizer, key, object, stack) {
  const isDeep = bitmask & CLONE_DEEP_FLAG
  const isFlat = bitmask & CLONE_FLAT_FLAG
  const isFull = bitmask & CLONE_SYMBOLS_FLAG
}
```
定义了一个参数 bitmask 来处理 三种不同情况的拷贝，这里用到了 [按位与(&)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E6%8C%89%E4%BD%8D%E4%B8%8E) 运算（也就是二进制与运算，如果对应的位数都为1，则为1，否则为0）
```js
const a = 5;        // 00000000000000000000000000000101
const b = 3;        // 00000000000000000000000000000011

console.log(a & b); // 00000000000000000000000000000001
// expected output: 1
```
按照传入 bitmask 的值来区分 isDeep（是否深拷贝），isFlat（是否拷贝原型链），isFull（是否拷贝symbol）
```js
bitmask == 1 
isDeep = 0001 & 0001 // 1;
isFlat = 0001 & 0010 // 0;
isFull = 0001 & 0100 // 0;

bitmask == 2 
isDeep = 0010 & 0001 // 0;
isFlat = 0010 & 0010 // 2;
isFull = 0010 & 0100 // 0;

bitmask == 4
isDeep = 0100 & 0001 // 0;
isFlat = 0100 & 0010 // 0;
isFull = 0100 & 0100 // 4;
```
这样算起来，其实可以通过一个参数实现多种效果共存，如果要同时开启 isDeep、isFlat、isFull 只需要传入的数值 二进制为 `0111`即可，也就是 7 （`0001 | 0010 | 0100` 的结果）

使用二进制标识符，可以做到一个参数实现不同效果，达到了节省参数的目的

### customizer
如果 传入了 customizer 自定义拷贝函数，那么拷贝逻辑就放到了 customizer 中去处理，如果最终结果不为 undefined，baseClone 将不再处理拷贝逻辑
```js
let result
if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value)
}
if (result !== undefined) {
    return result
}
```
这里若果没有传入父级 `object` ，则在调用函数时也不会传入，没有意义，直接传入 `value` 即可

### isObject
对于基本类型和 null 直接返回 value 即可，基本类型不涉及同一内存空间的问题
```js
if (!isObject(value)) {
    return value
}
```

### initCloneArray
```js
const hasOwnProperty = Object.prototype.hasOwnProperty

function initCloneArray(array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}
```
[Array.prototype.constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E5%B1%9E%E6%80%A7_2) 的值就是 Array，表明了所有的数组都是由 Array 构造出来的。

首先获取 传入数组的 `length` ，然后使用 `new array.constructor` (相当于 `new Array`) 来创建一个长度一致的数组

这里接下来对于 [RegExp#exec](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#description) 做了处理 (如果匹配成功，exec() 方法返回一个数组,包含额外的属性 `index` 和 `input` )
```js
const a = /\s*/g.exec('Hello world') // [ '', index: 0, input: 'Hello world', groups: undefined ]
```

所以 这里进行了判断，使用 [hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 来判断是否含有 `index` 属性

```js
if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
}
```

### 数组浅拷贝
```js
const isArr = Array.isArray(value)

if (isArr) {
    result = initCloneArray(value)
    if (!isDeep) {
          return copyArray(value, result)
    }
} 
```
判断 如果传入的 value 是数组，通过 `initCloneArray` 初始化一个数组，如果不是深拷贝，则直接通过 `copyArray` 返回 `result`

### Buffer 
```js
if (isArr) {
// ...
} else {
    if (isBuffer(value)) {
        return cloneBuffer(value, isDeep)
    }
}
```
如果传入的 `value` 为 `Buffer` 类型，则直接使用 `cloneBuffer` 返回结果，这里将 isDeep 传入了， `cloneBuffer` 会根据这个来进行处理，但是这里有一点问题，详情查看 [cloneBuffer](./cloneBuffer.md)

### 是否可以拷贝 Tag
```js
/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true

cloneableTags[errorTag] = cloneableTags[weakMapTag] = false
```
这里将 Error 和 WeakMap 标记为了不可拷贝，不在可拷贝列表中的其他对象，也不可拷贝

### Object、Arguments、Function 浅拷贝

```js
const tag = getTag(value)

if (isArr) {
//...
} else {
    const isFunc = typeof value === 'function'
 
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value)
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value))
      }
    }
}
```
首先判断 tag 的类型 是不是 Object，Arguments，或者传入的 value 为 Function，并且没有传入 object

```js
tag == objectTag || tag == argsTag || (isFunc && !object)
```

在 `isFlat` 或者 `isFunc`（传入 `value` 为 函数，没有传入 `object`）为真的情况下，初始化 `result` 为 空对象（不需要考虑原型链的情况），否则使用 `initCloneObject` 来初始化对象

```js
result = (isFlat || isFunc) ? {} : initCloneObject(value)
```

如果不需要深拷贝，需要拷贝原型链 isFlat 为真

```js
copySymbolsIn(value, copyObject(value, keysIn(value), result))
```

首先调用 `keysIn(value)` 将`value`及`value`原型链上所有非 `Symbol` 的可枚举属性收集，然后调用 `copyObject` 将非 `Symbol` 属性值拷贝到 `result` 中，再调用 `copySymbolsIn` 将自身及原型链上 `Symbol` 类型的可枚举属性值也拷贝到 `result` 中

如果不需要考虑原型链

```js
copySymbols(value, Object.assign(result, value))
```

使用 `Object.assign` 拷贝自身可枚举属性值到 `result` 中(除 `symbol`)，再调用 `copySymbols` 将 `value` 可枚举的 `Symbol` 属性值拷贝到 `result` 中即可

### initCloneByTag
```js
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}
```

对于不同的 tag 类型做了不同的处理
1. arrayBufferTag
    - 直接调用 cloneArrayBuffer 将返回结果 赋值给 result
2. boolTag、dateTag
    - 使用 object 自身的构造函数初始化一个新的对象，初始化值为 使用 [一元正号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7) 转换之后的数字 （布尔为 1、0；Date 为时间戳）
3. dataViewTag
    - 直接调用 cloneDataView 将返回结果 赋值给 result
4. TypedArray
    - 直接调用 cloneTypedArray 将返回结果 赋值给 result
5. mapTag
    - new 一个新的 Map
6. numberTag、stringTag
    - new 一个新的对象，初始值为 object 本身
7. regexpTag
    - 直接调用 cloneRegExp 将返回结果 赋值给 result
8. setTag
    - new 一个新的 Set
9. symbolTag
    - 直接调用 cloneSymbol 将返回结果 赋值给 result

### 不可拷贝类型
```js
const tag = getTag(value)

if (isArr) {
//...
} else {
    const isFunc = typeof value === 'function'
 
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
     // ...
    } else {
       if (isFunc || !cloneableTags[tag]) {
          return object ? value : {}
       }
       result = initCloneByTag(value, tag, isDeep)
    }
}
```

如果传入的 `value` 为 `Function` ，或者 `value` 的 `tag` 为 不可拷贝类型，会判断有没有传入 `object`，如果传入了 `object`，那么就返回 `value` 本身，否则返回一个空对象

对于其他 `tag` 类型，会调用 `initCloneByTag` 做初始化处理

### 循环引用的解决

```js
stack || (stack = new Stack)
const stacked = stack.get(value)
if (stacked) {
    return stacked
}
stack.set(value, result)
```

在深度拷贝中，很容易出现 循环引用的情况

```js
const a = [1]
a.push(a)
```

解决思路为 使用 `value` 作为 `key` 值， `result` 结果 作为 `value` 值，存到 `Stack` 中，每次递归会判断 如果 `Stack.get` 能拿到值，则说明之前已经进行过赋值了，直接将 `result` 返回即可，否则的话 使用 `Stack.set` 进行值的绑定，将 `result` 存到 `Stack` 中

### [Map 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
```js
result = initCloneByTag(value, tag, isDeep) // new Map
if (tag == mapTag) {
    value.forEach((subValue, key) => {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
}
```

对于 Map 类型，在之前代码中已经调用 initCloneByTag 将 result 处理成了一个 新的 Map 实例，所以在这里 使用 [Map.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)  进行遍历，使用 set 进行赋值，这里对于 subValue 本身，使用了 baseClone 递归调用处理值

### [Set 类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
```js
result = initCloneByTag(value, tag, isDeep) // new Set
if (tag == setTag) {
    value.forEach((subValue) => {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
    })
    return result
}
```

对于 `Set` 的处理 和 `Map` 类型相似，也是使用 `forEach` 方法进行遍历，使用 `add` 往 `Set` 尾部追加元素，对于值的处理也是递归调用了 `baseClone` 进行处理

### [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
```js
result = initCloneByTag(value, tag, isDeep) // cloneTypedArray
if (isTypedArray(value)) {
    return result
}
```

对于 `TypedArray` ，因为在之前已经调用 `cloneTypedArray` 进行过拷贝处理，所以这里直接返回结果即可

### 属性处理
```js
const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys)
const props = isArr ? undefined : keysFunc(value)
```
这里进行了判断是否要拷贝 symbol 属性

1. 拷贝
    - 是否需要原型链属性，如果需要使用 `getAllKeysIn` ，不需要则使用 `getAllKeys`
2. 不拷贝
    - 是否需要原型链属性，如果需要使用 `keysIn` ，不需要则使用 `keys`
    
对于数组，则不需要 属性的数组，置为undefined，否则的话 获取到 keys 放置到 props 中

### 遍历赋值
```js
arrayEach(props || value, (subValue, key) => {
    if (props) {
        key = subValue
        subValue = value[key]
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
})
```
使用 `arrayEach` 遍历属性集合 `props` 或者数组 `value`

如果 `value` 是数组，则每次遍历时， `subValue` 就是当前项的值，`key` 则为当前下标

如果 `props` 存在，则表示当前遍历的不是数组，而是对象，则将 subValue 赋值给 key ，再从 value 中将 key 的值取出，重新赋值给 subValue ，这样遍历时 数组 和 对象 所对应 subValue 和 key 的意义就相同了

递归调用 `baseClone` 对 `subValue` 进行拷贝，然后调用 `assignValue` 将拷贝后的值赋值给结果 `result` 对应的 `key` 上，这样就实现了数组和对象的深拷贝

## Remark
1. 从头分析会发现 lodash 巧妙的使用了 位标识符 来减少了参数的数量，使用 & 运算可以达到目的
2. 首先对于浅拷贝等处理逻辑相对简单的Tag进行了处理并返回了结果
3. 使用 Stack 对于循环引用进行了一个判断处理
4. 使用 initCloneByTag 对于很多相同的处理逻辑做了一个 result 的初始化
5. 对于 Map 和 Set 都是循环递归的处理了值
6. 最后统一对数组和对象进行了深拷贝的处理
7. 拷贝是借鉴了 [结构化克隆算法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)
## Example
```js
const b = {
  c: {
    d: {
      e: 1
    },
    e: 1
  },
  b: 1
}

const c = baseClone(b, 1)

b.c.d.e = 2

console.log(b) // { c: { d: { e: 2 }, e: 1 }, b: 1 }
console.log(c) // { c: { d: { e: 1 }, e: 1 }, b: 1 }
```
