// src/components/Dashboard/ContractorJobs.js
import React, { useState, useEffect, useContext } from 'react';
import { getJobs, payCallOutCharge, createBooking } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ContractorJobs() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs]         = useState([]);
  const [error, setError]       = useState('');
  const [infoVisible, setInfoVisible] = useState(null);
  const [loadingId, setLoadingId]     = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(err => setError(err.message));
  }, []);

  const handleAcceptAndPay = async (job) => {
    if (!window.confirm(`Pay £${job.poster.callOutCharge} call-out charge now?`)) {
      return;
    }
    try {
      setLoadingId(job._id);
      // charge user
      await payCallOutCharge(job._id, job.poster.callOutCharge);
      // create the booking record
      await createBooking(job._id, {
        scheduledFor: job.scheduledFor || null
      });
      alert('Call-out charge paid — booking confirmed!');
      navigate(`/messages/${job._id}`);
    } catch (e) {
      alert(`Payment error: ${e.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map(job => (
          <li key={job._id}
              style={{
                marginBottom: '2rem',
                borderBottom: '1px solid #ccc',
                paddingBottom: '1rem'
              }}>
            <h3>{job.category}</h3>
            <p>{job.description}</p>
            <p><em>{job.address}, {job.postcode}</em></p>

            {/* Tenant info */}
            <p>
              <strong>Tenant:</strong> {job.tenantName} | 📞 {job.tenantPhone}
            </p>

            {/* Poster info (contractor’s call-out charge lives on poster) */}
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
              {job.media.map((url,i) => (
                <img
                  key={i}
                  src={`${process.env.REACT_APP_API_URL}${url}`}
                  alt={`Media ${i+1}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 4
                  }}
                />
              ))}
            </div>

            {/* CALL-OUT CHARGE */}
            <p>
              <strong>Call-out charge:</strong> £{job.poster.callOutCharge}
              {' '}
              {/*
                Only show “Accept & Pay” to non-contractor users
              */}
              {user.userType !== 'Contractor' && (
                <>
                  <button
                    onClick={() => handleAcceptAndPay(job)}
                    disabled={loadingId === job._id}
                  >
                    {loadingId === job._id
                      ? 'Processing…'
                      : 'Accept & Pay Call-out'}
                  </button>
                  {/* Info button */}
                  <button
                    onClick={() =>
                      setInfoVisible(
                        infoVisible === job._id ? null : job._id
                      )
                    }
                    style={{
                      marginLeft: 8,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '1.2em'
                    }}
                    aria-label="Info about call-out charge"
                  >
                    ℹ️
                  </button>
                  {/* Clause text */}
                  {infoVisible === job._id && (
                    <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                      The call-out charge will be absorbed into the final quote if the quote for
                      the completion of the job is accepted.
                    </p>
                  )}
                </>
              )}
            </p>

            {/* Messaging link (everyone can message) */}
            <div style={{ marginTop: '0.5rem' }}>
              <Link to={`/messages/${job._id}`}>
                💬 View / Send Messages
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
