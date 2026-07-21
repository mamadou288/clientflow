import { useAuth } from "../../auth/AuthContext";
import Button from "../ui/Button";
import "./Topbar.css";

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  const displayName = user?.firstName || user?.username || "";
  const initials = (user?.firstName?.[0] ?? user?.username?.[0] ?? "?").toUpperCase();

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu"
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="topbar__search">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Rechercher…"
          aria-label="Rechercher"
        />
      </div>

      <div className="topbar__user">
        <div className="topbar__user-info">
          <span className="topbar__user-name">{displayName}</span>
          <span className="topbar__user-role">{user?.email || "Connecté"}</span>
        </div>
        <span className="topbar__avatar">{initials}</span>
        <Button variant="ghost" size="sm" onClick={logout}>
          Déconnexion
        </Button>
      </div>
    </header>
  );
}

export default Topbar;
