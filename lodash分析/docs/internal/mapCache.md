# MapCache 

## Description 
创建一个映射缓存对象来存储键值对。
```js
MapCache {
  size: 3,
  __data__: {
    hash: Hash { __data__: [Object: null prototype] {}, size: 0 },
    map: Map {},
    string: Hash { __data__: [Object: null prototype] { A: 'A-value', B: 'B-value', C: 'C-value' }, size: 3 }
  }
}
```
## Params
`{Array} [entries]` -- 要缓存的键值对

## Depend
```js
import Hash from './Hash.js'
```
> [Hash 源码分析](./hash.md)

## Code
```js
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData({ __data__ }, key) {
  const data = __data__
  return isKeyable(key)
    ? data[typeof key === 'string' ? 'string' : 'hash']
    : data.map
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  const type = typeof value
  return (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean')
    ? (value !== '__proto__')
    : (value === null)
}

class MapCache {

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1
    const length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      const entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @memberOf MapCache
   */
  clear() {
    this.size = 0
    this.__data__ = {
      'hash': new Hash,
      'map': new Map,
      'string': new Hash
    }
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = getMapData(this, key)['delete'](key)
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the map value for `key`.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    return getMapData(this, key).get(key)
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return getMapData(this, key).has(key)
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  set(key, value) {
    const data = getMapData(this, key)
    const size = data.size

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
  }
}

```
## Analyze
<img  :src="$withBase('/assets/MapCache.png')" />

`MapCache` 作为一个缓存 键值对的类 ，其数据结构如图所示， 返回的数据结构为
```js
MapCache {
  size: 6,
  __data__: {
    hash: Hash { __data__: [Object: null prototype], size: 3 },
    map: Map { [Number: 1] => 'number', [String: '1'] => 'string' },
    string: Hash { __data__: [Object: null prototype], size: 1 }
  }
}

```
提供了 `get` `set` `delete` `clear` `has` 5个方法

除  MapCache 自身的方法之外，它依赖于 `isKeyable` 和 `getMapData` 方法来处理 `key` 值的类型以及保存的形式

#### isKeyable
`isKeyable` 通过传入 `value` 来判断 `value` 是否适合作为唯一 `key` 值
1. 首先拿到 `value` 的 `type` 类型
2. 如果 `value` 的类型 存在于 `string`、 `number`、 `symbol`、 `boolean` 中时，判断并返回 `value !== '__proto__'`
3. 如果 value 的类型不属于上述时，判断并返回 `value === null`

#### getMapData
根据 `key` 值来判断 返回 `__data__` 的某个子级实例
1. 首先通过结构赋值拿到 `__data__`
2. 根据 `isKeyable` 判断 `key` 是否适合作为唯一的 `key` 值
3. 如果适合，在判断 `key` 是否为 `string` ，如果为 `string` 返回 `__data__.string` , 否则返回 `__data__.hash`
4. 如果不适合， 返回 `__data__.map`

#### constructor
1. 首先传入一个 键值对数组 ，拿到 `length`
2. 调用 `clear` 进行值的初始化
3. 因为 `index` 定义为 `-1` ，所以使用 `++index < length` , `while` 循环进行数据的缓存
4. 拿到对应下标的值，通过 `set` 方法进行数据的存储

#### get
1. 通过 `getMapData` 拿到 `key` 值对应的实例
2. 调用实例的 `get` 方法获取值

#### delete
从列表缓存中移除 `key` 及其值，成功返回 `true` 并更新 `size` ，失败返回 `false`
1. 通过 `getMapData` 拿到 `key` 值对应的实例
2. 调用 实例 的 `delete` 方法，并拿到返回值
3. 判断返回值 真假，对应更新 `MapCache.size` 属性
4. 返回 成功或失败
#### set
通过 `key` `value` 设置键值对，并且维护更新 `size` 属性
1. 通过 `getMapData` 拿到 `key` 值对应的实例
2. 缓存实例的 `size` 属性 （数据长度）
3. 调用 实例 `set` 方法进行数据缓存
4. 根据调用 `set` 之后的 `size`  和 缓存的 `size` 进行比较，根据比较结果更新 `MapCache.size`
5. 返回 `this`

#### has
判断 `__data__` 中是否存在对应的 `key` ，存在返回 `true` ，不存在返回 `false`
1. 通过 `getMapData` 拿到 `key` 值对应的实例
2. 调用实例的 `has` 方法判断 `key` 值是否存在
#### clear
1. 更新 size 属性为 0
2. 设置 `__data__` 为初始值
## Remark
1. [解构赋值 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
2. [Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
3. 一个 Map 的键可以是任意值，包括函数、对象或任意基本类型。
4. 尽管，Map 相对于 Object 有很多优点，依然存在某些使用 Object 会更好的场景，毕竟 Object 是 JavaScript 中最基础的概念。
   
   - 如果你知道所有的 key，它们都为字符串或整数（或是 Symbol 类型），你需要一个简单的结构去存储这些数据，Object 是一个非常好的选择。构建一个 Object 并通过知道的特定 key 获取元素的性能要优于 Map（字面量 vs 构造函数，直接获取 vs get() 方法）。
   - 如果需要在对象中保持自己独有的逻辑和属性，只能使用 Object。
   
   
## Example
```js
const arr = [
  [Symbol(1), 'symbol'],
  [new Number(1), 'number'],
  [new String(1), 'string'],
  [true, 'boolean'],
  [1, '1'],
  ['A', 'A'],
  [NaN, NaN],
]


/**
* MapCache {
*   size: 7,
*   __data__: {
*     hash: Hash { __data__: [Object: null prototype], size: 4 },
*     map: Map { [Number: 1] => 'number', [String: '1'] => 'string' },
*     string: Hash { __data__: [Object: null prototype], size: 1 }
*   }
* }
* 
*/
const temp = new MapCache(arr)

temp.get(1) // 1
temp.get('A') // A
temp.get(true) // boolean


/**
* MapCache {
*   size: 8,
*   __data__: {
*     hash: Hash { __data__: [Object: null prototype], size: 4 },
*     map: Map {
*       [Number: 1] => 'number',
*       [String: '1'] => 'string',
*       [MapCache] => 'MapCache'
*     },
*     string: Hash { __data__: [Object: null prototype], size: 1 }
*   }
* }
* 
*/
temp.set(new MapCache(), 'MapCache')

temp.delete('A') // true


temp.has('A') // false
temp.has(NaN) // true





/**
* MapCache {
*   size: 0,
*   __data__: {
*     hash: Hash { __data__: [Object: null prototype] {}, size: 0 },
*     map: Map {},
*     string: Hash { __data__: [Object: null prototype] {}, size: 0 }
*   }
* }
* 
*/
temp.clear()
```
