# baseMergeDeep 

## Description 
数组和对象的baseMerge的特殊版本，它执行深度合并并跟踪遍历的对象，从而可以合并具有循环引用的对象。

merge 的解释
> 递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为 undefined 的 sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。
>

## Params
`(object, source, key, srcIndex, mergeFunc, customizer, stack)`
> {Object} object - 目标对象。
>
> {Object} source - 源对象。
>
> {string} key - 要合并的属性。
>
> {number} srcIndex - “source”的索引。
>
> {Function} mergeFunc  - 合并值的函数。
>
> {Function} [customizer] - 自定义合并函数
>
> {Object} [stack] - Stack 实例，用来处理循环引用
>


## Depend
```js
import assignMergeValue from './assignMergeValue.js'
import cloneBuffer from './cloneBuffer.js'
import cloneTypedArray from './cloneTypedArray.js'
import copyArray from './copyArray.js'
import initCloneObject from './initCloneObject.js'
import isArguments from '../isArguments.js'
import isArrayLikeObject from '../isArrayLikeObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import isPlainObject from '../isPlainObject.js'
import isTypedArray from '../isTypedArray.js'
import toPlainObject from '../toPlainObject.js'
```
> [assignMergeValue 源码分析](./assignMergeValue.md)
> <br/>
> <br/>
> [cloneBuffer 源码分析](./cloneBuffer.md)
> <br/>
> <br/>
> [cloneTypedArray 源码分析](./cloneTypedArray.md)
> <br/>
> <br/>
> [copyArray 源码分析](./copyArray.md)
> <br/>
> <br/>
> [initCloneObject 源码分析](./initCloneObject.md)
> <br/>
> <br/>
> [isArguments 源码分析](../export/isArguments.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](../export/isArrayLikeObject.md)
> <br/>
> <br/>
> [isBuffer 源码分析](../export/isBuffer.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> <br/>
> <br/>
> [isPlainObject 源码分析](../export/isPlainObject.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](../export/isTypedArray.md)
> <br/>
> <br/>
> [toPlainObject 源码分析](../export/toPlainObject.md)

## Code
```js
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  const objValue = object[key]
  const srcValue = source[key]
  const stacked = stack.get(srcValue)

  if (stacked) {
    assignMergeValue(object, key, stacked)
    return
  }
  let newValue = customizer
    ? customizer(objValue, srcValue, `${key}`, object, source, stack)
    : undefined

  let isCommon = newValue === undefined

  if (isCommon) {
    const isArr = Array.isArray(srcValue)
    const isBuff = !isArr && isBuffer(srcValue)
    const isTyped = !isArr && !isBuff && isTypedArray(srcValue)

    newValue = srcValue
    if (isArr || isBuff || isTyped) {
      if (Array.isArray(objValue)) {
        newValue = objValue
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue)
      }
      else if (isBuff) {
        isCommon = false
        newValue = cloneBuffer(srcValue, true)
      }
      else if (isTyped) {
        isCommon = false
        newValue = cloneTypedArray(srcValue, true)
      }
      else {
        newValue = []
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue)
      }
      else if (typeof objValue === 'function' || !isObject(objValue)) {
        newValue = initCloneObject(srcValue)
      }
    }
    else {
      isCommon = false
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue)
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack)
    stack['delete'](srcValue)
  }
  assignMergeValue(object, key, newValue)
}
```
## Analyze
### 循环引用的处理
```js
  const objValue = object[key]
  const srcValue = source[key]
  const stacked = stack.get(srcValue)

  if (stacked) {
    assignMergeValue(object, key, stacked)
    return
  }
```
如果 srcValue 可以从 stack 中获取到，则证明，处于循环引用中，直接使用 assignMergeValue 进行值的合并即可

这里的循环应用和 [equalArrays](./equalArrays.md) 中基本一致

### 自定义合并函数
```js
  let newValue = customizer
    ? customizer(objValue, srcValue, `${key}`, object, source, stack)
    : undefined
```
如果传入了自定义处理函数，则调用自定义处理函数，拿到返回的值，赋值给 newValue，否则newValue 为 undefined

### 处理其他情况
```js
  let isCommon = newValue === undefined

  if (isCommon) {
    const isArr = Array.isArray(srcValue)
    const isBuff = !isArr && isBuffer(srcValue)
    const isTyped = !isArr && !isBuff && isTypedArray(srcValue)

    newValue = srcValue
    if (isArr || isBuff || isTyped) {
      if (Array.isArray(objValue)) {
        newValue = objValue
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue)
      }
      else if (isBuff) {
        isCommon = false
        newValue = cloneBuffer(srcValue, true)
      }
      else if (isTyped) {
        isCommon = false
        newValue = cloneTypedArray(srcValue, true)
      }
      else {
        newValue = []
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue)
      }
      else if (typeof objValue === 'function' || !isObject(objValue)) {
        newValue = initCloneObject(srcValue)
      }
    }
    else {
      isCommon = false
    }
  }
```
如果 newValue 为 undefined ，则会进入下一步，这里会根据 **`srcValue`** 的类型作为判断，如果 **`srcValue`** 满足 `数组` `buffer` `typedArray` 这几种情况中的任意一种，就会判断 `objValue` 的值，并做相应的处理


### objValue 为 数组
```js
if (Array.isArray(objValue)) {
    newValue = objValue
}
```
这里只是将 `newValue` 赋值为 `objValue` ，并没有改变 `isCommon` 的值，数组类型在后续需要深度合并处理

### objValue 为 类数组
```js
if (isArrayLikeObject(objValue)) {
    newValue = copyArray(objValue)
}
```
类数组这里整体逻辑和数组处理基本一致，不同在于会通过 `copyArray`，将类数组拷贝一份，会返回数组

### srcValue 为 buffer
```js
if (isBuff) {
    isCommon = false
    newValue = cloneBuffer(srcValue, true)
}
```
这里将 `isCommon` 置为 `false`，也就是说不需要深度合并处理，到函数最后，会调用 `assignMergeValue` 来进行合并

`newValue` 的值，会通过 `cloneBuffer` 生成，这里有一点需要注意，`cloneBuffer` 传入了 `true`，表示深拷贝，但是 `lodash` `cloneBuffer` 的深拷贝，有点问题，具体可见 [cloneBuffer](./cloneBuffer.md)

### srcValue 为 typedArray
```js
if (isTyped) {
    isCommon = false
    newValue = cloneTypedArray(srcValue, true)
}
```
这里处理逻辑和 `buffer` 一样，不再赘述

### 其他
如果 **`srcValue`** 满足 `数组` `buffer` `typedArray` 这几种情况中的任意一种，但是以上几种 `if` 判断都不满足，会将 `newValue` 置为空数组，但是没有改变 `isCommon` 的值，最终还是会走深度合并处理

### 对象
```js
if (isPlainObject(srcValue) || isArguments(srcValue)) {
  newValue = objValue
  if (isArguments(objValue)) {
    newValue = toPlainObject(objValue)
  }
  else if (typeof objValue === 'function' || !isObject(objValue)) {
    newValue = initCloneObject(srcValue)
  }
}
```
如果 srcValue 为普通对象或者为 argument 对象，都会走到这个判断分支

首先会将 `objValue` 赋值给 `newValue`。如果 `objValue` 为 `argument` 对象，则将 `objValue` 转换为普通对象，赋值给 `newValue`；如果 `objValue` 为 函数或者不是一个对象类型，则调用 `initCloneObject` 根据 `srcValue` 初始化一个空对象

`srcValue` 为对象，所以也需要深度合并处理

### 其他
如果 `srcValue` 本质不是数组类型或者对象类型，则将 `isCommon` 置为 `false`，在开始已经将 `srcValue` 的值赋值给 `newValue` 了，所以这里不需要重新赋值

### 深度合并处理
```js
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue)
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack)
    stack['delete'](srcValue)
  }
```
如果函数走到这里 `isCommon` 为 `true` ，则会调用 `mergeFunc` 进行深度处理

在这里 `stack` 会使用 `srcValue` 作为 `key` ，`newValue` 作为值缓存，这一步是为处理循环引用

在 `mergeFunc` 调用完成后，会从 `stack` 中删除对应缓存的键值对

### 不需要深度合并处理的类型
```js
  assignMergeValue(object, key, newValue)
```
对于不需要处理深度合并的情况，调用 `assignMergeValue` 来进行值的合并即可
## Remark
1. `newValue` 在判断 `objValue` 为引用类型时，都是会将 `objValue` 的值赋值给它，目的是为了递归处理
2. 关于数据类型 `buffer` `typedArray` 等，可查看对应的源码分析
## Example
```js
const func = (newValue, srcValue, srcIndex, customizer, stack) => {
  if (isObject(srcValue)) {
    Object.keys(srcValue).forEach(k => {
      baseMergeDeep(newValue, srcValue, k, srcIndex, func, customizer, stack)
    })
  } else if (Array.isArray(srcValue)){
    for (const k of srcValue) {
      baseMergeDeep(newValue, srcValue, k, srcIndex, func, customizer, stack)
    }
  } else {
    baseMergeDeep(newValue, srcValue, undefined, srcIndex, func, customizer, stack)
  }
}

const a = {a: {a : 1}, b: [1,2,3], c: 'c'}
const b = {a: {a : 2}, d: {a : 1, b: 2}, e: [4,5,6], f: 'f'}

const stack = new Map

Object.keys(b).forEach(k => {
  baseMergeDeep(a, b, k, undefined, func, undefined, stack)
})


console.log(a)
/**
 *  {
 *    a: { a: 2 },
 *    b: [ 1, 2, 3 ],
 *    c: 'c',
 *    d: { a: 1, b: 2 },
 *    e: [ 4, 5, 6 ],
 *    f: 'f'
 * }
 * */
```
