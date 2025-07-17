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
      {/* form fields as above */}
      <button type="submit">Register</button>
    </form>
  );
}
