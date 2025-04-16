import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Courses from './pages/Courses/Courses'
import BookAppointment from './pages/BookApointment/BookApointment'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDashboard from './pages/MyDashBoard/MyDashboard'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import CourseVideos from './pages/CourseVideos/CourseVideos'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import OwnerRoute from './components/OwnerRoute/OwnerRoute'
import { AuthContext } from './context/AuthContext'
import WatchVideo from './pages/WatchVideo/WatchVideo'; // adjust path accordingly


const App = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "owner") {
      navigate("/adminpanel");
    } else if (user?.role === "user") {
      navigate("/");
    }
  }, [user, isAuthenticated]);
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
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/course-videos/:courseId" element={<CourseVideos />} />
        <Route
          path="/adminpanel"
          element={
            <OwnerRoute>
              <AdminPanel />
            </OwnerRoute>
          }
        />
        <Route path="/watch/:videoId" element={<WatchVideo />} />
      </Routes>
      <ToastContainer />
    </div>
  ) 
}

export default App