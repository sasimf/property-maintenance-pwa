// src/services/api.js

const API = process.env.REACT_APP_API_URL;

// Generic wrapper to handle JSON requests & errors
async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.error || 'API error');
    err.payload = payload;
    throw err;
  }
  return payload;
}

// Auth
export function register(data) {
  return request('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function login(data) {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Jobs
export function getJobs() {
  return request('/api/jobs');
}

export function createJob(data) {
  // data is a plain object (including media array)
  return request('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Subscriptions
export function subscribe(planType, planTier) {
  return request('/api/subscriptions', {
    method: 'POST',
    body: JSON.stringify({ planType, planTier }),
  });
}

// Messaging
export function getMessages(jobId) {
  return request(`/api/messages/${jobId}`);
}

// Only one sendMessage declaration:
export function sendMessage(jobId, message, sender) {
  return request(`/api/messages/${jobId}`, {
    method: 'POST',
    body: JSON.stringify({ message, sender }),
  });
}

// Bookings
export function createBooking(jobId, details) {
  return request(`/api/bookings/${jobId}`, {
    method: 'POST',
    body: JSON.stringify(details),
  });
}

// Admin
export function getUsers() {
  return request('/api/admin/users');
}

export function getAllJobs() {
  return request('/api/admin/jobs');
}

export function getSubscriptions() {
  return request('/api/admin/subscriptions');
}

export function getDisputes() {
  return request('/api/admin/disputes');
}

export function getReviews() {
  return request('/api/admin/reviews');
}
