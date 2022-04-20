import { Boy, Girl, PeopleAlt, School } from '@mui/icons-material'
import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import StatisticItem from './components/StatisticItem'
import StudentRankingList from './components/StudentRankingList'
import Widget from './components/Widget'
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudentList, selectLowestStudentList, selectRankingByCityList } from './dashboardSlice'

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  loading: {
    position: "absolute",
    top: "-8px",
    width: "100%",
  }
}))

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectDashboardLoading)
  const statistics = useAppSelector(selectDashboardStatistics)
  const highestStudentList = useAppSelector(selectHighestStudentList)
  const lowestStudentList = useAppSelector(selectLowestStudentList)
  const rankingByCityList = useAppSelector(selectRankingByCityList)
  const classes = useStyles()
  useEffect(() => {
    dispatch(dashboardActions.fetchData())
  },[dispatch])
  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading}/>}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<Boy fontSize='large' color='primary'/>} label="male" value={statistics.maleCount}/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<Girl fontSize='large' color='primary'/>} label="female" value={statistics.femaleCount}/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<School fontSize='large' color='primary'/>} label="mark >= 8" value={statistics.highMarkCount}/> 
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem icon={<School fontSize='large' color='primary'/>} label="mark <= 5" value={statistics.lowMarkCount}/>
        </Grid>
      </Grid>
      {/* All students ranking */}
      <Box mt={4}>
        <Typography variant='h4'>All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title='Student with highest mark'>
                <StudentRankingList studentList={highestStudentList}></StudentRankingList>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title='Student with lowest mark'>
              <StudentRankingList studentList={lowestStudentList}></StudentRankingList>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant='h4'>Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map(ranking => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
              <Widget title={ranking.cityName}>
                <StudentRankingList studentList={ranking.rankingList}></StudentRankingList>
              </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}