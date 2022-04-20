import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { City, Student } from 'models';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { capitalizeString, getMarkColor } from 'utils';

export interface StudentTableProps {
    studentList: Student[]
    cityMap: {
      [key: string]: City,
    }
    onEdit?: (student: Student) => void
    onRemove?: (student: Student) => void
}

export default function StudentTable({studentList,cityMap,onEdit,onRemove}: StudentTableProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStudent,setSelectedStudent] = React.useState<Student>() 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student)
    setOpen(true)
  }
  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student)
    setOpen(false)
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row" width={310}>{student.id}</TableCell>
                <TableCell align="left">{student.name}</TableCell>
                <TableCell align="left">{capitalizeString(student.gender)}</TableCell>
                <TableCell align="left">
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell align="left">{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button size='small' color='primary' onClick={() => onEdit?.(student)} sx={{marginRight:'8px'}}>Edit</Button>
                  <Button size='small'  color='error' onClick={() => handleRemoveClick(student)} >Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Remove student dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove a student?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". <br/>
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color="error" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
