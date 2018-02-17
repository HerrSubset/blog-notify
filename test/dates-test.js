const assert = require('assert')
const moment = require('moment')
const dates = require('../dates')


describe('largest_date', () => {
    it('it returns undefined when both arguments are undefined', () => {
        const largest = dates.largest_date(undefined, undefined)
        assert.strictEqual(undefined, largest)
    })

    it('returns the first argument if the second is undefined', () => {
        const expected = moment()
        const largest = dates.largest_date(expected, undefined)
        assert.strictEqual(expected, largest)
    })

    it('returns the second argument if the  first is undefined', () => {
        const expected = moment()
        const largest = dates.largest_date(undefined, expected)
        assert.strictEqual(expected, largest)
    })

    it('returns the first argument if it is later in time than the second', () => {
        const largest = moment()
        const smallest = moment().subtract(1, 'days')
        const result = dates.largest_date(largest, smallest)
        assert.strictEqual(largest, result)
    })

    it('returns the second argument if it is later in time than the first', () => {
        const largest = moment()
        const smallest = moment().subtract(1, 'days')
        const result = dates.largest_date(smallest, largest)
        assert.strictEqual(largest, result)
    })
})
