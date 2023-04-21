import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import EditClass from './EditClass';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
import EditFaculty from './EditFaculty';
import AddFaculty from './AddFaculty';
import AddClass from './AddClass';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<EditClass />} path='editclass' />
        <Route element={<EditStudent />} path='/editstudent' />
        <Route element={<AddStudent />} path='/addstudent' />
        <Route element={<EditFaculty />} path='/editfaculty' />
        <Route element={<AddFaculty />} path='/addfaculty' />
        <Route element={<AddClass />} path='/addclass' />
      </Routes>
    </BrowserRouter>
  )
}