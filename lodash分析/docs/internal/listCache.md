# ListCache 

## Description 
创建一个列表缓存对象
## Params
`{Array} [entries]` -- 要缓存的键值对

## Depend
```js
import assocIndexOf from './assocIndexOf.js'
```
> [assocIndexOf 源码分析](./assocIndexOf.md)
>

## Code
```js
class ListCache {

  /**
   * Creates an list cache object.
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
   * Removes all key-value entries from the list cache.
   *
   * @memberOf ListCache
   */
  clear() {
    this.__data__ = []
    this.size = 0
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
      return false
    }
    const lastIndex = data.length - 1
    if (index == lastIndex) {
      data.pop()
    } else {
      data.splice(index, 1)
    }
    --this.size
    return true
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data = this.__data__
    const index = assocIndexOf(data, key)
    return index < 0 ? undefined : data[index][1]
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return assocIndexOf(this.__data__, key) > -1
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  set(key, value) {
    const data = this.__data__
    const index = assocIndexOf(data, key)

    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      data[index][1] = value
    }
    return this
  }
}

```
## Analyze
<img  :src="$withBase('/assets/ListCache.png')" />

`ListCache` 作为一个缓存 键值对的类 ，其数据结构如图所示， 返回的数据结构为
```js
{
  __data__: [
    ['0', 'test1'],
    ['1', 'test2'],
  ],
  size: 2
}
```

提供了 `get` `set` `delete` `clear` `has` 5个方法
#### constructor
1. 首先传入一个 键值对数组 ，拿到 `length`（对于一个对象可以通过 `Object.entries()` 生成键值对数组）
2. 调用 `clear` 进行值的初始化
3. 因为 `index` 定义为 `-1` ，所以使用 `++index < length` , `while` 循环进行数据的缓存
4. 拿到对应下标的值，通过 `set` 方法进行数据的存储

#### get
通过 `key` 值拿到对应的 `value`， 传入 `key` 值， 通过 `assocIndexOf` 方法来获取 `key` 值对应的下标（如果找不到返回-1），找到了下标则获取 `data[index][1]`，否则返回 `undefined` 

#### delete
从列表缓存中移除' key '及其值，成功返回 true 并更新 size ，失败返回 false
1. 通过 `assocIndexOf` 拿到 `index`
2. 如果没有找到（`index === -1`），则返回 `false`
3. 如果 index === length-1 ，则使用 pop 删除，否则使用 splice 删除，更新 size 属性，并返回 true
4. 在这里最后一个元素 使用 pop 不使用 splice 是因为性能问题


**`splice`**
<img  :src="$withBase('/assets/listCache_1.png')" />


**`shift`**
<img  :src="$withBase('/assets/listCache_2.png')" />


**`pop`**
<img  :src="$withBase('/assets/listCache_3.png')" />

由上图可以看出，`shift` `pop` 对比 `splice` 做的事情更少，判断逻辑更少，所以对于 `delete` 方法，在处理 第一项时，也可以使用 `shift`

#### set
通过 `key` `value` 设置键值对，并且维护更新 `size` 属性
1. 通过 `assocIndexOf` 查询当前 `__data__` 中是否含有 对应的 `key`
2. 如果不存在对应的 `key`，则更新 `size` 属性，并进行 `push`
3. 如果存在对应的 `key` ，则更新 `key` 对应的 `value` 值

#### has
判断 `__data__` 中是否存在对应的 `key` ，存在返回 `true` ，不存在返回 `false`
调用 `assocIndexOf` 来查找key，如果找不到 则返回 `-1`，所以这里使用了 `> -1` 来判断

#### clear
从列表缓存中删除所有键值项，并更新 `size` 属性，`clear` 也被用在初始化数据的过程中

## Remark
1. [Object.entries() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
2. [Array.prototype.splice() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
3. [Array.prototype.shift() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
4. [Array.prototype.pop() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
5. [Array.prototype.push() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
## Example
```js
const obj = {0: 'test1', 1: 'test2', 2: 'test3'}
/**
* ListCache {
*   __data__: [ [ '0', 'test1' ], [ '1', 'test2' ], [ '2', 'test3' ] ],
*   size: 3
* }

*/
const temp = new ListCache(Object.entries(obj))

temp.has(0) // false
temp.has('0') // true
/**
* ListCache {
*   __data__: [
*     [ '0', 'test1' ],
*     [ '1', 'test2' ],
*     [ '2', 'test3' ],
*     [ '3', 'test4' ]
*   ],
*   size: 4
* }
*/
temp.set('3', 'test4')

temp.get('2') // test3

/**
* ListCache {
*   __data__: [
*     [ '0', 'test1' ],
*     [ '2', 'test3' ],
*     [ '3', 'test4' ]
*   ],
*   size: 4
* }
*/
temp.delete('1') // true

// ListCache { __data__: [], size: 0 }
temp.clear()
```
