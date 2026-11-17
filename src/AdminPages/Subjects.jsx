import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../AdminPages/CSS/Subjects.css'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Subjects = () => {
  const [showModal, setShowModal] = useState(false)
  const [subjects, setSubject] = useState([])


  const fetchSubjects = async () => {
    try {
      const res = await axios.get('/JSONData/Subjects.json')
      console.log(res);
      setSubject(res.data)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  return (
    <>
      <DashboardLayout>
        <div className="all-sub-header">
          <h3>All Subjects</h3>
          <button className='sub-choose-btn' onClick={() => setShowModal(true)}>Choose Subjects</button>
        </div>

        <Table className='sub-table' cellPadding='0' cellSpacing='0' striped bordered >
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Subjects Name</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>
            {
              subjects.map((sub) => (
                <tr>
                  <td>{sub._id}</td>
                  <td>{sub.subject}</td>
                  <td>
                    <button className='sub-edit-btn'><FaEdit size={22} /></button>
                    <button className='sub-dlt-btn'><ImBin size={22} /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </Table>





        <Modal show={showModal} centered>
          <Modal.Header>
            <h3>Choose Subjects</h3>
            <button onClick={() => setShowModal(false)} className='sub-close-btn'> X</button>
          </Modal.Header>

          <Modal.Body className='sub-body'>
            <input type="text" placeholder='Enter Subject Name...' />
            <button>Add</button>
          </Modal.Body>

        </Modal>

      </DashboardLayout>
    </>
  )
}

export default Subjects