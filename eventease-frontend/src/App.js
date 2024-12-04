import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Register from './components/auth/Register';  
import Login from './components/auth/Login';  
import Dashboard from './components/Dashboard/Dashboard';
import EventManagement from './components/events/EventManagement';
import ManageParticipant from './components/Participants/ManageParticipant';  

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>  
      <div className="App">
        <ToastContainer />
        <Routes>  
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="events" element={<EventManagement />} />
            <Route path="participants" element={<ManageParticipant />} />  
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
