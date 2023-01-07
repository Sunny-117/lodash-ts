# isElement

## Description
检查 value 是否是可能是 DOM 元素。

## Params
`value`

## Return
`Boolean`

## Depend
```js
import isObjectLike from './isObjectLike.js'
import isPlainObject from './isPlainObject.js'
```
> [isObjectLike](./isObjectLike.md)
> <br/>
> <br/>
> [isPlainObject](./isPlainObject.md)

## Code
```js
function isElement(value) {
  return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value)
}
```

## Analyze
首先判断了 `value` 为一个除 `null` 以外的对象，并且 `value` 具有 `nodeType` 属性， `nodeType` 为 1，接着排除了纯对象。因为 `DOM` 节点必然会继承

## Remark
1. [Node.nodeType MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)
   
2. [Element MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 是一个通用性非常强的基类，所有 Document 对象下的对象都继承自它。
3. 并不能完全依赖于此方法进行判断，因为自定义的继承实例，也是可以实现的

## Example
```js
console.log(isElement(document.body)) // true

function Element() {
  this.nodeType = 1
}

const temp = new Element


console.log(isElement(temp)) // true
```
