import "./Spinner.css";

function Spinner({ label = "Chargement…" }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__circle" />
      <span className="spinner__label">{label}</span>
    </div>
  );
}

export default Spinner;
