# memoize

## Description 
创建一个会缓存 `func` 结果的函数。 如果提供了 `resolver` ，就用 `resolver` 的返回值作为 `key` 缓存函数的结果。 默认情况下用第一个参数作为缓存的 `key`。 `func` 在调用时 `this` 会绑定在缓存函数上。

> PS: 缓存会暴露在缓存函数的 cache 上。 它是可以定制的，只要替换了 _.memoize.Cache 构造函数，或实现了 Map 的 delete, get, has, 和 set 方法。
> 

## Params
`(func, [resolver])`
> {Function} func 需要缓存结果的函数
> <br/>
> {Function} resolver 获取缓存 key 的函数，可不传
> 

## Return
`Function`
> 返回缓存化后的函数
> 

## Code
```js
    function memoize(func, resolver) {
      if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
        throw new TypeError('Expected a function')
      }
      const memoized = function(...args) {
        const key = resolver ? resolver.apply(this, args) : args[0]
        const cache = memoized.cache
    
        if (cache.has(key)) {
          return cache.get(key)
        }
        const result = func.apply(this, args)
        memoized.cache = cache.set(key, result) || cache
        return result
      }
      memoized.cache = new (memoize.Cache || Map)
      return memoized
    }
    
    memoize.Cache = Map
```

## Analyze

1. 首先判断了传入的参数是否符合规范，`func` 必须为函数，如果传入了 `resolver`，那么 `resolver` 也必须为函数

    ```js
        if (typeof func !== 'function' || (resolver != null && typeof resolver !== 'function')) {
          throw new TypeError('Expected a function')
        }
    ```

2. 定义 `memoized` 函数作为返回值

3. `memoized` 中首先先获取缓存的key值，如果传入了 `resolver`，那么`key`值就是 `resolver` 的返回值，否则默认取第一个参数作为`key`

    ```js
        const key = resolver ? resolver.apply(this, args) : args[0]
    ```
4. 拿到 `key` 之后获取缓存的结果，如果结果中存在，那么直接返回，否则进行缓存

    ```js
        const cache = memoized.cache
        if (cache.has(key)) {
          return cache.get(key)
        }
    ```
    
5. 设置缓存阶段,缓存直接存储在 `memoized` 的 `cache` 字段中，并且默认使用 `Map` 来存储(也可以使用其他的方法来存储， `memoize.Cache = WeakMap`)，在函数第一次调用，或者 key 值第一次出现(参数改动，返回值改动等),调用原函数，并将返回的 `result` 进行缓存，同时 `return result`

    ```js
        const result = func.apply(this, args)
        memoized.cache = cache.set(key, result) || cache
        return result
    ```
    
6. 最后，给 `memoized` 添加 `cache`，并返回出去

    ```js
        memoized.cache = new (memoize.Cache || Map)
        return memoized
    ```
    



## Remark
1. `memoize` 的使用其实就是判断缓存池(`memoized.cache`)里是否存在与之对应的 `key`，如果存在，就直接返回结果，不执行原函数
   
2. [Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
3. [WeakMap MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
#### Objects 和 maps 的比较
`Objects` 和 `Maps` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Maps` 使用。不过 `Maps` 和 `Objects` 有一些重要的区别，在下列情况里使用 `Map` 会是更好的选择

| &nbsp;&nbsp; | Map | Object|
|---|----|----|
|意外的键| Map 默认情况不包含任何键。只包含显式插入的键 |一个 Object 有一个原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。(ES5开始可以使用 Object.create(null)来创建一个没有原型的对象)|
|键的类型| 一个 Map 的键可以是任意值，包括函数、对象或任意基本类型。 |一个 Object 的键必须是一个 String 或是 Symbol。|
|键的顺序| Map 中的 key 是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值。 |一个 Object 的键是无序的。<br/> *ECMAScript 2015 规范以来，对象确实保留了字符串和 Symbol 键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。*|
|size| Map 的键值对个数可以轻易地通过 size 属性获取。 |Object 的键值对个数只能手动计算。|
|迭代| Map 是 [iterable](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 的，所以可以直接被迭代。 |迭代一个 Object 需要以某种方式获取它的键然后才能迭代。|
|性能| 在频繁增删键值对的场景下表现更好。 |在频繁添加和删除键值对的场景下未作出优化。|



## Example
```js
    var object = { 'a': 1, 'b': 2 };
    var other = { 'c': 3, 'd': 4 };
     
    var values = memoize(_.values);
    values(object);
    // => [1, 2]
     
    values(other);
    // => [3, 4]
     
    object.a = 2;
    values(object);
    // => [1, 2]
     
    // 修改结果缓存。
    values.cache.set(object, ['a', 'b']);
    values(object);
    // => ['a', 'b']
     
    // 替换 `_.memoize.Cache`。
    memoize.Cache = WeakMap;
```
