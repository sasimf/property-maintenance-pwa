import React, { useState, useEffect } from 'react';
import { Link, useNavigate }    from 'react-router-dom';
import {
  getJobs,
  payCallOutCharge,
  createBooking
} from '../../services/api';

export default function ContractorJobs() {
  const [jobs,   setJobs]   = useState([]);
  const [error,  setError]  = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(err => setError(err.message));
  }, []);

  const handleAccept = async (job) => {
    if (window.confirm(`Accept this job and pay £${job.poster.callOutCharge}?`)) {
      try {
        setLoadingId(job._id);
        await payCallOutCharge(job._id, job.poster.callOutCharge);
        await createBooking(job._id, { scheduledFor: null });
        alert('Call-out charge paid and booking confirmed!');
        navigate(`/messages/${job._id}`);
      } catch (e) {
        alert(`Payment failed: ${e.message}`);
      } finally {
        setLoadingId(null);
      }
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id} style={{ marginBottom: '2rem' }}>
            {/* ...other job fields... */}
            <p><strong>Call-out charge:</strong> £{job.poster.callOutCharge}</p>
            <button
              onClick={() => handleAccept(job)}
              disabled={loadingId === job._id}
            >
              {loadingId === job._id ? 'Processing…' : 'Accept & Pay Call-out'}
            </button>
            <div style={{ marginTop: '1rem' }}>
              <Link to={`/messages/${job._id}`}>💬 View / Send Messages</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
