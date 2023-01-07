# castArray 

## Description 
如果 `value` 不是数组，那么强制转为数组
## Params
`Value`
## Return
`Array`

## Code
```js
function castArray(...args) {
  if (!args.length) {
    return []
  }
  const value = args[0]
  return Array.isArray(value) ? value : [value]
}
```
## Analyze
1. 如果没有传入参数，则直接返回空数组
2. 取传入参数的第一个
3. 如果传入参数第一个本身就是一个 `Array`, 则直接返回 `arg[0]` , 否则返回 `[arg[0]]`
## Remark
1. [Array MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
2. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)
## Example
```js
castArray(4, [1,2]) // [4]
castArray([1,2], 3) // [1, 2]
castArray('A', 3) // ['A']
```
