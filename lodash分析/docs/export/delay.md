# delay 

## Description 
延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给 func。

## Params
`(func, wait, ...args)`
## Return
`number`

## Code
```js
function delay(func, wait, ...args) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  return setTimeout(func, +wait || 0, ...args)
}
```
## Analyze
和 [defer](./defer.md) 基本一致，只不过这里延迟时间改为传入，调用一元正号转为数字
## Remark
1. [window.setTimeout MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 方法设置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。
2. [并发模型与事件循环 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
3. [彻底吃透 JavaScript 执行机制](https://www.mdeditor.tw/pl/pbMk)
4. [Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)
## Example
```js
delay(() => {console.log('delay')}, 2)
defer(() => {console.log('defer')})

// defer
// delay
```
