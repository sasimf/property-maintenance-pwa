import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <li key={job._id} style={{ marginBottom: '1.5rem' }}>
            <strong>{job.category}</strong> — {job.description}
            <br />
            <em>{job.address}, {job.postcode}</em>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {job.media.map((url, i) => (
                <img
                  key={i}
                  src={`${process.env.REACT_APP_API_URL}${url}`}
                  alt={`Job media ${i+1}`}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                />
              ))}
            </div>
            {/* Messages Link: uses the actual job._id */}
            <div style={{ marginTop: '0.5rem' }}>
              <Link to={`/messages/${job._id}`}>💬 Messages</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
