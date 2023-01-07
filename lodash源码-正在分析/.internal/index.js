
const map = require('../map.js')
let values = [{ 'x': 1 }]
const iteratee = 'x'
values = map(values, (value) => iteratee(value))

console.log(values)

