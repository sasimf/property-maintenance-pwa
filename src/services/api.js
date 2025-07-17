const API = process.env.REACT_APP_API_URL;

// Auth
export async function register(data) {
  const res = await fetch(`${API}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Jobs
export async function getJobs() {
  const res = await fetch(`${API}/api/jobs`);
  return res.json();
}

export async function createJob(data) {
  const res = await fetch(`${API}/api/jobs`, {
    method: 'POST',
    body: data, // FormData with media fields
  });
  return res.json();
}

// Subscriptions
export async function subscribe(planType, planTier) {
  const res = await fetch(`${API}/api/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planType, planTier }),
  });
  return res.json();
}

// Messaging
export async function getMessages(jobId) {
  const res = await fetch(`${API}/api/messages/${jobId}`);
  return res.json();
}

export async function sendMessage(jobId, { sender, message }) {
  const res = await fetch(`${API}/api/messages/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender, message }),
  });
  return res.json();
}

// Booking / Call-Out Payment
export async function createBooking(jobId, contractorId, callOutAmount) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contractorId, callOutAmount }),
  });
  return res.json();
}

// Admin Endpoints
export async function getUsers() {
  const res = await fetch(`${API}/api/admin/users`);
  return res.json();
}

export async function getAllJobs() {
  const res = await fetch(`${API}/api/admin/jobs`);
  return res.json();
}

export async function getSubscriptions() {
  const res = await fetch(`${API}/api/admin/subscriptions`);
  return res.json();
}

export async function getDisputes() {
  const res = await fetch(`${API}/api/admin/disputes`);
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${API}/api/admin/reviews`);
  return res.json();
}
