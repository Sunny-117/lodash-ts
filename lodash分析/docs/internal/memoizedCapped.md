# memoizeCapped

## Description
`memoizeCapped` 本质是调用 `memoize` ，不过会定制 `memoize` 的 `resolver` 函数，定制的主要作用是限制缓存的数量，避免缓存太大，占用太多的内存。

## Params
`{Function} func`

## Return
`Function`
> 加了缓存数量限制的函数

## Depend
```js
    import memoize from '../memoize.js'
```

> [memoize 源码分析](../export/memoize.md)


## Code
```js
    const MAX_MEMOIZE_SIZE = 500
    function memoizeCapped(func) {
      const result = memoize(func, (key) => {
        const { cache } = result
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear()
        }
        return key
      })
    
      return result
    }
```

## Analyze
1. 本质还是调用了 `memoize` 创建了一个缓存函数，只不过传入了 `resolver` 函数定义了 `key` 
2. 在 resolver 函数中，首先获取到了 `memoize.cache`(`Map`)
3. 判断缓存的数量是否超过了阈值,如果超过了就调用 `Map.prototype.clear()`进行清空

## Remark
1. [Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
2. [WeakMap MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
## Example
等同于 [memoize](../export/memoize.md)，在此基础上增加了缓存数量的判断
