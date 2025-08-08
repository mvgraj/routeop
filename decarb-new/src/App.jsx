

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {SchoolDashboard} from './layouts/SchoolDashboard';
import {UserDashboard }from './layouts/UserDashboard';
import { Auth } from './layouts';

// import { SchoolDashboard, UserDashboard, Auth } from '../src/layouts'; 
import { SignIn  } from './pages/auth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/school-dashboard/*" element={<SchoolDashboard />} />
      <Route path="/user-dashboard/*" element={<UserDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
