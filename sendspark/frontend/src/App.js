import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/signupForm'; // Ensure correct path
import HomePage from './components/homePage'; // Ensure correct path
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignup = (userData) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find(user => user.workEmail === userData.workEmail);

    if (existingUser) {
      console.log('Login');
    } else {
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));
      setUser(userData); // Update the user state
    }
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm onSignup={handleSignup} />} />
        <Route path="/home" element={user ? <HomePage user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
