import React, { useState } from 'react';
import { createBooking } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function Booking() {
  const { jobId } = useParams();
  const [details, setDetails] = useState({ date: '', notes: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createBooking(jobId, details);
      navigate(`/messages/${jobId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Visit</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="datetime-local" name="date" onChange={handleChange} required />
      <textarea name="notes" placeholder="Any notes" onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Booking…' : 'Confirm Booking'}
      </button>
    </form>
  );
}
