import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import Styles from './User.module.css'
import Loader from '../../components/Loader/component/Loader';

function User() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`
          }
        });
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      setError("Error to Loade Data!");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="container vh-100 ">
        <div className={`${Styles.card}  mt-3 d-flex flex-nowrap`}>
          {/*Navbar section */}
          <div className='col-4 shadow d-flex flex-column justify-content-start align-items-center rounded p-3 gap-4 card'>
            <img src={user.image.secure_url} className={`${Styles.userImage} img-fluid`} alt="user image" />
            <h3 className="text-secondary">{user.userName}</h3>
            <ul className="nav flex-column gap-3 align-items-center ">
              <li className="nav-item ">
                <NavLink className="nav-link link-secondary" aria-current="page" style={{ color: "#ffffffd3" }} to="/profile">Profile</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link link-secondary " aria-current="page" style={{ color: "#ffffffd3" }} to="/profile/contact">Contact</NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link link-secondary " style={{ color: "#ffffffd3" }} to="/profile/order">Orders</NavLink>
              </li>

            </ul>

          </div>

          {/*outlet */}
          <div className="col-8 bg-body-tertiary">
            <div className="card-block">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default User