# Stack 

## Description 
创建一个堆栈缓存对象来存储键值对
## Params
`{Array} [entries]` -- 要缓存的键值对

## Depend
```js
import ListCache from './ListCache.js'
import MapCache from './MapCache.js'
```
> [ListCache 源码分析](./listCache.md)
> <br/>
> <br/>
> [MapCache 源码分析](./mapCache.md)
>

## Code
```js
const LARGE_ARRAY_SIZE = 200

class Stack {

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    const data = this.__data__ = new ListCache(entries)
    this.size = data.size
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @memberOf Stack
   */
  clear() {
    this.__data__ = new ListCache
    this.size = 0
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data = this.__data__
    const result = data['delete'](key)

    this.size = data.size
    return result
  }

  /**
   * Gets the stack value for `key`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    return this.__data__.get(key)
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return this.__data__.has(key)
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  set(key, value) {
    let data = this.__data__
    if (data instanceof ListCache) {
      const pairs = data.__data__
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value])
        this.size = ++data.size
        return this
      }
      data = this.__data__ = new MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
  }
}

```
## Analyze
<img  :src="$withBase('/assets/Stack.png')" />

`Stack` 作为一个缓存 键值对的类 ，其数据结构如图所示， 返回的数据结构为
```js
// 超过 最大限制 LARGE_ARRAY_SIZE
Stack {
  __data__: MapCache {
    size: 29,
    __data__: { hash: [Hash], map: [Map], string: [Hash] }
  },
  size: 29
}


// 未超过
Stack {
  __data__: ListCache {
    __data__: [
      [Array], [Array],
      [Array], [Array],
      [Array], [Array],
      [Array]
    ],
    size: 7
  },
  size: 7
}
```
提供了 `get` `set` `delete` `clear` `has` 5个方法

#### constructor
1. 设置 `this.__data__ = new ListCache()`, 传入 键值对 数组
2. 拿到 `__data__.size` , 更新到 `this` 上
3. 在这里有一点需要注意，在初始化时，并不会判断传入的 数据量的多少，即使一开始传入了超过 `199` 的数据限制，也是会使用 `ListCache`，并不会直接使用 `MapCache` ，只有在 `set` 时才会进行判断转换

#### get、has、delete
因为 `this.__data__` 本身就是 `new ListCache` 或者 `new MapCache` 出来的实例，所以可以直接调用对应的 方法

`delete` 在这里不同的是，`ListCache` 和 `MapCache` 都是根据删除的结果更新的 `size`， `Stack` 直接取 `__data__.size` 更新即可

#### set
通过 `key` `value` 设置键值对，并且维护更新 `size` 属性
1. 判断 `__data__` 的 `prototype` 是否出现在 `ListCache` 的原型上
2. 如果出现了 在拿到 `__data__.__data__`， 也就是 `ListCache` 中的数据数组，判断 length 是否小于最大限制 199
3. 如果小于则直接 `push` 进数组， `size` 更新为 `++ListCache.size`
    - 这里没有直接使用 ListCache 的set ，可能是出于性能的考虑， ListCache.set 进行了数据的判重
    - 这里没有进行数据判重，可能是因为 `Stack` 是内部方法，在使用过程中会尽量避免数据重复问题
    - 因为没有使用 `ListCache.set` ,不会触发 `ListCache.size` 更新， 所以需要手动更新 `ListCache.size` 并赋值给外部使用
4. 如果超过了最大限制，则直接将 `__data__` 转换为 `MapCache` 来使用，将 `ListCache` 的实例数据传递即可
5. 之后则会调用 `MapCache.set` 来进行数据更新和 `size` 维护

#### clear
1. 更新 size 属性为 0
2. 设置 `__data__` 为初始值（`new ListCache`）
## Remark
1. [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
2. [连续赋值](../other/assignment.md)

## Example
对于数据结构如下，如果超过了 199 则会转为 MapCache 结构，调用其方法，具体示例可查看对应源码分析章节
```js
// 超过了
Stack {
  __data__: MapCache {
    size: 29,
    __data__: { hash: [Hash], map: [Map], string: [Hash] }
  },
  size: 29
}


// 未超过
Stack {
  __data__: ListCache {
    __data__: [
      [Array], [Array],
      [Array], [Array],
      [Array], [Array],
      [Array]
    ],
    size: 7
  },
  size: 7
}
```
