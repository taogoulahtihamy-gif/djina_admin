const statusClasses = {
  'En attente': 'pending',
  'Acceptée': 'accepted',
  'En approche': 'approaching',
  'Client pris en charge': 'picked-up',
  'Terminée': 'completed',
  'Annulée': 'cancelled',
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-badge--${statusClasses[status] || 'pending'}`}>{status}</span>
}

export default StatusBadge
