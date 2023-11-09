import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register, Login, Home, Dashboard } from './components';
import { UserProvider } from './context/UserContext/UserContext'; // Import UserProvider

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
              <Route path="/dashboard/:username" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
