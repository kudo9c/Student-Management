import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import AddEditPage from 'features/student/pages/AddEditPage';
import ListPage from 'features/student/pages/ListPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route 
          path='/' 
          element={<PrivateRoute>
            <AdminLayout/>
          </PrivateRoute>}
        >
          <Route path='*' element={<NotFound/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='students' element={<StudentFeature/>}>
            <Route index element={<ListPage/>}/>
            <Route path='add' element={<AddEditPage/>}/>
            <Route path=':studentId' element={<AddEditPage/>}/>
          </Route>
        </Route>    
      </Routes>
    </div>
  );
}

export default App;
