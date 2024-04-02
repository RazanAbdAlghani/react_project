import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Styles from './Rating.module.css'
import { UserContext } from '../../context/User';

function UserRating() {
    const [rating, setRating] = useState(null );
    const [hover ,setHover ]= useState(null);
  return (
    <div>
      {[...Array(5)].map((star , index) => {
        const currentRating= index+1;
        return (
          <label key={index}>
            <input type="radio" name="rating" value={currentRating} onClick={()=>{setRating(currentRating); localStorage.setItem("userRating", currentRating)}}/>
            <FaStar 
            className={Styles.star}
            size={20}
            color={currentRating <= (rating || hover) ? "#ffc107": "#e4e5e9"}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)} />
          </label>
        )
      })}
    </div>
  )
}

export default UserRating