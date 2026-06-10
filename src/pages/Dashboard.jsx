import PageHeader from "../components/ui/PageHeader";

function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Vue d'ensemble de votre activité commerciale"
      />
      <p style={{ color: "var(--color-text-muted)" }}>
        Les indicateurs clés arriveront à l'étape suivante.
      </p>
    </div>
  );
}

export default Dashboard;
