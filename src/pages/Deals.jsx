import PageHeader from "../components/ui/PageHeader";

function Deals() {
  return (
    <div>
      <PageHeader
        title="Opportunités"
        subtitle="Suivez votre pipeline commercial"
      />
      <p style={{ color: "var(--color-text-muted)" }}>
        Le pipeline des opportunités arrivera à l'étape suivante.
      </p>
    </div>
  );
}

export default Deals;
