import React from 'react'
import { useQuery } from '@apollo/client'

import { 
    VACCINE_COUNT, VACCINATION_COUNT, ARRIVED_VACCINATIONS, GENDER_COUNT
} from '../queries'

const CountData = () => {

    const vaccines = useQuery(VACCINE_COUNT)
    const vaccinations = useQuery(VACCINATION_COUNT)
    const arrivedVaccinations = useQuery(ARRIVED_VACCINATIONS)

    const males = useQuery(GENDER_COUNT, { variables: { gender: "male" }})
    const females = useQuery(GENDER_COUNT, { variables: { gender: "female" }})
    const nonbinary = useQuery(GENDER_COUNT, { variables: { gender: "nonbinary" }})

    if (vaccines.loading || vaccinations.loading || arrivedVaccinations.loading
        || males.loading || females.loading || nonbinary.loading) {
        return (
            <div><progress class="progress is-small is-primary" max="100">15%</progress></div>
        )
    }

    return (
        <section class='section is-small py-3'>
            <ul>
                <li>
                    Number of orders: {vaccines.data.vaccineCount}
                </li>
                <li>
                    Number of vaccinations arrived: {arrivedVaccinations.data.arrivedVaccinations}
                </li>
                <li>
                    Number of vaccinations done: {vaccinations.data.vaccinationCount}
                </li>
            </ul>
            <h2 class='subtitle is-4'>Gender distribution of vaccinations done:</h2>
                <ul>
                    <li>
                        Males: {males.data.gender}
                    </li>
                    <li>
                        Females: {females.data.gender}
                    </li>
                    <li>
                        Nonbinary: {nonbinary.data.gender}
                    </li>
                </ul>
            </section>
    )
}

export default CountData