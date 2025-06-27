import React, { useState, useContext } from 'react';
import { login } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [email, setEmail]=useState(''); const [password,setPassword]=useState('');
  const { setUser } = useContext(AuthContext);
  const handleSubmit=async e=>{e.preventDefault(); const user=await login({email,password}); setUser(user);};
  return (<form onSubmit={handleSubmit}><button type="submit">Login</button></form>);
}

export default Login;
