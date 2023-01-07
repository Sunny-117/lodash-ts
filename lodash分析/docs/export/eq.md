# eq 

## Description 
执行 [SameValueZero](https://262.ecma-international.org/6.0/#sec-samevaluezero) 比较两者的值，来确定它们是否相等
## Params
`(value, other)`
> value : 要比较的值
>
> other ： 另一个要比较的值
>


## Return
`Boolean`

## Code
```js
function eq(value, other) {
  return value === other || (value !== value && other !== other)
}
```
## Analyze
1. 整个 `eq` 方法就只有一行代码，执行 [SameValueZero](https://262.ecma-international.org/6.0/#sec-samevaluezero) 规范
2. 首先 `value === other`， 符合 [Strict Equality Comparison](https://262.ecma-international.org/7.0/#sec-strict-equality-comparison) 规范
3. Strict Equality Comparison 和 SameValueZero 两者只有在 `NaN` 的处理上有不同，所以就有了 `value !== value && other !== other`
4. 在 `JavaScript` 中 只有 `NaN` 和自身是不相等的，所以 在这里 如果传入的是 `NaN`, 则返回 `true`
## Remark
1. [关于JavaScript中的一些对比规范](../other/same.md)
2. 使用 其他方法 也可以判断两个值是否相等，

[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 方法判断两个值是否为同一个值。如果满足以下条件则两个值相等:

1. 都是 `undefined`
2. 都是 `null`
3. 都是 `true` 或 `false`
4. 都是相同长度的字符串且相同字符按相同顺序排列
5. 都是相同对象（意味着每个对象有同一个引用）
6. 都是数字且
    - 都是 `+0`
    - 都是 `-0`
    - 都是 `NaN`
    - 或都是非零而且非 `NaN` 且为同一个值
    
与 `==` 运算不同。  `==` 运算符在判断相等前对两边的变量 (如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" `==` `false` 判断为 `true`), 而 `Object.is` 不会强制转换两边的值。

与 `===` 运算也不相同。 `===` 运算符 (也包括 `==` 运算符) 将数字 `-0` 和 `+0` 视为相等 ，而将 `Number.NaN` 与 `NaN`视为不相等.


SameValueZero 对于 `+0` 和 `-0` 返回的是 `true`，而 `Object.is` 对于 `+0` 和 `-0` 返回的是 `false`，所以 `eq` 不能直接用 `Object.is` 代替， 可改成如下

```js
function eq(value, other) {
  return value === other || Object.is(value, other)
}
``` 

[isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 来检测是否为 NaN 也是不可用的，因为

如果 `isNaN` 函数的参数不是 `Number` 类型， `isNaN` 函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是 `NaN` 进行判断。因此，对于能被强制转换为有效的非 `NaN` 数值来说（空字符串和布尔值分别会被强制转换为数值 0 和 1），返回 `false` 值也许会让人感觉莫名其妙。比如说，空字符串就明显 “不是数值（not a number）”。这种怪异行为起源于："不是数值（not a number）" 在基于 IEEE-754 数值的浮点计算体制中代表了一种特定的含义。`isNaN` 函数其实等同于回答了这样一个问题：被测试的值在被强制转换成数值时会不会返回 IEEE-754​中所谓的 “不是数值（not a number）”


使用 [Number.isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 可以来判断是否 为 `NaN`

和全局函数 `isNaN()` 相比，`Number.isNaN()` 不会自行将参数转换成数字，只有在参数是值为 `NaN` 的数字时，才会返回 `true`。


因此 `eq` 也可以写成如下

```js
function eq(value, other) {
  return value === other || (Number.isNaN(value) && Number.isNaN(other))
}
```
## Example
```js
const object = { 'a': 1 }
const other = { 'a': 1 }

eq(object, object) // => true

eq(object, other) // => false

eq('a', 'a') // => true

eq('a', Object('a')) // => false

eq(NaN, NaN) // => true
```
