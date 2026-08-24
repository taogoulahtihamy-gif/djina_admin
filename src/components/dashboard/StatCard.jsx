function StatCard({ title, value, unit, description, icon: Icon }) {
  return (
    <article className="dashboard-card stat-card dashboard-block">
      <div className="stat-card-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></div>
      <div className="stat-card-content">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-value">
          <strong>{value}</strong>
          {unit && <span>{unit}</span>}
        </div>
        <span className="stat-card-description">{description}</span>
      </div>
    </article>
  )
}

export default StatCard
