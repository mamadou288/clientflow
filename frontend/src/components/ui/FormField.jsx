import "./FormField.css";

/**
 * Label + control + error wrapper for consistent forms.
 * Use the `.form-control` class on the input/select passed as children.
 */
function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}

export default FormField;
