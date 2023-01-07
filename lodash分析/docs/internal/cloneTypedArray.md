# cloneTypedArray 

## Description 
一个类型化数组（TypedArray）对象描述了一个底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view）。事实上，没有名为 TypedArray 的全局属性，也没有一个名为 TypedArray 的构造函数。相反，有许多不同的全局属性，它们的值是特定元素类型的类型化数组构造函数
## Params
`(typedArray, isDeep)`
## Return
`TypedArray`
## Depend
```js
import cloneArrayBuffer from './cloneArrayBuffer.js'
```
> [cloneArrayBuffer 源码分析](./cloneArrayBuffer.md)
>

## Code
```js
function cloneTypedArray(typedArray, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}
```
## Analyze
ECMAScript 2015 定义了一个 TypeArray 构造器作为所有的类型化数组构造器（Int8Array, Int16Array 等）的原型（[[Prototype]]）。该构造器并不会直接暴露出来：即没有全局的 %TypedArray% 和 TypeArray 属性，只能通过使用类似于 Object.getPrototypeOf(Int8Array.prototype) 的方式直接访问。所有的类型化数组构造器都会继承 %TypeArray% 构造器函数的公共属性和方法。此外，所有的类型化数组的原型（如 Int8Array.prototype）都以 %TypeArray%.prototype 作为原型。

%TypedArray% 构造器自身不是特别有用，直接调用或使用 new 表达式实例化都会抛出一个 TypeError 异常，除非在支持子类化（subclassing）创建对象的 JS 引擎下运行。但直到现在还没有这样的 JS 引擎出现。因此 %TypeArray% 仅仅在对所有的类型化数组构造器（Int8Array 等）的方法和属性进行 polyfill 的时候比较有用.

当创建一个 TypedArray 实例（如 Int8Array）时，一个数组缓冲区将被创建在内存中，如果一个 ArrayBuffer 对象被当作参数传给构造函数，那么将使用传入的 ArrayBuffer 代替（即缓冲区被创建到 ArrayBuffer 中）。缓冲区的地址被存储在实例的内部属性中，并且所有 %TypedArray%.prototype 上的方法，例如 set value 和 get value 等，都会在这个数组缓冲区上进行操作。

1. TypedArray.prototype.buffer 返回被格式化数组引用的 ArrayBuffer. 创建时已被固化，因此是只读的.
2. 根据是否深拷贝，决定是使用 cloneArrayBuffer 新开内存空间，还是直接使用已有的 buffer
3. 调用实例的构造函数 传入 buffer ， byteOffset, length 等属性 ，创建一个新的 TypedArray 实例

> buffer, byteOffset, length
> 当传入一个 buffer 参数，或者再另外加上可选参数 byteOffset 和 length 时，一个新的类型化数组视图将会被创建，并可用于呈现传入的 ArrayBuffer 实例。byteOffset 和 length
> 参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个 buffer 都会被呈现；如果仅仅忽略 length，那么 buffer 中偏移了 byteOffset 后剩下的 buffer 将会被呈现。
>
 
## Remark
1. [TypedArray MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
## Example
```js
const a = new Uint8Array([1,2,3,4])

const d = new DataView(a.buffer)

const b = cloneTypedArray(a)

const c = cloneTypedArray(a, true)

d.setUint8(0, 10)

console.log(a) // Uint8Array(4) [ 10, 2, 3, 4 ]
console.log(b) // Uint8Array(4) [ 10, 2, 3, 4 ]
console.log(c) // Uint8Array(4) [ 1, 2, 3, 4 ]
```
