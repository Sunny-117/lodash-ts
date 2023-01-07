# toNumber 

## Description 
转换 `value` 为一个数字。

## Params
`Value`
## Return
`Number`
## Depend
```js
import isObject from './isObject.js'
import isSymbol from './isSymbol.js'
```
> [isObject 源码分析](./isObject.md)
> <br/>
> <br/>
> [isSymbol 源码分析](./isSymbol.md)
>

## Code
```js
/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt

function toNumber(value) {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }
  if (isObject(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}
```

## Analyze
#### 正则
1. `/^\s+|\s+$/g` , 匹配字符串前后空格

<img :src="$withBase('/assets/reg_toNumber_1.svg')" />

2. `/^[-+]0x[0-9a-f]+$/i`， 匹配有符号的 16 进制数值

<img :src="$withBase('/assets/reg_toNumber_2.svg')" />

3. `/^0b[01]+$/i`， 匹配 2 进制数值

<img :src="$withBase('/assets/reg_toNumber_3.svg')" />

4. `/^0o[0-7]+$/i`， 匹配 8 进制数值

<img :src="$withBase('/assets/reg_toNumber_4.svg')" />

#### 分析
1. 如果传入的 `value` 本身 `typeof` 就为 `number` 则直接返回
2. 如果传入的 `value` 是 `symbol` 类型，返回 `NaN`
3. 如果传入的 `value` 为 `object`，首先判断 `typeof value.valueOf` 是不是 `function`，判断 value 的 `prototype` 是否含有 `valueOf` 方法 （`typeof` 运算符等级高于 `===`），如果是就使用 `value.valueOf` ,否则就使用 `value`。**在这里有一点 `typeof value.valueOf` 和 `typeof value.valueOf()` 是两个概念** , 前者是判断 `value` 的属性 `valueOf` 是什么类型（在 `toNumber` 中就是判断 是否含有 `valueOf` 函数），后者是针对于 `value.valueO` 的执行结果进行 `typeof`。只有在 `value` 本身为 function 的情况下 `typeof value.valueOf === typeof value.valueOf()` 为 `true`
4. 继续进行 `isObject` 的判断，如果是 `object`，则直接转为 `string`， 否则就等于 `other` ，此时 `other` 都是基本类型
5. 针对 `value` 本身不是 `string` 的情况进行处理，如果 `value` 本身为 0 ，则返回 `value` ，否则调用一元正号转换为 `Number`，这里不直接处理 string 是因为 `value` 有可能为 <code>\`${other}\`</code> 生成的字符串，此时如果 `other` 为 `object` ，这时 `value` 就是 `'[object Object]'`,直接使用 **一元正号** 进行转换的话，会返回 `NaN`
6. 去除 `value` 前后的空格
7. 首先判断 传入的 `value` 是否符合 二进制和八进制 规则，如果符合，则调用原生 `parseInt` 进行处理，第一个参数传入了 `value.slice(2)`, 第二个参数则根据二进制和八进制传入了对应了数值
8. 如果是负的十六进制的数值，直接返回 `NaN`, 否则调用 **一元正号** 转为数字

## Remark
1. [valueOf MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)

| 对象 | 返回值 |
| -- | -- |
| Array | 返回数组对象本身 |
| Boolean | 布尔值 |
| Date | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC |
| Function | 函数本身 |
| Number | 数字值 |
| Object | 对象本身。这是默认情况 |
| String | 字符串值 |
|  | Math 和 Error 对象没有 valueOf 方法。 |

2. [关于负十六进制的修改](https://github.com/lodash/lodash/pull/1577/commits/1c6de59e3112996ee93c0d8fd1b447f569f8bd21#diff-36b7ba0ba252cc39fa5921d9484b7674c8bc7af119636ba7f46194ee871047b6R9807)
3. [一元正号 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7)
4. [一元正号 ECMA](https://262.ecma-international.org/6.0/#sec-unary-plus-operator-runtime-semantics-evaluation)
5. 一元正号运算符位于其操作数前面，计算其操作数的数值，如果操作数不是一个数值，会尝试将其转换成一个数值。 尽管一元负号也能转换非数值类型，但是一元正号是转换其他对象到数值的最快方法，也是最推荐的做法，因为它不会对数值执行任何多余操作。它可以将字符串转换成整数和浮点数形式，也可以转换非字符串值 `true`，`false` 和 `null`。小数和十六进制格式字符串也可以转换成数值。负数形式字符串也可以转换成数值（对于十六进制不适用）。如果它不能解析一个值，则计算结果为 `NaN`。

<img :src="$withBase('/assets/toNumber_1.png')" />

6. 关于 `lodash` 的 `toNumber` 方法，按照现在 `toNumber` 的处理逻辑来看， 传入 `'0xf'` `'0b1'` `'0o7'` 都是可以正常转换的，如果我们输入 `'-0xf'`，会走正则匹配然后返回 `NaN` 逻辑，我们如果输入 `'-0b1'` `'-0o7'` 这种，到最后会走到 `+value` 的逻辑，进行 **一元正号** 的转换，一元正号对于 `'-0b1'` 这种转换不符合 第5条说的情况，会返回 `NaN` 。 如果使用原生 `parseInt`  ，则是会返回 `0` ， 原生 `parseInt` 对于正负十六进制，都可以进行有效的转换,如下
  
> 1. 如果输入的 string 以 "0x"或"0x"（一个 0，后面是小写或大写的 X）开头，那么 radix 被假定为 16，字符串的其余部分被当做十六进制数去解析。
> 2. 如果输入的 string 以 "0"（0）开头， radix 被假定为 8（八进制）或 10（十进制）。具体选择哪一个 radix 取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
> 3. 如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。
>

对于 二进制和八进制 ，在去掉前缀后 parseInt 也可以进行有效的转换 

```js
parseInt('-10', 2) // -2
parseInt('10', 2) // 2
```

这里有一点需要注意，parseInt 第一个参数需要传入的是 `String` 类型的值

```js
parseInt(0xf, 16) // 21
parseInt('0xf', 16) // 15
```

可以看出来对于不加引号的值，得到的结果不是我们想要的结果，是因为

> 要被解析的值。如果参数不是一个字符串，则将其转换为字符串 (使用  ToString 抽象操作)。字符串开头的空白符将会被忽略。
>

`parseInt(0xf, 16)` 等同于下
```js
(0xf).toString() // '15'  在这里隐式的转换，默认的 radix 就是 10 进制
parseInt('15', 16) // 21
```


7. [parseInt MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
8. [Number.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)


## Example
```js
toNumber(3.2) // => 3.2

toNumber(Number.MIN_VALUE) // => 5e-324

toNumber(Infinity) // => Infinity

toNumber('3.2') // => 3.2

toNumber('0xf') // => 15

toNumber('0b10') // => 2

toNumber('-0xf') // => NaN
```
