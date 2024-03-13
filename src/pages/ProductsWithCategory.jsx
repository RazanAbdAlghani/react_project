import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function ProductsWithCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { error, setError } = useState('');
  const getProductsWithCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
      console.log(data);
      // setProducts(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setError('Error to Loade Data!');
    }
  };

  useEffect(() => {
    getProductsWithCategory();
  }, []);

  return (
    <>
      <div className='d-flex flex-wrap flex-column align-items-center gap-3'>
        {products.map(product =>
          <div className='product d-flex flex-column align-items-center' key={product._id}>
            <img src={product.mainImage.secure_url} className='w-50 rounded mx-auto d-block' alt="product picture" />
            <h2>{product.name}</h2>
            <Link to={`/products/${product._id}`} className={`btn btn-primary bg-dark-subtle border-0 p-2 d-flex align-items-center btn-sm w-25 justify-content-center`}>Show</Link>
          </div>)}
      </div>
    </>
  )
}

export default ProductsWithCategory