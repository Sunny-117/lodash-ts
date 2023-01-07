# debounce 

## Description 
创建一个 `debounced`（防抖动）函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `func` 方法。 `debounced`（防抖动）函数提供一个 `cancel` 方法取消延迟的函数调用以及 `flush` 方法立即调用。 可以提供一个 `options`（选项） 对象决定如何调用 `func` 方法，`options.leading` 与 | 或 `options.trailing` 决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。 `func` 调用时会传入最后一次提供给 `debounced`（防抖动）函数 的参数。 后续调用的 `debounced`（防抖动）函数返回是最后一次 `func` 调用的结果。

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时

## Params
`(func, wait, options)`

> func (Function): 要防抖动的函数。
>
> [wait=0] (number): 需要延迟的毫秒数。
>
> [options=] (Object): 选项对象。
>
> [options.leading=false] (boolean): 指定在延迟开始前调用。
>
> [options.maxWait] (number): 设置 func 允许被延迟的最大值。
>
> [options.trailing=true] (boolean): 指定在延迟结束后调用。

## Return
(`Function`): 返回新的 debounced（防抖动）函数。
## Depend
```js
import isObject from './isObject.js'
import root from './.internal/root.js'
```
> [isObject 源码分析](./isObject.md)
> <br/>
> <br/>
> [root 源码分析](../internal/root.md)
>

## Code
```js
function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }

  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function pending() {
    return timerId !== undefined
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  debounced.pending = pending
  return debounced
}
```
## Analyze
### 变量及其他
```js
let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime

let lastInvokeTime = 0
let leading = false
let maxing = false
let trailing = true

// Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')
```
1. `lastCallTime` 上次执行 `debounced` 函数的时间
   
2. `lastInvokeTime` 上一次调用 `func` 的时间
3. `timerId` `setTimeout` 或 `requestAnimationFrame` 返回的 `id`
4. `maxWait` 设置 `func` 允许被延迟的最大值
5. `maxing` 表示要不要开启 最大等待时间
6. `trailing` 指定在延迟结束后调用
7. `leading` 指定在延迟开始前调用
8. `useRAF` 是否使用 RAF ，如果没设置 `wait` 且 RAF 可用 则默认使用 RAF

### 参数合规化处理
```js
if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
}

wait = +wait || 0

if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
}
```
1. 如果传入的 `func` 不是一个 `function` ，则抛出 类型错误
   
2. 传入的 `wait` 通过 一元正号 进行转换，如果能转成数字，则使用 `wait` 的值，否则可能为 `NaN`, 则 取 0
3. 对于传入的 `options` 配置进行处理
    - `leading` 使用双非转为 `Boolean` 值
    - 通过 `in` 运算符来判断 `options` 及其原型链中是否存在 `maxWait` 属性，如果有，则开启 最大等待时间
    - 如果 `maxing` 为真值，则取 `maxWait` 和 `wait` 中最大值，因为传入的 `maxWait` 有可能会小于 `wait`，这里和 `wait` 的处理一致，也是使用了 一元正号转换，如果 `maxing` 为假值，则 `maxWait` 还是 `undefined`
    - `trailing` 也是通过 `in` 判断了是否存在，然后通过双非进行了 `Boolean` 的转换
    
### invokeFunc
```js
  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }
```
`invokeFunc` 方法主要作用是 执行 `func` ，并且更新 上一次执行 `func` 的时间，并且会对 `lastArgs` 和 `lastThis` 进行重置

### startTimer
```js
  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId)
      return root.requestAnimationFrame(pendingFunc)
    }
    return setTimeout(pendingFunc, wait)
  }
```
`startTimer` 作用是启用定时器，并且将等待调用的方法作为参数传递。

这里就是判断了是使用 `setTimeout` 还是 `requestAnimationFrame`

这里会返回 `timerId` 用作取消使用

### cancelTimer
```js
  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id)
    }
    clearTimeout(id)
  }
```
`cancelTimer` 用于取消 `timer`，和 `startTimer` 一样也会区分 `setTimeout` 和 `requestAnimationFrame`

### leadingEdge
```js
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }
```
`leadingEdge` 是在 每轮 `debounce` 开始时调用，会记录 上一次调用 `func` 的时间，第二步则是 调用 `timerExpired` 来进行 `timer` 的重启

最后会判断 如果 `leading`(指定在延迟开始前调用) 为真，则会立即调用 `invokeFunc` 函数，不会等到 `timer` 到时间，也就是指定在延迟开始前调用

### remainingWait
```js
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }
```
`remainingWait` 的作用是 计算剩余时间

`wait - timeSinceLastCall` 可以计算出没有 `maxWait` 的时候的等待时间

`maxWait - timeSinceLastInvoke` 得出最大的等待时间所剩余的时间

然后 取 二者最小值即可

### shouldInvoke
```js
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }
```

`shouldInvoke` 作用是 判断是否需要执行，拿到时间差之后会进行判断，4种情况会返回 true

1. 第一次调用 `lastCallTime === undefined`
   
2. 距离上次调用 `debounced` 的时间 大于等于 `wait` 的时间
3. 系统时间倒退
4. 设置了 `maxWait`，距离上次调用 `func` 时间 大于等于 `maxWait`

### timerExpired
```js
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time))
  }
```
`timerExpired` 作用是 进行 `timer` 的重启

通过 `shouldInvoke` 函数判断是否执行，传入的是当前的时间戳

如果执行，则调用 `trailingEdge` 函数

如果不执行，则使用 `remainingWait` 函数重新计算等待时间，再次调用 `startTimer` ，开始 timer

### trailingEdge
```js
  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }
```
`trailingEdge` 是在计时器结束后调用，只有在 `trailing` 为 `true` 且 `lastArgs` 不为 `undefined` 时调用 `invokeFunc` 函数，因为 `trailing` 参数的缘故，有可能不会重置 `lastArgs` 和 `lastThis` ，所以这里手动重置了

### cancel
```js
  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }
```
`cancel` 方法则是用于取消 `timer`，并且会对变量等进行重置

### flush
```js
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }
```
`flush` 可以控制 `func` 是否立即执行，不需要等待 `timer` 时间到后再触发

如果 `timerId` 已经为 `undefined`，则表示 `func` 已经执行，或者第一次还没有调用，直接返回 `result`，否则调用 `trailingEdge` 立即执行即可

### pending
```js
  function pending() {
    return timerId !== undefined
  }
```
`pending` 用来检测 `timer` 是否正在运行，存在 `timerId` 则表示正在运行

## debounced
```js
  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait)
    }
    return result
  }
```
1. 首先拿到当前时间以及判断是否要调用，定义了参数，`this` 等等
   
2. 如果 `isInvoking` 为 `true`，并且 `timerId` 为 `undefined`，则会调用 `leadingEdge` 函数，这里会处理开启定时器，记录上一次调用 `func` 的时间，以及判断是否在延迟开始前调用
3. 如果 `isInvoking` 为 `false` （调用 trailingEdge 之后，在执行 `debounced` 可能会碰到 `shouldInvoke` 返回 `false` 的情况），那么则调用 `startTimer` 重新开始 timer

### if(maxing)
一开始我没看明白 `if (maxing)` 里面这段代码的作用，按理说，是不会执行这段代码的，后来我去 `lodash` 的仓库里看了 test 文件，发现对这段代码，专门有一个 `case` 对其测试。我剥除了一些代码，并修改了测试用例以便展示，如下

```js
var limit = 320,
  withCount = 0;

var withMaxWait = debounce(
  function() {
    console.log("invoke");
    withCount++;
  },
  64,
  {
    maxWait: 128
  }
);

var start = +new Date();
while (new Date() - start < limit) {
  withMaxWait();
}
```
执行代码，打印了 3 次 invoke；我又将 if (maxing){} 这段代码注释，再执行代码，结果只打印了 1 次。结合源码的英文注释 Handle invocations in a tight loop，我们不难理解，原本理想的执行顺序是 withMaxWait->timer->withMaxWait->timer 这种交替进行，但由于 setTimeout 需等待主线程的代码执行完毕，所以这种短时间快速调用就会导致 withMaxWait->withMaxWait->timer->timer，从第二个 timer 开始，由于 lastArgs 被置为 undefined，也就不会再调用 invokeFunc 函数，所以只会打印一次 invoke。

同时，由于每次执行 invokeFunc 时都会将 lastArgs 置为 undefined，在执行 trailingEdge 时会对 lastArgs 进行判断，确保不会出现执行了 if (maxing){} 中的 invokeFunc 函数又执行了 timer 的 invokeFunc 函数

这段代码保证了设置 maxWait 参数后的正确性和时效性

摘自 [探究防抖 (debounce) 和节流 (throttle)](https://github.com/Bowen7/Blog/issues/5)


## 总结
`debounce` 最终返回的是 `debounced` 函数，`debounced` 函数可以多次调用，这里在每次调用时都会更新 `lastCallTime` 时间，也就是调用 `debounced` 的时间，同时对于 `this` 和参数等会做缓存

每次调用都会先判断能不能调用函数 （`shouldInvoke`），如果 可以调用，并且现在也不是处于 `timer` （`timerId === undefined`） 阶段 会调用 `leadingEdge` 函数

`leadingEdge` 函数则会记录调用 `func` 的时间，然后开始定时器的启动 `startTimer`，会判断用户是否指定在延迟开始前调用，如果是直接调用 `invokeFunc` ，否则 返回上一次的结果就行

在 `leadingEdge` 调用 `startTimer` 时，传入的方法是 `timerExpired`

首先 `startTimer` ，就是判断使用 `RAF` 还是 `setTimeout` ，然后对应调用即可

也就是说 在 延迟 `wait` 时间后，会调用 `timerExpired` 方法， 然后判断 是否可以调用函数了，如果可以调用 则调用 `trailingEdge` ， 否则 重置 `timer` ，这里重置 `timer` 时，延时时间要重新进行计算

`trailingEdge` 方法 则会判断是否在到时间后调用方法，然后处理一些逻辑后，调用 `invokeFunc` ， 否则就返回上一次执行的结果

`invokeFunc` 则会拿到一开始缓存的 `this` 和参数，然后调用 `func` ，赋值给 结果，并返回，重置一下 `this` 和 参数

不考虑边界情况，基本逻辑就是这样
## Remark
1. [setTimeout MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。

    返回值
    
    timeoutID 是一个正整数，表示定时器的编号。这个值可以传递给 clearTimeout()来取消该定时器。
2. [requestAnimationFrame MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 告诉浏览器 —— 你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

    返回值
    
   一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
3. [cancelAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/cancelAnimationFrame)
4. [clearTimeout MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowTimers/clearTimeout)
5. [双重非（!!）运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E9%80%BB%E8%BE%91%E9%9D%9E%EF%BC%88!%EF%BC%89)
6. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true。
7. [Function.prototype.apply MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
8. [Date.now() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
## Example
```js

const f = debounce(() => {console.log('debounce')}, 300)

const start = +new Date()
while (+new Date() - start < 200) {
  console.log(1)
  f()
}

/** 
* 1
* 1
* ...
* debounce
*/
```
