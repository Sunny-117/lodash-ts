# isBuffer 

## Description 
检查 `value` 是否是个 `buffer`
## Params
`value`
## Return
`Boolean`
## Depend
```js
import root from './.internal/root.js'
```
> [root 源码分析](../internal/root.md)
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
const Buffer = moduleExports ? root.Buffer : undefined

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined

const isBuffer = nativeIsBuffer || (() => false)
```
## Analyze

### Buffer
在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像 TCP 流或文件流时，必须使用到二进制数据。因此在 Node.js 中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。c

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理 I/O 操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

> 在 v6.0 之前创建 Buffer 对象直接使用 new Buffer () 构造函数来创建对象实例，但是 Buffer 对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在 v6.0 以后，官方文档里面建议使用 Buffer.from() 接口去创建 Buffer 对象。
>


通常，数据的移动是为了处理或者读取它，并根据它进行决策。伴随着时间的推移，每一个过程都会有一个最小或最大数据量。如果数据到达的速度比进程消耗的速度快，那么少数早到达的数据会处于等待区等候被处理。反之，如果数据到达的速度比进程消耗的数据慢，那么早先到达的数据需要等待一定量的数据到达之后才能被处理。

这里的等待区就指的缓冲区（Buffer），它是计算机中的一个小物理单位，通常位于计算机的 RAM 中。


### 分析
Node.js CommonJS 模块 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

1. `exports` 这是一个对于 module.exports 的更简短的引用形式。
2. `module` 在每个模块中， module 的自由变量是对表示当前模块的对象的引用。 为方便起见，还可以通过全局模块的 exports 访问 module.exports。 module 实际上不是全局的，而是每个模块本地的。
3. `moduleExports` 如果存在，就表示是 Node.js 环境，就可以使用 `root.Buffer`(Buffer 类在全局作用域中)
4. Buffer 类上 存在 `isBuffer` 来判断 如果 obj 是一个 Buffer，则返回 true，否则返回 false
5. 最终判断了 是否存在 isBuffer 这个方法，如果存在则返回 Buffer.isBuffer ，否则箭头函数调用，永远返回 false

## Remark
1. [Buffer Node.js](http://nodejs.cn/api/buffer.html#buffer_buffer)
2. [Node.js 中的缓冲区（Buffer）究竟是什么？](https://www.nodejs.red/#/nodejs/buffer)
3. [Node.js Buffer (缓冲区) 菜鸟教程](https://www.runoob.com/nodejs/nodejs-buffer.html)

## Example
```js
const a = Buffer.from([1,2,3,4,5])
isBuffer(a) // true
```
