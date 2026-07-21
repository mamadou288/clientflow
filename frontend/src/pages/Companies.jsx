import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import DeleteButton from "../components/ui/DeleteButton";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import CompanyForm from "../components/companies/CompanyForm";
import { useFetch } from "../hooks/useFetch";
import { getCompanies, deleteCompany } from "../services/companyService";
import { formatDate } from "../utils/format";
import "./Companies.css";

function Companies() {
  const navigate = useNavigate();
  const { data: companies, loading, error, refetch } = useFetch(getCompanies);
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleCreated = () => {
    setShowForm(false);
    refetch();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteCompany(toDelete.id);
      setToDelete(null);
      refetch();
    } catch {
      setDeleteError("La suppression a échoué. Réessayez.");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Entreprise",
      render: (row) => <span className="companies__name">{row.name}</span>,
    },
    { key: "industry", header: "Secteur" },
    {
      key: "city",
      header: "Localisation",
      render: (row) => `${row.city}, ${row.country}`,
    },
    { key: "employees", header: "Effectif" },
    {
      key: "createdAt",
      header: "Ajoutée le",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "actions",
      header: "",
      width: "1%",
      render: (row) => <DeleteButton onDelete={() => setToDelete(row)} />,
    },
  ];

  const industries = useMemo(() => {
    if (!companies) return [];
    return [...new Set(companies.map((c) => c.industry))].sort();
  }, [companies]);

  const filtered = useMemo(() => {
    if (!companies) return [];
    const term = search.trim().toLowerCase();
    return companies.filter((c) => {
      const matchesSearch =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.city.toLowerCase().includes(term) ||
        c.industry.toLowerCase().includes(term);
      const matchesIndustry = industry === "all" || c.industry === industry;
      return matchesSearch && matchesIndustry;
    });
  }, [companies, search, industry]);

  return (
    <div>
      <PageHeader
        title="Entreprises"
        subtitle="Gérez vos comptes clients"
        actions={<Button onClick={() => setShowForm(true)}>+ Ajouter</Button>}
      />

      {showForm && (
        <Modal title="Nouvelle entreprise" onClose={() => setShowForm(false)}>
          <CompanyForm
            onSuccess={handleCreated}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Supprimer l'entreprise"
          message={`Voulez-vous vraiment supprimer « ${toDelete.name} » ? Cette action est irréversible.`}
          confirmLabel="Supprimer"
          loading={deleting}
          error={deleteError}
          onConfirm={handleDelete}
          onCancel={() => {
            setToDelete(null);
            setDeleteError(null);
          }}
        />
      )}

      {error ? (
        <p className="companies__error">
          Impossible de charger les entreprises. Réessayez plus tard.
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="companies__toolbar">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Rechercher une entreprise…"
            />
            <select
              className="companies__filter"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              aria-label="Filtrer par secteur"
            >
              <option value="all">Tous les secteurs</option>
              {industries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="companies__count">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          <Table
            columns={columns}
            data={filtered}
            onRowClick={(row) => navigate(`/companies/${row.id}`)}
            emptyMessage="Aucune entreprise ne correspond à votre recherche."
          />
        </>
      )}
    </div>
  );
}

export default Companies;
