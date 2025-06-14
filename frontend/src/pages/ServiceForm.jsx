/*
Form to create a new service:
- Inputs: title, description, reward
- POST to /services with JWT
- Redirect to dashboard on success
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function ServiceForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/services', { title, description, reward });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={reward} onChange={(e) => setReward(e.target.value)} placeholder="Reward" />
      <button type="submit">Create</button>
    </form>
  );
}
