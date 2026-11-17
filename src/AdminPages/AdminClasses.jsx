import React, { use, useEffect } from 'react'
import '../AdminPages/CSS/AdminClasses.css'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { FaEye } from "react-icons/fa";



const AdminClasses = () => {
  const [modalShow, setModalShow] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [subjects, setSubjects] = useState([])

  const [viewModal, setViewModal] = useState(false)
  const [viewData, setViewData] = useState([])

  const [classes, setClasses] = useState([])
  const FetchClasses = async () => {
    try {
      const res = await axios.get('/JSONData/classdetails.json')
      setClasses(res.data)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    FetchClasses()
  }, [])


  const handleShow = (data) => {
    setViewData(data)
    setViewModal(true)
    console.log(data)
  }


  const [rows, setRows] = useState([
    { subjects: "", teachers: "" }
  ])

  const fetchData = async () => {
    try {
      const res = await axios.get('/JSONData/Subjects.json')
      setSubjects(res.data)

      const res1 = await axios.get('/JSONData/Teachers.json')
      setTeachers(res1.data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const addMore = () => {
    setRows([...rows, { subjects: "", teachers: "" }])
  }



const addMoreFee = ()=>{
   
}


  return (
    <>
      <DashboardLayout>

        <div className='all-classes-header'>
          <h3>All Classes</h3>
          <button className='all-create-class' onClick={() => setModalShow(true)}>Create Class</button>
        </div>

        <div className="all-classes-table">
          <Table cellPadding='0' cellSpacing='0' striped bordered>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                classes.map((c) => (
                  <tr>
                    <td>{c._id}</td>
                    <td>{c.class}</td>
                    <td>
                      <button className='sub-edit-btn'><FaEdit size={22} /></button>
                      <button className='sub-dlt-btn'><ImBin size={22} /></button>
                      <button className='sub-edit-btn' onClick={() => handleShow(c)}>
                        <FaEye size={22} /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>


        <Modal show={modalShow} centered size='lg'>
          <Modal.Header>
            &emsp;  &emsp; &emsp; 
            <h3>Create Class</h3> 
             &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;  &emsp;  &emsp; &emsp;
            <button onClick={() => setModalShow(false)} className='class-close-btn'>X</button>
          </Modal.Header>
          <Modal.Body className='class-body'>
            <input type="text" placeholder='Enter Your Class' />
            {
              rows.map((index, data) => {
                return (
                  <div key={index}>
                    <select className='sub-select'>
                      <option>Select Subjects</option>
                      {
                        subjects.map((s) => (
                          <option value={s._id}>{s.subject}</option>
                        ))
                      }
                    </select>
                    &emsp;
                    <select className='teach-select'>
                      <option>Select Teachers</option>

                      {
                        teachers.map((t) => (
                          <option value={t.id}> {t.name}</option>
                        ))
                      }
                    </select>

                  </div>
                )
              })
            }

            <button onClick={addMore} className='add-more-btn'>Add More</button>
            <br />
            <br />

            <h1>Fee</h1>

            <select className='teach-select'>
              <option value="--">Select Fee Type</option>
              <option value="">Tution fee</option>
              <option value="">Exam Fee</option>
              <option value="">Admission Fee</option>
              <option value="">Other</option>
            </select>
            <button onClick={addMoreFee} className='add-more-btn'>Add More</button>

            <input type="text" name='fee' placeholder='Enter fee in rupees' />
            <input type="radio" value="monthly" />Monthly
            <input type="radio" value="yearly" />Yearly
            <input type="radio" value="onetime" />One-Time
            <br /><br />
            <button className='class-save-btn'>Save</button>
          </Modal.Body>
        </Modal>



        <Modal show={viewModal}>
          <Modal.Header>
            &emsp;  &emsp; &emsp;
            <h4> {viewData.class}</h4>
            &emsp;
            <button onClick={() => setViewModal(false)} className='class-close-btn'>X</button>
          </Modal.Header>
          <Modal.Body>
            <Table cellPadding='0' cellSpacing='0' striped bordered style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Subject's Name</th>
                  <th>Teacher's Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  viewData?.subjects?.map((d) => (
                    <tr>
                      <td>{d.subject}</td>
                      <td>{d.teachers}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <h3>Fee</h3>
               <Table striped bordered style={{textAlign:"center"}}>

                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Fee Amount</th>
                    <th>Payment Type</th>
                  </tr>
                </thead>

                <tbody>
                   {
                  viewData?.fee?.map((f) => (
                    <tr>
                      <td>{f.FeeType}</td>
                      <td>{f.Amount}</td>
                      <td>{f.PaymentType}</td>
                    </tr>
                  ))
                }
                </tbody>
               </Table>

          </Modal.Body>
        </Modal>
      </DashboardLayout>
    </>
  )
}

export default AdminClasses