import React, { useState } from 'react';
import { register } from '../../services/api';
function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', userType: 'homeowner' });
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    const result = await register(formData);
    alert(result?.message || 'Registered');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="userType" onChange={handleChange}>
        <option value="homeowner">Homeowner</option>
        <option value="landlord">Landlord</option>
        <option value="agent">Letting Agent</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;
