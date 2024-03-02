import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './App.css'
import Root from './routes/Root';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import NotFound from './pages/NotFound/NotFound';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';

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
        path: "/cart",
        element: <Cart />
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
    </>
  )
}

export default App
