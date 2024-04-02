import React, { useContext, useEffect, useState } from 'react'
import Loader from '../../components/Loader/component/Loader';
import { number, object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './Order.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User';

function Order() {
  const [loader, setLoader] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [info, setInfo] = useState({
    couponName: "",
    address: "",
    phone: "",

  });

  const getCart = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        });
      // console.log(data);
      setProducts(data.products);
      let p = 0;
      data.products.map(product => {
        p += product.details.price * product.quantity
      })
      setTotalPrice(p);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }

  }

  useEffect(() => {
    getCart()
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  }

  const validateData = async () => {
    const RegisterSchema = object({
      address: string().required(),
      phone: number().min(8).required(),
    });

    try {
      await RegisterSchema.validate(info, { abortEarly: false });
      return true;
    }
    catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        // console.log(err.path); key برجع
        validationErrors[err.path] = err.message;
        setErrors(validationErrors);
      });
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    setIsLoading(true);
    if (await validateData()) {

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/order`, info,
          {
            headers: {
              Authorization: `Tariq__${localStorage.getItem('userToken')}`
            }
          });
        console.log(data);
        setInfo({
          couponName: '',
          address: '',
          phone: '',
        });

        if (data.message == "success") {
          toast.success('order created ', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="">
        <div className={`${Styles.card} mt-3`}>
          <div className="row flex-nowrap">
            {/* cart */}
            <div className={`col-7 ${Styles.cart}`}>
              <div className="mb-2">
                <div className="d-flex  justify-content-center align-items-center border-bottom border-dark-subtle">
                  <h1 className='fs-1'><b>Order Summary</b></h1>
                </div>
              </div>
              {/* single item */}
              {products.length ?
                products.map(product =>
                  <div className="row border-bottom ps-2 pe-1 p-4" key={product._id}>
                    <div className="d-flex ">
                      <div className="d-flex flex-wrap gap-3 w-100">
                        <img className="img-thumbnail border-0" style={{ width: "3.8rem" }} src={product.details.mainImage.secure_url} alt="product image" />
                        <div className="d-flex flex-column gap-1">
                          <div className="fw-bolder">{product.details.name}</div>
                          <span className='text-dark'>Quantity:{product.quantity}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-end">
                        <span className="fw-bolder text-warning">${product.quantity * product.details.finalPrice}</span>
                      </div>
                    </div>

                  </div>

                )
                :
                <div className="d-flex align-items-center row border-top border-bottom ps-2 pe-2 p-4">
                  <span className='text-secondary ms-2'>no products</span>
                </div>
              }
              <div className="w-100 d-flex justify-content-end align-items-center">

                <div className="fw-bold">TOTAL PRICE:</div>
                <div className={`fw-bold text-right`}>$ {totalPrice}</div>
              </div>


            </div>

            {/*summary*/}
            <div className={`col-5 bg-secondary .bg-gradient ${Styles.summary}`}>
              <h5 className="text-center fs-4 mt-3"><b>Summary</b></h5>
              <hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <label>COUPON NAME</label>
                  <input className={Styles.code} type="text" name="couponName" value={info.couponName} onChange={handleChange} placeholder='Enter your code' />
                  <p className='text-danger'>{errors.couponName}</p>
                </div>

                <div>
                  <label>ADDRESS</label>
                  <input className={Styles.code} type="text" name="address" value={info.address} onChange={handleChange} placeholder='Enter your address' />
                  <p className='text-danger'>{errors.address}</p>
                </div>

                <div>
                  <label>PHONE</label>
                  <input className={Styles.code} type="text" name="phone" value={info.phone} onChange={handleChange} placeholder='Enter your phone number' />
                  <p className='text-danger'>{errors.phone}</p>
                </div>
                <button type="submit" className={Styles.btn} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "BUY NOW"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>Coupon Name</label>
              <input className={Styles.inp} type="text" name="couponName" value={info.couponName} onChange={handleChange} placeholder='Enter your coupon name' />
              <p className='text-danger'>{errors.couponName}</p>
            </div>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>Address</label>
              <input className={Styles.inp} type="text" name="address" value={info.address} onChange={handleChange} placeholder='Enter your address' />
              <p className='text-danger'>{errors.address}</p>
            </div>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>Phone</label>
              <input className={Styles.inp} type="text" name="phone" value={info.phone} onChange={handleChange} placeholder='Enter your phone number' />
              <p className='text-danger'>{errors.phone}</p>
            </div>

            <div className='d-flex justify-content-center'>
              <button type="submit" className={Styles.registerBtn} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "submit"}</button>
            </div>
            </form> */}
    </>
  )
}

export default Order