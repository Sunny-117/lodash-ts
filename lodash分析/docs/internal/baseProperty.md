# baseProperty 

## Description 
创建并返回一个函数，这个函数可以传入一个 object ，从 object 中取出 baseProperty 指定的 key 的值 , 不支持深度路径
## Params
`(key)`
## Return
`Function`

## Code
```js
function baseProperty(key) {
  return (object) => object == null ? undefined : object[key]
}
```
## Analyze
返回了一个箭头函数，判断如果传入的 `object` 为 `null` 或者 `undefined`，则返回 `undefined`，否则取出对应的 `key` 的值
## Remark
1. [箭头函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
## Example
```js
const func = baseProperty('a')

console.log(func({a: 1})) // 1
console.log(func({b: 1})) // undefined
console.log(func()) // undefined
```
