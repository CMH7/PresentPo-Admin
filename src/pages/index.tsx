import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Signin';

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Signin />} path='/' />
      </Routes>
    </BrowserRouter>
  )
}