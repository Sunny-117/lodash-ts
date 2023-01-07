# same 

## [SameValueNonNumber](https://262.ecma-international.org/7.0/#sec-samevaluenonnumber) 
这个规范规定比较的值 x 和 y 都不为 Number 类型，规范如下：

1. x 的类型不为 Number 类型
2. y 的类型与 x 的类型一致
3. 如果 x 的类型为 Undefined ，返回 true
4. 如果 x 的类型为 Null ，返回 true
5. 如果 x 的类型为 String，并且 x 和 y 完全相同的代码单元序列 (相同的长度和相应索引处相同的代码单元) ，则返回 true; 否则返回 false
6. 如果 x 的类型为 Boolean ，并且 x 和 y 同为 true 或同为 false ，返回 true，否则返回 false
7. 如果 x 的类型为 Symbol ，并且 x 和 y 具有相同的 Symbol 值，返回 true，否则返回 false
8. 如果 x 和 y 指向同一个对象，返回 true， 否则返回 false

## [Strict Equality Comparison](https://262.ecma-international.org/7.0/#sec-strict-equality-comparison)
JavaScript 中的全等（===）遵循这个规范，：

1. 如果 x 和 y 的类型不同，返回 false
2. 如果 x 的为 Number 类型：
    - 如果 x 为 NaN ，返回 false
    - 如果 y 为 NaN ，返回 false
    - 如果 x 和 y 的数值一致，返回 true
    - 如果 x 为 +0 并且 y 为 -0 ，返回 true
    - 如果 x 为 -0 并且 y 为 +0 ，返回 true
    - 返回 false
3. 按照 SameValueNonNumber 的结果返回

## [SameValue](https://262.ecma-international.org/7.0/#sec-samevalue)
内部比较抽象操作 SameValue (x，y) ，其中 x 和 y 是 ECMAScript 语言值，生成 true 或 false。规范如下：

1. 如果 x 和 y 的类型不同，返回 false
2. 如果 x 的类型为 Number
    - 如果 x 为 NaN 并且 y 为 NaN ，返回 true
    - 如果 x 为 +0 并且 y 为 -0 ，返回 false
    - 如果 x 为 -0 并且 y 为 +0 ， 返回 false
    - 如果 x 和 y 的数值一致，返回 true
    - 返回 false
3. 按照 SameValueNonNumber 的结果返回

## [SameValueZero](https://262.ecma-international.org/7.0/#sec-samevaluezero)
1. 如果 x 和 y 的类型不同，返回 false
2. 如果 x 的类型为 Number
    - 如果 x 为 NaN 并且 y 为 NaN ，返回 true
    - 如果 x 为 +0 并且 y 为 -0 ，返回 true
    - 如果 x 为 -0 并且 y 为 +0 ， 返回 true
    - 如果 x 和 y 的数值一致，返回 true
    - 返回 false
3. 按照 SameValueNonNumber 的结果返回
> SameValueZero 与 SameValue 的区别仅在于它对 + 0 和 - 0 的处理

## [Abstract Equality Comparison](https://262.ecma-international.org/7.0/#sec-abstract-equality-comparison) 
标准相等操作符 (== and !=)
1. 如果 x 和 y 的类型相同，会返回 Strict Equality Comparison 的执行结果
2. 如果 x 为 null ， y 为 undefined ，返回 true
3. 如果 x 为 undefined， y 为 null ，返回 true
4. 如果 x 是 Number，y 是 String，则将 y 转为 Number，x y 进行比较，返回比较结果
5. 如果 x 是 String，y 是 Number，则将 x 转为 Number，x y 进行比较，返回比较结果
6. 如果 x 是 Boolean，则将 x 转为 Number，x y 进行比较，返回比较结果
7. 如果 y 是 Boolean，则将 y 转为 Number，x y 进行比较，返回比较结果
8. 如果 x 是 String、 Number 或 Symbol，y 是 Object，将 y 转为原始类型，x y 进行比较，返回比较结果
9. 如果 x 是 Object，y 是 String、 Number 或 Symbol，将 x 转为原始类型，x y 进行比较，返回比较结果
10. 返回 false


## 特别的一点
`>` `<` `>=` `<=` 并不适用于上述规则
```js
null > 0 // false
null >= 0 // true
```
那么下一个问题，
```js
null == 0
```
返回的结果应该是什么

答案是 `false`

在 `null > 0` 的判断中， js 尝试将 `null` 转换为 数字，也就是 0 ，此时 `0 > 0` 是 `false`
在 `null >= 0` 的判断中，也是如此，会转为 0，所以 `null >= 0` 是 `true`

但是 `null == 0`,并不适用此转换规则

`>` `<` `>=` `<=` 适用 [Abstract Relational Comparison](https://tc39.es/ecma262/#sec-abstract-relational-comparison) ,简单翻译就是

1. 首先，使用 Symbol.ToPrimitive 将对象转换为原始值
2. 如果两个值都是字符串，则根据它们所包含的 Unicode码点 的值，将它们作为字符串进行比较。
3. 否则 JavaScript 会尝试将非数字类型转换为数值。
   - 布尔值 tru e和 false 分别转换为 1 和 0。
   - null 被转换为 0
   - undefined 被转换为 NaN。
   - 字符串根据其包含的值进行转换，如果不包含数值，则转换为 NaN。
4. 如果任何一个值是 NaN，运算符返回 false。
5. 否则，数值将作为数值进行比较。


## == 和 ===

`===`
- 如果操作数的类型不同，则返回 false。
- 如果两个操作数都是对象，只有当它们指向同一个对象时才返回 true。
- 如果两个操作数都为 null，或者两个操作数都为 undefined，返回 true。
- 如果两个操作数有任意一个为 NaN，返回 false。
- 否则，比较两个操作数的值：
   - 数字类型必须拥有相同的数值。+0 和 -0 会被认为是相同的值。
   - 字符串类型必须拥有相同顺序的相同字符。
   - 布尔运算符必须同时为 true 或同时为 false。

全等运算符与相等运算符（==）最显著的区别是，如果操作数的类型不同，`==` 运算符会在比较之前尝试将它们转换为相同的类型

<table class="standard-table">
 <thead>
  <tr>
   <th scope="row"></th>
   <th colspan="7" scope="col" style="text-align: center;">被比较值 B</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <th scope="row"></th>
   <td></td>
   <td style="text-align: center;">Undefined</td>
   <td style="text-align: center;">Null</td>
   <td style="text-align: center;">Number</td>
   <td style="text-align: center;">String</td>
   <td style="text-align: center;">Boolean</td>
   <td style="text-align: center;">Object</td>
  </tr>
  <tr>
   <th colspan="1" rowspan="6" scope="row"> 被比较值 A</th>
   <td>Undefined</td>
   <td style="text-align: center;">true</td>
   <td style="text-align: center;">true</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">IsFalsy(B)</td>
  </tr>
  <tr>
   <td>Null</td>
   <td style="text-align: center;">true</td>
   <td style="text-align: center;">true</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">IsFalsy(B)</td>
  </tr>
  <tr>
   <td>Number</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">A === B</td>
   <td style="text-align: center;">A === ToNumber(B)</td>
   <td style="text-align: center;">A=== ToNumber(B) </td>
   <td style="text-align: center;">A== ToPrimitive(B)</td>
  </tr>
  <tr>
   <td>String</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">ToNumber(A) === B</td>
   <td style="text-align: center;">A === B</td>
   <td style="text-align: center;">ToNumber(A) === ToNumber(B)</td>
   <td style="text-align: center;">ToPrimitive(B) == A</td>
  </tr>
  <tr>
   <td>Boolean</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">false</td>
   <td style="text-align: center;">ToNumber(A) === B</td>
   <td style="text-align: center;">ToNumber(A) === ToNumber(B)</td>
   <td style="text-align: center;">A === B</td>
   <td style="text-align: center;">ToNumber(A) == ToPrimitive(B)</td>
  </tr>
  <tr>
   <td>Object</td>
   <td style="text-align: center;"><font face="Consolas, Liberation Mono, Courier, monospace">false</font></td>
   <td style="text-align: center;"><font face="Consolas, Liberation Mono, Courier, monospace">false</font></td>
   <td style="text-align: center;">ToPrimitive(A) == B</td>
   <td style="text-align: center;">ToPrimitive(A) == B</td>
   <td style="text-align: center;">ToPrimitive(A) == ToNumber(B)</td>
   <td style="text-align: center;">
    <p>A === B</p>
   </td>
  </tr>
 </tbody>
</table>



