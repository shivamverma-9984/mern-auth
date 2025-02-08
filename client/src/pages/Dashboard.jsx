import React from 'react';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('username'); // Clear username
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to the Dashboard!</h1>
        <p className="mb-4">Hello, <span className="font-semibold">{username}</span>!</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;