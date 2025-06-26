import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.fullName || user.email}!</p> : <p>Please login.</p>}
    </div>
  );
}
export default Dashboard;
