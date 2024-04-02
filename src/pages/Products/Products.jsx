import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import useResource from '../../hooks/useResource';
import Loader from '../../components/Loader/component/Loader';
import { UserContext } from '../../context/User';
import Styles from './Products.module.css'
import { Bounce, toast } from 'react-toastify';

function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const { userName, count, setCount } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [product1, setProduct1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const getData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=50`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const getData1 = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=6`);
      setProduct1(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };



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
      console.log(data.cart.products.length);
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

  useEffect(() => {
    getData();
    getData1();
  }, [currentPage]);

  const handleSort = async (by) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?sort=${by}`);
    console.log(data);
    setProduct1(data.products);
  }

  const handlePriceBet = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?price[gte]=${elements[0].value}&price[lte]=${elements[1].value}`);
    console.log(data);
    setProduct1(data.products);
  }
  const handlePrice = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?finalPrice=${elements[0].value}`);
    console.log(data);
    setProduct1(data.products);
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?search=${e.target.value}`);
    console.log(data);
    setProduct1(data.products);
  }
  if (loader) {
    return <Loader />
  };

  return (
    <>
      <div className="row">
        {/*Filtier section */}
        <div className="col-3 p-3 bg-secondary-subtle">
          <h3 className="grid-title text-center p-3 text-secondary border-bottom"> Filters</h3>
          {/*search */}
          <h4>Search product</h4>
          <form className="d-flex flex-wrap gap-3 align-items-center p-2 mb-5" role="search">
            <span className="left-pan"><i className="fa fa-microphone"><svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 512 512"><path fill="#989da4" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></i></span>
            <input className="form-control w-75" type="search" placeholder="search product" aria-label="Search" onChange={handleSearch} />
          </form>

          {/* BEGIN FILTER BY Sort */}
          <h4 className="text-secondary-emphasis ">Sort by</h4>
          <div className=" flex-wrap d-flex  align-items-start gap-2 mb-5">
            <div className="btn-group-vertical d-flex gap-2" role="group" aria-label="Vertical radio toggle button group">
              <div className="d-flex gap-3 flex-wrap">
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" onClick={() => handleSort("name")} defaultChecked />
                <label className="btn btn-outline-warning border-0 rounded  p-1" htmlFor="vbtn-radio1">name</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" />
                <label className="btn btn-outline-warning border-0 rounded p-1" htmlFor="vbtn-radio2" onClick={() => handleSort("discount")}>discount</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off" />
                <label className="btn btn-outline-warning border-0 rounded p-1 " htmlFor="vbtn-radio3" onClick={() => handleSort("price")}>price</label>
              </div>
            </div>
            <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
              <div className=" d-flex gap-2 flex-wrap ">
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio4" autoComplete="off" onClick={() => handleSort("-name")} defaultChecked />
                <label className="btn btn-outline-warning border-0 rounded p-1" htmlFor="vbtn-radio4">-name</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio5" autoComplete="off" />
                <label className="btn btn-outline-warning border-0 rounded p-1" htmlFor="vbtn-radio5" onClick={() => handleSort("-discount")}>-discount</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio6" autoComplete="off" />
                <label className="btn btn-outline-warning border-0 rounded p-1" htmlFor="vbtn-radio6" style={{ width: "60px" }} onClick={() => handleSort("-price")}>- price</label>
              </div>
            </div>
          </div>

          <div className="" />
          {/* BEGIN FILTER BY PRICE */}
          <h4>By price</h4>
          <form className="d-flex flex-wrap gap-3 mb-5" onSubmit={handlePrice}>
            <div className="input-group ">
              <input type="text" className="form-control" placeholder="Enter price.." />
            </div>
            <button type="submit" className="btn btn-sm  p-2 d-flex align-items-center justify-content-center text-light btn-warning rounded-pill" style={{ width: "90px" }} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "search"}</button>
          </form>

          {/* BEGIN FILTER BY PRICE BETTWEN */}
          <h4>By price</h4>
          Between
          <form className='d-flex gap-3 mb-5 flex-wrap' onSubmit={handlePriceBet}>
            <div className="input-group d-flex flex-wrap gap-1 ">
              <label className="text-secondary">from </label>
              <input type="text" className="form-control w-25 rounded" />
            </div>
            <div className="input-group">
              <label className="text-secondary">to </label>
              <input type="text" className="form-control w-25 rounded" />
            </div>
            <button type="submit" className="btn btn-sm  p-2 d-flex align-items-center justify-content-center text-light btn-warning rounded-pill" style={{ width: "90px" }} disabled={isloading ? 'disabled' : null}>{isloading ? "wait..." : "search"}</button>
          </form>
          {/* END FILTER BY PRICE */}
        </div>


        <div className="col-9">
          <h2 className='fs-lg mt-3'>Products</h2>
          <div className="d-flex flex-wrap justify-content-center align-item-center gap-3 p-1">
            {product1.map(product =>
              /*single product */
              <div className={Styles.cardHov} key={product._id}>
                < div className="card col-3 shadow" style={{ width: "18rem", height: "470px" }}>
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
            }
          </div>

          <div className="mt-3 mb-3 container justify-content-center" style={{ textAlign: "center" }}>
            <div className=" ">
              <button className="btn btn-light"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from(
                { length: Math.ceil(products.length / productsPerPage) },
                (_, index) => (
                  <button className="btn btn-light" key={index + 1} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                )
              )}

              <button className="btn btn-light"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastProduct >= products.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products