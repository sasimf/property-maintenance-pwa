// src/services/api.js

const API = process.env.REACT_APP_API_URL;

// Helper to parse JSON and throw on HTTP errors
async function handleResponse(res, defaultError) {
  let body
  try {
    body = await res.json()
  } catch {
    throw new Error('Invalid JSON response from server')
  }
  if (!res.ok) {
    throw new Error(body.error || defaultError || `HTTP ${res.status}`)
  }
  return body
}

export async function register(data) {
  const res = await fetch(`${API}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res, 'Registration failed')
}

export async function login(data) {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res, 'Login failed')
}

export async function getJobs() {
  const res = await fetch(`${API}/api/jobs`)
  return handleResponse(res, 'Could not fetch jobs')
}

export async function createJob(formData) {
  // formData should be a FormData instance containing media/files + other fields
  const res = await fetch(`${API}/api/jobs`, {
    method: 'POST',
    body: formData,
  })
  return handleResponse(res, 'Job creation failed')
}

export async function subscribe(planType, planTier) {
  const res = await fetch(`${API}/api/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planType, planTier }),
  })
  return handleResponse(res, 'Subscription failed')
}

export async function getMessages(jobId) {
  const res = await fetch(`${API}/api/messages/${jobId}`)
  return handleResponse(res, 'Could not fetch messages')
}

export async function sendMessage(jobId, message) {
  const res = await fetch(`${API}/api/messages/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  return handleResponse(res, 'Message send failed')
}

export async function createBooking(jobId, details) {
  const res = await fetch(`${API}/api/bookings/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
  })
  return handleResponse(res, 'Booking failed')
}

export async function payCallOutCharge(jobId) {
  const res = await fetch(`${API}/api/payments/callout/${jobId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  return handleResponse(res, 'Payment of call‑out charge failed')
}

// ---- Admin endpoints ----

export async function getUsers() {
  const res = await fetch(`${API}/api/admin/users`)
  return handleResponse(res, 'Could not fetch users')
}

export async function getAllJobs() {
  const res = await fetch(`${API}/api/admin/jobs`)
  return handleResponse(res, 'Could not fetch all jobs')
}

export async function getSubscriptions() {
  const res = await fetch(`${API}/api/admin/subscriptions`)
  return handleResponse(res, 'Could not fetch subscriptions')
}

export async function getDisputes() {
  const res = await fetch(`${API}/api/admin/disputes`)
  return handleResponse(res, 'Could not fetch disputes')
}

export async function getReviews() {
  const res = await fetch(`${API}/api/admin/reviews`)
  return handleResponse(res, 'Could not fetch reviews')
}
