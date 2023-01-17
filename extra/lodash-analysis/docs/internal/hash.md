# Hash 

## Description 
创建一个散列对象，用作缓存
```js
Hash {
  __data__: [Object: null prototype] { a: 'a-value', b: 'b-value', c: 'c-value' },
  size: 3
}
```
## Params
`{Array} [entries]` -- 要缓存的键值对

## Code
```js
const HASH_UNDEFINED = '__lodash_hash_undefined__'

class Hash {

  /**
   * Creates a hash object.
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
   * Removes all key-value entries from the hash.
   *
   * @memberOf Hash
   */
  clear() {
    this.__data__ = Object.create(null)
    this.size = 0
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = this.has(key) && delete this.__data__[key]
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the hash value for `key`.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data = this.__data__
    const result = data[key]
    return result === HASH_UNDEFINED ? undefined : result
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    const data = this.__data__
    return data[key] !== undefined
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  set(key, value) {
    const data = this.__data__
    this.size += this.has(key) ? 0 : 1
    data[key] = value === undefined ? HASH_UNDEFINED : value
    return this
  }
}
```
## Analyze
<img  :src="$withBase('/assets/Hash.png')" />

`Hash` 作为一个缓存 键值对的类 ，其数据结构如图所示， 返回的数据结构为
```js
Hash {
  __data__: [Object: null prototype] { a: 'a-value', b: 'b-value', c: 'c-value' },
  size: 3
}
```

提供了 `get` `set` `delete` `clear` `has` 5个方法
#### constructor
1. 首先传入一个 键值对数组 ，拿到 `length`（对于一个对象可以通过 `Object.entries()` 生成键值对数组）
2. 调用 `clear` 进行值的初始化
3. 因为 `index` 定义为 `-1` ，所以使用 `++index < length` , `while` 循环进行数据的缓存
4. 拿到对应下标的值，通过 `set` 方法进行数据的存储

#### get
1. 通过传入的 `key` 拿到对应的值
2. 如果获取到的结果为 默认未定义(`__lodash_hash_undefined__`)，则返回 undefined， 否则返回对应的值

#### delete
从列表缓存中移除 `key` 及其值，成功返回 `true` 并更新 `size` ，失败返回 `false`
1. 通过 `has` 判断 `key` 是否存在于 `__data__` 中，如果存在则调用 `delete 操作符` 进行删除
2. 根据 `has` 或者 `delete` 的结果 更新 `size` 属性，成功 `-1`， 失败 `-0`
3. 成功返回 `true` ，失败返回 `false`

#### set
通过 `key` `value` 设置键值对，并且维护更新 `size` 属性
1. 根据 `has` 判断 `key` 值是否存在，决定 `size` 属性的值是否要更新，存在 `+0`， 不存在 `+1`
2. 判断 传入的 value 是否 恒等于 undefined（这里可以传入 null），如果未定义，则将`value`设置为默认未定义（`__lodash_hash_undefined__`），否则 设置为传入的值

#### has
判断 `__data__` 中是否存在对应的 `key` ，存在返回 `true` ，不存在返回 `false`
这里使用 `data[key] !== undefined` 来判断，是因为 在对象中，如果 `key` 值没有`value`，就会返回 `undefined`，但是 `Hash` 中，将 `undefined` 转换为了 `__lodash_hash_undefined__`，所以可以用此来判断 `key` 值是否存在

#### clear
更新 `__data__` 为新创的一个原型为 `null` 的空对象，因此并没有传统对象原型上的各种属性，并更新 `size` 属性，`clear` 也被用在初始化数据的过程中
## Remark
1. [delete 操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)
2. [Object.create() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
3. [对象和属性 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%B1%9E%E6%80%A7)
## Example
```js
const obj = {'A': 'A-value', 'B': 'B-value', 'C': 'C-value'}
/**
* Hash {
*   __data__: [Object: null prototype] {
*     A: 'A-value',
*     B: 'B-value',
*     C: 'C-value',
*   },
*   size: 3
* }
* 
*/
const temp = new Hash(Object.entries(obj))

temp.has('A') // true

/**
* Hash {
*   __data__: [Object: null prototype] {
*     A: 'A-value',
*     B: 'B-value',
*     C: 'C-value',
*     D: 'D-value',
*   },
*   size: 4
* }
* 
*/
temp.set('D', 'D-value')
temp.get('C') // C-value

/**
* Hash {
*   __data__: [Object: null prototype] {
*     A: 'A-value',
*     C: 'C-value',
*     D: 'D-value',
*   },
*   size: 4
* }
* 
*/
temp.delete('B')

// Hash { __data__: [Object: null prototype] {}, size: 0 }
temp.clear()
```
