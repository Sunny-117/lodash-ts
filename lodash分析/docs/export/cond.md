# cond 

## Description 
创建了一个函数，这个函数会迭代 pairs，并调用最先返回真值对应的函数。该断言函数对 绑定 this 及传入创建函数的参数。
## Params
`(pairs)` -- 断言函数对
## Return
`Function`
## Depend
```js
import map from './map.js'
```
> [map 源码分析](./map.md)
>

## Code
```js
function cond(pairs) {
  const length = pairs == null ? 0 : pairs.length

  pairs = !length ? [] : map(pairs, (pair) => {
    if (typeof pair[1] !== 'function') {
      throw new TypeError('Expected a function')
    }
    return [pair[0], pair[1]]
  })

  return (...args) => {
    for (const pair of pairs) {
      if (pair[0].apply(this, args)) {
        return pair[1].apply(this, args)
      }
    }
  }
}
```
## Analyze
1. **cond 本质就是创建一个 _拥有复杂 if-else_ 的函数**
2. 判断 pairs == null （兼容 undefined），拿到 length
3. 如果不存在length ，将 pairs 设置为 空数组，否则的话 map 遍历判断参数合法性
4. map 遍历，如果 每一组函数对的 第二项（相当于if判断为真之后，代码块要执行的逻辑）不是 function ，则抛出 TypeError，然后每一组传入了多少项，只取前两项
5. 最终返回一个函数，处理逻辑如下
    - for...of 循环遍历
    - ...args 绑定了参数
    - 如果每一组的第一项执行结果（if 判断）为 true ，则返回第二项的执行结果（if 代码块）
    - 这里返回了 箭头函数，箭头函数的 this 由执行它的函数决定，绑定了 this
## Remark
1. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
2. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters) 语法允许我们将一个不定数量的参数表示为一个数组
3. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
4. [箭头函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承this
## Example
```js
const a = cond([
  [x => x < 0, x => Math.abs(x)],
  [x => x === 0, x => x],
  [x => x > 0, x => Math.pow(2, x)]
])

a(-9) // 9
a(0) // 0
a(2) // 4

```
