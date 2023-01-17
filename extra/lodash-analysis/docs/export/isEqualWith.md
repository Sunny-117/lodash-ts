# isEqualWith

## Description
这个方法类似 [isEqual](./isEqual.md)。 除了它接受一个 customizer 用来定制比较值。 如果 customizer 返回 undefined 将会比较处理方法代替。 customizer 会传入 6 个参数：(objValue, othValue [, index|key, object, other, stack]

## Params
`(value, other, customizer)`

## Return
`Boolean`

## Depend
```js
import baseIsEqual from './.internal/baseIsEqual.js'
```
> [baseIsEqual 源码分析](../internal/baseIsEqual.md)
> 

## Code
```js
function isEqualWith(value, other, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  const result = customizer ? customizer(value, other) : undefined
  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result
}
```

## Analyze
对于 `customizer` 参数做了处理，如果 `customizer` 不是一个 `function` 类型，则将其置为 `undefined`

根据 `customizer` 是否为真值，得到 `result` 的值，如果 `customizer` 是一个 函数，则调用 `customizer` 方法对 `value` 和 `other` 进行处理， 否则 `result` 为 `undefined`

最终 如果 `result` 是 `undefined` ，则使用 `baseIsEqual` 进行比较，否则 返回 `!!result` ,也就是 使用 双非操作符返回 布尔值

## Remark
这里对于 customizer 的方法处理有点问题，假设
```js
const a = {
  a: 1
}

const b = {
  a: 2
}

console.log(isEqualWith(a, b, (x, y) => {
  if (x.a <= y.a) {
    --y.a
    return
  }
  return y.a
}))
```

如果我们传入这样的值，按照道理来说，他们应当是不想等的，但是 对于 `isEqualWith` 方法，这里 `customizer` 方法 其实处理了两遍，导致他们是相等的  返回了 `true`

首先 在 `isEqualWith` 方法内部
```js
  const result = customizer ? customizer(value, other) : undefined
```

这一点，就执行了 `customizer` 方法

然后后续调用 `baseIsEqual` 方法时，对于 `customizer` 方法，又执行了一次，导致返回了错误的结果

在 `isEqualWith` 调用 `customizer` 时，应当使用 `cloneDeep` 对 `value` 和 `other` 进行处理

对于上述代码，在不使用 `cloneDeep` 时，返回 `true`，但是如果使用 `cloneDeep` 处理之后，返回 `false`

## Example
```js
const a = {
  a: 1
}

const b = {
  a: 2
}

const c = {
  a: 1
}

const d = {
  a: 2
}
console.log(isEqualWith(c, d)) // false

console.log(isEqualWith(a, b, (x, y) => {
  if (x.a <= y.a) {
    --y.a
    return
  }
  return y.a
})) // 使用 cloneDeep 应当返回 false
```
