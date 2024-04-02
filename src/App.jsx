import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css'
import Root from './routes/Root';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductsWithCategory from './pages/CategoryProducts/ProductsWithCategory';
import Product from './pages/Product/Product';
import UserContextProvider from './context/User';
import SendCode from './pages/SendCode/SendCode';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Order from './pages/Order/Order';
import User from './routes/User/User';
import Profile from './pages/Profile/Profile';
import OrdersDetailes from './pages/Profile/OrdersDetailes';
import Contact from './pages/Profile/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />

      },
      {
        path: "/profile",
        element:
          <ProtectedRoutes>
            <User />
          </ProtectedRoutes>,
        children: [
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/profile/contact",
            element: <Contact />
          },
          {
            path: "/profile/order",
            element: <OrdersDetailes />
          },
        ]
      },
      {
        path: "/categories",
        element: <Categories />
      },
      {
        path: "/login",
        element: <SignIn />
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/sendcode",
        element: <SendCode />
      },
      {
        path: "/forgetPass",
        element: <ForgetPassword />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/products/category/:id",
        element: <ProductsWithCategory />
      },
      {
        path: "/products/:product_id",
        element: <Product />
      },
      {
        path: "/cart",
        element:
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
      },
      {
        path: "/order",
        element:
          <ProtectedRoutes>
            <Order />
          </ProtectedRoutes>
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  },
]);

function App() {


  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
