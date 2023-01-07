# equalArrays 

## Description 
equalArrays 用来比较两个数组是否相等，会深度比较，来判断是否相等
## Params
`(array, other, bitmask, customizer, equalFunc, stack)`
> {Array} array - 需要比较的数组
>
> {Array} other - 另外一个需要比较的数组
>
> {number} bitmask - 标志位，可以用来控制 部分比较(1) 和 无序数组的比较(2)
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
import SetCache from './SetCache.js'
import some from '../some.js'
import cacheHas from './cacheHas.js'
```
> [SetCache 源码分析](./setCache.md)
> <br/>
> <br/>
> [some 源码分析](../export/some.md)
> <br/>
> <br/>
> [cacheHas 源码分析](./cacheHas.md)

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG
  const arrLength = array.length
  const othLength = other.length

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(array)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let index = -1
  let result = true
  const seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined

  stack.set(array, other)
  stack.set(other, array)

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared
    const arrValue = array[index]
    const othValue = other[index]

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack)
    }
    if (compared !== undefined) {
      if (compared) {
        continue
      }
      result = false
      break
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!some(other, (othValue, othIndex) => {
        if (!cacheHas(seen, othIndex) &&
          (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex)
        }
      })) {
        result = false
        break
      }
    } else if (!(
      arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
    )) {
      result = false
      break
    }
  }
  stack['delete'](array)
  stack['delete'](other)
  return result
}
```
## Analyze
### bitmask
这里的参数处理也是和 [baseClone](./baseClone.md) 中处理方式一致，不再赘述,都是通过位运算来确定值，节省参数数量

### 数据长度不一致
```js
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false
  }
```
这里是判断了，如果两个数组长度不一致，并且不满足局部比较的情况下，就直接返回了 `false`

局部比较的条件是，`isPartial` 为 truthy(`bitmask & 1`)，并且 `othLength > arrLength`

### 循环引用的问题
```js
  const stacked = stack.get(array)
  if (stacked && stack.get(other)) {
    return stacked == other
  }
  let index = -1
  let result = true
  const seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined

  stack.set(array, other)
  stack.set(other, array)
```
在第一次 `stack.get(array)` 时，是获取不到的，为 `undefined`，这里主要是考虑到后面循环调用的问题（比如 `equalFunc` 设置为 `equalArrays`，就会出现递归）

stack在第一次会用 `array` 作为 `key` 来存 `other`， 同时用 `other` 作为 `key` 来存 `array`

这里在后续循环中会传入迭代的值，所以如果 `stack.get(array)` 存在时，表示 `array` 为循环引用，`get(other)` 同理，有值的话也是循环引用

所以这里的判断，如果 `get(array)` 和 `get(other)` 都存在，就判断值是不是相等就可以了

因为在之前 `set` 值时，分别是用 `array` 对应 `other` 和 `other` 对应 `array` 。所以这里直接判断相等也可以判断值的相等

这里的相等判断，判断引用类型时 如果 x 和 y 指向同一个对象，返回 true， 否则返回 false [same](../other/same.md)

### 循环遍历比较
```js
if (customizer) {
  compared = isPartial
    ? customizer(othValue, arrValue, index, other, array, stack)
    : customizer(arrValue, othValue, index, array, other, stack)
}
```
这里如果有自定义的比较函数，则会调用自定义的比较函数来比较，在部分比较的模式下，`arrValue` 和 `othValue` 的值，位置是对调的

```js
if (compared !== undefined) {
  if (compared) {
    continue
  }
  result = false
  break
}
```
如果 `compared` 不是 `undefined`，则判断比较结果，如果为真值，则`continue`，进行下一次循环比较，如果是假值，则将`result`置为 `false`，跳出循环

```js
if (seen) {
  if (!some(other, (othValue, othIndex) => {
    if (!cacheHas(seen, othIndex) &&
      (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      return seen.push(othIndex)
    }
  })) {
    result = false
    break
  }
}
```
判断是否为 无序数组的对比

```js
some(other, (othValue, othIndex) => {
    if (!cacheHas(seen, othIndex) &&
      (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      return seen.push(othIndex)
    }
})
```
这里有一个 `some` 遍历，用来判断 `other` 里面有没有值和当前 `arrValue` 相等，如果有 则往`seen`中添加当前的索引，每次对比都是在 `seen` 中找有没有相等的值存在，其实本来用 `arrValue === othValue` 也可以判断，这里加 `equalFunc` 应该是为了 调用 `customizer` 来处理深层数据的原因

```js
if (!(
  arrValue === othValue ||
        equalFunc(arrValue, othValue, bitmask, customizer, stack)
)) {
  result = false
  break
}
```
如果 不是无序列表的对比，就是判断 `arrValue === othValue` 或者 调用 `equalFunc` 来判断是否相等


在以上都遍历完成后，会先从 `stack` 中删除缓存的值

返回 `result` 结果
## Remark
1. [JS深拷贝](https://juejin.cn/post/6844903620190666759)
2. [解决循环引用和相同引用的js深拷贝实现(BFS)](https://segmentfault.com/a/1190000021682472)
3. 关于循环引用和相同引用的问题，简单点来说就是 
```js
const a = [1]
a.push(a)
```
此时，a 就出现了循环引用
```js
var arr = [1,2,3]
var obj = {}
obj.arr1 = arr
obj.arr2 = arr
```
这个时候就出现了相同引用

如果这个时候使用 JSON.parse JSON.stringify 来拷贝会报错

如果我们只写了递归遍历，没有处理这些问题会直接栈溢出

这里的解决方法其实就是，定义另外一个对象来在迭代过程中缓存其中的值，每次在迭代开始时，都进行一次判断，如果当前对象中已经存在和要拷贝的值相同的值，则证明为相同引用或者循环引用，此时，直接 return 即可，不用再次调用

在 [baseClone](./baseClone.md) 中就是使用 stack 来进行的判断

在 equalArrays 中为了判断值是否相等，所有对于 key 和 value 对应的关系做了转换，存了两次
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

console.log(equalArrays(a, b, 1, undefined, fun, stack)) // true
```
