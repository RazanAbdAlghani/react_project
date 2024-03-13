import React from 'react'
import Styles from './Hero.module.css'
function Hero() {
  return (
    <>
      <div className={Styles.hero}>
        <div className={`${Styles.heroInfo} rounded d-flex flex-column p-5 justify-content-center gap-3`}>
          <h1>ONLINE<span>SHOPPING</span></h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni aperiam cum blanditiis laboriosam molestiae quis quibusdam nisi exercitationem, ad corporis!</p>
          <button className={Styles.btn}><a href="#">Log in</a></button>
        </div>
      </div>
    </>

  )
}

export default Hero