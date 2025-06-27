import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { subscribe } from '../../services/api';

function Subscription() {
  const { user } = useContext(AuthContext);
  const [plan, setPlan] = useState({ planType:'agent', planTier:'basic' });
  const handleChange = e => setPlan({...plan, [e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await subscribe(plan.planType, plan.planTier);
    alert(res.message || 'Subscribed');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Subscription</h2>
      <select name="planType" onChange={handleChange}>
        <option value="agent">Letting Agent</option>
        <option value="contractor">Contractor</option>
      </select>
      <select name="planTier" onChange={handleChange}>
        <option value="basic">Basic</option>
        <option value="standard">Standard</option>
        <option value="unlimited">Unlimited</option>
      </select>
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default Subscription;
