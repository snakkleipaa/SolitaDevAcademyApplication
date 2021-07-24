import { gql } from '@apollo/client'

export const VACCINE_COUNT = gql`
    query {
        vaccineCount 
    }
`

export const VACCINATION_COUNT = gql`
    query {
        vaccinationCount
    }
`

export const ORDERS_BY_PRODUCER = gql`
    query ordersByProducer($producer: String!) {
        orderByProducer(producer: $producer)
    }
`

export const ORDERS_BY_DATE = gql`
    query ordersByDate($date: String!) {
        orderByDate(date: $date)
    }
`

export const EXPIRED_BY_DATE = gql`
    query expireByDate($date: String!) {
        expiredByDate(date: $date)
    }
`

export const EXPIRES_IN_10_DAYS = gql`
    query expiredIn10Days($date: String!) {
        willExpire(date: $date)
    }
`

export const GENDER_COUNT = gql`
    query genderCount($gender: String!) {
        gender(gender: $gender)
    }
`

export const ARRIVED_VACCINATIONS = gql`
    query {
        arrivedVaccinations
    }
`