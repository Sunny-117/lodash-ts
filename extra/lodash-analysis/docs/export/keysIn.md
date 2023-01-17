# keysIn 

## Description 
创建一个 object 自身 和 继承的可枚举属性名为数组
## Params
`{Object} object`
## Return
`Array`

## Code
```js
function keysIn(object) {
  const result = []
  for (const key in object) {
    result.push(key)
  }
  return result
}
```
## Analyze
调用 for...in 去遍历 object 自身和原型链上的属性，并且 push 到数组中返回。
## Remark
1. [for...in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
## Example
```js
function A() {}
A.prototype.name = 'A'
A.prototype.type = 'Test'

const b = new A
b['b'] = 'b'

console.log(keysIn(b)) // [ 'b', 'name', 'type' ]
console.log(Object.keys(b)) // [ 'b' ]
```
