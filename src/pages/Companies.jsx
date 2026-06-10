import PageHeader from "../components/ui/PageHeader";

function Companies() {
  return (
    <div>
      <PageHeader title="Entreprises" subtitle="Gérez vos comptes clients" />
      <p style={{ color: "var(--color-text-muted)" }}>
        La liste des entreprises arrivera à l'étape suivante.
      </p>
    </div>
  );
}

export default Companies;
