import { Box } from '@mui/material'
import { useAppDispatch } from 'app/hooks'
import { cityActions } from 'features/city/citySlice'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'


export default function StudentFeature() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(cityActions.fetchCityList())
  },[dispatch])
  return (
    <Box>
      <Outlet/>
    </Box>
  )
}