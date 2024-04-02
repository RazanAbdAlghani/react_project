import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../components/Loader/component/Loader';

function Profile() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader]= useState(true);

  const getProfile= async()=> {
    try{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
    {
      headers:{
        Authorization:`Tariq__${ localStorage.getItem('userToken')}`
      }
    });
    console.log(data.user);
    setUser(data.user);
    }catch(error){
      console.log(error);
      setError("Error to Loade Data!");
    }finally{
      setLoader(false);
    }
  }

  useEffect( ()=>{
    getProfile();
  },[]);

  if(loader){
    return<Loader />;
  }
  return (
    <>
  
  <h6 className="m-b-20 pb-2 pt-2 fw-semibold border-bottom ">Information</h6>
  <div className="row gap-4">
    <div className="col-sm-5">
      <p className="fw-bold">Name</p>
      <h6 className="text-muted fw-bolder">{user.userName}</h6>
    </div>
    <div className="col-sm-6">
      <p className="fw-bold">Email</p>
      <h6 className="text-muted f-w-400">{user.email}</h6>
    </div>
  </div>


    </>
  )
}

export default Profile