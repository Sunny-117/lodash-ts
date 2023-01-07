# matchesStrictComparable 

## Description 
`matchesProperty` 的专用版本，用于适合严格相等比较的源值，即`===`。

创建一个函数，该函数执行给定对象路径到srcValue的值之间的部分深度比较，如果对象值相等，则返回true，否则返回false。
## Params
`(key, srcValue)`
> srcValue - 要匹配的值。
>

## Return
`Function`

## Code
```js
function matchesStrictComparable(key, srcValue) {
  return (object) => {
    if (object == null) {
      return false
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)))
  }
}
```
## Analyze
`matchesStrictComparable` 最终会返回一个 函数，返回的函数的参数为 `object`，`matchesStrictComparable` 需要 `key` 值和 对比的 `value` 值作为参数

会判断，如果 `object` 为 `null` ，则返回 `false`

否则进行判断 `object` 当前 `value` 和 `srcValue` 严格相等，并且 `srcValue` 不是 `undefined`，或者 `key` 在 `object` 上存在
## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)

    如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true。
## Example
```js
const a = {a: 1, b: 2, c: 3}

const fun = matchesStrictComparable('b', 2)

console.log(fun(a)) // true

```
