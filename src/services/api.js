const API = process.env.REACT_APP_API_URL;

// existing endpoints ...

export async function createBooking(jobId, contractorId, callOutAmount) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contractorId, callOutAmount })
  });
  return res.json();
}

// ... other exports
