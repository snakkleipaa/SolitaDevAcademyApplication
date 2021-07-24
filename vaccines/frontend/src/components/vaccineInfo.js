import React from 'react'
import { useQuery } from '@apollo/client'

import { 
    ORDERS_BY_DATE, EXPIRED_BY_DATE, EXPIRES_IN_10_DAYS
} from '../queries'

const VaccineInfo = ({ date }) => {

    const arrivedData = useQuery(ORDERS_BY_DATE, { variables: { date }})
    const expiredData = useQuery(EXPIRED_BY_DATE, { variables: { date }})
    const willExpire = useQuery(EXPIRES_IN_10_DAYS, { variables: { date }})

    if (arrivedData.loading || expiredData.loading || willExpire.loading) {
        return <div><progress class="progress is-small is-primary" max="100">15%</progress></div>
    }
  
    return (
      <section class='section is-small pt-6'>
        <h2 class='subtitle is-4'>Data for the date {date}</h2>
        <ul>
          <li>Vaccine bottles arrived on the day: {arrivedData.data.orderByDate}</li>
          <li>Vaccine bottles expired on the day: {expiredData.data.expiredByDate}</li>
          <li>Number of vaccines expiring in 10 days: {willExpire.data.willExpire}</li>
        </ul>
      </section>
    )
  }

  export default VaccineInfo