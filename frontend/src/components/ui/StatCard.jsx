import "./StatCard.css";

/**
 * KPI card for the dashboard.
 * When `loading` is true it renders a skeleton placeholder instead of values.
 */
function StatCard({ label, value, icon, accent = "var(--color-primary)", loading = false }) {
  if (loading) {
    return (
      <div className="stat-card stat-card--loading">
        <div className="stat-card__icon stat-card__skeleton" />
        <div className="stat-card__body">
          <span className="stat-card__skeleton stat-card__skeleton--value" />
          <span className="stat-card__skeleton stat-card__skeleton--label" />
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div
        className="stat-card__icon"
        style={{
          color: accent,
          backgroundColor: `color-mix(in srgb, ${accent} 14%, white)`,
        }}
      >
        {icon}
      </div>
      <div className="stat-card__body">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </div>
    </div>
  );
}

export default StatCard;
