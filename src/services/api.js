const API = process.env.REACT_APP_API_URL;

// Generic wrapper for API requests
async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || res.statusText || 'API error');
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data;
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

export function createJob(jobData) {
  return request('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
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
export async function sendMessage(jobId, message, sender) {
  return request(`/api/messages/${jobId}`, {
    method: 'POST',
    body: JSON.stringify({ message, sender }),
  });
}
export function sendMessage(jobId, message) {
  return request(`/api/messages/${jobId}`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

// Booking
export function createBooking(jobId, details) {
  return request(`/api/bookings/${jobId}`, {
    method: 'POST',
    body: JSON.stringify(details),
  });
}

// Admin Endpoints
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
