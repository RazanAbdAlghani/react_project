import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Styles from './SwiperCategories.module.css'

// import required modules
import { Navigation, Pagination, Scrollbar, Autoplay, EffectCoverflow } from 'swiper/modules';
import Loader from '../../components/Loader/component/Loader';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User';
import useResource from '../../hooks/useResource';

function SwiperCategories() {
  const { userName } = useContext(UserContext);
  const { categories, error, loader } = useResource(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`);
  if (loader) {
    return <Loader />
  }
  return (
    <>
      <h2 className='fs-1 p-4'>Welcome {userName} !</h2>
      {error ?? <p>{error}</p>}
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper mt-3"
      >
        {categories.map(category =>

          <SwiperSlide key={category.id}>
            <img src={category.image.secure_url} />
          </SwiperSlide>
        )}
      </Swiper>
      <h2 className="mt-5 pt-3 fs-1">All Categouries</h2>
      <div className={Styles.categoriesList} >
        <div className='row d-flex justify-content-center column-gap-3 row-gap-4'>
          {categories.map(category =>
            <div className="col-4 p-1 shadow d-felx justify-content-center align-item-center" style={{ height: "370px", width: "250px" }} key={category.id}>
              <img src={category.image.secure_url} className={Styles.cardImg} alt="..." />
              <div className="card-body text-center d-flex flex-column align-items-center gap-1">
                <h5 className="card-title fs-5">{category.name}</h5>
                <div className="d-flex justify-content-center">
                  <Link to={`products/category/${category.id}`} className={Styles.btn} onClick={() => localStorage.setItem("category", category.name)}>Details</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default SwiperCategories