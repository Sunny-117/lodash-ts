# initCloneObject 

## Description 
初始化对象克隆,会创建并返回一个 继承了 传入 object 原型链的对象
## Params
`{Object} object`
## Return
`Object`
## Depend
```js
import isPrototype from './isPrototype.js'
```
> [isPrototype 源码分析](./isPrototype.md)
>

## Code
```js
function initCloneObject(object) {
  return (typeof object.constructor === 'function' && !isPrototype(object))
    ? Object.create(Object.getPrototypeOf(object))
    : {}
}
```
## Analyze
1. 首先判断 `object.constructor` 是否为 `function` ，如果为 `function` ，则表示 `object` 上可能存在原型链，同时传入的 `object` 不能是 原型对象
2. 如果存在 `object.constructor` ， 使用 `Object.getPrototypeOf` 获取 `object` 的原型属性，拿到原型属性后， 使用 `Object.create` 创建一个 和 `object` 原型链相同的对象
3. 否则返回一个空对象
## Remark
1. [Object.prototype.constructor MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
2. [Object.getPrototypeOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)
3. [Object.create() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
## Example
```js
function A () {}

const b = new A

const c = initCloneObject(b)

console.log(b.__proto__ === c.__proto__) // true
```
