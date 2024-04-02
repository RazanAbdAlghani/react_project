import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import Loader from '../../components/Loader/component/Loader';
import Styles from './Categories.module.css';
function Categories() {
  const navigate = useNavigate();
  const { categories, error, loader } = useResource(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`);

  if (loader) {
    return <Loader />
  };

  return (
    <>
      {error ?? <p>{error}</p>}
      <div className={`${Styles.bg} container`}>
        <h2 className="mb-0 mt-5 fs-lg">All Categouries</h2>
        <div className={Styles.categoriesList} >
          <div className='row d-flex justify-content-center column-gap-3 row-gap-5'>
            {categories.map(category =>
              <div className="col-4 p-1 shadow d-felx justify-content-center align-item-center bg-body-tertiary rounded" style={{ height: "370px", width: "250px" }} key={category.id}>
                <img src={category.image.secure_url} className={Styles.cardImg} alt="..." />
                <div className="card-body text-center d-flex flex-column align-items-center gap-1">
                  <h5 className="card-title fs-5">{category.name}</h5>
                  <div className="d-flex justify-content-center">
                    <Link to={`/products/category/${category.id}`} className={Styles.btn} onClick={() => localStorage.setItem("category", category.name)}>Details</Link>
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Categories