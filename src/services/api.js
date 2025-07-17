// src/services/api.js

const API = process.env.REACT_APP_API_URL;

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────

export async function register(data) {
  const res = await fetch(`${API}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let err = { error: 'Registration failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let err = { error: 'Login failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json(); // expects { user, token }
}

// ─────────────────────────────────────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────────────────────────────────────

export async function getJobs() {
  const res = await fetch(`${API}/api/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function createJob(data) {
  // data should be a FormData instance for file uploads
  const res = await fetch(`${API}/api/jobs`, {
    method: 'POST',
    body: data,
  });
  if (!res.ok) {
    let err = { error: 'Job creation failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function subscribe(planType, planTier) {
  const res = await fetch(`${API}/api/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planType, planTier }),
  });
  if (!res.ok) {
    let err = { error: 'Subscription failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

export async function getMessages(jobId) {
  const res = await fetch(`${API}/api/messages/${jobId}`);
  if (!res.ok) throw new Error('Failed to load messages');
  return res.json();
}

export async function sendMessage(jobId, message) {
  const res = await fetch(`${API}/api/messages/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    let err = { error: 'Send message failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKINGS
// ─────────────────────────────────────────────────────────────────────────────

export async function createBooking(jobId, details) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  });
  if (!res.ok) {
    let err = { error: 'Booking failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────────────────────────────────────────

export async function getUsers() {
  const res = await fetch(`${API}/api/admin/users`);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json();
}

export async function getAllJobs() {
  const res = await fetch(`${API}/api/admin/jobs`);
  if (!res.ok) throw new Error('Failed to load all jobs');
  return res.json();
}

export async function getSubscriptions() {
  const res = await fetch(`${API}/api/admin/subscriptions`);
  if (!res.ok) throw new Error('Failed to load subscriptions');
  return res.json();
}

export async function getDisputes() {
  const res = await fetch(`${API}/api/admin/disputes`);
  if (!res.ok) throw new Error('Failed to load disputes');
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${API}/api/admin/reviews`);
  if (!res.ok) throw new Error('Failed to load reviews');
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// PAY CALL-OUT CHARGE (example stub)
// ─────────────────────────────────────────────────────────────────────────────

export async function payCallOutCharge(jobId, amount) {
  const res = await fetch(`${API}/api/payments/callout/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    let err = { error: 'Payment failed' };
    try { err = await res.json(); } catch {}
    throw new Error(err.error || err.message);
  }
  return res.json();
}
