import "./Badge.css";

/**
 * Small colored label. `color` is any CSS color (often a design token).
 * The soft background is derived from the color so badges stay consistent.
 */
function Badge({ color = "var(--color-text-muted)", children }) {
  return (
    <span
      className="badge"
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 14%, white)`,
      }}
    >
      {children}
    </span>
  );
}

export default Badge;
