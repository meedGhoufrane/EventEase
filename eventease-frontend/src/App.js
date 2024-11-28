import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Router, Routes, Route
import Register from './components/auth/Register';  // Import the Register component
import Login from './components/auth/Login';  // You can add a Login page if needed
import Dashboard from './components/auth/Dashboard/Dashboard';  // A placeholder Dashboard component, create it as needed

function App() {
  return (
    <Router>  
      <div className="App">
        <Routes>  
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/dashboard" element={<Dashboard />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
