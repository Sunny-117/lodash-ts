# freeGlobal 

## Description 
从Node.js环境中检测自由变量 `global` 。
## Return
`global` || `false`

## Code
```js
const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global

```
## Analyze
在这里判断 如果 `global` 是一个 对象 ，并且 `global` 不是 `null`， 而且 `global.Object` 和 全局的 `Object` 相同， 那么就返回 `global` 对象，否则 返回的就是 `false`
## Remark
[global Node.js](http://nodejs.cn/api/globals.html#globals_global)
## Example
```js
// global
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  '__core-js_shared__': {
    versions: [ [Object], [Object], [Object] ],
    keys: { IE_PROTO: 'Symbol(IE_PROTO)_1.krnxn3mahz' },
    wks: {
      toStringTag: Symbol(Symbol.toStringTag),
      iterator: Symbol(Symbol.iterator),
      _hidden: Symbol(Symbol._hidden),
      toPrimitive: Symbol(Symbol.toPrimitive),
      hasInstance: Symbol(Symbol.hasInstance),
      isConcatSpreadable: Symbol(Symbol.isConcatSpreadable),
      match: Symbol(Symbol.match),
      replace: Symbol(Symbol.replace),
      search: Symbol(Symbol.search),
      species: Symbol(Symbol.species),
      split: Symbol(Symbol.split),
      unscopables: Symbol(Symbol.unscopables),
      asyncIterator: Symbol(Symbol.asyncIterator),
      observable: Symbol(Symbol.observable)
    },
    'symbol-registry': {},
    symbols: {},
    'op-symbols': {},
    'native-function-to-string': [Function: toString],
    metadata: { store: [WeakMap] }
  },
  core: {
    version: '2.6.12',
    inspectSource: [Function],
    prototype: {},
    Object: { prototype: {} },
    JSON: { prototype: {} },
    Function: { prototype: [Object] },
    Number: { prototype: [Object] },
    Math: { prototype: {} },
    String: { prototype: [Object] },
    Date: { prototype: [Object] },
    Array: { prototype: [Object] },
    getIteratorMethod: [Function],
    '[object Object]': { prototype: {} },
    Reflect: { prototype: {} },
    System: { prototype: {} },
    Error: { prototype: {} },
    RegExp: { prototype: {} }
  },
  System: {},
  asap: [Function: asap],
  Observable: [Function: Observable],
  regeneratorRuntime: {
    wrap: [Function: wrap],
    isGeneratorFunction: [Function],
    mark: [Function],
    awrap: [Function],
    AsyncIterator: [Function: AsyncIterator],
    async: [Function],
    keys: [Function],
    values: [Function: values]
  },
  _babelPolyfill: true
}


// global.Object
[Function: Object]
```
