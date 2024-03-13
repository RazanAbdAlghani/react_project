import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function Categories() {

  const [Categoriess, setCategories] = useState([]);
  const getData = async () => {
    const response = await fetch(`https://ecommerce-node4.vercel.app/categories/`);
    const data = await response.json();
    console.log(data.categories);
    setCategories(data.categories);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {Categoriess.map((category) => (
        <Link key={category._id}   >
          <div className="row row-cols-1 row-cols-md-2 g-4 ">
            <div className="col">
              <div className="card ">
                <img
                  src={category.image.secure_url}
                  className="card-img-top"
                  alt="category image"
                />
                <div className="card-body">
                  {/* <h5 className="card-title">{category.name}</h5> */}
                  {/* <Link to='/products '  params={{ id: category._id }}>Details</Link> */}
                  <Link

                    className="btn btn-outline-secondary"
                  >
                    Show more
                  </Link>

                  {/* <Link to={/products/category/${category._id}}>Link Text</Link> */}

                  {/* <Link to='/Details?id=${category._id}'>Details</Link> */}

                  {/* <a href='details.jsx?id=${category._id}'>get details</a> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
export default Categories