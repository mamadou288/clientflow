import { NavLink } from "react-router-dom";
import { navItems } from "../../routes/navItems";
import "./Sidebar.css";

function Sidebar({ open = false, onNavigate }) {
  return (
    <aside className={open ? "sidebar sidebar--open" : "sidebar"}>
      <div className="sidebar__brand">
        <span className="sidebar__logo">CF</span>
        <span className="sidebar__brand-name">ClientFlow</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
          >
            <span className="sidebar__icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">CRM · Portfolio demo</div>
    </aside>
  );
}

export default Sidebar;
