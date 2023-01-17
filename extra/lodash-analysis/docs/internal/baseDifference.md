# baseDifference 

## Description 
获取 array 相对于 values 的差集

e.g `[1,2,3],[2,3,4] => [1]`
## Params
`(array, values, iteratee, comparator)`
> {Function} [iteratee] - 每个元素调用的迭代器
>
> {Function} [comparator] - 每个元素调用的比较器。
>

## Return
`Array`
## Depend
```js
import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import map from '../map.js'
import cacheHas from './cacheHas.js'
```
> [SetCache 源码分析](./setCache.md)
> <br/>
> <br/>
> [arrayIncludes 源码分析](./arrayIncludes.md)
> <br/>
> <br/>
> [arrayIncludesWith 源码分析](./arrayIncludesWith.md)
> <br/>
> <br/>
> [map 源码分析](../export/map.md)
> <br/>
> <br/>
> [cacheHas 源码分析](./cacheHas.md)

## Code
```js
const LARGE_ARRAY_SIZE = 200

function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length

  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)

    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}

```
## Analyze
1. 首先判断如果没有传入 `array` ，则直接返回空数组
2. 如果传入了 `iteratee` ，这里先 使用 `map` 将 `values` 处理了一下，后续会有循环比较，这里是为了性能考虑
3. `isCommon` 标识符用来区别是否使用普通方式对比
    - 默认 `isCommon` 为 `true` ， 采用 `arrayIncludes` 进行对比
    - 如果传入了 `comparator` ，`isCommon` 为 `false`，  采用 `arrayIncludesWith` 
    - 没有传入 `comparator` 情况下如果 `values` 的长度大于 200了，`isCommon` 为 `false`， 这里会转为 `SetCache` 来存储数据， 对比方式就采用 `SetCache
    ` 自身的 `has` 来对比
4. 定义了一个 `continue` `label` 为 `outer`，用来接收 `for...of` 循环的迭代
5. 根据是否传入了 `iteratee` 来获取 要比较的值 `computed`
    - 未传入 `computed = value`
    - 传入了 `computed = iteratee(value)`
6. `value = (comparator || value !== 0) ? value : 0` 如果没有传入 `comparator` ， 并且 `value` 不为 +0 或 -0 ，不做处理，否则就返回 0 ，也就是说 +0 和 -0 会转为 0，这里是因为 `Set` 比较时，不区分 +-0
7. isCommon 为真 并且 当前值不为 NaN 时
    - 定义变量缓存 `values` 的长度
    - `while` 循环比较 `values` 中是否有 当前要比较的值，如果有，则 `continue` 掉外层 `for...of` 循环
    - 如果遍历完都没有，则 `push` 到结果数组中
8. isCommon 为假 （传入了 `comparator` 或 `values` 数组长度大于 `200`）或者需要比较的值为 NaN 时
    - 使用 `includes` 判断 值 是否在 `values` 中存在
    - 默认 `includes` 为 `arrayIncludes`
    - 传入了 `comparator`， `includes` 为 `arrayIncludesWith`
    - 没有传入 `comparator` 数组长度大于 200， `includes` 为 `cacheHas`
    - 如果不存在，则 `push` 到结果数组
9. 最终返回 结果
## Remark
1. [label标记语句 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label)
2. [continue MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/continue#%E4%BD%BF%E7%94%A8%E5%B8%A6_label_%E7%9A%84_continue)
3. [sameValueZero](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89)
4. lodash 这里主要是区分了不同的情况来处理数据，如果数据量过大则会采用SetCache的方式来缓存数据
5. 如果 用户传入了 comparator ，则不会处理数据量超过 200 的情况
6. 本质主要是 根据数据量的大小 或者是否传入了 自定义的函数来决定如何处理数据
## Example
```js
const a = [1,2,3,4,5]
const b = [2,3,4,5,6]
baseDifference(a,b) // [1]
```
