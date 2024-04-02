import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../../../public/logo/logoShop.svg'
import { UserContext } from '../../context/User'
import Styles from './Navbar.module.css'
function Navbar() {
  const navigate = useNavigate();
  const { userName, setUserName, setUserToken, userToken, count } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserName(null);
    setUserToken(null);
    navigate("/login")
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body p-0 pe-3 sticky-top shadow flex-nowrap" >
        <div className="container-fluid justify-content-around gap-5">
          <Link className="navbar-brand m-3 d-flex align-items-center" to="#"><img className="img-thumbnail border-0" src={Logo} />
            <span className="fw-bold fs-3 ms-3" style={{ color: `#562e10` }}>T - Shop</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 fw-light " >
              {userName ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/categories">Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/products">Products</NavLink>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/categories">Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link link-secondary" aria-current="page" to="/products">Products</NavLink>
                  </li>

                </>
              }
            </ul>
          </div>

          <div className="d-flex flex-nowrap gap-2">
            {userName ?
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 fw-light " >
                  <li className={`nav-item me-2`}>
                    <NavLink className={`${Styles.not} link-secondary`} to="/cart">
                      <span><svg className="feather feather-shopping-cart" fill="none" height={30} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg"><circle cx={9} cy={21} r={1} /><circle cx={20} cy={21} r={1} /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                      </span>
                      {count != 0 ?
                        <span className={Styles.badge}>{count}</span>
                        :
                        null
                      }
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className=" dropdown-toggle btn btn-outline-warning fs-5 btn border-0 p-2 ms-0 d-flex d-flex align-items-center gap-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {userName}
                    </Link>
                    <ul className="dropdown-menu ">

                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" onClick={logout} to="/login">Log out</Link></li>
                    </ul>
                  </li>
                </ul>
              </>
              :
              <>
                <div className="d-flex gap-2 flex-wrap">
                  <Link className="btn  p-2 d-flex align-items-center btn-outline-warning" to="/login">Log in</Link>
                  <Link className="btn  p-2 d-flex align-items-center btn-warning" to="/signUp">Sign up</Link>
                </div>
              </>
            }
          </div>

        </div>
      </nav>

    </>
  )
}

export default Navbar