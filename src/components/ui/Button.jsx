import "./Button.css";

/**
 * Reusable button.
 * variant: "primary" | "secondary" | "danger" | "ghost"
 * size: "md" | "sm"
 */
function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size}${className ? ` ${className}` : ""}`;
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
