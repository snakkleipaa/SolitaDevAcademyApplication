const { ApolloServer, gql } = require('apollo-server')
const lodash = require('lodash')
const data = require('./data/db')

var moment = require('moment')


const vaccines = data.vaccines
const vaccinations = data.vaccinations

const typeDefs = gql`
  type Vaccine {
    id: String!
    healthCareDistrict: String!
    orderNumber: Int!
    responsiblePerson: String! 
    injections: Int!
    arrived: String!
    vaccine: String!
    injectionsLeft: Int
  }

  type Vaccination {
    vaccinationId: String!
    gender: String!
    sourceBottle: String!
    injected: String!
  }

  type Query {
      vaccineCount: Int!
      vaccinationCount: Int!
      arrivedVaccinations: Int!
      orderByProducer(producer: String!): Int!
      orderByDate(date: String!): Int!
      expiredByDate(date: String!): Int!
      expiredBeforeUsage(date: String): Int!
      willExpire(date: String): Int!
      gender(gender: String!): Int!
  }
`

const resolvers = {
    Query: {
        vaccineCount: () => vaccines.length,
        vaccinationCount: () => vaccinations.length,
        arrivedVaccinations: () => lodash.sumBy(vaccines, 'injections'),
        orderByProducer: (root, args) => {
            console.log(args.producer)
            const filtered = vaccines.filter(v => v.vaccine === args.producer)
            return filtered.length
        },
        orderByDate: (root, args) => {
            const filtered = vaccines.filter(v =>
            moment(new Date(v.arrived)).subtract(2,'hours').format('YYYY-MM-DD')
            === args.date)
            return filtered.length
        },
        expiredByDate: (root, args) => {
            const filtered = vaccines.filter(v =>
            moment(new Date(v.arrived)).subtract(2, 'hours').add(30, 'days').format('YYYY-MM-DD') 
            === args.date)
            return filtered.length
        },
        willExpire: (root, args) => {
            const filtered = vaccines.filter(v => {
                const expirationDate = moment(new Date(v.arrived)).subtract(2, 'hours').add(30, 'days').format('YYYY-MM-DD')
                const end = moment(args.date).add(10, 'days').format('YYYY-MM-DD')
                v.injectionsLeft = v.injections -
                    vaccinations.filter(va => 
                        va.sourceBottle === v.id).length
                return moment(expirationDate).isBetween(args.date, end, undefined, '(]') 
            })
            return lodash.sumBy(filtered, 'injectionsLeft')
        },
        gender: (root, args) => {
            const filtered = vaccinations.filter(v =>
                v.gender === args.gender)
            return filtered.length
        }
    },
    Vaccine: {
        injectionsLeft: (root) => {
            const vaccinationsDone = vaccinations.filter(v =>
                v.sourceBottle === root.id)
            return root.injections - vaccinationsDone.length
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
  
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

exports.resolvers = resolvers