import React from 'react'
import Styles from './Loader.module.css'
function Loader() {
  return (
    <div className={`${Styles.lo} container  d-flex align-items-center`}>
<span className={Styles.loader}></span>
    </div>
  )
}

export default Loader