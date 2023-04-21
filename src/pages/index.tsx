import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';
import AddSchedule from './AddSchedule';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
        <Route element={<AddSchedule />} path='/addschedule' />
      </Routes>
    </BrowserRouter>
  )
}