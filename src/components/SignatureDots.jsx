function SignatureDots({ isCollapsed, onClick }) {
  return (
    <button
      className={`sidebar-collapse-button ${isCollapsed ? 'is-collapsed' : ''}`}
      type="button"
      onClick={onClick}
      aria-label={isCollapsed ? 'Développer la navigation' : 'Réduire la navigation'}
      aria-expanded={!isCollapsed}
    >
      <span className="collapse-dot" />
      <span className="collapse-dot" />
      <span className="collapse-dot" />
    </button>
  )
}

export default SignatureDots
