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
import Profile from './pages/Profile/Profile';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import ProductsWithCategory from './pages/ProductsWithCategory';
import Product from './pages/Product/Product';

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
            <Profile />
          </ProtectedRoutes>
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
        path: "/products",
        element: <Products />
      },
      {
        path: "/products/category/:id",
        element: <ProductsWithCategory/>
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
        path: "*",
        element: <NotFound />
      },
    ]
  },
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
