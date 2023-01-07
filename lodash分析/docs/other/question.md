# lodash@5.0.0 的一些问题

## [cloneBuffer](../internal/cloneBuffer.md)
```js
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice()
  }
  const length = buffer.length
  const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

  buffer.copy(result)
  return result
}
```
`lodash` `cloneBuffer` 的第二个参数 `isDeep`，这里有点问题

判断如果传入了 isDeep ，并且为 truly，则调用 buffer.slice
- 这里有一点疑问，因为 buffer.slice 中说明 **buffer.slice 返回一个新的 Buffer，它引用与原始的 Buffer 相同的内存，但是由 start 和 end 索引进行偏移和裁剪。**
- 若要复制切片，则使用 Uint8Array.prototype.slice()。

```js
const isBuffer = nativeIsBuffer || (() => false)

const a = Buffer.from([1,2,3,4,5])
const b = a.slice()
const c = Uint8Array.prototype.slice.call(a)

a[0]++

console.log(a) // <Buffer 02 02 03 04 05>
console.log(b) // <Buffer 02 02 03 04 05>
console.log(c) // <Buffer 01 02 03 04 05>
```

- 所以如果是使用深拷贝，应该使用 Uint8Array.prototype.slice.call

参考：[Buffer Node.js](http://nodejs.cn/api/buffer.html#buffer_buffer) ， [Buffer.slice](http://nodejs.cn/api/buffer.html#buffer_buf_slice_start_end)

## [orderBy](../export/orderBy.md)
```js
function orderBy(collection, iteratees, orders) {
  if (collection == null) {
    return []
  }
  if (!Array.isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees]
  }
  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders]
  }
  return baseOrderBy(collection, iteratees, orders)
}
```

在 `orderBy` 的官方示例中
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
orderBy(users, ['user', 'age'], ['asc', 'desc']);
```

如果 按照官方示例，调用 会报错 ，这里报错在 `baseOrderBy` 中
```js
TypeError: iteratee is not a function
```

这里是因为，在 `baseOrderBy` 中，`iteratee` 是一个函数形式，而且在一开始 处理 `iteratees` 时，如果 `iteratee` 不是数组，则会直接返回当前 `iteratee` ，并不会做任何处理

```js
const criteria = iteratees.map((iteratee) => iteratee(value))
```
所以导致，在这里，会报错

修改如下
```js
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
orderBy(users, [['user'], ['age']], ['asc', 'desc']);

```
此时就可以正常返回结果，因为 每一个 iteratee 为数组，在 baseOrderBy 中 
```js
  if (Array.isArray(iteratee)) {
    return (value) => baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee)
  }
```
这里是数组，则会调用 `baseGet` 获取值，此时就不会报错，会正确返回结果

或者自己定义函数，iteratee 每次会返回当前的值
```js
orderBy(users, [(val) => val['user'], (val) => val['age']], ['asc', 'desc'])
```
这样也会返回正确的结果

## [basePullAt](../internal/basePullAt.md)
```js
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0
  const lastIndex = length - 1

  
  while (length--) {
    let previous
    const index = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}
```

在 `basePullAt` 中，因为要考虑到传入的 `indexes` 中有重复值的问题，所以在 `while` 循环中判断了 `index !== previous`

但是 lodash 这里，将 `let` 定义放在了 `while` 循环体内部，每一次进入循环 `previous` 都是 `undefined`，并不能解决问题，这里有错误

正确的应该将 `previous` 放在循环体之外定义，这样才可以拿到上一次的 `index` 的值作为对比

可以这么对比，是因为在 `pullAt` 中，会对 `indexes` 进行排序处理

修改后如下
```js
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0
  const lastIndex = length - 1

  let previous
  while (length--) {
    const index = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}
```

## [pullAllBy](../export/pullAllBy.md)
```js
function pullAllBy(array, values, iteratee) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, iteratee)
    : array
}
```
`pullAllBy` 代码本身没有问题，出问题是出在了 示例上

```js
const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }]
pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x')
console.log(array)  // => [{ 'x': 2 }]
```

示例中显示 `iteratee` 函数传入了 `'x'`,但是这在  `basePullAll` 中会报错，在 `basePullAll` 中，`iteratee` 函数是可调用的，会返回 `TypeError: iteratee is not a function`


## [compareAscending](../internal/compareAscending.md)

这里的排序处理有点问题
```js
    const val = typeof value === 'string'
      ? value.localeCompare(other)
      : -other
```
对于这里如果默认升序的话，应当是
```js
    const val = typeof value === 'string'
      ? value.localeCompare(other)
      : value - other
```

是在 [这次](https://github.com/lodash/lodash/commit/47a6d538f5759fc5788f1bbb147caa7fde6b0a92) 提交的修改中出现的问题

目前(2021-02-25) 还没有修复

## [baseValues](../internal/baseValues.md)

`baseValues` 整体的代码没有什么问题，只不过就是代码的文档写的返回值有问题，返回值本应该是 `Array` ，但是 `baseValues` 中写的返回值为 `Object`

```
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
```


## [forOwn](../export/forOwn.md)
在 forOwn 的描述中，有一点是错误的 **Iteratee functions may exit iteration early by explicitly returning false.**

> Iterates over own enumerable string keyed properties of an object and invokes iteratee for each property. The iteratee is invoked with three arguments: (value, key, object). Iteratee functions may exit iteration early by explicitly returning false.
> 

因为使用的是 数组的 `forEach` ，所以，除了抛出错误之外，是不能结束迭代的

## [forOwnRight](../export/forOwnRight.md)
在 `forOwnRight` 的描述中，`forOwnRight` 函数是有返回值的，但是实际上，`forOwnRight` 函数是没有返回值的

```js
/**
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
```

并且函数的 `iteratee` 的参数有错误，按照道理而言，第二个参数应当为当前遍历的 `key` ，这里传入的是 `iteratee`，应该改为 `props[length]`

lodash `forOwnRight` 方法
```js
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], iteratee, object)
  }
}
```

修改之后
```js
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], props[length], object)
  }
}
```

## [intersectionBy](../export/intersectionBy.md)

```js
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  if (iteratee === last(mapped)) {
    iteratee = undefined
  } else {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

`intersectionBy` 这里对于 `iteratee` 的合法性并没有做校验，如果最后一项传入一个数字，得到的结果就不对，应当修改为 

```js
function intersectionBy(...arrays) {
  let iteratee = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  iteratee = typeof iteratee === 'function' ? iteratee : undefined
  if (iteratee) {
    mapped.pop()
  }
  
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, iteratee)
    : []
}
```

## [isEqualWith](../export/isEqualWith.md)

在 `isEqualWith` 中，对于 传入的 `customizer` 参数，调用了两次，可能会导致错误的结果 ，具体可查看源码分析



