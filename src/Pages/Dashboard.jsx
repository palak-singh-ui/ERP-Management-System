import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'
import '../Pages/CSS/Dashboard.css'
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

const Dashboard = () => {
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem("token")
    setRole(localStorage.getItem("role"))
    if (!token) {
      navigate('/dashboard')
    }
  }, [])



  return (
    <>
      <DashboardLayout>
        {
          role == "admin" ? (
            <>
              <div className="dashboard-card-outer">
                <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                      <PiStudentFill/>
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                    <h3>100+</h3>
                    <p>Students Registered</p>
                  </div>
                </div>

                <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                        <FaChalkboardTeacher/>
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                    <h3>50+</h3>
                    <p>Teachers Applicable</p>
                  </div>
                </div>


                <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                      < SiGoogleclassroom/>
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                    <h3>40+</h3>
                    <p>Classes Provided</p>
                  </div>
                </div>
              </div>
            </>



          ) : role == "supperAdmin " ? (
            <h1>This is supper Admin Page</h1>
          ) : (
            <h1>
              This is Teacher Page
            </h1>
          )
        }










      </DashboardLayout>
    </>
  )
}

export default Dashboard