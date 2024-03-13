import React from 'react'
import SwiperCategories from './SwiperCategories'
import Hero from './Hero/Hero.jsx'



function Home() {
  return (
    <>
      <Hero />
      <div className='container d-felx justify-content-around'>
       <SwiperCategories />
      </div>
   
    </>
  )
}

export default Home