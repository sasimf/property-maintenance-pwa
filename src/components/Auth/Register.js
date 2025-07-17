// src/components/Auth/Register.js
import React, { useState } from 'react';
import { register as registerApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [userType, setUserType]           = useState('Homeowner');
  const [companyName, setCompanyName]     = useState('');
  const [address, setAddress]             = useState('');
  const [postcode, setPostcode]           = useState('');
  const [phone, setPhone]                 = useState('');
  const [callOutCharge, setCallOutCharge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      fullName,
      email,
      password,
      userType,
      companyName: companyName || undefined,
      address,
      postcode,
      phone,
      // only include this for Contractor/Company:
      ...( ['Contractor','Company'].includes(userType)
         ? { callOutCharge: Number(callOutCharge) }
         : {} )
    };
    try {
      await registerApi(payload);
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name
        <input value={fullName} onChange={e=>setFullName(e.target.value)} required/>
      </label>

      <label>
        Email
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </label>

      <label>
        Password
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      </label>

      <label>
        User Type
        <select value={userType} onChange={e=>setUserType(e.target.value)}>
          <option>Homeowner</option>
          <option>Landlord</option>
          <option>LettingAgent</option>
          <option>Contractor</option>
          <option>Company</option>
        </select>
      </label>

      {['Contractor','Company'].includes(userType) && (
        <label>
          Call-out Charge (£)
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={callOutCharge}
            onChange={e=>setCallOutCharge(e.target.value)}
          />
        </label>
      )}

      <label>
        Company Name (if applicable)
        <input value={companyName} onChange={e=>setCompanyName(e.target.value)}/>
      </label>

      <label>
        Address
        <input value={address} onChange={e=>setAddress(e.target.value)} required/>
      </label>

      <label>
        Postcode
        <input value={postcode} onChange={e=>setPostcode(e.target.value)} required/>
      </label>

      <label>
        Phone
        <input value={phone} onChange={e=>setPhone(e.target.value)} required/>
      </label>

      <button type="submit">Register</button>
    </form>
  );
}
