import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Register from './components/auth/Register';  
import Login from './components/auth/Login';  
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>  
      <div className="App">
      <ToastContainer />
        <Routes>  
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/Login" element={<Login />} />  
          <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
