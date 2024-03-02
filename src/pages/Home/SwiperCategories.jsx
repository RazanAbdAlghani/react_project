import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './SwiperCategories.css'

// import required modules
import { Navigation, Pagination, Scrollbar, Autoplay, EffectCoverflow } from 'swiper/modules';

function SwiperCategories() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=9`);
    // console.log(data.categories);
    setCategories(data.categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
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
        className="mySwiper"
      >
        {categories.map(category =>

          <SwiperSlide key={category.id}><img src={category.image.secure_url} />
          </SwiperSlide>

        )}
      </Swiper>

    </>
  )
}

export default SwiperCategories