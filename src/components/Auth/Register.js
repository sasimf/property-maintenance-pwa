import React, { useState } from 'react';
import { register } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    address: '',
    postcode: '',
    phone: '',
    userType: 'homeowner',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="companyName" placeholder="Company (optional)" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="postcode" placeholder="Postcode" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />

      <select name="userType" onChange={handleChange} value={form.userType}>
        <option value="homeowner">Homeowner (Free)</option>
        <option value="landlord">Landlord (Free)</option>
        <option value="agent">Letting Agent (Paid)</option>
        <option value="contractor">Contractor (Paid)</option>
      </select>

      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up…' : 'Sign Up'}
      </button>
    </form>
  );
}
