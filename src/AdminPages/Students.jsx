import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../AdminPages/CSS/Students.css'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import { FaEye } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"

const Students = () => {
    const [studentDetails, setStudentDetails] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [search, setSearch] = useState('')

    const fetchdetails = async () => {
        try {
            const res = await axios.get('/JSONData/students.json')
            setStudentDetails(Array.isArray(res.data) ? res.data : [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchdetails()
    }, [])

    const filteredStudents = studentDetails.filter((s) =>
        s.Name?.toLowerCase().includes(search.toLowerCase()) ||
        s.Email?.toLowerCase().includes(search.toLowerCase()) ||
        s.PhoneNumber?.toString().includes(search)
    )

    const handleView = (student) => {
        setSelectedStudent(student)
        setModalShow(true)
    }

    return (
        <DashboardLayout>
            <div className="students-header">
                <h3>All Students</h3>

                <div className="students-search">
                    <input
                        type="search"
                        placeholder="Search by name, email & phone number"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IoSearch className="search-icon" />
                </div>
            </div>

            <div className="student-container">
                <Table striped bordered hover responsive className="text-center mt-4">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((s, index) => (
                                <tr key={s.id ?? s._id ?? index}>
                                    <td>{index + 1}</td>
                                    <td>{s.Name}</td>
                                    <td>{s.Email}</td>
                                    <td>{s.PhoneNumber}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="sub-edit-btn"
                                            onClick={() => handleView(s)}
                                        >
                                            <FaEye size={22} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
                scrollable
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Student Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedStudent && (
                        <Table bordered responsive>
                            <tbody>
                                <tr>
                                    <th>Registration No.</th>
                                    <td>{selectedStudent.RegNo}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{selectedStudent.Name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{selectedStudent.Email}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{selectedStudent.PhoneNumber}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{selectedStudent.DOB}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{selectedStudent.Gender }</td>
                                </tr>
                                <tr>
                                    <th>Father Name</th>
                                    <td>{selectedStudent.FatherName}</td>
                                </tr>
                                <tr>
                                    <th>Mother Name</th>
                                    <td>{selectedStudent.MotherName }</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{selectedStudent.Address}</td>
                                </tr>
                                <tr>
                                    <th>Class</th>
                                    <td>{selectedStudent.currentClass}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
            </Modal>
        </DashboardLayout>
    )
}

export default Students
