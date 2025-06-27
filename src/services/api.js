const API = process.env.REACT_APP_API_URL;

export async function getMessages(jobId) {
  const res = await fetch(`${API}/api/messages/${jobId}`);
  return res.json();
}

export async function sendMessage(jobId, message) {
  const res = await fetch(`${API}/api/messages/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  return res.json();
}

export async function createBooking(jobId, details) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details)
  });
  return res.json();
}