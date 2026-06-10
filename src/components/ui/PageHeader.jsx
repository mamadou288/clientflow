import "./PageHeader.css";

/**
 * Consistent page title block used at the top of every page.
 * `actions` lets a page render buttons (e.g. "Add company") on the right.
 */
function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="page-header">
      <div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </header>
  );
}

export default PageHeader;
