# createMathOperation

## Description 
创建并返回一个对两个数进行操作的`math`方法（`+、-、*、/` 等）
## Params
`(func, default)`

> {Function} func: 执行操作的函数。
> 
> {Number} default 默认返回值
> 

## Return
`Function`

## Depend
```js
    import baseToNumber from './baseToNumber.js'
    import baseToString from './baseToString.js'
```
> [baseToNumber 源码分析](./baseToNumber.md)
> <br/>
> <br/>
> [baseToString 源码分析](./baseToString.md)
> 


## Code
```js
    function createMathOperation(operator, defaultValue) {
      return (value, other) => {
        if (value === undefined && other === undefined) {
          return defaultValue
        }
        if (value !== undefined && other === undefined) {
          return value
        }
        if (other !== undefined && value === undefined) {
          return other
        }
        if (typeof value === 'string' || typeof other === 'string') {
          value = baseToString(value)
          other = baseToString(other)
        }
        else {
          value = baseToNumber(value)
          other = baseToNumber(other)
        }
        return operator(value, other)
      }
    }
```

## Analyze
1. 对传入的操作方法进行参数判断
2. 如果都为`undefined`，则返回默认值`default`
3. 其中一个为`undefined`，则返回另外一个值
4. 如果存在 `string` 类型的值，则执行 `baseToString` 
5. 否则执行 `baseToNumber`
6. 返回 `operator` 的执行结果

## Remark
主要是对于传入的参数进行了容错处理，并进行了转换

## Example
```js
    add = createMathOperation((a, b) => a + b, 0)
    
    add(3,4) // 7
```
