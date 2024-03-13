import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './SignUp.module.css'

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
    image: '',
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0]
    });
  };

  const validateData = async () => {
    const RegisterSchema = object({
      userName: string().min(5).max(25).required(),
      email: string().required(),
      password: string().min(8).max(30).required(),
      image: string().required(),
    });

    try {
      await RegisterSchema.validate(user, { abortEarly: false });
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

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(user);

    setLoader(true);
    if (await validateData()) {
      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('image', user.image);

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
        console.log(data);
        setUser({
          userName: '',
          email: '',
          password: '',
          image: '',
        });

        if (data.message == "success") {
          toast.success('account created ', {
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
          navigate("/login");
        }
      } catch (error) {

        if (error.response.status === "409") {
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
        }
      } finally {
        setLoader(false);
      }
    }
  }

  return (
    <>
      <div className={Styles.bg}>
        <div className={Styles.register}>
          <h2 className={`d-block text-center fs-1 text-dark pb-4`}>Register</h2>
          <form onSubmit={handleRegister} className={Styles.styleForm}>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>user Name</label>
              <input className={Styles.inp} type="text" name="userName" value={user.userName} onChange={handleChange} placeholder='Enter your name' />
              <p className='text-danger'>{errors.userName}</p>
            </div>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>email</label>
              <input className={Styles.inp} type="text" name="email" value={user.email} onChange={handleChange} placeholder='Enter your email address' />
              <p className='text-danger'>{errors.email}</p>
            </div>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>password</label>
              <input className={Styles.inp} type="text" name="password" value={user.password} onChange={handleChange} placeholder='Enter your password' />
              <p className='text-danger'>{errors.password}</p>
            </div>
            <div className={Styles.wrapInput}>
              <label className={Styles.labelInput}>image</label>
              <input className="form-control" type="file" name="image" onChange={handleImageChange} />
            </div>
            <div className='d-flex justify-content-center'>
              <button type="submit" className={Styles.registerBtn} disabled={loader ? 'disabled' : null}>{loader ? "wait..." : "register"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp