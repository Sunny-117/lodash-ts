# clamp 

## Description 
返回限制在 `lower` 和 `upper` 之间的值。
## Params
`(number, lower, upper)`
> {Number} number
>
> {Number} lower 下限
>
> {Number} upper 上限
>
 
## Return
`Number`

## Code
```js
function clamp(number, lower, upper) {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}
```
## Analyze
1. 首先 **一元正号** 转为数字
2. 三等判断，这里是为了去除 `NaN` , `NaN` 转为了 0
3. 三等判断 `number === number`，也是为了判断 `NaN`,如果是 `NaN` 直接就返回 `NaN`
4. 在这里进行处理的时候，保证了 '最小值'，没有保证 '最大值'，也就是说，在调用 `clamp` 时，如果传入参数依次为， `10`，`20`，`5` ，最终返回的结果为 `20`（'最小值'）
5. 三目运算判断，如果小于最大值，则不变，否则等于最大值
6. 三目运算判断，如果大于最小值，则不变，否则等于最小值
## Remark
1. [三元运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
2. [一元正号 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7)
3. [一元正号 ECMA](https://262.ecma-international.org/6.0/#sec-unary-plus-operator-runtime-semantics-evaluation)
4. [NaN MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

## Example
```js
clamp(-10, -5, 5) // => -5

clamp(10, -5, 5) // => 5
```
