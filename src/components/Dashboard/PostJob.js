import React, { useState, useContext } from 'react';
import { createJob } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function PostJob() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Form state
  const [form, setForm] = useState({
    tenantName: '',
    tenantPhone: '',
    category: '',
    description: '',
    urgency: 'Scheduled',
    scheduledFor: '',
    address: '',
    postcode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle text/select inputs
  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send JSON; media empty for now
      await createJob({
        ...form,
        poster: user.id,
        media: []
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Plumbing', 'Electrical', 'Heating', 'Miscellaneous'];

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Maintenance Job</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        name="tenantName"
        placeholder="Tenant Name"
        value={form.tenantName}
        onChange={handleChange}
        required
      />

      <input
        name="tenantPhone"
        placeholder="Tenant Phone"
        value={form.tenantPhone}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <label>
        Urgency:
        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
        >
          <option value="Immediate">Immediate</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </label>

      {form.urgency === 'Scheduled' && (
        <input
          type="datetime-local"
          name="scheduledFor"
          value={form.scheduledFor}
          onChange={handleChange}
        />
      )}

      <input
        name="address"
        placeholder="Job Address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <input
        name="postcode"
        placeholder="Postcode"
        value={form.postcode}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Posting…' : 'Post Job'}
      </button>
    </form>
  );
}
