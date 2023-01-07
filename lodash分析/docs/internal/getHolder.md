# getHolder

## Description
获取`func`的参数占位符值。 placeholder
## Params
`(func)`
## Return
`{*}`

## Code
```js
function getHolder(func) {
  const object = func
  return object.placeholder
}
```
## Analyze
就是拿到 placeholder 的值，并返回

## Example
```js
const func = () => {}
func.placeholder = 'test'

console.log(getHolder(func)) // test
```
