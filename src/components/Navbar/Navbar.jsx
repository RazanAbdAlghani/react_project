import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body ">
        <div className="container-fluid justify-content-around ms-3 me-3 gap-5">
          <a className="navbar-brand" href="#"><img src="src/public/logo/logo.svg" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/cart">Cart</NavLink>
              </li>

            </ul>
          </div>

          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success border-info" type="submit">Search</button>
          </form>

          <div className="d-flex flex-wrap gap-2">

            <NavLink className="btn btn-primary bg-info border-0 p-2 d-flex align-items-center" to="/login">Log in</NavLink>
            <NavLink className="btn btn-primary bg-info border-0 d-flex align-items-center" to="/signUp">Sign up</NavLink>

          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar