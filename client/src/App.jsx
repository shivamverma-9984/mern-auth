import React from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router';
import { Toaster} from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  return (
    <BrowserRouter>
    <Toaster position="top-center"  richColors/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
