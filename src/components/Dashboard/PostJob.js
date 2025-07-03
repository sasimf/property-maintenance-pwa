import React, { useState, useContext } from 'react';
import { createJob } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const { user } = useContext(AuthContext);
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
  const [media, setMedia] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFiles = e => {
    setMedia(Array.from(e.target.files));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k,v]) => data.append(k, v));
      data.append('poster', user._id);
      media.forEach(file => data.append('media', file));

      await createJob(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Plumbing','Electrical','Heating','Miscellaneous'];

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post a Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input name="tenantName" placeholder="Tenant Name" onChange={handleChange} required />
      <input name="tenantPhone" placeholder="Tenant Phone" onChange={handleChange} required />

      <select name="category" onChange={handleChange} required>
        <option value="">--Select Category--</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <textarea name="description" placeholder="Description" onChange={handleChange} required />

      <label>
        Urgency:
        <select name="urgency" onChange={handleChange}>
          <option value="Immediate">Immediate</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </label>

      {form.urgency === 'Scheduled' && (
        <input
          type="datetime-local"
          name="scheduledFor"
          onChange={handleChange}
        />
      )}

      <input name="address" placeholder="Job Address" onChange={handleChange} required />
      <input name="postcode" placeholder="Postcode" onChange={handleChange} required />

      <label>
        Upload Photos/Videos
        <input type="file" multiple onChange={handleFiles} />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Posting…' : 'Post Job'}
      </button>
    </form>
  );
}
