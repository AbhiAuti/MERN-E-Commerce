import React from 'react'
import Hero from '../Components/Hero'
import Popular from '../Components/Popular'
import Offer from '../Components/Offer'
import Newsletter from '../Components/Newsletter'
import Newcollection from '../Components/Newcollection'


const Home = () => {
  return (
    <div>
      <Hero/>
     <Popular/>
     <Offer/>
     <Newcollection/>
     <Newsletter/>
    </div>
  )
}

export default Home
