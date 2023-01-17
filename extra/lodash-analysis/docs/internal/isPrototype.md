# isPrototype 

## Description 
检查 value 是否可能是一个原型对象
## Params
`value`
## Return
`Boolean`

## Code
```js
const objectProto = Object.prototype

function isPrototype(value) {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto

  return value === proto
}
```
## Analyze
1. `Object.prototype.constructor` 返回创建实例对象的 Object 构造函数的引用。
2. `Function.prototype` 属性存储了 `Function` 的原型对象。
3. `new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
4. \_\_proto__ 的读取器 (getter) 暴露了一个对象的内部 \[\[Prototype]] 。对于使用 **对象字面量** 创建的对象，这个值是 `Object.prototype`。对于使用 **数组字面量** 创建的对象，这个值是 `Array.prototype`。对于 `functions`，这个值是 `Function.prototype`。对于使用 `new fun` 创建的对象，其中 `fun` 是由 `js` 提供的内建构造器函数之一 (`Array`, `Boolean`, `Date`, `Number`, `Object`, `String` 等等），这个值总是 `fun.prototype`。对于用 `js` 定义的其他 `js` 构造器函数创建的对象，这个值就是该构造器函数的 `prototype` 属性。
   
   \_\_proto__ 的设置器 (setter) 允许对象的 \[\[Prototype]]被变更。前提是这个对象必须通过 Object.isExtensible() 判断为是可扩展的，如果不可扩展，则会抛出一个 TypeError
    错误。要变更的值必须是一个 object 或 null，提供其它值将不起任何作用。
   
   .__proto__属性是 Object.prototype 一个简单的访问器属性，其中包含了 get（获取）和 set（设置）的方法，任何一个__proto__的存取属性都继承于 Object.prototype，但一个访问属性如果不是来源于 Object.prototype就不拥有.__proto__属性，譬如一个元素设置了其他的.__proto__属性在 Object.prototype之前，将会覆盖原有的 Object.prototype。

5. 假设 new 一个对象
```js
function A () {}
const b = new A()
```
此时 b.\_\_proto__ 就指向了 A.prototype

b.\_\_proto__.constructor 也就指向了 function A () {}

A.prototype.constructor 指向 function A () {}

6. 分析代码，使用短路语法，如果value.constructor 存在，则获取 value.constructor 否则获取 value
7. 如果拿到的 Ctor 为 function，那么就获取 Ctor.prototype , 否则取 Object.prototype
8. 根据第4.5条，就可以判断出，如果 Ctor.prototype === value.constructor ,那么 value 就是一个原型对象
9. Object.prototype 的作用是为了处理 如果 Ctor 的值为 falsy，那么就将 proto 指向 Object.prototype,否则 value 和 proto 都为 false ， 那么最终返回 true 不符合预期结果
## Remark
1. [Object.prototype.constructor MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
2. [Object.prototype.\_\_proto__ MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
3. [Function MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
4. [Function.prototype MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)
5. [new 运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
## Example
```js
function A (){}
const b = new A

console.log(isPrototype(b.__proto__)) // true
console.log(isPrototype(b)) // false
```
