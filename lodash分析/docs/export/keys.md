# keys 

## Description 
创建一个 object 的自身可枚举属性名为数组

Note: 非对象的值会被强制转换为对象，查看 [ES spec](https://262.ecma-international.org/6.0/#sec-object.keys) 了解详情。
## Params
`{Object} object`
## Return
`Array`
## Depend
```js
import arrayLikeKeys from './.internal/arrayLikeKeys.js'
import isArrayLike from './isArrayLike.js'
```
> [arrayLikeKeys 源码分析](../internal/arrayLikeKeys.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)
>

## Code
```js
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object))
}
```
## Analyze
1. 判断传入的 object 是不是类数组，如果是类数组 则使用 arrayLikeKeys 返回数据
2. 否则的话，使用 Object() 构造函数，转换 object 对象，避免传入的 不是一个 object，然后使用 Object.keys 拿到 keys 数组
## Remark
1. [Object () 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) 将给定的值包装为一个新对象。
2. [Object.keys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 返回一个所有元素为字符串的数组，其元素来自于从给定的 object 上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致，在 ES5 里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在 ES2015 中，非对象的参数将被强制转换为一个对象
## Example
```js
function Foo() {
  this.a = 1
  this.b = 2
}

Foo.prototype.c = 3

keys(new Foo) // => ['a', 'b'] (iteration order is not guaranteed)

keys('hi') // => ['0', '1']
```
