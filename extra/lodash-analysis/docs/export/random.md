# random

## Description
产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个 0 到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数
## Params
`(lower, upper, floating)`
## Return
`number`
## Depend
```js
import toFinite from './toFinite.js'
```
> [toFinite 源码分析](./toFinite.md)
> 

## Code
```js
const freeParseFloat = parseFloat

function random(lower, upper, floating) {
  if (floating === undefined) {
    if (typeof upper === 'boolean') {
      floating = upper
      upper = undefined
    }
    else if (typeof lower === 'boolean') {
      floating = lower
      lower = undefined
    }
  }
  if (lower === undefined && upper === undefined) {
    lower = 0
    upper = 1
  }
  else {
    lower = toFinite(lower)
    if (upper === undefined) {
      upper = lower
      lower = 0
    } else {
      upper = toFinite(upper)
    }
  }
  if (lower > upper) {
    const temp = lower
    lower = upper
    upper = temp
  }
  if (floating || lower % 1 || upper % 1) {
    const rand = Math.random()
    const randLength = `${rand}`.length - 1
    return Math.min(lower + (rand * (upper - lower + freeParseFloat(`1e-${randLength}`))), upper)
  }
  return lower + Math.floor(Math.random() * (upper - lower + 1))
}
```
## Analyze
1. 首先处理 floating 没有传入的情况
    ```js
      if (floating === undefined) {
        if (typeof upper === 'boolean') {
          floating = upper
          upper = undefined
        }
        else if (typeof lower === 'boolean') {
          floating = lower
          lower = undefined
        }
      }
    ```
   
    在这里判断了 `upper` 和 `lower` 是否为布尔值，因为 `random` 函数对于 `upper` 和 `lower` 支持只传入一个数字

    所以，如果 `upper` 或者 `lower` 是 布尔值，则将其赋值给 `floating`，将其本身的值置为 `undefined`

2. 接着处理 upper 和 lower
    ```js
      if (lower === undefined && upper === undefined) {
        lower = 0
        upper = 1
      }
      else {
        lower = toFinite(lower)
        if (upper === undefined) {
          upper = lower
          lower = 0
        } else {
          upper = toFinite(upper)
        }
      }
    ```
   
    可以看到 如果 `upper` 和 `lower` 都没有传入，则将 `lower` 置为 0，`upper` 置为 1，也就是 0-1 之间的随机数

    接着会看到，先将 `lower` 转为了一个有限数值，然后判断了 `upper` 是否传入了，如果没有传入，那么将 `lower` 的值作为上限，赋值给 `upper`，并且将 `lower` 修改为 0

    如果上限和下限都传入了，则会将其转为有限数值

3. 接着判断下限的数值大于上限
    ```js
      if (lower > upper) {
        const temp = lower
        lower = upper
        upper = temp
      }
    ```
   
    这里就是一个数值转换的过程，如果下限大于上限，则将值对调

    这里 lodash 的写法，是正常写法，但是在 ES6 中 可以改为

    ```js
       lower > upper && ([upper, lower] = [lower, upper])
    ```
   
    使用结构赋值可以快速交换两个值

4. 浮点数生成
    ```js
      if (floating || lower % 1 || upper % 1) {
        const rand = Math.random()
        const randLength = `${rand}`.length - 1
        return Math.min(lower + (rand * (upper - lower + freeParseFloat(`1e-${randLength}`))), upper)
      }
    ```
   
    这里的逻辑稍微有点绕，本意是为了生成的随机数包括 lower 和 upper

    正常来说生成随机数

    ```js
    const rand = Math.random()
    return lower + rand * (upper - lower)
    ```
   
    但是这样生成的随机数，不会出现 `upper` ，`Math.random` 生成的随机数不包括 1

    所以lodash 这里的处理就是，生成一个 **极小值**，这样生成上限数的概率也不会很大

    使用科学计数法生成了一个 极小值，那么 `upper - lower + 极小值`，最后再乘以随机数，就有可能超过 `upper - lower` ，最后再加上 lower ，就有可能超过上限

    所以最后，在上限和随机数之间取最小，如果超过了上限，则返回上限即可

5. 返回随机整数
    ```js
      return lower + Math.floor(Math.random() * (upper - lower + 1))
    ```
   
    也是为了生成和上限相同的随机数，所以加了1，最后通过 Math.floor 向下取整，即可得到符合 random 预期的随机数
## Remark
1. [Math.floor() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 为向下取整
2. [Math.random() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) 函数返回一个浮点数， 伪随机数在范围从 0 到小于 1，也就是说，从 0（包括 0）往上，但是不包括 1（排除 1）
3. 在 MDN 文档中， Math.random 生成的是伪随机数，如果要符合密码学要求，可以使用 [Crypto.getRandomValues()](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto/getRandomValues)
4. [随机数 Wikipedia](https://zh.wikipedia.org/wiki/%E9%9A%8F%E6%9C%BA%E6%95%B0)

   密码学范畴的随机数
   
   根据密码学原理，随机数的随机性检验可以分为三个标准：

    1. 统计学伪随机性。统计学伪随机性指的是在给定的随机比特流样本中，1 的数量大致等于 0 的数量，同理，“10”“01”“00”“11” 四者数量大致相等。类似的标准被称为统计学随机性。满足这类要求的数字在人类 “一眼看上去” 是随机的。
    2. 密码学安全伪随机性。其定义为，给定随机样本的一部分和随机算法，不能有效的演算出随机样本的剩余部分。
    3. 真随机性。其定义为随机样本不可重现。实际上只要给定边界条件，真随机数并不存在，可是如果产生一个真随机数样本的边界条件十分复杂且难以捕捉（比如当地的背景辐射波动值），可以认为用这个方法演算出来了真随机数。但实际上，这也只是非常接近真随机数的伪随机数，一般认为，无论是背景辐射、物理噪音、抛硬币等等都是可被观察了解的，任何基于经典力学产生的随机数，都只是伪随机数。
    
   相应的，随机数也分为三类
    1. 伪随机数：满足第一个条件的随机数。
    2. 密码学安全的伪随机数：同时满足前两个条件的随机数。可以通过密码学安全伪随机数生成器计算得出。
    3. 真随机数：同时满足三个条件的随机数。
    
5. [量子真随机数](https://sca.gov.cn/sca/zxfw/2017-04/25/content_1011723.shtml)
## Example
```js
console.log(random(0, 19)) // 0-19 之间的整数
console.log(random(0, 19.1)) // 0-19.1 之间的浮点数
```
