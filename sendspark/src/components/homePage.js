import React, { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './../styles/homePage.css';

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className='home-container'>
      <div className='home-header'>
        <h2>Welcome, {user?.firstName}!</h2>
      </div>
      <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default HomePage;
