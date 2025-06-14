/*
Dashboard:
- Show user’s balance
- List their services and leads
- Show partner services and allow sending leads
Fetch user data from /profile with JWT.
*/

import { useEffect, useState } from 'react';
import api from '../api/api';
import ServiceCard from '../components/ServiceCard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [leads, setLeads] = useState([]);
  const [partnerServices, setPartnerServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const profile = await api.get('/profile');
      setUser(profile.data);
      const serviceRes = await api.get('/services');
      setServices(serviceRes.data);
      const leadRes = await api.get('/leads');
      setLeads(leadRes.data);
      const partnerRes = await api.get('/partner-services');
      setPartnerServices(partnerRes.data);
    }
    fetchData().catch(console.error);
  }, []);

  const sendLead = async (serviceId) => {
    await api.post('/leads', { serviceId });
  };

  return (
    <div>
      <h2>Balance: {user?.balance}</h2>
      <h3>Your Services</h3>
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
      <h3>Your Leads</h3>
      <ul>
        {leads.map((l) => (
          <li key={l.id}>{l.id} - {l.status}</li>
        ))}
      </ul>
      <h3>Partner Services</h3>
      {partnerServices.map((s) => (
        <ServiceCard key={s.id} service={s} onLead={sendLead} />
      ))}
    </div>
  );
}
