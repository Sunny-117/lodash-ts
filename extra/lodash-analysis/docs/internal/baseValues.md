# baseValues

## Description
baseValues 的作用是将 object 指定的属性集 props 对应的值取出来，作为一个数组返回。
## Params
`(object, props)`
## Return
`Array`

## Code
```js
function baseValues(object, props) {
  return props == null ? [] : props.map((key) => object[key])
}
```
## Analyze
如果没有传入 `props` 或者 `props` 为 `null` ，则返回 空数组。否则使用 `map` 遍历，拿到 object 对应的 key 的 `value` 值，返回成数组
## Remark
1. [Array.prototype.map() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
## Example
```js
const a = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', length: 5 }

console.log(baseValues(a, [1,2,3,4,5])) // [ 'a', 'b', 'c', 'd', 'e' ]
```
