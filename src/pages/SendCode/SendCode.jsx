import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import Image from '../../../public/hero1.jpg';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './SendCode.module.css'

function SendCode() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: ''
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const validateData = async () => {
    const LoginSchema = object({
      email: string().required(),
    });

    try {
      await LoginSchema.validate(user, { abortEarly: false });
      return true;
    }
    catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        // console.log(err.path); key برجع
        validationErrors[err.path] = err.message;
        setErrors(validationErrors);
      });
      setLoader(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      try {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, user);
        console.log(data);
        setUser({
          email: '',
        });

        if (data.message == "success") {
          toast.success('Please check your email ', {
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
          localStorage.setItem("email", user.email);
          navigate("/forgetPass");
        }
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message + " !", {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

      } finally {
        setLoader(false);
      }
    }
  }


  return (
    <>
      <div className={Styles.bg} style={{ backgroundImage: `url(${Image})` }}>
        <div className={Styles.login}>
          <svg xmlns="http://www.w3.org/2000/svg" height="100px" width="100px" viewBox="0 0 448 512"><path fill="#562e10" d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z" /></svg>
          <h2 className={`d-block text-center fs-1 text-dark`}>Forget Password ?</h2>
          <p className='mb-3 p-2'>you can reset your password here </p>
          <form onSubmit={handleSubmit}>
            <div className={Styles.wrapInput}>
              <input className={Styles.inp} type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter your email address' />
              <p className='text-danger'>{errors.email}</p>
            </div>

            <button type="submit" className={Styles.loginBtn} disabled={loader ? 'disabled' : null}>{loader ? "wait..." : "Send Code"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SendCode