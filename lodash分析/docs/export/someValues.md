# someValues

## Description
someValues 和 some 的作用类似，不过 some 遍历的是数组， someValues 针对的是对象。

someValues 接收一个对象 object 和一个断言函数 predicate ，如果对象中只要有一个值能通过 predicate 的检测，则得到结果 true ，如果所有的值都通不过 predicate 检测，则得到 false

## Params
`(object, predicate)`

## Return
`Boolean`

## Code
```js
function someValues(object, predicate) {
  object = Object(object)
  const props = Object.keys(object)

  for (const key of props) {
    if (predicate(object[key], key, object)) {
      return true
    }
  }
  return false
}
```

## Analyze
拿到 `object` 的可枚举属性数组，通过 `for...of` 遍历，调用 `predicate` 函数，如果为真，则返回 `true` 结束遍历，否则，在遍历结束后，返回 `false`

## Example
```js
console.log(someValues(obj, (v) => v>2)) // true
console.log(someValues(obj, (v) => v>4)) // false
```
