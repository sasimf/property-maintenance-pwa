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
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...form,
        expertise: form.expertise?.split(',').map(x => x.trim()) || [],
      };
      const res = await register(payload);
      if (res.error) throw new Error(res.error);
      // Registration successful → send user to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <input
        name="companyName"
        placeholder="Company Name (optional)"
        value={form.companyName}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
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
      <input
        name="phone"
        placeholder="Mobile or Telephone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <select name="userType" value={form.userType} onChange={handleChange}>
        <option value="homeowner">Homeowner (Free)</option>
        <option value="landlord">Landlord (Free)</option>
        <option value="agent">Letting Agent (Subscription)</option>
        <option value="contractor">Contractor (Subscription)</option>
      </select>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
