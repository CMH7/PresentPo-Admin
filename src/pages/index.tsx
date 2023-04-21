import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import AddStudent from './AddStudent';
import EditFaculty from './EditFaculty';
import AddFaculty from './AddFaculty';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<AddStudent />} path='/addstudent' />
        <Route element={<EditFaculty />} path='/editfaculty' />
        <Route element={<AddFaculty />} path='/addfaculty' />
      </Routes>
    </BrowserRouter>
  )
}