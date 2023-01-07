# isPlainObject

## Description 
判断`value`是否为一个纯对象，即该对象由`Object`的构造函数创建，原型为`Object.prototype` 或者 `[[Prototype]]` 为 `null`
## Params
`value`
## Return
`Boolean`
## Depend
```js
    import getTag from './.internal/getTag.js'
    import isObjectLike from './isObjectLike.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)
> 

## Code
```js
    function isPlainObject(value) {
      if (!isObjectLike(value) || getTag(value) != '[object Object]') {
        return false
      }
      if (Object.getPrototypeOf(value) === null) {
        return true
      }
      let proto = value
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
      }
      return Object.getPrototypeOf(value) === proto
    }
```

## Analyze
1. 调用 `isObjectLike` 和 `getTag` 判断是否满足 `!null` && `'[object Object]'`
   
2. 调用 `Object.getPrototypeOf(value)`, 判断是否原型为 `null`，如果为`null` 则返回 `true`
3. 通过 `while` 循环遍历整个对象的原型链，如果最顶层的原型和`value`的一致，返回`true`

## Remark
1. Object.getPrototypeOf 返回指定对象的原型（__proto__） 
   
2. Object.create(null) ,也是一个对象,原型为 null
3. 通过 while 循环遍历，而不直接使用 Object.prototype, 是为了考虑 js 环境的问题，如 iframe 的父级和子级，他们的 Object.prototype 可能不一致
4. [Object.getPrototypeOf MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)
5. [Object.create() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## Example
```js
    isPlainObject(null) // false
    isPlainObject(Object.create(null)) // true
    isPlainObject(3) // false
    isPlainObject({a:1}) // true
    isPlainObject(new Map()) // false
```
