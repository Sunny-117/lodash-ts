# create 

## Description 
创建一个继承 prototype 的对象。 如果提供了 properties，它的可枚举属性会被分配到创建的对象上。
## Params
`(prototype, properties)`
> {Object} prototype - 要继承的对象
>
> {Object} [properties] - 分配给对象的属性。
>

## Return
`Object`

## Code
```js
function create(prototype, properties) {
  prototype = prototype === null ? null : Object(prototype)
  const result = Object.create(prototype)
  return properties == null ? result : Object.assign(result, properties)
}
```
## Analyze
1. 如果传入的 `prototype` 为 `null` ，则取 `null` ，否则使用 `Object` 构造函数将 `prototype` 包装为一个新对象（兼容基础类型）
2. 使用 `Object.create` 以 `prototype` 为原型 创建 一个新对象
3. 判断是否传入了要合并的 属性对象 ，如果传入了，使用 `Object.assign` 进行合并，否则直接返回 `result`
## Remark
1. [Object () 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) 将给定的值包装为一个新对象
    - 如果给定的值是 null 或 undefined, 它会创建并返回一个空对象。
    - 否则，它将返回一个和给定的值相对应的类型的对象。
    - 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）
2. [Object.create() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
3. [Object.assign() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
## Example 
```js
function Shape() {
  this.x = 0
  this.y = 0
}

function Circle() {
  Shape.call(this)
}

Circle.prototype = create(Shape.prototype, {
  'constructor': Circle
})

const circle = new Circle
circle instanceof Circle // => true

circle instanceof Shape // => true

```
