/*
Helper functions:
- login(email, password)
- signup(name, email, password)
- logout()
Handles JWT storage and clearing.
*/

import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/login', { email, password });
  localStorage.setItem('token', data.token);
}

export async function signup(name, email, password) {
  await api.post('/register', { name, email, password });
}

export function logout() {
  localStorage.removeItem('token');
}
