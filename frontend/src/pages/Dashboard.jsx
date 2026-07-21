import PageHeader from "../components/ui/PageHeader";
import StatCard from "../components/ui/StatCard";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { formatCurrency } from "../utils/format";
import "./Dashboard.css";

const svg = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Dashboard() {
  const { stats, loading, error } = useDashboardStats();

  const cards = [
    {
      key: "companies",
      label: "Entreprises",
      accent: "var(--color-primary)",
      value: stats?.companies,
      icon: (
        <svg {...svg}>
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
        </svg>
      ),
    },
    {
      key: "contacts",
      label: "Contacts",
      accent: "var(--color-qualified)",
      value: stats?.contacts,
      icon: (
        <svg {...svg}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      ),
    },
    {
      key: "deals",
      label: "Opportunités",
      accent: "var(--color-proposal)",
      value: stats?.deals,
      icon: (
        <svg {...svg}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      key: "totalAmount",
      label: "Montant du pipeline",
      accent: "var(--color-won)",
      value: stats ? formatCurrency(stats.totalAmount) : undefined,
      icon: (
        <svg {...svg}>
          <path d="M3 3v18h18" />
          <path d="M7 14l4-4 3 3 5-5" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Vue d'ensemble de votre activité commerciale"
      />

      {error ? (
        <p className="dashboard__error">
          Impossible de charger les indicateurs. Réessayez plus tard.
        </p>
      ) : (
        <div className="dashboard__grid">
          {cards.map((card) => (
            <StatCard
              key={card.key}
              label={card.label}
              value={card.value}
              icon={card.icon}
              accent={card.accent}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
