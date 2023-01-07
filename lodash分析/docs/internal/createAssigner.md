# createAssigner 

## Description 
创建一个类似`assign`的函数。主要用在 merge 和 mergeWith
## Params
`assigner` - 合并值的函数。
## Return
`Function`
## Depend
```js
import isIterateeCall from './isIterateeCall.js'
```
> [isIterateeCall 源码分析](./isIterateeCall.md)
>

## Code
```js
function createAssigner(assigner) {
  return (object, ...sources) => {
    let index = -1
    let length = sources.length
    let customizer = length > 1 ? sources[length - 1] : undefined
    const guard = length > 2 ? sources[2] : undefined

    customizer = (assigner.length > 3 && typeof customizer === 'function')
      ? (length--, customizer)
      : undefined

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer
      length = 1
    }
    object = Object(object)
    while (++index < length) {
      const source = sources[index]
      if (source) {
        assigner(object, source, index, customizer)
      }
    }
    return object
  }
}
```
## Analyze
1. 首先确定 `customizer` 函数是否存在，这里判断 `sources` 的 `length` 是否大于1 ，也就是说在 `customizer` 函数之前至少是有一个 对象参与合并的，然后如果 `length` 大于1，先取 `source` 的最后一个值作为 `customizer` 的值
2. 紧接着判断 `assigner` 的参数长度，也就是 `merge` 和 `mergeWith` 的区别，如果 `length` 大于 3，说明是 `mergeWith` ，是可以传入 自定义合并函数的

    如果同时 最先定义的 `customizer` 为 `function` 类型 ，则会将 `sources` 的 `length` 减 1，也就是最后一个值为 `customizer` 不参与合并，同时使用 逗号操作符 返回 `customizer` 的值
    
    如果 `assigner` 参数的长度小于等于3，或者第一步获取的 `customizer` 不是 `function` 类型，则将 `customizer` 置为 `undefined`
3. 判断 `guard` ，也就是判断 `sources[2]` 的值，如果 `guard` 存在，则同时判断 是不是属于某个迭代函数的参数，所以判断了  `sources[0]`, `sources[1]`, `sources[2]` 是否满足 `isIterateeCall`

    如果满足了 `isIterateeCall` 的条件，则将 `length` 置为 1，因为只需要拿到 迭代函数的第一个参数，也就是 当前的 `value` 值即可，不需要后面的参数
    
    `iteratee` 函数 接受三个参数，当前值，当前值对应的key或者索引，原始数组或对象
    
    这里同时判断了 `length < 3` 的情况，因为在之前已经判断了 `customizer` 函数是否存在，如果满足条件存在，`length` 已经减一了，这里判断 `小于3` 原因在于 `isIterateeCall` 的判断，对于以下情况 `isIterateeCall` 判断会返回 `ture`
    
    ```js
     function a () {}
     a['a'] = 1
     
     console.log(isIterateeCall(1, 'a' , a)) // true
    ```
   
   但是这种情况下，`sources` 的参数只有 3 个也可以满足第二步的判断，如果不做 `< 3` 的判断来处理 `customizer` ，就可以导致错误的结果
   
   所以，如果刚好 `sources` 的长度为 3，同时 这三个参数作为 `isIterateeCall` 的判断，也要判断 是否满足了 第二步 中判断 `customizer` 的条件，如果这两条都满足了，那就要判断 `length` 是否 `< 3`, **如果小于3，那就证明，最后传入的函数 不是自定义函数，而是作为某个迭代的原始对象**，不符合 `customizer` 的条件，要将 `customizer` 置为 `undefined`
   
4. 最后一步就相对简单了， `while` 循环，然后取到每一个传入的真实对象参数，如果值存在，调用 `assigner` 函数进行合并即可
## Remark
1. [逗号操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator) 对它的每个操作数求值（从左到右），并返回最后一个操作数的值。
2. [Object.assign() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
## Example
```js
const assigner = (object, source) => {
  if (Array.isArray(object) && Array.isArray(source)) {
    for (let k of source) {
      object.push(k)
    }
  } else {
    for (const k in source) {
      object[k] = source[k]
    }
  }
}

const func = createAssigner(assigner)

const a = [1,2,3,4,5]
let b = [7]
func(b, a)
console.log(b) // [ 7, 1, 2, 3, 4, 5 ]
```
