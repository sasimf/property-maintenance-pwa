import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { createBooking } from '../../services/api';

function Booking() {
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const handleBook = async () => {
    const details = { date, note, userId: user.id };
    const res = await createBooking(jobId, details);
    alert(res.message || 'Booking requested');
  };

  return (
    <div>
      <h2>Book Visit for Job {jobId}</h2>
      <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
      <textarea placeholder="Notes" value={note} onChange={e => setNote(e.target.value)} />
      <button onClick={handleBook}>Request Booking</button>
    </div>
  );
}

export default Booking;