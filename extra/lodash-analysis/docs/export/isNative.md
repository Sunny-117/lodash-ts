# isNative

## Description
检查 value 是否是一个原生函数

## Params
`value`

## Return
`Boolean`

## Depend
```js
import isObject from './isObject.js'
```
> [isObject 源码分析](./isObject.md)

## Code
```js
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g

/** Used to detect if a method is native. */
const reIsNative = RegExp(`^${
  Function.prototype.toString.call(Object.prototype.hasOwnProperty)
    .replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
}$`)

function isNative(value) {
  return isObject(value) && reIsNative.test(value)
}
```

## Analyze
如果 `value` 是一个对象，那么就使用 `reIsNative` 进行匹配校验

`reIsNative` 是动态生成的 正则表达式

根据 `Object.prototype.hasOwnProperty` 先生成一个模板，然后替换为最终的正则表达式，过程是这样的

首先 `Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(reRegExpChar, '\\$&')`

<img  :src="$withBase('/assets/reg_isNative_1.svg')" />

匹配替换后，得到 字符串 `function hasOwnProperty\(\) \{ \[native code\] \}`

然后再次进行替换，得到最终的结果 

```js
"function hasOwnProperty\(\) \{ \[native code\] \}".replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
```

<img  :src="$withBase('/assets/reg_isNative_2.svg')" />

最终得到

`/^function.*?\(\) \{ \[native code\] \}$/`

<img  :src="$withBase('/assets/reg_isNative_3.svg')" />

为什么要使用这么麻烦的方式呢，直接得到最终的结果不行吗？

对于不同的浏览器，toString 之后的结果是不同的

比如有些浏览器是这样的（chrome）
```js
"function hasOwnProperty() { [native code] }"
```

在一些浏览器可能是这样的（Firefox）

```js
"function hasOwnProperty() {
    [native code]
}"
```

然后就通过动态生成来匹配不同的浏览器

## Remark
1. [Function.prototype.toSource() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toSource)
    - 对于内置的 Function 对象，toSource 返回下面的字符串:
        ```js
        function Function() {
            [native code]
        }
        ```
    - 对于自定义函数来说，toSource返回能定义该函数的 Javascript 源码.

## Example
```js
console.log(isNative(Math.floor)) // true
console.log(isNative(() => {})) // false
```
