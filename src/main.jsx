import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from '../src/pages/App'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import Auth from './Auth'
import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import SecondPage from './pages/SecondPage'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: `/register`,
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: `/Home`,
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: `/second`,
    element: <SecondPage />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth>
      <RouterProvider router={router} />
      <ToastContainer />
    </Auth>

  </React.StrictMode>,
)
