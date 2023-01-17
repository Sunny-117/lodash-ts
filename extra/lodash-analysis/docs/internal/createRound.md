# createRound 

## Description 
创建一个类似于 [`round`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round) 的函数
## Params
`methodName` -- 四舍五入时使用的 `Math` 方法的名称
## Return
`Function`

## Code
```js
function createRound(methodName) {
  const func = Math[methodName]
  return (number, precision) => {
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = func(`${pair[0]}e${+pair[1] + precision}`)

      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    return func(number)
  }
}
```
## Analyze
1. 首先定义 `func = Math[methodName]` ，拿到传入的 `Math` 方法
2. 对于精度的处理
```js
 precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))

  // 在JS中,最大值和 1e292 相加 会得到 Infinity
 Number.MAX_VALUE+1e292; //Infinity

```
所以，如果传入了 `precision` ，进行判断，大于等于0 时，取 `precision` 和 `292` 中最小值，反之取 `precision` 和 `-292` 中最大值

3. 如果精度为 `0` ，则直接调用 `Math` 的方法，不进行其他处理
4. 对于 `Math` 调用，`Math` 只能处理到整数部分，需要单独处理高精度的数值，这里和 `Math.round` MDN 中处理方式一致，进行了一个 **数值转换**
5. 对数字进行了一个变换的操作，如果传入的 `precision` 为 **正数** ，则对数字是先进行了放大，如果传入的 `precision` 是 **负数** ，则是对数字先进行了缩小
```js
    let pair = `${number}e`.split('e')
    const value = func(`${pair[0]}e${+pair[1] + precision}`)
```

6. 变换完成后在调用 `Math` 方法进行数值的处理，在得到结果后，对于结果再次进行一次变换，还原回正确需要的数值，使用 **一元正号（+）** 转换为数值类型，和第五步是相反的操作
```js
    pair = `${value}e`.split('e')
    return +`${pair[0]}e${+pair[1] - precision}`
```
   

## Remark
1. [JavaScript 数字类型](https://github.com/javascript-tutorial/zh.javascript.info/blob/master/1-js/05-data-types/02-number/article.md)
2. [一元正号 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7)
3. [round MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
4. [IEEE_754 标准](https://zh.wikipedia.org/wiki/IEEE_754)
4. 使用 `'e'` 来表示科学计数法，e.g: `1.03e3 = 1030`
## Example
```js

const round = createRound('round')
round(3.004, 2) // 3
round(3.005, 2) // 3.01
round(3.0045, 2) // 3
round(3.0045, 3) // 3.005
round(3.0045, -1) // 0
round(30045, -1) // 30050
```
