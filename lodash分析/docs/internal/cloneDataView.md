# cloneDataView 

## Description 
`DataView` 视图是一个可以从 二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。
## Params
`(dataView, isDeep)`
## Return
`{Object} dataView`
## Depend
```js
import cloneArrayBuffer from './cloneArrayBuffer.js'
```
> [cloneArrayBuffer 源码分析](./cloneArrayBuffer.md)
>

## Code
```js
function cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}
```
## Analyze
1. `DataView.prototype.constructor` 指定用来生成原型的构造函数。初始化值是标准内置 DataView 构造器.
2. `DataView.prototype.byteOffset`  从 ArrayBuffer读取时的偏移字节长度。创建实例的时候已固化因此是只读的.
3. `DataView.prototype.byteLength`  从 ArrayBuffer中读取的字节长度。创建实例的时候已固化因此是只读的
4. `DataView.prototype.buffer`  被视图引入的 ArrayBuffer. 创建实例的时候已固化因此是只读的.
5. 如果传入了 isDeep 则使用 cloneArrayBuffer 重新开辟内存空间，返回新的 buffer，否则的话使用 dataView.buffer
6. new 一个 新的 dataView ， 偏移量和字节长度跟传入的 dataView 保持一致

### **关于 arrayBuffer 还有 TypedArray 可查看 [ArrayBuffer，二进制数组](https://zh.javascript.info/arraybuffer-binary-arrays)**

## Remark
1. [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
## Example
```js
const a = new Uint8Array([1,2,3,4]).buffer

const b = new DataView(a, 1)

const c = cloneDataView(b, true)

const d = cloneDataView(b)

b.setUint8(1, 8)

/**
* DataView {
*   byteLength: 3,
*   byteOffset: 1,
*   buffer: ArrayBuffer { [Uint8Contents]: <01 02 08 04>, byteLength: 4 }
* }
* 
*/
console.log(b)
/**
* DataView {
*   byteLength: 3,
*   byteOffset: 1,
*   buffer: ArrayBuffer { [Uint8Contents]: <01 02 03 04>, byteLength: 4 }
* }
* 
*/
console.log(c)
/**
* DataView {
*   byteLength: 3,
*   byteOffset: 1,
*   buffer: ArrayBuffer { [Uint8Contents]: <01 02 08 04>, byteLength: 4 }
* }
* 
*/
console.log(d)

```
