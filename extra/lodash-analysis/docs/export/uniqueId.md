# uniqueId

## Description
生成唯一 ID。 如果提供了 prefix ，会被添加到 ID 前缀上。

## Params
`(prefix='$lodash$')`

## Return
`string`

## Code
```js
const idCounter = {}
function uniqueId(prefix='$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id =++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix}${id}`
}
```

## Analyze
使用 `idCounter` 作为 `ID` 的容器，每一个 `prefix` 都有一个独立的ID递增，每次会先判断 当前 `prefix` 有没有值，如果没有值，则初始化为 0

然后生成递增ID,这里使用 `++idCounter[prefix]` ， 如果是默认的 `prefix` ，则直接返回 `id`，否则返回 `prefix` 和 `id` 拼接的字符串

这里 `idCounter` 可以使用 `Object.create(null)`，原型上不会挂载很多东西

## Example
```js
console.log(uniqueId()) // 1
console.log(uniqueId()) // 2
console.log(uniqueId()) // 3
console.log(uniqueId('pre')) // pre1
console.log(uniqueId('fix')) // fix1
console.log(uniqueId('pre')) // pre2
console.log(uniqueId('fix')) // fix2
console.log(uniqueId('pre')) // pre3
console.log(uniqueId('fix')) // fix3
```
