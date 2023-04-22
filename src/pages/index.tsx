import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import EditFaculty from './EditFaculty';
import AddFaculty from './AddFaculty';
import AdminDashboard from './AdminDashboard';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<EditFaculty />} path='/editfaculty' />
        <Route element={<AddFaculty />} path='/addfaculty' />
        <Route element={<AdminDashboard />} path='/admindashboard' />
      </Routes>
    </BrowserRouter>
  )
}