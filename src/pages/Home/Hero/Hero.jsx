import React from 'react'
import Styles from './Hero.module.css'
import Image from '../../../../public/hero1.jpg'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <>
      <section>
        <div className={Styles.hero} style={{ backgroundImage: `url(${Image})` }}>
          <h1 className="d-flex flex-wrap">O N L I N E <span className="ms-3"> S H O P P I N G</span></h1>
          <p className="d-flex flex-wrap">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
      </section>
    </>

  )
}

export default Hero