import { Box, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "16px",
        border: "1px solid palette.provider"
    }
}))

export interface WidgetProps {
    title: string
    children: any
}

export default function Widget({title, children}: WidgetProps) {
    const classes = useStyles()
  return (
    <Paper className={classes.root}>
        <Typography variant='button'>{title}</Typography>
        <Box mt={2}>
            {children}
        </Box>
    </Paper>
  )
}