import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "./AppLayout.css";

/**
 * Application shell: persistent sidebar + topbar around the routed page.
 * On mobile the sidebar becomes a slide-in drawer toggled from the topbar.
 * <Outlet /> renders the active child route.
 */
function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-layout">
      {/* Closing on navigation keeps the drawer from staying open on mobile. */}
      <Sidebar open={menuOpen} onNavigate={closeMenu} />
      {menuOpen && (
        <div
          className="app-layout__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <div className="app-layout__main">
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
