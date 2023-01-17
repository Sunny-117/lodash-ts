# toPlainObject 

## Description 
转换 value 为普通对象。 包括继承的可枚举属性
## Params
`value`
## Return
`Object`

## Code
```js
function toPlainObject(value) {
  value = Object(value)
  const result = {}
  for (const key in value) {
    result[key] = value[key]
  }
  return result
}
```
## Analyze
定义 结果 为 `result` ，使用 `for...in` 遍历 `Object构造函数`生成的对象 `value` ，将 `value` 的对应 `key` 及其值设置给 `result`，最终返回 `result`
## Remark
1. [for...in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性。
## Example
```js
function Foo() {
  this.b = 2
}

Foo.prototype.c = 3

toPlainObject(new Foo) // { b: 2, c: 3 } 
```
