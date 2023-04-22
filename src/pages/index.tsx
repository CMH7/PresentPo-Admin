import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import EditSchedule from './EditSchedule';
import AddSchedule from './AddSchedule';
import EditAdmin from './EditAdmin';
import EditSubject from './EditSubject';
import AddSubject from './AddSubject';
import EditClass from './EditClass';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
import EditFaculty from './EditFaculty';
import AddFaculty from './AddFaculty';
import AdminDashboard from './AdminDashboard';
import AddClass from './AddClass';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<EditSchedule />} path='/editschedule' />
        <Route element={<AddSchedule />} path='/addschedule' />
        <Route element={<EditAdmin />} path='/editadmin' />
        <Route element={<EditSubject />} path='/editsubject' />
        <Route element={<AddSubject />} path='/addsubject' />
        <Route element={<EditClass />} path='editclass' />
        <Route element={<EditStudent />} path='/editstudent' />
        <Route element={<AddStudent />} path='/addstudent' />
        <Route element={<EditFaculty />} path='/editfaculty' />
        <Route element={<AddFaculty />} path='/addfaculty' />
        <Route element={<AdminDashboard />} path='/admindashboard' />
        <Route element={<AddClass />} path='/addclass' />
      </Routes>
    </BrowserRouter>
  )
}