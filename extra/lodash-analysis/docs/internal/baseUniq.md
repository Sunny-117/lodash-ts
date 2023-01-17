# baseUniq

## Description
baseUniq 的作用是数组去重，是实现 uniq 、uniqBy 和 uniqWith 的内部方法，因此除了需要支持基本的去重操作外，还要支持 uniqBy 的 iteratee 参数和 uniqWith 的 comparator 参数。
## Params
`(array, iteratee, comparator)`
## Return
`Array`
## Depend
```js
import SetCache from './SetCache.js'
import arrayIncludes from './arrayIncludes.js'
import arrayIncludesWith from './arrayIncludesWith.js'
import cacheHas from './cacheHas.js'
import createSet from './createSet.js'
import setToArray from './setToArray.js'
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
> [cacheHas 源码分析](./cacheHas.md)
> <br/>
> <br/>
> [createSet 源码分析](./createSet.md)
> <br/>
> <br/>
> [setToArray 源码分析](./setToArray.md)

## Code
```js
/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200

function baseUniq(array, iteratee, comparator) {
  let index = -1
  let includes = arrayIncludes
  let isCommon = true

  const { length } = array
  const result = []
  let seen = result

  if (comparator) {
    isCommon = false
    includes = arrayIncludesWith
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSet(array)
    if (set) {
      return setToArray(set)
    }
    isCommon = false
    includes = cacheHas
    seen = new SetCache
  }
  else {
    seen = iteratee ? [] : result
  }
  outer:
    while (++index < length) {
      let value = array[index]
      const computed = iteratee ? iteratee(value) : value

      value = (comparator || value !== 0) ? value : 0
      if (isCommon && computed === computed) {
        let seenIndex = seen.length
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer
          }
        }
        if (iteratee) {
          seen.push(computed)
        }
        result.push(value)
      }
      else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed)
        }
        result.push(value)
      }
    }
  return result
}
```
## Analyze
1. 首先定义了一系列的变量及对参数等处理
    - 定义 includes 
    - 定义 isCommon
    - 定义结果数组 result
    - 拿到 array.length
2. 判断了是否传入了 `comparator` ，如果传入了 `isCommon` 为 `false`，`includes` 为 `arrayIncludesWith`
3. 如果没有传入 `comparator`，那么会判断数组的长度是不是大于等于200
    ```js
    if (comparator) {
        // ...
    }
    else if (length >= LARGE_ARRAY_SIZE) {
        const set = iteratee ? null : createSet(array)
        if (set) {
          return setToArray(set)
        }
        isCommon = false
        includes = cacheHas
        seen = new SetCache
    }
    ```
   
    可以看到，如果没有传入 自定义处理函数 `iteratee` 时，会使用 `Set` 来对数组进行去重，会判断如果 `set` 为真值时，会调用 `setToArray` 返回结果

    否则会将 `isCommon` 置为 `false`，并且将 `seen` 设置为 `new SetCache`，对于大数组使用缓存处理，提升性能，这里同时也会将 `includes` 改变

4. 如果既没有传入 `comparator` ，并且数组的长度也没有大于199，那么会判断是否传入了 `iteratee`
    ```js
    if (comparator) {
      // ...
    }
    else if (length >= LARGE_ARRAY_SIZE) {
     // ...
    }
    else {
      seen = iteratee ? [] : result
    }
    ```
    这里会根据是否传入了 `iteratee` 来决定 `seen` 的值

5. while 循环来进行元素比较，首先看元素值不是 NaN ，并且 isCommon 为 ture 的情况
   ```js
     outer:
       while (++index < length) {
         let value = array[index]
         const computed = iteratee ? iteratee(value) : value
   
         value = (comparator || value !== 0) ? value : 0
         if (isCommon && computed === computed) {
           let seenIndex = seen.length
           while (seenIndex--) {
             if (seen[seenIndex] === computed) {
               continue outer
             }
           }
           if (iteratee) {
             seen.push(computed)
           }
           result.push(value)
         }
       }
   ```
   
   可以看到首先拿到当前遍历的元素，然后会判断 是否传入了 `iteratee` 函数，也就是定义了 `computed` ， 如果传入了 `iteratee` ，则使用 `iteratee` 处理过之后的值进行比较，否则还取 `value`

   对于 `value` 也会单独做一次处理，会将 `+0` 和 `-0` 转为 0， 但是如果传入了 `comparator` 函数，这一点就会交给 `comparator` 函数处理

   接着就是判断逻辑了，`while` 循环，拿到 `seen` 的每一项和 `computed` 进行对比，如果找到相同的，则跳出外层循环，进行下一个值的迭代，因为当前值已经重复了

   如果 while 循环完成后，没有重复，则会判断 是否传入了 iteratee 函数。

   可以结合之前的逻辑看到，如果没有传入 `iteratee` 函数， `seen` 和 `result` 指向同一内存空间，所以，如果没有传入，则使用 `result` 进行 `push` 即可，如果传入了 则 `seen` 和 `result` 都要进行 `push` ，毕竟判断的时候 使用的是 `seen`

6. 接着是处理 `computed` 为 `NaN` 和 `isCommon` 为 `false` 的情况
   ```js
         else if (!includes(seen, computed, comparator)) {
           if (seen !== result) {
             seen.push(computed)
           }
           result.push(value)
         }
   ```
   
   这一块可以分这么几步来看
   1. `computed` 为 `NaN`, 那到这里会使用 `arrayIncludes` 或者 `arrayIncludesWith` 来进行判断，如果不存在的话，则会判断 `seen` 和 `result` 是否指向了同一内存空间，如果指向同一内存空间，则只需要 `result` `push` 即可，否则 `seen` 和 `result` 都要 `push`
   2. 传入了 `comparator` 函数，在传入了 `comparator` 函数时，`isCommon` 也为 `false`，所以这个时候 这里的 `includes` 函数其实就是 `arrayIncludesWith` 
   3. 没有传入 `comparator` 函数，但是数组的长度超过了 `199`， 并且 没有传入 `iteratee` 函数时，这里会使用 `SetCache` 来缓存数组，也就是 `includes` 函数在这时，只需要 `seen` 和 `computed` 两个参数，并且 会将 `isCommon` 置为 `false`，也就是 如果满足本条叙述，在迭代时也会一直走这个分支
   
7. 在没有传入 `iteratee` 函数时， `seen` 和 `result` 指向内存空间一致， 在 `while` 循环中 `computed` 和 `value` 也是一样的，所以 根本不需要 `seen` 去 `push` `computed`，但是 如果传入了，那么比较时，使用的是处理之后的值，而此时 `seen` 和 `result` 也不指向同一内存空间，所以就需要 `seen` 来 `push`  `computed` 用作后续的比较
## Remark
1. [Set MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)  对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
   
   Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的。
## Example
```js
const a = {a: 1}

console.log(baseUniq([a, a, 1, 1, 1, 1, 2, 3, 3, 4])) // [ { a: 1 }, 1, 2, 3, 4 ]
```
