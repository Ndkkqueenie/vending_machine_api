import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register, Login, Home, Dashboard } from './components';

const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
