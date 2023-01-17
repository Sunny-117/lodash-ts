# cloneBuffer 

## Description 
克隆一个 `Buffer`
## Params
`(buffer, isDeep)` - buffer 和 是否深度拷贝
## Return
`Buffer`
## Depend
```js
import root from './root.js'
```
> [root 源码分析](./root.md)
>

## Code
```js
/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
const Buffer = moduleExports ? root.Buffer : undefined, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice()
  }
  const length = buffer.length
  const result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length)

  buffer.copy(result)
  return result
}
```
## Analyze
1. 在 function 之前的代码都是为了判断是否 存在 Buffer 类，跟 [isBuffer](../export/isBuffer.md) 判断一致
2. `Buffer.allocUnsafe` 创建一个大小为 size 字节的新 Buffer。
3. 判断如果传入了 isDeep ，并且为 truly，则调用 buffer.slice
    - 这里有一点疑问，因为 buffer.slice 中说明 **buffer.slice 返回一个新的 Buffer，它引用与原始的 Buffer 相同的内存，但是由 start 和 end 索引进行偏移和裁剪。**
    - 若要复制切片，则使用 Uint8Array.prototype.slice()。
    
    ```js
    const isBuffer = nativeIsBuffer || (() => false)
    
    const a = Buffer.from([1,2,3,4,5])
    const b = a.slice()
    const c = Uint8Array.prototype.slice.call(a)
    
    a[0]++
    
    console.log(a) // <Buffer 02 02 03 04 05>
    console.log(b) // <Buffer 02 02 03 04 05>
    console.log(c) // <Buffer 01 02 03 04 05>
    ```
   
   - 所以如果是使用深拷贝，应该使用 Uint8Array.prototype.slice.call
4. 不是深拷贝的情况下，拿到 buffer 的长度
5. 如果 存在 Buffer.allocUnsafe ，则使用 Buffer.allocUnsafe 创建一个新的 buffer ，长度为传入 buffer 的长度
6. 如果不存在 allocUnsafe 则使用 new Buffer (new buffer.constructor 就是 Buffer) 的方式创建一个 buffer 实例 ，在 6.0.0 之前的 Node.js 版本中， Buffer 实例是使用 Buffer 构造函数创建的，该函数根据提供的参数以不同方式分配返回的 Buffer new Buffer()。

    现在更推荐通过 `Buffer.from ()`、`Buffer.alloc ()` 与 `Buffer.allocUnsafe ()` 三种方式来创建

7. 最后通过 `copy` 将 `buffer` 的数据 拷贝 到 `result` 中，返回result

## Remark
1. [Buffer Node.js](http://nodejs.cn/api/buffer.html#buffer_buffer)
2. [Buffer.allocUnsafe Node.js](http://nodejs.cn/api/buffer.html#buffer_static_method_buffer_allocunsafe_size)
3. [Buffer.slice](http://nodejs.cn/api/buffer.html#buffer_buf_slice_start_end)
4. [Buffer.copy](http://nodejs.cn/api/buffer.html#buffer_buf_copy_target_targetstart_sourcestart_sourceend) 拷贝 buffer 中某个区域的数据到 target 中的某个区域，即使 target 的内存区域与 buf 的重叠。

## Example
`cloneBuffer` 的表现有点令人疑惑，传入了 isDeep 出来的结果为浅拷贝，不传入 出来的结果反而是深拷贝
```js
const a = Buffer.from([1,2,3,4,5])
const b = cloneBuffer(a, true)
const c = cloneBuffer(a)

a[0]++
a[1]++

console.log(a) // <Buffer 02 03 03 04 05>
console.log(b) // <Buffer 02 03 03 04 05>
console.log(c) // <Buffer 01 02 03 04 05>
```
