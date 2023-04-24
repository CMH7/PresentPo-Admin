import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import EditSchedule from './EditSchedule';
import AddSchedule from './AddSchedule';
import EditAdmin from './EditAdmin';
import EditStudent from './students/EditStudent';
import AdminDashboard from './AdminDashboard';

// students pages 
import ManageStudents from './students/ManageStudents';
import AddStudent from './students/AddStudent';

// faculties pages
import ManageFaculties from './faculty/ManageFaculties';
import AddFaculty from './faculty/AddFaculty';
import EditFaculty from './faculty/EditFaculty';

// subjects pages
import ManageSubjects from './subjects/ManageSubjects';
import AddSubject from './subjects/AddSubject';
import EditSubject from './subjects/EditSubject';

// class pages
import ManageClasses from './clss/ManageClasses';
import AddClass from './clss/AddClass';
import EditClass from './clss/EditClass';
import ManageClassStudents from './clss/ManageCLassStudents';

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
        <Route element={<EditSubject />} path='/admindashboard/managesubjects/editsubject/:id' />

        {/* faculty routes  */}
        <Route element={<ManageFaculties />} path='/admindashboard/managefaculties' />
        <Route element={<EditFaculty />} path='/admindashboard/managefaculties/editfaculty/:id' />
        <Route element={<AddFaculty />} path='/addfaculty' />

        {/* class routes  */}
        <Route element={<ManageClasses />} path='/admindashboard/manageclasses' />
        <Route element={<AddClass />} path='/admindashboard/manageclasses/addclass' />
        <Route element={<EditClass />} path='/admindashboard/manageclasses/editclass/:id' />
        <Route element={<ManageClassStudents />} path='/admindashboard/manageclasses/:id/manageclassstudents' />

        <Route element={<EditSchedule />} path='/editschedule' />
        <Route element={<AddSchedule />} path='/addschedule' />
        <Route element={<EditAdmin />} path='/editadmin' />
      </Routes>
    </BrowserRouter>
  )
}