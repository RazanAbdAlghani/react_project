import React from 'react'
import Styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
<div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
  <div className="rounded-lg bg-white p-8 text-center shadow-xl mt-5">
    <h1 className="mb-4 text-4xl fw-medium" style={{fontSize:"150px", color:"rgb(86, 46, 16)"}}>404</h1>
    <p className=" text-light-emphasis fs-3">Oops! The page you are looking for could not be found.</p>
    <Link to="/" className=" font-semibold  link-opacity-50-hover" style={{color:"rgb(86, 46, 16)"}}> Go back to Home </Link>
  </div>
</div>
  )
}

export default NotFound