import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Students from './Students';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
        <Route element={<Dashboard />} path='/dashboard' />
        <Route element={<Students />} path='/students' />
      </Routes>
    </BrowserRouter>
  )
}