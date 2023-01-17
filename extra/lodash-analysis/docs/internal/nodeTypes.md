# nodeTypes 

## Description 
获取 node.js 下 util.types 模块方法导出

## Return
`util.types`
## Depend
```js
import freeGlobal from './freeGlobal.js'
```
> [freeGlobal 源码分析](./freeGlobal.md)
>

## Code
```js
/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports

/** Detect free variable `process` from Node.js. */
const freeProcess = moduleExports && freeGlobal.process

/** Used to access faster Node.js helpers. */
const nodeTypes = ((() => {
  try {
    /* Detect public `util.types` helpers for Node.js v10+. */
    /* Node.js deprecation code: DEP0103. */
    const typesHelper = freeModule && freeModule.require && freeModule.require('util').types
    return typesHelper
      ? typesHelper
      /* Legacy process.binding('util') for Node.js earlier than v10. */
      : freeProcess && freeProcess.binding && freeProcess.binding('util')
  } catch (e) {}
})())
```
## Analyze
1. 首先通过检测 exports module 等来判断环境，和 [isBuffer](../export/isBuffer.md) 一致
   
2. 如果是 Node.js 环境，则直接通过 require('util') 将 util 加载进来，并通过 .types 取出
3. 如果是 v10+ 版本之前，则是通过 process.binding 来加载模块
4. 通过 tyr…catch 来避免有可能的错误，做一个容错处理
5. 使用立即执行函数返回结果

<img  :src="$withBase('/assets/nodeTypes.png')" />

## Remark
1. [DEP0103 Node.js](https://nodejs.org/api/deprecations.html#deprecations_dep0103_process_binding_util_is_typechecks)
2. [util.types Node.js](http://nodejs.cn/api/util.html#util_util_types)
## Example
```js
nodeTypes.isDate(new Date()) // true
```
