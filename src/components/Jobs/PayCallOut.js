import React, { useState, useContext } from 'react';
import { createBooking } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PayCallOut({ job, contractor }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePay = async () => {
    setLoading(true);
    try {
      const resp = await createBooking(
        job._id,
        contractor._id,
        contractor.callOutCharge
      );
      if (resp.success) {
        alert('Payment successful! The contractor has been notified.');
        navigate('/messages/' + job._id);
      } else {
        throw new Error(resp.error || 'Payment failed');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Pay Call-Out Charge</h3>
      <p>
        Contractor: <strong>{contractor.fullName}</strong><br/>
        Charge: <strong>£{contractor.callOutCharge.toFixed(2)}</strong>
      </p>
      <button onClick={handlePay} disabled={loading}>
        {loading ? 'Processing...' : 'Pay & Book Visit'}
      </button>
    </div>
  );
}
