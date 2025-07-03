import React, { useState, useEffect } from 'react';
import { getJobs } from '../../services/api';

export default function ContractorJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <strong>{job.category}</strong> — {job.description.slice(0,50)}…
            <br />
            {job.address}, {job.postcode}
          </li>
        ))}
      </ul>
    </div>
  );
}
