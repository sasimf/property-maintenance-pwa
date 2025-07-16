import React, { useState, useEffect } from 'react';
import { Link, useNavigate }          from 'react-router-dom';
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
    if (
      window.confirm(
        `Accept this job and pay £${job.poster.callOutCharge}?`
      )
    ) {
      try {
        setLoadingId(job._id);
        await payCallOutCharge(job._id, job.poster.callOutCharge);
        await createBooking(job._id, {
          scheduledFor: job.scheduledFor || null
        });
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map(job => (
          <li key={job._id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h3>{job.category}</h3>
            <p>{job.description}</p>
            <p><em>{job.address}, {job.postcode}</em></p>

            {/* Tenant info */}
            <p>
              <strong>Tenant:</strong> {job.tenantName}  
              {' | '}📞 {job.tenantPhone}
            </p>

            {/* Poster info */}
            <p>
              <strong>Posted by:</strong>{' '}
              {job.poster.userType === 'LettingAgent'
                ? `${job.poster.companyName} (${job.poster.fullName})`
                : job.poster.fullName
              }
              {' | '}📞 {job.poster.phone}
            </p>

            {/* Urgency & schedule */}
            <p>
              <strong>Urgency:</strong> {job.urgency}
              {job.urgency === 'Scheduled' && job.scheduledFor && (
                <> on {new Date(job.scheduledFor).toLocaleString()}</>
              )}
            </p>

            {/* Media thumbnails */}
            <div style={{ display: 'flex', gap: 8, margin: '0.5rem 0' }}>
              {job.media.map((url, i) => (
                <img
                  key={i}
                  src={`${process.env.REACT_APP_API_URL}${url}`}
                  alt={`Media ${i+1}`}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                />
              ))}
            </div>

            {/* Call-out & booking */}
            <p><strong>Call-out charge:</strong> £{job.poster.callOutCharge}</p>
            <button
              onClick={() => handleAccept(job)}
              disabled={loadingId === job._id}
            >
              {loadingId === job._id
                ? 'Processing…'
                : 'Accept & Pay Call-out'}
            </button>

            {/* Messaging link */}
            <div style={{ marginTop: '0.5rem' }}>
              <Link to={`/messages/${job._id}`}>💬 View / Send Messages</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
