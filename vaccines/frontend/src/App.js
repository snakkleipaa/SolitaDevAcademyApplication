import React, { useState} from 'react'
import 'bulma/css/bulma.min.css'

import VaccineInfo from './components/vaccineInfo'
import VaccinesPerProducer from './components/vaccinesPerProducer'
import CountData from './components/countData'
import Footer from './components/footer'


const App = () => {

  const [date, setDate] = useState('')

  return (
    <div class='content'>

      <section class="hero is-primary">
        <div class="hero-body">
          <p class="title">
            Vaccine data
          </p>
          <p class="subtitle">
            Application for presenting vaccine information
          </p>
        </div>
      </section>
      
      <CountData />
      <VaccinesPerProducer />

      <section class='section is-small has-background-primary-light'>

        <h3 class='subtitle is-6'>Insert a date for more detailed data:</h3>

        <form >
          <input class='input' type='date' onChange={({ target }) => setDate(target.value)}/>
        </form>

      </section>

      <VaccineInfo date={date} />

      <Footer />
    
    </div>
  )
}

export default App
