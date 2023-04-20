import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import AddSubject from './AddSubject';
import EditAdmin from './EditAdmin';


export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<EditAdmin />} path='/editadmin' />
        <Route element={<AddSubject />} path='/addsubject' />
      </Routes>
    </BrowserRouter>
  )
}