import React, { useState, useContext } from 'react';
import { login } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCreds(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, token } = await login(creds);
      // if you want to persist the token:
      localStorage.setItem('pm_token', token);
      setUser(user);
      setToken(token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: 'auto' }}>
      <h2>Login</h2>
      {error && (
        <div style={{ color: 'crimson', marginBottom: 12 }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: 8 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={creds.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ width: '100%', padding: 10 }}
      >
        {loading ? 'Logging in…' : 'Log In'}
      </button>
    </form>
  );
}
