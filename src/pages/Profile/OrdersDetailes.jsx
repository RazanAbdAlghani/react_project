import axios, { getAdapter } from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/component/Loader';

function OrdersDetailes() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {
          headers: {
            Authorization: `Tariq__${localStorage.getItem('userToken')}`
          }
        });
      console.log(data.orders);
      setOrders(data.orders);

    } catch (error) {
      console.log(error);
      setError("Error to Loade Data!");
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className="card border-0 p-4">
        <h6 className=" pb-2 pt-2 fw-semibold mb-3">Orders</h6>
        <div className="row border-bottom border-bottum mb-1 ">
          <div className="col-4">
            <p className="fw-bold col-4">Order ID</p>
          </div>
          <div className="col-3">
            <p className="fw-bold text-center">Address</p>
          </div>
          <div className="col-2">
            <p className="fw-bold text-center">Price</p>
          </div>
          <div className="col-3">
            <p className="fw-bold text-center">Status</p>
          </div>
        </div>
        {/*orders */}
        {orders.map(order =>
          <div className="d-flex border-bottom pb-3 pt-3 align-items-center flex-wrap" key={order._id}>
            <h6 className="text-muted fw-bolder col-4" style={{ fontSize: "11px" }}>{order._id}</h6>
            <h6 className="text-muted fw-bolder col-3 text-center" style={{ fontSize: "12px" }}>{order.address}</h6>
            <h6 className="text-muted fw-bolder col-2 text-center" style={{ fontSize: "12px" }}>{order.finalPrice}</h6>
            {order.status === "deliverd" ?
              <button className={`btn btn-outline-success  btn-sm bg-success-subtle col-3 d-fles justify-content-center text-center ms-5`} disabled style={{ width: "90px" }}>{order.status}</button>
              :
              <button className={`btn btn-outline-warning btn-sm bg-warning-subtle col-3 text-center ms-5 `} disabled style={{}}>{order.status}</button>
            }
          </div>
        )}

      </div>




    </>
  )
}

export default OrdersDetailes