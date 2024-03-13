import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Products() {
  const {id} = useParams();
  const[products, setProducts]= useState([]);
  const{error, setError}= useState('');
  const getProductsWithCategory= async ()=>{
    try{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
    console.log(data);
    // setProducts(data.products);
    setProducts(data.products);
    }catch(error){
      console.log(error);
      setError('Error to Loade Data!');
    }
  };

  useEffect(() => {
    getProductsWithCategory();
  }, []);

  return (
    <>
    {products.map( product=>
      <div className='product' key={product._id}>
        <h2>{product.name}</h2>
        <img src={product.mainImage.secure_url} alt="product picture"/>
        <span>stock: {product.stock}</span>
        <span>price: {product.price}</span>
        <p>{product.description}</p>
        <div className='subImages'>
        product.subImages.map(image
        <img src=""/>
        );
          </div>
      </div>)}
    </>
  )
}

export default Products