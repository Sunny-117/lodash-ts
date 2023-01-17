# strictLastIndexOf

## Description
strictLastIndexOf 和 [strictIndexOf](./strictIndexOf.md) 的作用类似，都是找出指定的某个值在数组中的 index，所不同的是，strictIndexOf 是从左向右遍历，strictLastIndexOf 则是从右向左遍历。
## Params
`(array, value, fromIndex)`
## Return
`Number`

## Code
```js
function strictLastIndexOf(array, value, fromIndex) {
  let index = fromIndex + 1
  while (index--) {
    if (array[index] === value) {
      return index
    }
  }
  return index
}
```
## Analyze
这里的逻辑和 [strictIndexOf](./strictIndexOf.md) 基本一致，不过就是从 `formIndex + 1` 开始循环，循环结束条件为 `index--` ，即先使用 `index` 判断 `while` 循环，再 `--` 到循环体内部使用（操作符放在操作数的后面 (如，x--)，运算会减一，然后返回减一之前的值），所以一开始要 `+1`，因为每次进循环体时都已经 `-1` 了，这样到最后一次，`index` 为 `1`，`while` 循环可以过，然后进入循环体，`index--` 之后为0，如果找不到的情况下，为 `0` 的 `index` 再次 `--` ，为 `-1`，返回
## Remark
[自减-- MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Decrement)

如果使用后缀式，即将操作符放在操作数的后面 (如，x--)，运算会减一，然后返回减一之前的值。

如果使用前缀式，即将操作符放在操作数的前面 (如，--x)，运算会减一，然后返回减一之后的值。
## Example
```js
console.log(strictLastIndexOf([1,2,3,4,5], 1, 4)) // 0
```
