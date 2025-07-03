import React, { useState } from 'react';
import { subscribe } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const [plan, setPlan] = useState({ type: 'agent', tier: 5 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setPlan(prev => ({ ...prev, [e.target.name]: parseInt(e.target.value) || e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await subscribe(plan.type, plan.tier);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tiers = [5,10,15,30];

  return (
    <form onSubmit={handleSubmit}>
      <h2>Choose Your Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select name="type" onChange={handleChange}>
        <option value="agent">Letting Agent (posting)</option>
        <option value="contractor">Contractor (receiving)</option>
      </select>
      <select name="tier" onChange={handleChange}>
        {tiers.map(t => <option key={t} value={t}>£{t} plan</option>)}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
}
