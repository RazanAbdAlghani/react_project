import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './SignIn.module.css'
import { UserContext } from '../../context/User';
import Image from '../../../public/hero1.jpg';

function SignIn() {
  const navigate = useNavigate();
  const {setUserToken}= useContext(UserContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
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
      password: string().min(8).max(30).required(),
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
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user);
        console.log(data);
        setUser({
          email: '',
          password: '',
        });

        if (data.message == "success") {
          toast.success('Login successfully', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        navigate("/");

        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
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
        
      } finally{
        setLoader(false);
      }
    }
  }


  return (
    <>
    <div className={Styles.bg} style={{ backgroundImage: `url(${Image})` }}>
    <div className={`${Styles.login} card`}>
      <h2 className="fs-lg">Log in</h2>
        <form onSubmit={handleSubmit}>
        <div className={Styles.wrapInput}>
          <label className={Styles.labelInput}>email</label>
          <input className={Styles.inp} type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter your email address'/>
          <p className='text-danger'>{errors.email}</p>
          </div>

          <div className={Styles.wrapInput}>
          <label className={Styles.labelInput}>password</label>
          <input className={Styles.inp} type="password" name="password" value={user.password} onChange={handleChange} placeholder='Enter your password'/>
          <p className='text-danger'>{errors.password}</p>
          </div>

          <button type="submit" className={Styles.loginBtn} disabled={loader ? 'disabled' : null}>{loader ? "wait..." : "submit"}</button>
          <div className="mt-4">
          <Link className="p-5 mt-5" to="/sendcode">Forget password?</Link>
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignIn