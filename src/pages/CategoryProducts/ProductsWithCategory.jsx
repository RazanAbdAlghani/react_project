import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import Styles from './ProductsWithCategory.module.css'
import { UserContext } from '../../context/User';
import Loader from '../../components/Loader/component/Loader';

function ProductsWithCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { error, setError } = useState('');
  const [loader, setLoader] = useState(true);
  const { userName, totalPrice, setTotalPrice, setCount, count } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const getProductsWithCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
      console.log(data);
      // setProducts(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setError('Error to Loade Data!');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductsWithCategory();
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
      localStorage.setItem("countNum", data.cart.products.length);
      setCount(data.cart.products.length);
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
      <div className="container">
        <h2>{localStorage.getItem("category")}</h2>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-center align-item-center gap-3">
          {products.length ?
            products.map(product =>
              /*single product */
              <div className={Styles.cardHov} key={product._id}>
                < div className="card col-3 shadow" style={{ width: "18rem" }}>
                  <img src={product.mainImage.secure_url} style={{ height: "250px" }} className="card-img-top" alt="product image" />
                  <div className='card-body p-3 d-flex flex-column align-items-center'>

                    <h5 className="card-title">{product.name}</h5>
                    <div className="d-flex gap-2">
                      <p className="text-decoration-line-through text-danger fw-medium">${product.price}</p>
                      <p className="fw-medium">${product.finalPrice}</p>
                    </div>
                    <button className={Styles.btn}><Link className="text-light link-underline-light link-underline-opacity-0" to={`/products/${product._id}`}>Show</Link></button>

                    {userName ?
                      <button className="btn btn-sm  p-2 d-flex align-items-center justify-content-center text-light btn-warning rounded-pill" style={{ width: "140px" }} onClick={() => addToCart(product._id, product.finalPrice)} disabled={isloading ? 'disabled' : null}>{isloading ? "..." : "Add to cart"}</button>
                      :
                      null
                    }
                  </div>
                </div>
              </div>
            )
            :
            <div className="vh-100">
              <h2>no products <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 512 512"><path fill="#562e10" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg></h2>
            </div>
          }
        </div>
      </div>


    </>
  )
}

export default ProductsWithCategory