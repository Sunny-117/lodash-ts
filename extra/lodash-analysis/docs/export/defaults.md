# defaults 

## Description 
分配来源对象的可枚举属性到目标对象所有解析为 undefined 的属性上。 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。
## Params
`(object, ...sources)`
## Return
`object`
## Depend
```js
import eq from './eq.js'
```
## Code
```js
/** Used for built-in method references. */
const objectProto = Object.prototype

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty

function defaults(object, ...sources) {
  object = Object(object)
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source)
      for (const key in source) {
        const value = object[key]
        if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          object[key] = source[key]
        }
      }
    }
  })
  return object
}
```
## Analyze
1. `sources` `forEach` 遍历，拿到每个 `source`
2. 如果 `source` 不为 `undefined` 或者 不为 `null`
3. 则遍历 `source` ， 判断 `object` 上对应的 `key` 是否为 `undefined`，如果为 `undefined` ，则将 `source[key]` 设置给 `object[key]`
4. 如果 `object[key]` 不为 `undefined`，则判断是不是 `Object` 原型上的值，如果是其原型上的值，默认也会认为 `object` 本身是没有该属性的，也是可以设置的
5. 但是只判断 `prototype` 是不够的，`defaults` 规则有一条说后续的值不能覆盖已有的值，所以要判断当前的 `key` 不在 `object` 上 `!hasOwnProperty.call(object, key)`
6. 满足3 或者 4，5 会将 source[key] 设置给 object[key]
7. 使用 `Object` 构造函数是为了 避免基本类型出错
## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
2. [Object () 构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
## Example
```js
defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }) // => { 'a': 1, 'b': 2 }
```
