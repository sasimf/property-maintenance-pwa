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
