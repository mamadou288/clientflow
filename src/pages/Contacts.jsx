import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ContactForm from "../components/contacts/ContactForm";
import { useFetch } from "../hooks/useFetch";
import { getContacts } from "../services/contactService";
import { getCompanies } from "../services/companyService";
import "./Contacts.css";

function Contacts() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(() =>
    Promise.all([getContacts(), getCompanies()]).then(
      ([contacts, companies]) => ({ contacts, companies })
    )
  );
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCreated = () => {
    setShowForm(false);
    refetch();
  };

  // Map companyId -> name to display the company in the list (front-end join).
  const companyName = useMemo(() => {
    const map = new Map();
    data?.companies.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [data]);

  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Contact",
        render: (row) => (
          <span className="contacts__name">
            {row.firstName} {row.lastName}
          </span>
        ),
      },
      { key: "position", header: "Poste" },
      {
        key: "company",
        header: "Entreprise",
        render: (row) => companyName.get(row.companyId) ?? "—",
      },
      { key: "email", header: "Email" },
      { key: "phone", header: "Téléphone" },
    ],
    [companyName]
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data.contacts;
    return data.contacts.filter((c) => {
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      const company = (companyName.get(c.companyId) ?? "").toLowerCase();
      return (
        fullName.includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.position.toLowerCase().includes(term) ||
        company.includes(term)
      );
    });
  }, [data, search, companyName]);

  return (
    <div>
      <PageHeader
        title="Contacts"
        subtitle="Vos interlocuteurs chez chaque client"
        actions={<Button onClick={() => setShowForm(true)}>+ Ajouter</Button>}
      />

      {showForm && (
        <Modal title="Nouveau contact" onClose={() => setShowForm(false)}>
          <ContactForm
            companies={data?.companies ?? []}
            onSuccess={handleCreated}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {error ? (
        <p className="contacts__error">
          Impossible de charger les contacts. Réessayez plus tard.
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="contacts__toolbar">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Rechercher un contact…"
            />
            <span className="contacts__count">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          <Table
            columns={columns}
            data={filtered}
            onRowClick={(row) => navigate(`/contacts/${row.id}`)}
            emptyMessage="Aucun contact ne correspond à votre recherche."
          />
        </>
      )}
    </div>
  );
}

export default Contacts;
