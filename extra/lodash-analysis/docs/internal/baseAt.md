# baseAt

## Description 
[`lodash at`](../export/at.md) 的基本实现， `baseAt` 可以根据指定的一组属性路径 `paths`(`Array`)，从 `object` 中取出属性路径对应的一组值。
## Params
`(object, paths)`
> {Object} object: 源对象
>
> {string[]} paths: 路径数组
>

## Return
`Array`
> 返回取到的值的数组，下标和 `paths` 一一对应
>

## Depend
```js
import get from '../get.js'
```
> [get 源码分析](../export/get.md)


## Code
```js
function baseAt(object, paths) {
  let index = -1
  const length = paths.length
  const result = new Array(length)
  const skip = object == null

  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index])
  }
  return result
}
```

## Analyze
1. 定义 `index` 为 `-1`， 获取到 `paths` 的 `length`， 定义 `result` 数组， 判断 `object` 是否为 `null`
2. 使用 `while` 循环遍历获取 `object` 的值，并 `push` 到 `result` 中
3. 如果 `object` 为 `null` ，则值为 `undefined` ， 否则使用 `get` 方法，获取对应下标的 `path` 对应的值

## Remark
1. [自增(++) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Increment)
2. 
   > with i++, before you can increment i under the hood a new copy of i must be created. Using ++i you don't need that extra copy. i++ will return the current value before incrementing i. ++i returns the incremented version i.
   >
   > 使用i++，在对i进行增量操作之前，必须先创建i的新副本。
   > 使用++i，你不需要那份额外的副本。
   > i++将返回i加1之前的当前值。

3. [ECMA 自增](https://tc39.es/ecma262/#sec-postfix-increment-operator-runtime-semantics-evaluation)
4. 关于第二点，`++i` 和 `i++` 的性能问题，在搜索了好久之后，并没有得到一个统一的答复，性能问题的回答都是说要区分语言，在 `js` 中，最多的回答是说来自于一篇文章 [http://jsperf.com/i-vs-i/2](http://jsperf.com/i-vs-i/2) ,第二点也就是这篇文章的引用， 但是打开时链接失效了， `502`， 对比了看了一下 `ecmascript` 的标准实现，发现 `i++` 和 `++i`在实现上并没有什么不同。所以关于性能问题，可以在查找一些其他资料进行学习

<br/>
<br/>

<img  :src="$withBase('/assets/baseAt_1.png')" />

5. 参考回答 [Is there a performance difference between i++ and ++i in JavaScript?](https://stackoverflow.com/questions/12504765/is-there-a-performance-difference-between-i-and-i-in-javascript)
6. 参考回答 [Is there a performance difference between i++ and ++i in C?](https://stackoverflow.com/questions/24886/is-there-a-performance-difference-between-i-and-i-in-c)

## Example
```js
var a = {
  b: {
    c: {
      d: 1
    },
    e: 2
  },
  g: {
    h: 3
  }
}

console.log(baseAt(a, ['b.c.d', 'b[e]', 'g["h"]'])) // [1, 2, 3]
```
