import differenceWith from "../differenceWith"

/**
 * TODO: isEqualDeep  深度判断两个变量是否相等
 * https://github.com/mqyqingfeng/Blog/issues/41
 * @param a 
 * @param b 
 * @returns 
 */
function isEqual(a, b) {
    return true
}

describe('differenceWith', () => {
    it.skip('happy path', () => {
        const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
        const res = differenceWith(objects, [{ 'x': 1, 'y': 2 }], isEqual)
        console.log(res, '================================================================')
        expect(res).toEqual([{ 'x': 2, 'y': 1 }])
    })
})