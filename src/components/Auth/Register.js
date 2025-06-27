import React, { useState } from 'react';
import { register } from '../../services/api';

function Register() {
  const [formData, setFormData] = useState({ fullName:'', email:'', password:'', userType:'homeowner', expertise:'', postcode:'', address:'' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    const expertiseArray = formData.expertise.split(',').map(e => e.trim());
    const res = await register({ ...formData, expertise: expertiseArray });
    alert(res.message || 'Registered');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* fields */}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
