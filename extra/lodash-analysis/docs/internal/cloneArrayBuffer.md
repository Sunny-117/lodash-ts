# cloneArrayBuffer 

## Description 
克隆 `ArrayBuffer`

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为 “byte array”。

## Params
`arrayBuffer`
## Return
`arrayBuffer`

## Code
```js
function cloneArrayBuffer(arrayBuffer) {
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
  new Uint8Array(result).set(new Uint8Array(arrayBuffer))
  return result
}
```
## Analyze
1. ArrayBuffer.prototype.constructor

   指定函数，它创建一个对象的原型。其初始值是标准 ArrayBuffer 内置构造函数。
   
   ArrayBuffer.prototype.byteLength
   
   只读属性，表示 ArrayBuffer 的 byte 的大小，在 ArrayBuffer 构造完成时生成，不可改变。
   
2. 通过 arrayBuffer 的构造函数，创建一个 同等 byte 大小的 arrayBuffer
3. Uint8Array 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
    
  buffer, byteOffset, length
  
  当传入一个 buffer 参数，或者再另外加上可选参数 byteOffset 和 length 时，一个新的类型化数组视图将会被创建，并可用于呈现传入的 ArrayBuffer 实例。byteOffset 和 length 参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个 buffer 都会被呈现；如果仅仅忽略 length，那么 buffer 中偏移了 byteOffset 后剩下的 buffer 将会被呈现。
4. TypedArray.prototype.set() 方法用于从指定数组中读取值，并将其存储在类型化数组中
5. 也就是最后会通过Uint8Array 创建一个 基于 result 的 ArrayBuffer 实例， 然后哦通过set将 arrayBuffer 的值存储到 result 中并返回

### **关于 arrayBuffer 还有 TypedArray 可查看 [ArrayBuffer，二进制数组](https://zh.javascript.info/arraybuffer-binary-arrays)**

#### ArrayBuffer 是核心对象，是对固定长度的连续内存区域的引用。

#### 几乎任何对 ArrayBuffer 的操作，都需要一个视图。

 - 它可以是 TypedArray：
    - Uint8Array，Uint16Array，Uint32Array —— 用于 8 位、16 位和 32 位无符号整数。
    - Uint8ClampedArray —— 用于 8 位整数，在赋值时便 “固定” 其值。
    - Int8Array，Int16Array，Int32Array —— 用于有符号整数（可以为负数）。
    - Float32Array，Float64Array —— 用于 32 位和 64 位的有符号浮点数。
    - 或 DataView —— 使用方法来指定格式的视图，例如，getUint8(offset)。
    
在大多数情况下，我们直接对类型化数组进行创建和操作，而将 ArrayBuffer 作为 “通用标识符（common discriminator）” 隐藏起来。我们可以通过 .buffer 来访问它，并在需要时创建另一个视图。

## Remark
1. [ArrayBuffer MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
2. [TypedArray MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
3. [Uint8Array MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
## Example
```js
const a = new Uint8Array([1,2,3,4]).buffer

console.log(a) // ArrayBuffer { [Uint8Contents]: <01 02 03 04>, byteLength: 4 }

console.log(a.byteLength) // 4

console.log(new Uint8Array(a.byteLength)) // Uint8Array(4) [ 0, 0, 0, 0 ]

console.log(new Uint8Array(a)) // Uint8Array(4) [ 1, 2, 3, 4 ]


console.log(cloneArrayBuffer(a)) // ArrayBuffer { [Uint8Contents]: <01 02 03 04>, byteLength: 4 }
```
