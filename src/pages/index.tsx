import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Students from './Students';
import EditSchedule from './EditSchedule';
import AddSchedule from './AddSchedule';
import EditAdmin from './EditAdmin';
import EditSubject from './EditSubject';
import AddSubject from './subjects/AddSubject';
import EditClass from './EditClass';
import EditStudent from './students/EditStudent';
import EditFaculty from './EditFaculty';
import AddFaculty from './faculty/AddFaculty';
import AdminDashboard from './AdminDashboard';
import AddClass from './AddClass';

// students pages 
import ManageStudents from './students/ManageStudents';
import AddStudent from './students/AddStudent';
import ManageSubjects from './subjects/ManageSubjects';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<AdminDashboard />} path='/admindashboard' />

        {/* students routes  */}
        <Route element={<ManageStudents />} path='/admindashboard/managestudents' />
        <Route element={<AddStudent />} path='/admindashboard/managestudents/addstudent' />
        <Route element={<EditStudent />} path='/admindashboard/managestudents/editstudent/:id' />
        
        {/* subject routes  */}
        <Route element={<ManageSubjects />} path='/admindashboard/managesubjects' />
        <Route element={<AddSubject />} path='/admindashboard/managesubjects/addsubject' />

        <Route element={<Students />} path='/students' />
        <Route element={<EditSchedule />} path='/editschedule' />
        <Route element={<AddSchedule />} path='/addschedule' />
        <Route element={<EditAdmin />} path='/editadmin' />
        <Route element={<EditSubject />} path='/editsubject' />
        <Route element={<EditClass />} path='editclass' />
        <Route element={<EditFaculty />} path='/editfaculty' />
        <Route element={<AddFaculty />} path='/addfaculty' />
        <Route element={<AddClass />} path='/addclass' />
      </Routes>
    </BrowserRouter>
  )
}