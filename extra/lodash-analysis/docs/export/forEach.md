# forEach

## Description
调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用 3 个参数： (value, index|key, collection)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。

注意: 与其他 "集合" 方法一样，类似于数组，对象的 "length" 属性也会被遍历。想避免这种情况，可以用 forIn 或者 forOwn 代替。
## Params
`(collection, iteratee)`
## Return
`{Array|Object}`
## Depend
```js
import arrayEach from './.internal/arrayEach.js'
import baseEach from './.internal/baseEach.js'
```
> [arrayEach 源码分析](../internal/arrayEach.md)
> <br/>
> <br/>
> [baseEach 源码分析](../internal/baseEach.md)

## Code
```js
function forEach(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEach : baseEach
  return func(collection, iteratee)
}
```
## Analyze
会判断传入的 `collection` 是不是 `array`，如果是 `array`，则使用 `arrayEach`，否则使用 `baseEach`
## Remark
1. [Array.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法对数组的每个元素执行一次给定的函数。
2. [NodeList.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/forEach) 接口的 forEach() 方法按插入顺序为列表中的每个值对调用一次参数中给定的回调。
3. [TypedArray.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach) 方法对类型化数组的每个元素调用提供的函数。 这个方法的算法和 Array.prototype.forEach()相同。 TypedArray 是这里的 类型化数组类型 之一。
4. [Set.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。
5. [Map.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) 方法按照插入顺序依次对 Map 中每个键 / 值对执行一次给定的函数
## Example
```js
console.log(forEach([1,2,3,4,5], (v, i, arr) => arr[i] = ++v)) // [ 2, 3, 4, 5, 6 ]
```
