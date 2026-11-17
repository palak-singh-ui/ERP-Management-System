import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../TeachersPages/CSS/TeachersProfile.css'
import { IoPersonSharp } from "react-icons/io5"
import axios from 'axios'

const TeachersProfile = () => {
  const [teachersRole, setTeachersRole] = useState([])

  const fetchTeachersDetails = async () => {
    try {
      const res = await axios.get('/JSONData/Users.json')
      setTeachersRole(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTeachersDetails()
  }, [])

  const teachers = teachersRole.filter(
    (t) => t.role?.toLowerCase() === 'teacher'
  )

  return (
    <DashboardLayout>
      <div className="profile-header">
        <h3>All Teachers</h3>
        <p>All Teachers & Their Professional Details</p>
      </div>

      <div className="teachers-profile-card-outer">
        {teachers.map((t, index) => (
          <div
            className="profile-card"
            key={t.id ?? t._id ?? index}
          >
            <div className="profile-logo-outer">
              <div className="profile-logo">
                {t.name
                  ? t.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                  : <IoPersonSharp />}
              </div>
            </div>

            <div className="profile-details">
              <h4>{t.name || 'Name not available'}</h4>
              <p>{t.email || 'Email not available'}</p>
              <p>{t.mobile || t.phone || 'Phone not available'}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default TeachersProfile
