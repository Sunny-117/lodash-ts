# iskey

## Description 
`isKey` 的作用是用来判断传入的 `value` 是否为合法的属性名, 检查 `value` 是否是属性名称而不是属性路径(如传入 `a.b.c` 或者 `a[0].b.c` 可能会返回 false。)。
## Params
`(value, object)`

> value: 需要校验的值
> object： 所属对象
>

## Return
`Boolean`
## Depend
```js
    import isSymbol from '../isSymbol.js'
```
> [isSymbol 源码分析](../export/isSymbol.md)
>


## Code
```js
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}
```
## Analyze
####
1. `reIsDeepProp`， 用于匹配属性路径中的属性名称。
`/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/` 图解如下
<img  :src="$withBase('/assets/reg_isKey_1.svg')" />

在 `lodash` 中，像 `a.b.c` 和 `a[0].b.c` 这种可能会被当作属性路径对待，像 `get` 这些的函数支持传入这样的路径来获取嵌套对象的值，在这个正则中，主要就是匹配 `.` `[]`这种属性值，同时支持转义字符，如 `[\'b\']`

2. `reIsPlainProp`, 用于匹配`[0-9A-Za-z_]`
`/^\w*$/`， 图解如下
<img  :src="$withBase('/assets/reg_isKey_2.svg')" />

#### 源码分析
1. 首先判断 `value` 如果是 `Array` ，直接 `return false`
2. 其次判断 `value` 的类型是否为 `Number`、`Boolean`、 `Null`, `Symbol`,除 `Symbol` 外，在做 `Object` 的 `Key` 值时，都会默认转换为 `String` ，而在 `ES6` 中，`Symbol` 本身就可以做 `Object` 的 `Key` 值 （[Symbol术语 MDN ](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol)）
3. 开始处理字符串类型， 如果是 `\w` 类型则直接返回 `true` ，接着判断如果 不是 `.` `[]` （如：`a.b.c` `a['b'].c`） 这种类型的情况下，返回 `true`
4. 特殊情况处理，如果非要 传入 `a.b.c` 这种形式的情况，就需要用到 第二个参数 `object` 来判断，如果传入的对象不为空，并且 `value` 是 `object` 的 `Key` 则返回 `true`

## Remark
1. [in运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
2. [Object 属性名称 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#%E5%B1%9E%E6%80%A7%E5%90%8D%E7%A7%B0)
2. 判断字符串时，先判断 `\w` 后判断其他的（其实只判断第二个正则也可以，还是因为性能原因），是因为第二个正则太复杂，为性能考虑，首先先判断 `\w`

## Example
```js
isKey(3) // true
isKey('a') // true
isKey('a.b.c') // false
isKey('a.b.c', {"a.b.c": 1}) // true
```
