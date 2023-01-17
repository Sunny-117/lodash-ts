# baseAssignValue 

## Description 
设置 `object` 的 `key` 为指定的 `value`，他基于`assignValue`和`assignMergeValue`的实现，没有做值检查。
## Params
`(object, key, value)`

## Code
```js
function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}
```
## Analyze
1. 如果只是设置某个 `key` 的值，那么 `baseAssignValue` 没有什么多的代码，`object[key] = value` 就可以实现
2. `baseAssignValue` 最主要的是设置了对象的 `__proto__` 属性的值，如果传入的 key 值为 `__proto__`，就使用 `Object.defineProperty` 来进行修改
    - 设置 configurable 表示属性可以被修改
    - 设置 enumerable 表示属性可以被枚举
    - 更改其 value 值
    - 设置 writable 表示 value 可以被赋值运算符更改
3. 也就是通过`Object.defineProperty`来设置 `__proto__` 可读，可写，可配置，可枚举
## Remark
1. [Object.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
    - `Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
    - 默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改（immutable）的
    - 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者
    
      **共享以下可选键值**
      
    - configurable
    
      当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
      
      默认为 false。
      
    - enumerable
    
      当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
      
      默认为 false。
      
      **数据描述符**还具有以下可选键值
      
    - value
    
      该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
      
      默认为 undefined。
      
    - writable
    
      当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
      
      默认为 false。
      
      **存取描述符**还具有以下可选键值
      
    - get
    
      属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
      
      默认为 undefined
      
    - set
    
      属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
      
      默认为 undefined。
      
      如果一个描述符不具有 value、writable、get 和 set 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常
      
2. [Object.prototype.\_\_proto\_\_ MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

    - `__proto__` 的设置器 (setter) 允许对象的 `[[Prototype]]`被变更。前提是这个对象必须通过 `Object.isExtensible()` 判断为是可扩展的，如果不可扩展，则会抛出一个 `TypeError` 错误。要变更的值必须是一个 `object` 或 `null`，提供其它值将不起任何作用
    
    - `.__proto__`属性是 `Object.prototype` 一个简单的访问器属性，其中包含了 get（获取）和 set（设置）的方法，任何一个`__proto__`的存取属性都继承于 `Object.prototype`，但一个访问属性如果不是来源于 `Object.prototype`就不拥有`.__proto__`属性，譬如一个元素设置了其他的`.__proto__`属性在 `Object.prototype`之前，将会覆盖原有的 `Object.prototype`。
    
3. [Object.isExtensible() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
## Example
```js
const a = {n: 1}

baseAssignValue(a, 'm', 2)

baseAssignValue(a, '__proto__', Object.create(null))

console.log(a) // { n: 1, m: 2, __proto__: [Object: null prototype] {} }

```
