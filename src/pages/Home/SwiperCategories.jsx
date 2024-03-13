import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

function SwiperCategories() {

  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`);
      // console.log(data.categories);
      setCategories(data.categories);
    } catch {
      console.log(error);
      setError('Error to Loade Data!');
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loader) {
    return <Loader />
  }
  return (
    <>
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

      <div className={Styles.categoriesList} >
        {categories.map(category =>
          <div className={`card d-flex w-75 flex-row p-3 justify-content-center ${Styles.card}`} key={category.id}>
            <img src={category.image.secure_url} className={Styles.cardImg} alt="..." />
            <div className="card-body d-flex flex-column justify-content-center gap-3">
              <h5 className="card-title fs-2">{category.name}</h5>
              <Link to={`products/category/${category.id}`} className={`btn btn-primary bg-dark-subtle border-0 p-2 d-flex align-items-center btn-sm w-25 justify-content-center`}>Details</Link>
            </div>
          </div>

        )}
      </div>



    </>
  )
}
export default SwiperCategories