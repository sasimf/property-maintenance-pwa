import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PostJob from './components/Dashboard/PostJob';
import ContractorJobs from './components/Dashboard/ContractorJobs';
import Subscription from './components/Dashboard/Subscription';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/post-job">Post Job</Link> | 
        <Link to="/contractor-jobs">Contractor Jobs</Link> | 
        <Link to="/subscribe">Subscribe</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/contractor-jobs" element={<ContractorJobs />} />
        <Route path="/subscribe" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
