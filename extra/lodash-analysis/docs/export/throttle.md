# throttle

## Description
throttle 就是平时据说的节流，也就是设置一个时间，每隔一段时间调用一次 func

创建一个节流函数，在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。 可以提供一个 options 对象决定如何调用 func 方法， options.leading 与 | 或 options.trailing 决定 wait 前后如何触发。 func 会传入最后一次传入的参数给这个函数。 随后调用的函数返回是最后一次 func 调用的结果。

**注意**: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为：在 wait 期间多次调用。

如果 wait 为 0 并且 leading 为 false, func 调用将被推迟到下一个点，类似 setTimeout 为 0 的超时。

## Params
`(func, wait, options)`

## Return
`Function`

## Depend
```js
import debounce from './debounce.js'
import isObject from './isObject.js'
```
> [debounce 源码分析](./debounce.md)
> <br/>
> <br/>
> [isObject 源码分析](./isObject.md)

## Code
```js
function throttle(func, wait, options) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    'maxWait': wait
  })
}
```

## Analyze
1. `leading` 和 `trailing` 默认值为 `true`，也即默认在 `timer` 启动前和完成后都执行 `func` 
   
2. 对于 `func` 做了类型校验，不是 `func` 则抛出错误
3. `throttle` 也支持自定义 `leading` 和 `trailing` ，这里通过 `in` 来判断是否存在，使用 双非转为布尔类型
4. 最终调用 `debounce` 实现节流，这里 `maxWait` 设置成和 `wait` 一样的值，也就达到了 等过了 `wait` 时后，执行 `func` 函数
## Remark
所有相关内容都可以查看 [debounce](./debounce.md) 实现

## Example
```js
const func = throttle(() => console.log(1),1000)

setInterval(func, 100) // 相隔 1000 毫秒，打印一次 1
```
