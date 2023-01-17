# root 

## Description 
获取全局的顶层对象

## Return
`root || false`
## Depend
```js
import freeGlobal from './freeGlobal.js'
```
> [freeGlobal 源码分析](./freeGlobal.md)
>

## Code
```js
/** Detect free variable `globalThis` */
const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis

/** Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self

/** Used as a reference to the global object. */
const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()
```
## Analyze
从最终返回来看 顺序 `freeGlobalThis` 、 `freeGlobal` 、 `freeSelf` 、 `Function('return this')()`
### globalThis
全局属性 globalThis 包含全局的 this 值，类似于全局对象（global object）

在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 window、self 或者 frames 取到全局对象，但是在 Web Workers 中，只有 self 可以。在 Node.js 中，它们都无法获取，必须使用 global。

在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined。 You can also use Function('return this')(), but environments that disable eval(), like CSP in browsers, prevent use of Function in this way.

globalThis 提供了一个标准的方式来获取不同环境下的全局 this  对象（也就是全局对象自身）。不像 window 或者 self 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 globalThis，不必担心它的运行环境。为便于记忆，你只需要记住，全局作用域中的 this 就是 globalThis

### Window.self
返回一个指向当前 window 对象的引用。

window.self 可以用来判断 当前对象是不是frames列表中的第一个
```js
 if (window.parent.frames[0] != window.self) {
    // 当前对象不是frames列表中的第一个时
 }
```

window.self 几乎总是用于上面示例那样的比较，用来判断当前 window 是不是父 frameset 中的第一个 frame。

### this
在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined


#### 对于 globalThis  self 的判断也和判断 global 基本一致


## Remark
1. [globalThis MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
2. [window.self MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)
## Example

示例可参考 [freeGlobal](./freeGlobal.md) 中
