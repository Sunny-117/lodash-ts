# transform

## Description
[reduce](./reduce.md) 的替代方法；此方法将转换 object 对象为一个新的 accumulator 对象，结果来自 iteratee 处理自身可枚举的属性。 每次调用可能会改变 accumulator 对象。如果不提供 accumulator，将使用与 [[Prototype]] 相同的新对象（即原型一致）。iteratee 调用 4 个参数：(accumulator, value, key, object)。如果返回 false，iteratee 会提前退出。

## Params
`(object, iteratee, accumulator)`

## Return
`{*}`

## Depend
```js
import arrayEach from './.internal/arrayEach.js'
import baseForOwn from './.internal/baseForOwn.js'
import isBuffer from './isBuffer.js'
import isObject from './isObject.js'
import isTypedArray from './isTypedArray.js'
```
> [arrayEach 源码分析](../internal/arrayEach.md)
> <br/>
> <br/>
> [baseForOwn 源码分析](../internal/baseForOwn.md)
> <br/>
> <br/>
> [isBuffer 源码分析](./isBuffer.md)
> <br/>
> <br/>
> [isObject 源码分析](./isObject.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](./isTypedArray.md)

## Code
```js
function transform(object, iteratee, accumulator) {
  const isArr = Array.isArray(object)
  const isArrLike = isArr || isBuffer(object) || isTypedArray(object)

  if (accumulator == null) {
    const Ctor = object && object.constructor
    if (isArrLike) {
      accumulator = isArr ? new Ctor : []
    }
    else if (isObject(object)) {
      accumulator = typeof Ctor === 'function'
        ? Object.create(Object.getPrototypeOf(object))
        : {}
    }
    else {
      accumulator = {}
    }
  }
  (isArrLike ? arrayEach : baseForOwn)(object, (value, index, object) =>
    iteratee(accumulator, value, index, object))
  return accumulator
}
```

## Analyze
在没有传入 `accumulator` 或者 `accumulator` 为 `null` 时，会给 `accumulator` 一个初始值

如果是 类数组，则判断 `object` 是否为 `array` ，如果是 `array` 则为 `new Ctor`，其他情况则使用空数组

如果是 对象，则会判断 `Ctor` 是不是 `function` 类型，如果是 `function` 类型，则使用 `Object.create` 得到一个和传入的 `object` 原型一致的对象；如果不是 `function` 类型，则使用空对象 

其他情况下都使用 空对象

在最终迭代时，会根据是 类数组还是其他的确定迭代方法，类数组使用 `arrayEach` ，其他情况下使用 `baseForOwn`，调用 `iteratee` 迭代器，可直接修改 `accumulator` 对象

## Remark
1. [Object.create() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

2. [Object.getPrototypeOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) 方法返回指定对象的原型（内部 [[Prototype]] 属性的值）。

## Example
```js
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

const func = (result, v, i, obj) => {
  result[i] = obj[i]
}

const temp = {
  obj: {}
}

console.log(transform(obj, func)) // { a: 1, b: 2, c: 3, d: 4 }
console.log(transform(obj, func, temp.obj)) // { a: 1, b: 2, c: 3, d: 4 }
console.log(temp) // { obj: { a: 1, b: 2, c: 3, d: 4 } }
```
