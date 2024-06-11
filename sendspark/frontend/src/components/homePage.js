import React from 'react';

const HomePage = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
    </div>
  );
};

export default HomePage;