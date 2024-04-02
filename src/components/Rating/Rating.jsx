import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Styles from './Rating.module.css'

function Rating({index , size}) {
  const [rating, setRating] = useState(Math.round (index) );
  return (
    <div>
      {[...Array(5)].map((star , index) => {
        const currentRating= index+1
        return (
          <label key={index}>
            <input type="radio" name="rating" value={currentRating}/>
            <FaStar 
            className="star" 
            size={size}
            color={currentRating <= rating ? "#ffc107": "#e4e5e9"} />
          </label>
        )
      })}
    </div>
  )
}

export default Rating