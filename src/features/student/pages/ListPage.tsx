import { Box, Button, LinearProgress, Pagination, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import studentApi from 'api/studentApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectCityList, selectCityMap } from 'features/city/citySlice'
import { ListParams, Student } from 'models'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StudentFilters from '../components/StudentFilters'
import StudentTable from '../components/StudentTable'
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice'

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    paddingTop: "8px"
  },
  titleContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px"
  },
  loading: {
    position: "absolute",
    top: "-8px",
    width: "100%"
  }
}))

export default function ListPage() {
  const classes = useStyles()
  const navigate = useNavigate()
  const studentList = useAppSelector(selectStudentList)
  const pagination = useAppSelector(selectStudentPagination)
  const filter = useAppSelector(selectStudentFilter)
  const loading = useAppSelector(selectStudentLoading)
  const cityMap = useAppSelector(selectCityMap)
  const cityList = useAppSelector(selectCityList)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  },[dispatch, filter])
  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page,
    }))
  }
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter))
  }
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter))
  }
  const handleRemoveStudent = async (student: Student) => {
    console.log("handle remove",student.name)
    try {
      await studentApi.remove(student?.id || '')
      dispatch(studentActions.setFilter({...filter}))
    } catch (error) {
      
    }
  }
  const handleEditStudent = async (student: Student) => {
    navigate(`${student.id}`)
  }
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading}/>}
      <Box className={classes.titleContainer}>
        <Typography variant='h4'>Students</Typography>
        <Link to="add" style={{textDecoration:"none"}}>
          <Button variant='contained' color='primary' >Add new student</Button>
        </Link>
      </Box>
      {/* Filters + Search */}
      <Box mb={3}>
        <StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange} onChange={handleFilterChange}/>
      </Box>
      {/* Student Table */}
      <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent}/>
      {/* Pagination */}
      <Box my={2} display="flex" justifyContent="center">
        <Pagination 
          color='primary' 
          count={Math.ceil(pagination._total / pagination._limit)} 
          page={pagination._page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  )
}