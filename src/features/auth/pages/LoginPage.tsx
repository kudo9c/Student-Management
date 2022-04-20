import { Button, CircularProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: '24px'

  }
}));

export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLogging = useAppSelector(state => state.auth.logging)
  const handleLoginClick = () => {
    dispatch(authActions.login({
      username: '',
      password: '',
    }))
    navigate('/dashboard')
  }
  return <div className={classes.root}>
    <Paper elevation={1} className={classes.box}>
      <Typography variant='h5' component="h1">Student Management</Typography>
      <Box mt={4} >
        <Button variant='contained' fullWidth color='primary' onClick={handleLoginClick}>
          {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
        </Button>
      </Box>
    </Paper>
  </div>;
}