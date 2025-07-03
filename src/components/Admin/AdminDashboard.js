import React, { useState, useEffect } from 'react';
import { getUsers, getAllJobs, getSubscriptions, getDisputes, getReviews } from '../../services/api';

export default function AdminDashboard() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getUsers(),
      getAllJobs(),
      getSubscriptions(),
      getDisputes(),
      getReviews()
    ])
      .then(([users, jobs, subs, disputes, reviews]) =>
        setData({ users, jobs, subs, disputes, reviews })
      )
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data.users) return <p>Loading admin data…</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users ({data.users.length})</h3>
      <ul>{data.users.map(u => <li key={u._id}>{u.fullName} ({u.userType})</li>)}</ul>

      <h3>Jobs ({data.jobs.length})</h3>
      <ul>{data.jobs.map(j => <li key={j._id}>{j.category}: {j.description.slice(0,50)}…</li>)}</ul>

      <h3>Subscriptions ({data.subs.length})</h3>
      <ul>{data.subs.map(s => <li key={s._id}>{s.planType} – Tier {s.planTier}</li>)}</ul>

      <h3>Disputes ({data.disputes.length})</h3>
      <ul>{data.disputes.map(d => <li key={d._id}>{d.reason}</li>)}</ul>

      <h3>Reviews ({data.reviews.length})</h3>
      <ul>{data.reviews.map(r => <li key={r._id}>{r.rating}★ – {r.comment}</li>)}</ul>
    </div>
  );
}
