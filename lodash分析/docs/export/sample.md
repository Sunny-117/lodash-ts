# sample

## Description
从 array（集合）中获得一个随机元素。

## Params
`array`

## Return
`{*}`

## Code
```js
function sample(array) {
  const length = array == null ? 0 : array.length
  return length ? array[Math.floor(Math.random() * length)] : undefined
}
```

## Analyze
判断 `array` 是否有值，如果有值 则通过 `Math.random() * length` 随机一个索引，拿到值，否则返回 `undefined`

这里是使用 `Math.floor` 向下取整，拿到索引的

可以使用 `>>> 0` 来实现 [位运算](../other/bit0peration.md)

```js
array[Math.random() * length >>> 0]
```

## Remark
1. [Math.floor() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 返回小于或等于一个给定数字的最大整数。

## Example
```js
console.log(sample([1,2,3,4,5])) // 1-5 中的一个
```
