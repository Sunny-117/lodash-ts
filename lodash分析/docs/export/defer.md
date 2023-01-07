# defer 

## Description 
推迟调用 func，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给 func
## Params
`(func, ...args)`
## Return   
`number`

## Code
```js
function defer(func, ...args) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, 1, ...args)
}
```
## Analyze
1. 判断 func 是否为 function，如果不是，则报出类型错误
2. 如果 func 是一个 function，则调用 setTimeout 将其添加进任务队列，在主线程调用完成后，处理任务队列中的任务
3. defer 会返回定时器编号
## Remark
1. [window.setTimeout MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。
2. [并发模型与事件循环 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
3. [彻底吃透 JavaScript 执行机制](https://www.mdeditor.tw/pl/pbMk)
4. [Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)
## Example
```js
defer(() => {console.log('defer')})
console.log('before')
// before
// defer
```
