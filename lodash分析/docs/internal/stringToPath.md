# stringToPath

## Description 
`stringToPath` 作用是将深层嵌套属性字符串转换成路径数组，即将类似于 `a.b.c` 这样的字符串，转换成 ['a', 'b', 'c'] 这样的数组，方便 `lodash` 从数组中将属性一个一个取出，然后取值。
## Params
`string`

## Return
`Array`

## Depend
```js
    import memoizeCapped from './memoizeCapped.js'
```

>[memoizedCapped 源码分析](./memoizeCapped.md)

## Code
```js
    const charCodeOfDot = '.'.charCodeAt(0)
    const reEscapeChar = /\\(\\)?/g
    const rePropName = RegExp(
      // Match anything that isn't a dot or bracket.
      '[^.[\\]]+' + '|' +
      // Or match property names within brackets.
      '\\[(?:' +
        // Match a non-string expression.
        '([^"\'][^[]*)' + '|' +
        // Or match strings (supports escaping characters).
        '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
      ')\\]'+ '|' +
      // Or match "" as the space between consecutive dots or empty brackets.
      '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
      , 'g')
      
      const stringToPath = memoizeCapped((string) => {
      const result = []
      if (string.charCodeAt(0) === charCodeOfDot) {
        result.push('')
      }
      string.replace(rePropName, (match, expression, quote, subString) => {
        let key = match
        if (quote) {
          key = subString.replace(reEscapeChar, '$1')
        }
        else if (expression) {
          key = expression.trim()
        }
        result.push(key)
      })
      return result
    })
```

## Analyze
#### Regexp
```js
const rePropName = /[^.[\]]+|\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/
```

<img :src="$withBase('/assets/reg_stringToPath_complete.png')" />

> [Regexp 分析](https://regex101.com/r/0nt7oQ/1/)
>

**正则可以分为三块来看**

1. `[^.[\]]+`

<img  :src="$withBase('/assets/reg_stringToPath_1.svg')" />

匹配除 `.`, `[`, `]` 意外的字符一次或者更多次

> a.b.c

 

> `[^xyz]`
>
>  一个反向字符集。也就是说， 它匹配任何没有包含在方括号中的字符。你可以使用破折号（-）来指定一个字符范围。任何普通字符在这里都是起作用的。
> <br/>
> <br/>
> 例如，[^abc] 和 [^a-c] 是一样的。他们匹配 "brisket" 中的‘r’，也匹配 “chop” 中的‘h’

2. `\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]`

<img width="300"  :src="$withBase('/assets/reg_stringToPath_2.svg')" />

> a[0].b

第二部分可以接着进行拆分

> `?:x`
>
> 匹配 `'x'` 但是不记住匹配项。这种括号叫作非捕获括号，使得你能够定义与正则表达式运算符一起使用的子表达式。看看这个例子 `/(?:foo){1,2}/`。如果表达式是 `/foo{1,2}/`，`{1,2}` 将只应用于 `'foo'` 的最后一个字符 `'o'`。如果使用非捕获括号，则 `{1,2}` 会应用于整个 `'foo'` 单词。
>

- `([^"'][^[]*)`

<img  :src="$withBase('/assets/reg_stringToPath_2_1.svg')" />

匹配 "空字符串"(非字符串表达式)

- `(["'])`

<img  :src="$withBase('/assets/reg_stringToPath_2_2.svg')" />

匹配 `"`, `'`


> [xyz]
>
> 一个字符集合。匹配方括号中的任意字符，包括转义序列。你可以使用破折号（-）来指定一个字符范围。对于点（.）和星号（*）这样的特殊符号在一个字符集中没有特殊的意义。他们不必进行转义，不过转义也是起作用的。
  例如，[abcd] 和 [a-d] 是一样的。他们都匹配 "brisket" 中的‘b’, 也都匹配 “city” 中的‘c’。/[a-z.]+/ 和 /[\w.]+/ 与字符串 “test.i.ng” 匹配。
>

-  `(["'])((?:(?!\2)[^\\]|\\.)*?)\2`

<img  :src="$withBase('/assets/reg_stringToPath_2_3.svg')" />

匹配字符串，支持转移字符

> \2 代表第二个 ()
> <br/>
> <br/>
> `x(?!y)`
>
> 仅仅当 'x' 后面不跟着 'y' 时匹配 'x'，这被称为正向否定查找。
> <br/>
> <br/>
> 例如，仅仅当这个数字后面没有跟小数点的时候，/\d+(?!\.)/ 匹配一个数字。正则表达式 /\d+(?!\.)/.exec ("3.141") 匹配‘141’而不是‘3.141’


3. `(?=(?:\.|\[\])(?:\.|\[\]|$))`

<img  :src="$withBase('/assets/reg_stringToPath_3.svg')" />

> .......    [][][][]
>

获取连续的 `.` 或者连续的 `[]` 中的间隔

<img  :src="$withBase('/assets/reg_stringToPath_3_1.png')" />


> x(?=y)
> <br/>
> <br/>
> 匹配 'x' 仅仅当 'x' 后面跟着 'y'. 这种叫做先行断言。
> <br/>
> <br/>
> 例如，/Jack (?=Sprat)/ 会匹配到 'Jack' 仅当它后面跟着 'Sprat'。/Jack (?=Sprat|Frost)/ 匹配‘Jack’仅当它后面跟着 'Sprat' 或者是‘Frost’。但是‘Sprat
’和‘Frost’都不是匹配结果的一部分。
>
>

#### 处理以 `.` 开头的字符串
```js
    const charCodeOfDot = '.'.charCodeAt(0)
    const result = []
    if (string.charCodeAt(0) === charCodeOfDot) {
      result.push('')
    }
```
以 `.` 开头的字符串，`lodash` 会 `push` 一个空字符串。

#### 处理常规路径，如 `a.b.c`
 `a.b.c` 会匹配到 `[^.[\]]+` 正则，匹配3次，拿到 `a`、`b`、`c`，代码逻辑简化如下
 
```js
    string.replace(rePropName, (match) => {
      let key = match
      result.push(key)
    })
```

#### 处理中括号取值，如 `a['b'].c`、`a[0].b`
`a[0].b` 和 `a['b'].c` 会匹配到 `\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]`， 代码逻辑简化如下

```js
string.replace(rePropName, (match, expression, quote) => {
  let key = match
  if (quote) {
      key = subString.replace(reEscapeChar, '$1')
  }
  else if (expression) {
    key = expression.trim()
  }
  result.push(key)
})
```
`a[0].b` 匹配时
1. 此时 `key` 匹配到 `match` 为 `[0]`
2. 但是 `expression` _(触发`([^"'][^[]*)`正则)_  为 `0`
3. 所以最终结果为 `0`,返回 `a`、`0`、`b`


`a['b'].c` 匹配时
1. 此时 `key` 匹配到 `match` 为 ['b'] 
2. 触发 `quote` _(触发`(["'])`正则)_  判断
3. 此时 `subString`   _(触发`((?:(?!\2)[^\\]|\\.)*?)`正则)_  为 `'b'`
4. 如果是转义字符 如：`a[\'\\b\'].d"`,此时 `subString` 就为 `\b`,此时调用 `replace` 方法，去除掉转义，返回 `b`

#### 最终会返回结果数组

## Remark
1. [String.prototype.replace() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace#%E6%8C%87%E5%AE%9A%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0)
2. [正则表达式 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
3. [老姚的正则表达式mini GitHub](https://github.com/qdlaoyao/js-regex-mini-book)
4. <a download target="_blank" :href="$withBase('/assets/JavaScript正则表达式迷你书（1.1版）.pdf')">JavaScript正则表达式mini 1.1</a>

## Example
```js
stringToPath("a[b].c") // [ 'a', 'b', 'c' ]
stringToPath("a[b][c].d") // [ 'a', 'b', 'c', 'd' ]
stringToPath("a[\'b\'][c].d") // [ 'a', 'b', 'c', 'd' ]
stringToPath("a[\'\\b\']['c'].d") // [ 'a', 'b', 'c', 'd' ]
stringToPath("a.b.c[d]") // [ 'a', 'b', 'c', 'd' ]
stringToPath("['a']['b'].c['d']") // [ 'a', 'b', 'c', 'd' ]
```

[stringToPath Test](https://codesandbox.io/s/lodash-stringtopath-mmv28?file=/src/App.js)
