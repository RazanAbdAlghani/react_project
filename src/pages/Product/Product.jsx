import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/User';
import Styles from './Product.module.css'
import Loader from '../../components/Loader/component/Loader';
import { Bounce, toast } from 'react-toastify';
import Rating from '../../components/Rating/Rating';
import UserReview from './Reviews';
import Reviews from './Reviews';

function Product() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const { userName, totalPrice, setTotalPrice, setCount, count } = useContext(UserContext);
  const [rating, setRating] = useState(null);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${product_id}`);
      // console.log(data.product);
      setProduct(data.product);
      setImage(data.product.mainImage.secure_url);
      setSubImages(data.product.subImages);
      setRating(data.avgRating);
    } catch (error) {
      console.log(error);
      setError('Error to Loade Data!');
    } finally {
      setLoader(false);
    }
  };


  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async (productId, price) => {
    const token = localStorage.getItem('userToken');
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      // console.log(data);
      setTotalPrice(totalPrice + price);
      setCount(count + 1);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (loader) {
    return <Loader />
  }
  return (
    <>
      <section className="">
        <div className={`${Styles.product} `}>
          {error ? <div className='d-flex align-items-center justify-content-center vh-100'><h3>{error}</h3></div> :
            <>
              <div className={`${Styles.productPhoto} `}>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner w-75">
                    <div className="carousel-item active">
                      <img src={image} className={`${Styles.photoMain} iimg-fluid w-100`} alt="main-product image" />
                      <div className={`${Styles.controls} d-flex gap-2 position-absolute bottom-0 start-0 p-3`}>
                        <i className=""><svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 448 512"><path fill="#ffffff" d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" /></svg></i>
                        <i className=""><svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 512 512"><path fill="#ffffff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg></i>
                      </div>
                    </div>
                    {subImages.map((image, index) =>
                      <div className="carousel-item" key={index}>
                        <img src={image.secure_url} className={`${Styles.photoMain} iimg-fluid w-100 `} alt="sub-product image" />
                      </div>
                    )};

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* product Info */}
              <div className={`${Styles.productInfo}`}>
                <div className="">
                  <h1 className="fw-bold text-body">{product.name}</h1>
                  <span className="text-secondary">{product.stock ? "stock:" + product.stock : "notAvalibale"}</span>
                </div>
                <div className={Styles.price}>
                  <span className='text-dark text-decoration-line-through'>{product.price}</span>
                  <span>{product.finalPrice}</span>$
                </div>
                {<Rating index={rating} size={30}/>}
                <div className={Styles.description}>
                  <h3>Description</h3>
                  {product.description}
                </div>
                {userName ?
                  <button className={Styles.buyBtn} onClick={() => addToCart(product._id, product.finalPrice)} disabled={isloading ? 'disabled' : null}>{isloading ? "..." : "Add to cart"}</button>
                  :
                  null
                }
                {/*reviews section*/}
                <Reviews productId={product._id}/>
              </div>
            </>
          }
        </div>


      </section>
    </>
  )
}

export default Product