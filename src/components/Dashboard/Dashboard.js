import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
function Dashboard() { const { user } = useContext(AuthContext);
  return <div><h2>Dashboard</h2>{user?`Hello, ${user.fullName}`:'Please login'}</div>;
}
export default Dashboard;
