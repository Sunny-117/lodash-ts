# baseIsMatch 

## Description 
来判断 object 是否包含 source 的属性，并且属性值相等
## Params
`(object, source, matchData, customizer)`
> {Object} object - 检查对象
>
> {Object} source - 属性值要匹配的对象。
>
> {Array} matchData - 属性名称，值和比较标志以匹配
>
> {Function} [customizer] - 自定义比较函数
>

## Return
`Boolean`
## Depend
```js
import Stack from './Stack.js'
import baseIsEqual from './baseIsEqual.js'
```
> [Stack 源码分析](./stack.md)
> <br/>
> <br/>
> [baseIsEqual 源码分析](./baseIsEqual.md)
>

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

function baseIsMatch(object, source, matchData, customizer) {
  let index = matchData.length
  const length = index
  const noCustomizer = !customizer

  if (object == null) {
    return !length
  }
  let data
  let result
  object = Object(object)
  while (index--) {
    data = matchData[index]
    if ((noCustomizer && data[2])
      ? data[1] !== object[data[0]]
      : !(data[0] in object)
    ) {
      return false
    }
  }
  while (++index < length) {
    data = matchData[index]
    const key = data[0]
    const objValue = object[key]
    const srcValue = data[1]

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } else {
      const stack = new Stack
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }
      if (!(result === undefined
        ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
        : result
      )) {
        return false
      }
    }
  }
  return true
}
```
## Analyze
1. 首先定义了常量标识符，1 表示部分比较，2表示无序对象
2. `matchData` 等同于每一项都为 `[key, value, isStrictComparableFlag]` 的二维数组
3. 获取到 `matchData` 的 `length`，如果 `object` 为 `null` 或者 `undefined` ，并且 `matchData.length` 也为0，`则返回false`，否则返回 `true`，认为二者相等
4. 如果没有传入自定义比较函数，并且 `data[2]` 为 `true`，即代表可以使用 `===` 进行判断

    此时，会比较 `data[1] !== object[data[0]]`
    
    也就是说，如果 `source` 对应的 `value` 和 `object` 对应的 `value` 不同，则返回 `false`
5. 如果传入了 自定义比较函数，或者 `data[2]` 为 `false`，则使用以下对比逻辑

    `!(data[0] in object)`
    
    判断 当前 `key` 是否在 `object` 原型及其原型链上存在，如果不存在，也返回 `false`
6. 会循环比较以上4，5逻辑，如果不匹配，则直接返回 `false`
7. 值的对比
```js
  while (++index < length) {
    data = matchData[index]
    const key = data[0]
    const objValue = object[key]
    const srcValue = data[1]

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } else {
      const stack = new Stack
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }
      if (!(result === undefined
        ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
        : result
      )) {
        return false
      }
    }
  }
```

值的对比也是 `while` 循环，进行比较

当没有传入自定义比较函数，并且 `data[2]` 为 `true` 时
```js
    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false
      }
    } 
```
这里会判断，当前 `object` 对应的 `key` 是否为 `undefined`，如果为 `undefined`，则判断当前 `key` 是否在 `object` 及其原型链上存在，如果即为 `undefined`，并且不在 `object` 及其原型链上 存在，则 返回 `false`

传入了自定义函数，或者 `data[2]` 为 `false`
```js
      const stack = new Stack
      if (customizer) {
        result = customizer(objValue, srcValue, key, object, source, stack)
      }
      if (!(result === undefined
        ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
        : result
      )) {
        return false
      }
```
这里会判断，是传入了自定义函数，如果传入了，则将 `result` 置为 自定义函数处理的结果，有可能为 `undefined` 

接着会判断，如果 `result` 为 `undefined` ，则会使用 `baseIsEqual` 来进行比较，这里传入了标识，既是部分比较，同时也是无序比较

紧接着会判断比较的结果，如果为 `false` ，则返回 `false`，证明 `object` 上不完全包含 `source` 的属性

8. 如果以上所有的判断逻辑都过了，则证明 `object` 上包含 `source` 的属性，并且值相等
## Remark
1. [按位或(|) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_OR)
2. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)

    如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true
## Example
```js
const a = {a: 1, b: 1}
const b = {b: 1}

console.log(baseIsMatch(a, b, [['b', 1, true]])) // true
```
