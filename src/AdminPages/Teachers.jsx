import React, { useEffect } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../AdminPages/CSS/Teachers.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Teachers = () => {
  const [modalShow, setModalShow] = useState(false)
  const [teachers, setTeacher] = useState([])


  const fetchTeachers = async () => {
    try {
      const res = await axios.get('/JSONData/Teachers.json')
      console.log(res);
      setTeacher(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])
  return (
    <>
      <DashboardLayout>
        <div className='all-teachers-header'>
          <h3>All Teachers</h3>
          <button className='all-create-teachers' onClick={() => setModalShow(true)}>Create Teachers</button>
        </div>

        <Table className='teacher-table' cellPadding='0' cellSpacing='0' striped bordered>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Subjects</th>
              <th>Teacher's Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {
              teachers.map((teacher) => (
                <tr>
                  <td>{teacher._id}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.phone}</td>

                  <td>
                    <button className='tech-edit-btn'><FaEdit size={22} /></button>
                    <button className='tech-dlt-btn'><ImBin size={22} /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </Table>








        <Modal show={modalShow} centered>
          <Modal.Header>
            <h3>Create Teachers</h3>
            <button onClick={() => setModalShow(false)} className='teachers-close-btn'>X</button>
          </Modal.Header>

          <Modal.Body className='teachers-body'>
            <input type="text" placeholder='Enter Name....' />
            <input type="text" placeholder='Enter Mobile Number....' />
            <button>Add</button>
          </Modal.Body>



          <Modal.Footer>
          </Modal.Footer>
        </Modal>

      </DashboardLayout>
    </>
  )
}

export default Teachers