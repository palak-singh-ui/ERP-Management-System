import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../AdminPages/CSS/Registration.css'
import axios from 'axios'
import { BsPersonFillAdd } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa";


const Registration = () => {
  const [classDetails, setClassDetails] = useState([])
  const [selectedClass, setSelectedClass] = useState('')

  let selectedFee = classDetails.find((t) => {
    return t.class === selectedClass
  })

  const totalFee = selectedFee?.fee?.reduce(
    (acc, f) => acc + Number(f.Amount), 0
  )

  const fetchClassDetails = async () => {
    try {
      const res = await axios.get('/JSONData/classdetails.json')
      setClassDetails(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchClassDetails()
  }, [])


  function handleSubmit(){
    alert("Please enter your details")
  }



  return (
    <DashboardLayout>
      <div className="registration-info">
        <div>< BsPersonFillAdd size={37} /> Add Students</div>
        <div className="registration-details">
          <MdDateRange size={22} />  <span>Registration Date : </span>
          <span>{new Date().toISOString().split('T')[0]}</span>
         &emsp; &emsp;  &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;
          < PiNotebookFill size={22} /> <span> Registration Number : </span>
          <span> Auto</span>
      &emsp; &emsp;  &emsp;  &emsp; &emsp;   &emsp;  &emsp; &emsp;
          <MdDateRange size={22} /> <span>  Session : </span>
          <span>2026-2027</span>
        </div>
      </div>

      <div className="registration-container">
        <div className="personal-info">
          <h2><IoPersonSharp size={27} /> Personal Information</h2>

          <label>Student's Name :</label>
          <input type="text" placeholder="Enter Your Name" />

    

          <label>Email :</label>
          <input type="text" placeholder="Enter Your Email Id" />
          <br /><br />

          <label>Father's Name :</label>
          <input type="text" placeholder="Enter Your Father Name" />


          <label>Mother's Name :</label>
          <input type="text" placeholder="Enter Your Mother Name" />
          <br /><br />


          <label>Phone Number :</label>
          <input type="number" placeholder="Enter Your Phone Number" />


          <label>Aadhar Number :</label>
          <input type="number" placeholder="Enter Your Aadhar Number" />
          <br /><br />
          <label>Address :</label>
          <input type="text" placeholder="Address" />


          <label>Pincode :</label>
          <input type="text" placeholder="Pincode" />
          <br /><br />
          <label>DOB :</label>
          <input type="date" />



          <label>Photo :</label>
          <input type="file" />
          <br /><br />

          <label>Category :</label>
          <select>
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC/ST">SC/ST</option>
          </select>


          <div className='select-gender'>
            <label>Gender :</label>
            <input type="radio" name="gender" value="Male" /> Male
            <input type="radio" name="gender" value="Female" /> Female
            <input type="radio" name="gender" value="Others" /> Others
          </div>
          <br /><br />

        </div>
      </div>

      <div className="school-container">
        <h3><FaSchool size={27} /> Last School Information</h3>
        <div className="school-info">
          <label>Last School Name :</label>
          <input type="text" placeholder="Enter Last School Name" />

          <label>Last School Class :</label>
          <input type="text" placeholder="Enter Last School Class" />

          <label>Last School Code :</label>
          <input type="text" placeholder="Enter Last School Code" />

          <label>Last School Total Gained Number :</label>
          <input type="text" placeholder="Enter Last School Gained Number" />

        </div>

      </div>

      <div className="other-info">
        <h3><MdClass size={26} /> Other Information</h3>

        <label>Class :</label><br/>
        <select
          onChange={(e) => setSelectedClass(e.target.value)}
          value={selectedClass}
        >
          <option value="">Select Class</option>
          {classDetails.map((c) => (
            <option key={c.id} value={c.class}>
              {c.class}
            </option>
          ))}
        </select>
      </div>

      <div className="fee-info">
        <div className="fee-text">
          <h3>< RiMoneyRupeeCircleFill size={27} /> Fee Information</h3>
        </div>

        <div className="fee-details">
          {
            selectedFee?.fee?.map((f, index) => (
              <div key={f.id ?? index}>
                <label className='fee-type'>{f.FeeType} </label>
                <span className='amount'>₹{f.Amount}</span>
                <span className='payment-type'> {f.PaymentType}</span>
              </div>
            ))}

          <div className="total-fee">
            <h5>Total Fee<br />
              <span>  ₹{totalFee || 0}</span></h5>
          </div>


        </div><br />
        <button type="button" className='submit-btn' onClick={handleSubmit}> <FaLocationArrow size={15} /> Submit</button>

      </div>

    </DashboardLayout>
  )
}

export default Registration

