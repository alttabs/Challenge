import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/signupForm';
import HomePage from './components/homePage';
import LoginForm from './components/loginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_API_USERS_URL}/verify`, {
        headers: {
          Authorization: token,
        },
      })
        .then(response => {
          setUser((response.data.user));
        })
        .catch(error => {
          console.error('Token verification error:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/" element={<LoginForm setUser={setUser} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/" />;
}


const handleSignup = async (userData) => {
  try {
    console.log(userData);
  } catch (error) {
    console.error('Signup error:', error);
  }
};

export default App;
export { UserContext };
