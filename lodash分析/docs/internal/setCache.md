# SetCache 

## Description 
创建一个数组缓存对象来存储唯一的值。

```js
SetCache {
  __data__: MapCache {
    size: 6,
    __data__: { hash: [Hash], map: Map {}, string: [Hash] }
  }
}
```
## Params
`{Array} [values]` -- 要缓存的值数组

## Depend
```js
import MapCache from './MapCache.js'
```
> [MapCache 源码分析](./mapCache.md)
>

## Code
```js
const HASH_UNDEFINED = '__lodash_hash_undefined__'

class SetCache {

  /**
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  constructor(values) {
    let index = -1
    const length = values == null ? 0 : values.length

    this.__data__ = new MapCache
    while (++index < length) {
      this.add(values[index])
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  add(value) {
    this.__data__.set(value, HASH_UNDEFINED)
    return this
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   */
  has(value) {
    return this.__data__.has(value)
  }
}

SetCache.prototype.push = SetCache.prototype.add

```
## Analyze
<img  :src="$withBase('/assets/SetCache.png')" />

`SetCache` 本质是使用了 MapCache 来做存储，提供了 add、has、push 等方法

#### constructor
1. 首先传入一个数组 ，拿到 `length`，如果 `values` 为 `null` 或者为 `undefined` 则 取0
2. 定义 `__data__` 为 `new MapCache`
3. `while` 循环调用 `add` 进行赋值

#### add
本质是调用了 `MapCache` 的 `set` 方法，只不过 `set` 的值是 `lodash` 自定义的 `__lodash_hash_undefined__`

#### push 指向 add 方法

#### has
本质也是调用了 `MapCache` 的 `has` 方法进行了判断
## Remark
1. [Set MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
## Example
```js

/**
* 
* SetCache {
*   __data__: MapCache {
*     size: 6,
*     __data__: { hash: [Hash], map: Map {}, string: [Hash] }
*   }
* }
* 
*/
const a = new SetCache([1,2,3,4,5,6])

/**
* 
* SetCache {
*   __data__: MapCache {
*     size: 6,
*     __data__: { hash: [Hash], map: Map {}, string: [Hash] }
*   }
* }
* 
*/
a.push(3)

/**
* 
* SetCache {
*   __data__: MapCache {
*     size: 7,
*     __data__: { hash: [Hash], map: Map {}, string: [Hash] }
*   }
* }
* 
*/
a.add(7)


a.has(7) // true
```
