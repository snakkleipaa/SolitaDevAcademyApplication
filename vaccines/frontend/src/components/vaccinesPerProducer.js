import React from 'react'
import { useQuery } from '@apollo/client'

import { 
    ORDERS_BY_PRODUCER
} from '../queries'

const VaccinesPerProducer = () => {
    const antiqua = useQuery(ORDERS_BY_PRODUCER,{ variables: { producer: 'Antiqua' }})
    const solarBuddhica = useQuery(ORDERS_BY_PRODUCER, { variables: { producer: 'SolarBuddhica' }})
    const zerpfy = useQuery(ORDERS_BY_PRODUCER, { variables: { producer: 'Zerpfy' }})

    if (antiqua.loading || solarBuddhica.loading || zerpfy.loading) {
        return (
            <div><progress class="progress is-small is-primary" max="100">15%</progress></div>
        )
    }

    return (
        <section class='section is-small pt-2'>
            <h2 class='subtitle is-4'>Number of orders per producer: </h2>
            <ul>
            <li>Antiqua: {antiqua.data.orderByProducer}</li>
            <li>SolarBuddhica: {solarBuddhica.data.orderByProducer}</li>
            <li>Zerpfy: {zerpfy.data.orderByProducer}</li>
            </ul>
        </section>
    )
}

export default VaccinesPerProducer