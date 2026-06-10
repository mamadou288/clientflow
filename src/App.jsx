function App() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        minHeight: "100vh",
        textAlign: "center",
        padding: "var(--space-6)",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-primary)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        ClientFlow CRM
      </span>
      <h1 style={{ fontSize: "var(--text-2xl)" }}>Setup ready</h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "32rem" }}>
        L'environnement est en place : React + Vite + React Router, architecture
        et design system prêts. Les fonctionnalités métier arrivent aux étapes
        suivantes.
      </p>
    </main>
  );
}

export default App;
