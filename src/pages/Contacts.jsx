import PageHeader from "../components/ui/PageHeader";

function Contacts() {
  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle="Vos interlocuteurs chez chaque client"
      />
      <p style={{ color: "var(--color-text-muted)" }}>
        La liste des contacts arrivera à l'étape suivante.
      </p>
    </div>
  );
}

export default Contacts;
