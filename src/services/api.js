const API = process.env.REACT_APP_API_URL;

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

export async function getJobs() {
  const res = await fetch(`${API}/api/jobs`);
  return res.json();
}

export async function createJob(data) {
  const res = await fetch(`${API}/api/jobs`, {
    method: 'POST',
    body: data,
  });
  return res.json();
}

export async function subscribe(planType, planTier) {
  const res = await fetch(`${API}/api/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planType, planTier }),
  });
  return res.json();
}

export async function getMessages(jobId) {
  const res = await fetch(`${API}/api/messages/${jobId}`);
  return res.json();
}

export async function sendMessage(jobId, message) {
  const res = await fetch(`${API}/api/messages/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export async function createBooking(jobId, details) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  });
  return res.json();
}

// Admin endpoints
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
