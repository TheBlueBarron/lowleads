/*
Top navbar:
- Links to Dashboard, New Service, Logout
- Responsive and shown on all pages
*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/services/new">New Service</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
