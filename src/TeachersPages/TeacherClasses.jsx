import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import { Table } from 'react-bootstrap'

const TeacherClasses = () => {
const [classes, setClasses] = useState([])

useEffect(() => {
  let number = localStorage.getItem("number")
 let arr = []
  const fetchClasses = async () => {
    try {
      const res = await axios.get('/JSONData/classdetails.json')

     

      res.data.forEach((item) => {
        item?.Subjects?.forEach((s) => {
          if (s.TeacherPhone == number) {
            arr.push({class: item.class, Subject: s.Subject})
          }
        })
      })

      setClasses(arr)
    } catch (error) {
      console.log(error)
    }
  }

  fetchClasses()
}, [])

console.log(classes)

  return (
    <>
      <DashboardLayout>
          <Table cellPadding='0' cellSpacing='0' bordered striped>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Class</th>
                <th>Subjects</th>
              </tr>
            </thead>

            <tbody>
              {
                classes.map((data,i)=>(
                 <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.class}</td>
                  <td>{data.Subject}</td>
                 </tr>
                ))
              }
            </tbody>
          </Table>
      </DashboardLayout>
    </>
  )
}

export default TeacherClasses