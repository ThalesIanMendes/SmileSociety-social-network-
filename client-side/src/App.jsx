import { Routes, Route } from 'react-router-dom';
import React from 'react'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Private } from './pages/Private';
import { RequireAuth } from './contexts/Auth/RequireAuth';

function App(){
  return (
    <div className="body">
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/private' element={ <RequireAuth><Private/></RequireAuth> } />
      </Routes>
    </div>
  );
}
export default App
