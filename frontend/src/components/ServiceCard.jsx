/*
Card component for a service:
- Show title, description, reward
- Optionally show lead submission button
*/

export default function ServiceCard({ service, onLead }) {
  return (
    <div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <p>Reward: {service.reward}</p>
      {onLead && <button onClick={() => onLead(service.id)}>Send Lead</button>}
    </div>
  );
}
