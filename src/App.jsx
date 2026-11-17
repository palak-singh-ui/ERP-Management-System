import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import Registration from './AdminPages/Registration'
import Teachers from './AdminPages/Teachers'
import AdminSettings from './AdminPages/AdminSettings'
import Fee from './AdminPages/Fee'
import Subjects from './AdminPages/Subjects'
import AdminClasses from './AdminPages/AdminClasses'
import Students from './AdminPages/Students'
import TeacherClasses from './TeachersPages/TeacherClasses'
import TeachersProfile from './TeachersPages/TeachersProfile'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/admin' element={<Admin/>} /> */}


          <Route path='/admin-settings' element={<AdminSettings/>} />
          <Route path='/fee' element={<Fee/>} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/teachers' element={<Teachers/>} />
          <Route path='/subjects' element={<Subjects/>} />
          <Route path='/class' element={<AdminClasses/>} />
          <Route path='/students' element={<Students/>} />



          <Route path='/my-class' element={<TeacherClasses/>}/>
          <Route path='/teachersprofile' element={<TeachersProfile/>}/>

        </Routes>
      </Router>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App