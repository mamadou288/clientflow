import { useMemo, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import PipelineBoard from "../components/deals/PipelineBoard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import DeleteButton from "../components/ui/DeleteButton";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import DealForm from "../components/deals/DealForm";
import { useFetch } from "../hooks/useFetch";
import { getStage } from "../data/dealStages";
import { getDeals, deleteDeal } from "../services/dealService";
import { getCompanies } from "../services/companyService";
import { getContacts } from "../services/contactService";
import { formatCurrency, formatDate } from "../utils/format";
import "./Deals.css";

function Deals() {
  const { data, loading, error, refetch } = useFetch(() =>
    Promise.all([getDeals(), getCompanies(), getContacts()]).then(
      ([deals, companies, contacts]) => ({ deals, companies, contacts })
    )
  );
  const [search, setSearch] = useState("");
  const [view, setView] = useState("pipeline");
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
      await deleteDeal(toDelete.id);
      setToDelete(null);
      refetch();
    } catch {
      setDeleteError("La suppression a échoué. Réessayez.");
    } finally {
      setDeleting(false);
    }
  };

  const companyName = useMemo(() => {
    const map = new Map();
    data?.companies.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data.deals;
    return data.deals.filter((d) => {
      const company = (companyName.get(d.companyId) ?? "").toLowerCase();
      return d.title.toLowerCase().includes(term) || company.includes(term);
    });
  }, [data, search, companyName]);

  const columns = useMemo(
    () => [
      {
        key: "title",
        header: "Opportunité",
        render: (row) => <span className="deals__title">{row.title}</span>,
      },
      {
        key: "company",
        header: "Entreprise",
        render: (row) => companyName.get(row.companyId) ?? "—",
      },
      {
        key: "stage",
        header: "Statut",
        render: (row) => {
          const stage = getStage(row.stage);
          return <Badge color={stage?.color}>{stage?.label ?? row.stage}</Badge>;
        },
      },
      {
        key: "amount",
        header: "Montant",
        render: (row) => formatCurrency(row.amount),
      },
      {
        key: "createdAt",
        header: "Créée le",
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: "actions",
        header: "",
        width: "1%",
        render: (row) => <DeleteButton onDelete={() => setToDelete(row)} />,
      },
    ],
    [companyName]
  );

  return (
    <div>
      <PageHeader
        title="Opportunités"
        subtitle="Suivez votre pipeline commercial"
        actions={<Button onClick={() => setShowForm(true)}>+ Ajouter</Button>}
      />

      {showForm && (
        <Modal title="Nouvelle opportunité" onClose={() => setShowForm(false)}>
          <DealForm
            companies={data?.companies ?? []}
            contacts={data?.contacts ?? []}
            onSuccess={handleCreated}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Supprimer l'opportunité"
          message={`Voulez-vous vraiment supprimer « ${toDelete.title} » ? Cette action est irréversible.`}
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
        <p className="deals__error">
          Impossible de charger les opportunités. Réessayez plus tard.
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className="deals__toolbar">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Rechercher une opportunité…"
            />
            <div className="deals__views" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={view === "pipeline"}
                className={
                  view === "pipeline"
                    ? "deals__view deals__view--active"
                    : "deals__view"
                }
                onClick={() => setView("pipeline")}
              >
                Pipeline
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "list"}
                className={
                  view === "list"
                    ? "deals__view deals__view--active"
                    : "deals__view"
                }
                onClick={() => setView("list")}
              >
                Liste
              </button>
            </div>
          </div>

          {view === "pipeline" ? (
            <PipelineBoard deals={filtered} companyName={companyName} />
          ) : (
            <Table
              columns={columns}
              data={filtered}
              emptyMessage="Aucune opportunité ne correspond à votre recherche."
            />
          )}
        </>
      )}
    </div>
  );
}

export default Deals;
