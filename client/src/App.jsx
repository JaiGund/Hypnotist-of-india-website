import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Courses from './pages/Courses/Courses'
import BookAppointment from './pages/BookApointment/BookApointment'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDashboard from './pages/MyDashBoard/MyDashboard'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/bookapointment' element={<BookAppointment />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/mydashboard' element={<MyDashboard/>} />
      </Routes>
      <ToastContainer />
    </div>
  ) 
}

export default App