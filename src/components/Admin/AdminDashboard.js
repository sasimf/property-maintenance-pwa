import React, { useEffect, useState } from 'react';
import { getUsers, getAllJobs, getSubscriptions, getDisputes, getReviews } from '../../services/api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [subs, setSubs] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
    getAllJobs().then(setJobs);
    getSubscriptions().then(setSubs);
    getDisputes().then(setDisputes);
    getReviews().then(setReviews);
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Users</h3>
        <ul>{users.map(u=> <li key={u.id}>{u.fullName} ({u.email}) - {u.userType}</li>)}</ul>
      </div>
      <div>
        <h3>Jobs</h3>
        <ul>{jobs.map(j=> <li key={j.id}>{j.category} - {j.address}</li>)}</ul>
      </div>
      <div>
        <h3>Subscriptions</h3>
        <ul>{subs.map(s=> <li key={s.id}>{s.userId} - {s.planType}/{s.planTier}</li>)}</ul>
      </div>
      <div>
        <h3>Disputes</h3>
        <ul>{disputes.map(d=> <li key={d.id}>{d.jobId} - {d.reason}</li>)}</ul>
      </div>
      <div>
        <h3>Reviews</h3>
        <ul>{reviews.map(r=> <li key={r.id}>{r.jobId} - {r.rating}/5</li>)}</ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
