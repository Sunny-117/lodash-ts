# composeArgsRight

## Description
类似于 [composeArgs](./composeArgs.md) ,不同之处在于，参数组合是针对partialRight量身定制的。
## Params
`(args, partials, holders, isCurried)`
## Return
`Array`

## Code
```js
function composeArgsRight(args, partials, holders, isCurried) {
  let argsIndex = -1
  let holdersIndex = -1
  let rightIndex = -1

  const argsLength = args.length
  const holdersLength = holders.length
  const rightLength = partials.length
  const rangeLength = Math.max(argsLength - holdersLength, 0)
  const result = new Array(rangeLength + rightLength)
  const isUncurried = !isCurried

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex]
  }
  const offset = argsIndex
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex]
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++]
    }
  }
  return result
}
```
## Analyze
整体处理逻辑和 [composeArgs](./composeArgs.md) 类似，不同在于，先处理了 `args` 和 `holders` 的差值

紧接着 拿到偏移量，又处理了 `partials`

最后，也是根据偏移量和 `holders` 每个元素的值，进行了替换

## Example
```js
console.log(composeArgsRight([1,2,3], [4,5,6,7,8,9], [4,5])) // [1, 4, 5, 6, 7, 2, 3]
console.log(composeArgsRight([1,2,3], [4,5,6,7,8,9], [0,1])) // [1, 2, 3, 6, 7, 8, 9]
```
