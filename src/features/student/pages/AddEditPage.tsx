import { ChevronLeft } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import studentApi from 'api/studentApi'
import { Student } from 'models'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm'


export default function AddEditPage() {
  const {studentId} = useParams<{studentId: string}>()
  const isEdit = Boolean(studentId)
  const [student, setStudent] = useState<Student>()
  const navigate = useNavigate()
  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId as string)
        setStudent(response)
      } catch (error) {
        
      }
    })()
  },[studentId])
  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student
  } as Student
  const handleFormSubmit = async (formValues: Student) => {
    if(isEdit) {
      await studentApi.update(formValues)
    } else {  
      await studentApi.add(formValues)
    }
    navigate('/students')
  }
  return (
    <Box>
      <Link to="/students" style={{color:"black",textDecoration:"none"}}>
          <Typography variant='caption' style={{display: "flex", alignItems: "center"}}>
            <ChevronLeft/> &nbsp; Back to student list
          </Typography>
      </Link>
      <Typography variant='h4'>{isEdit ? "Update student info" : "Add new student" }</Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleFormSubmit}/>
        </Box>
      )}
    </Box>
  )
}