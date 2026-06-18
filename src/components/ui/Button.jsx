import "./Button.css";

/**
 * Reusable button. variant: "primary" | "secondary".
 */
function Button({ variant = "primary", type = "button", children, ...props }) {
  return (
    <button type={type} className={`btn btn--${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
