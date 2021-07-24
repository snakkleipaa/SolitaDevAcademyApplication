const index = require('../index')

const resolvers = index.resolvers

describe('count data for', () => {
    it('vaccines is correct', () => {
        const result = resolvers.Query.vaccineCount()

        expect(result).toEqual(5000)
    })
    it('vaccinations is correct', () => {
        const result = resolvers.Query.vaccinationCount()

        expect(result).toEqual(7000)
    })
    it('producer "Antiqua" is correct', () => {
        const result = resolvers.Query.orderByProducer(null, { producer: 'Antiqua'})

        expect(result).toEqual(1661)
    })
})

describe('data filtered by date for', () => {
    it('orders arrived is correct', () => {
        const result = resolvers.Query.orderByDate(null, { date: '2021-03-20' })

        expect(result).toEqual(61)
    })
})