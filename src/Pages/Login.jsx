import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../Pages/CSS/Login.css'

const Login = () => {
  const [user, setUser] = useState([])
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    const res = await axios.get("/JSONData/Users.json")
    setUser(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const sendOtp = async () => {
    let existingUser = user.find((u) => u?.email == email)
    if (email == existingUser?.email) {
      setStep(2)
    } else {
      toast.warn("User Not Found!")
    }
  }


  const verifyOtp = () => {
    let existingUser = user.find((u) => u?.email == email)
    console.log(existingUser.role);
    if (existingUser.otp == otp) {
      localStorage.setItem("token", existingUser.token)
      localStorage.setItem("role", existingUser.role)
      localStorage.setItem("number",existingUser?.mobile)
      toast.success('✅ Login Successfully');
      navigate('/dashboard')
    } else {
      toast.error("❌ Invalid OTP")
    }
  }

  return (
    <>
      <div className="login-outer">
        <h1>ERP-Login</h1><br />
        <span>Email :  </span>   <input type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} /> <br /> <br />

        {
          step == 2 ?
            <div>
              <span>OTP : </span>   <input type="text" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} /> <br /> <br />
            </div> : ""

        }

        {
          step == 2 ? <button onClick={verifyOtp}>Verify OTP</button> : <button onClick={sendOtp}>Send OTP</button>
        }


      </div>









    </>
  )
}

export default Login