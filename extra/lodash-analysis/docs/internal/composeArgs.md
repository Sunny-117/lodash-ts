# composeArgs

## Description
创建一个数组，该数组由部分应用的参数，占位符和提供的参数组成
## Params
`(args, partials, holders, isCurried)`
> {Array} args - 提供的参数。
> 
> {Array} partials - 在提供的参数之前添加的参数。
> 
> {Array} holders - `partials' 占位符索引
> 
> {boolean} [isCurried] - 为curry过的函数指定合成。
## Return
`Array`

## Code
```js
function composeArgs(args, partials, holders, isCurried) {
  const argsLength = args.length
  const holdersLength = holders.length
  const leftLength = partials.length

  let argsIndex = -1
  let leftIndex = -1
  let rangeLength = Math.max(argsLength - holdersLength, 0)

  const result = new Array(leftLength + rangeLength)
  const isUncurried = !isCurried

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex]
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex]
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++]
  }
  return result
}
```
## Analyze
1. 首先 `holders` 是占位的，传入的数组元素是索引值
2. `rangeLength` 根据 `args` 的 `length` 和 `holders` 的 `length` ，算出差值，和 0 取较大的值
3. 紧接着 `while` 循环，将 `partials` 的值 一一对应放到 `result` 中
4. 接下来处理 `holders` ，如果没有传入 `isCurried` 或者 `argsIndex < argsLength` ， 都会将 `holders` 中对应下标的索引值拿出来，当做 `result` 的索引，然后将当前索引的值设置为 `args` 中对应的值
5. 处理 `args` 的长度 大于 `holders` 的情况。如果符合条件，那么将最后多出来的元素，也补充进去。这里使用的是 `leftIndex` ，而不是 `argsIndex` 作为索引，是因为 第四步的时候，做的只是替换，而不是新增

## Example
```js
console.log(composeArgs([1,2,3], [4,5,6,7,8,9], [4,5])) // [4, 5, 6, 7, 1, 2, 3]
console.log(composeArgs([1,2,3], [4,5,6,7,8,9], [0,1])) // [1, 2, 6, 7, 8, 9, 3]
```
