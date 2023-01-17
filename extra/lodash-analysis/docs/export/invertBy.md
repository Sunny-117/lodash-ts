# invertBy

## Description
这个方法类似 [invert](./invert.md)，除了倒置对象 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果。每个反转键相应反转的值是一个负责生成反转值 key 的数组。iteratee 会传入参数：(value) 。

## Params
`(object, iteratee)`

## Return
`Object`

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty
function invertBy(object, iteratee) {
  const result = {}
  Object.keys(object).forEach((key) => {
    const value = iteratee(object[key])
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key)
    } else {
      result[value] = [key]
    }
  })
  return result
}
```

## Analyze
和 [invert](./invert.md) 基本差不多，区别在于，这里对于 `value` 值并没有做 `toString` 方法的判断，然后对于结果，也是放到了数组中，使用 `Object.prototype.hasOwnProperty.call` 判断了当前的 `value` 是否存在，如果存在就 `push` ，不存在就 设置为数组

## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

## Example
```js
console.log(invertBy(obj, (v) => `${v}`)) // { '1': [ 'a', 'c' ], undefined: [ 'b', 'f' ], null: [ 'd' ] }
```
