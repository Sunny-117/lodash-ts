# size

## Description
返回 collection（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。'

## Params
`collection`

## Return
`Number`

## Depend
```js
import getTag from './.internal/getTag.js'
import isArrayLike from './isArrayLike.js'
import isString from './isString.js'
import stringSize from './.internal/stringSize.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)
> <br/>
> <br/>
> [isString 源码分析](./isString.md)
> <br/>
> <br/>
> [stringSize 源码分析](../internal/stringSize.md)

## Code
```js
const mapTag = '[object Map]'
const setTag = '[object Set]'
function size(collection) {
  if (collection == null) {
    return 0
  }
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length
  }
  const tag = getTag(collection)
  if (tag == mapTag || tag == setTag) {
    return collection.size
  }
  return Object.keys(collection).length
}
```
## Analyze
### null 和 undefined
```js
  if (collection == null) {
    return 0
  }
```
如果是 null 和 undefined ，则返回 0

### 类数组和字符串
```js
  if (isArrayLike(collection)) {
    return isString(collection) ? stringSize(collection) : collection.length
  }
```
`string` 也可以通过 `isArrayLike` 的校验，如果是 `string` 类型，则使用 `stringSize` 拿到长度，否则返回 `collection.length`

### Map 和 Set
```js
  if (tag == mapTag || tag == setTag) {
    return collection.size
  }
```
`Map` 和 `Set` 返回 `size` 即可

### 对象
```js
  return Object.keys(collection).length
```
通过 `Object.keys` 拿到可枚举属性数组，返回数组的 `length`

## Example
```js
console.log(size('abc')) // 3
console.log(size([1,2,3])) // 3
console.log(size({a:1, b:2, c:3})) // 3
```
