import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { object, string } from 'yup';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const navigate = useNavigate();

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
          toast.success('Log in succesfully ', {
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
        navigate("/");

        localStorage.setItem("userToken", data.token);
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
      <h2>Log in</h2>
      <div className='container-contact100'>
        <form onSubmit={handleSubmit}>
          <label>email</label>
          <input className="form-control" type="text" name="email" value={user.email} onChange={handleChange} />
          <p>{errors.email}</p>
          <label>password</label>
          <input className="form-control" type="text" name="password" value={user.password} onChange={handleChange} />
          <p>{errors.password}</p>
         

          <button type="submit" disabled={loader ? 'disabled' : null}>{loader ? "wait..." : "submit"}</button>
        </form>
      </div>
    </>
  )
}

export default SignIn