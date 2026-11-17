import React, { useEffect, useState } from 'react'
import '../Components/CSS/DashboardLayout.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdSubject } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutSharp } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { BsPersonCircle } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";




const DashboardLayout = ({ children }) => {

  const [role, setRole] = useState('')
  const [isClose, setIsClose] = useState(false)
  const navigate = useNavigate()

  const handleSidebar = () => {
    setIsClose(!isClose)
  }

  useEffect(() => {
    setRole(localStorage.getItem('role') ?? "Guest")
  }, [])

 const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      Swal.fire({
        title: "Logout!",
        text: "Logout Successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate("/Login");
      });
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "You are still Logged in!",
        icon: "info"
      });
    }
  });
};
  

  const tabs = {
   supperAdmin: [
      { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
      { title: "Admins", path: "/admins", icon: RiAdminFill }
    ],
    admin: [
      { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
      { title: "Registration", path: "/registration", icon: IoPersonAdd },
      { title: "Fee", path: "/fee", icon: FaRupeeSign },
      { title: "Teachers", path: "/teachers", icon: FaChalkboardTeacher },
      { title: "Students", path: "/Students", icon: PiStudentBold },
      { title: "Class", path: "/class", icon: SiGoogleclassroom },
      { title: "Subjects", path: "/subjects", icon: MdSubject },
      { title: "Settings", path: "/admin-settings", icon: IoSettings },
    ],
    teacher: [
       { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
      { title: "Fee", path: "/fee", icon: FaRupeeSign },
      { title: "Students", path: "/Students", icon: PiStudentBold },
      { title: "My Classes", path: "/my-class", icon: SiGoogleclassroom },
      { title: "My Subjects", path: "/my-subjects", icon: MdSubject },
      { title: "Profile", path: "/teachersprofile", icon: VscAccount },
    ]
  }

  const roleTabs = tabs[role] || [];
  console.log(roleTabs);

  return (
    <>
      <div className="dashboardLayout-container">
        <div className={`sidebar ${isClose ? "sidebar-close" : ""}`}>
          <div className="logo">
            <img src="/Images/logo.png" alt="" className='logo-erp-image' />
          </div>
          <div className="sidebar-items">

            {roleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) =>
                    `navlinks ${isActive ? "sidebar-active" : ""}`}>
                  <Icon />
                  {!isClose && (
                    <span>{tab.title}</span>
                  )}
                </NavLink>
              );
            })}


          </div>
          <div className="logout-outer">
            <button className='sidebar-logout' onClick={handleLogout}>Logout< IoLogOutSharp size={22} /></button>
          </div>
        </div>
        <div className="dashboardLayout-main">
          <div className="dashboardLayout-header">
            <button onClick={handleSidebar}>X</button>
            <h1>Welcome Back! {role} </h1>
            <div className="admin-profile">
              <BsPersonCircle className='profile' />
              <span className='admin'>Admin</span>< FaChevronDown />
            </div>
          </div>
          <div className="dashboardLayout-content">
            {children}
          </div>
        </div>
      </div>


    </>
  )
}

export default DashboardLayout