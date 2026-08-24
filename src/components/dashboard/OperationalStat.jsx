function OperationalStat({
  label,
  value,
  icon: Icon,
  tone,
}) {
  return (
    <article className="operational-stat">
      <div className="operational-stat-content">
        <strong className="operational-stat-value">
          {value ?? '—'}
        </strong>

        <span className="operational-stat-label">
          {label}
        </span>
      </div>

      <span
        className={`operational-stat-icon operational-stat-icon--${tone}`}
        aria-hidden="true"
      >
        <Icon size={17} />
      </span>
    </article>
  )
}

export default OperationalStat