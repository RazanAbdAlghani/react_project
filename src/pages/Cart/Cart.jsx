import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User';
import Styles from './Cart.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/component/Loader';
import { Bounce, toast } from 'react-toastify';

function Cart() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { error, setError } = useState('');
  const [loader, setLoader] = useState(true);
  const { setCount, count } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
      // console.log(data.products);
      setProducts(data.products);
      setCount(data.count);
      let p = 0;
      data.products.map(product => {
        p += product.details.price * product.quantity
      })
      // console.log(p);
      setTotalPrice(p);
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
      setLoader(false);
    }

  }



  useEffect(() => {
    getCart();
  }, []);

  const decreaseQty = async (productId, price) => {
    setIsLoading(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      });
      // console.log(data);
      getCart();

      data.cart.products.map(prod => {
        if (prod.quantity == 0) {
          removeItem(productId);
        }
      });
      setTotalPrice(totalPrice - price);
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
  };

  const increaseQty = async (productId, price) => {
    const token = localStorage.getItem('userToken');
    setIsLoading(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      console.log(data);
      setTotalPrice(totalPrice + price);
      getCart();
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
  };

  const removeItem = async (productId, price) => {
    const token = localStorage.getItem('userToken');
    setIsLoading(true);
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      // console.log(data);
      getCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {
      }, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem("userToken")}`
        }
      });
      // console.log(data);
      getCart();
      setTotalPrice(0);
    } catch (error) {
      console.log(error);
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
        <div className={`${Styles.card} mt-3`}>
          <div className="row">
            {/* All products cart */}
            <div className={`col-8 ${Styles.cart}`}>
              <div className="mb-2">
                <div className="d-flex  justify-content-between align-items-center">
                  <h1 className='fs-1'><b>Shopping Cart</b></h1>
                  <span className="text-secondary-emphasis">{count} items</span>
                </div>
                <div className="mt-2 row">
                  <span className="ms-3 text-primary-emphasis col-4 me-5 ">Product</span>
                  <span className="text-primary-emphasis col-2 ms-5  " style={{}}>Quantity</span>
                  <span className="text-primary-emphasis col-2 ms-1" style={{}}>Price</span>
                  <span className="text-primary-emphasis col-2" style={{}}>Total</span>
                </div>
              </div>
              {/* single item */}
              {products.length ?
                products.map(product =>
                  <div className="row border-top border-bottom ps-2 pe-2 p-4" key={product._id}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3 w-50 flex-wrap">
                        <img className="img-thumbnai" style={{ width: "5.8rem" }} src={product.details.mainImage.secure_url} alt="product image" />
                        <div className="fw-bolder w-50">{product.details.name}</div>
                      </div>
                      <div className="d-flex w-50 gap-5 flex-wrap">
                        <div className="d-flex gap-3 col-3">
                          <Link className="text-black text-decoration-none" onClick={() => decreaseQty(product.productId, product.details.finalPrice)} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "-"}</Link>
                          <Link className="border text-black bg-white p-2 pt-0 pb-0 text-decoration-none">{product.quantity}</Link>
                          <Link className="text-black text-decoration-none" onClick={() => increaseQty(product.productId, product.details.finalPrice)} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "+"}</Link>
                        </div>
                        <span className="col-3 fw-bolder">$ {product.details.finalPrice} </span>
                        <span className="col-2 fw-bolder">$ {product.quantity * product.details.finalPrice}</span>
                      </div>
                      <Link className="text-decoration-none text-secondary" onClick={() => removeItem(product.productId)}><span className="">✕</span></Link>
                    </div>
                  </div>
                )
                :
                <div className="d-flex align-items-center row border-top border-bottom ps-2 pe-2 p-4">
                  <span className='text-secondary ms-2'>no products</span>
                </div>
              }
              <div className="w-100 d-flex justify-content-end align-items-center">
                <Link className=" text-muted mt-1 link-opacity-25-hover" to="/">←<span className="">Back to shop</span></Link></div>
              <div className="w-100 d-flex justify-content-center align-items-center pt-1">
                <button className="btn btn-sm  p-2 d-flex align-items-center justify-content-center text-light btn-warning rounded-pill" style={{ width: "340px" }} onClick={clearCart} disabled={isloading ? 'disabled' : null}>{isloading ? "..." : "Clear"}</button>
              </div>
            </div>

            {/*summary*/}
            <div className={`col-4 bg-secondary .bg-gradient ${Styles.summary}`}>
              <h5 className="text-center fs-4 mt-3"><b>Summary</b></h5>
              <hr />
              <form>
                <p>SHIPPING</p>
                <select><option className="text-muted">Standard-Delivery- $5.00</option></select>
                <p>GIVE CODE</p>
                <input className={Styles.code} placeholder="Enter your code" />
              </form>
              <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                <div className={Styles.col}>TOTAL PRICE</div>
                <div className={`${Styles.col} text-right`}>$ {totalPrice}</div>
              </div>
              <button className={Styles.btn} onClick={() => navigate("/order")}>CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Cart