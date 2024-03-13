import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Product() {
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const { error, setError } = useState('');
  const [image, setImage] = useState('');
  const [subImages, setSubImages] = useState([]);

  const getProductsWithCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${product_id}`);
      console.log(data.product);
      setProduct(data.product);
      setImage(data.product.mainImage.secure_url);
      setSubImages(data.product.subImages);
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
      <div className='container d-flex flex-column align-items-center'>
        <h2>{product.name}</h2>
        <img src={image} className='w-50 rounded mx-auto d-block' alt='product picture' />
        <span>stock: {product.stock}</span>
        <span>price: {product.price}</span>
        <h3>Description</h3>
        <p>{product.description}</p>
        <div className='d-flex gap-2 flex-wrap flex-row'>
          {subImages.map(image =>
            <img src={image.secure_url} className='w-25 rounded mx-auto d-block' />
          )};
        </div>
      </div>
    </>
  )
}

export default Product