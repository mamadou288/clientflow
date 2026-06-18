import { useMemo, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import PipelineBoard from "../components/deals/PipelineBoard";
import { useFetch } from "../hooks/useFetch";
import { getStage } from "../data/dealStages";
import { getDeals } from "../services/dealService";
import { getCompanies } from "../services/companyService";
import { formatCurrency, formatDate } from "../utils/format";
import "./Deals.css";

function Deals() {
  const { data, loading, error } = useFetch(() =>
    Promise.all([getDeals(), getCompanies()]).then(([deals, companies]) => ({
      deals,
      companies,
    }))
  );
  const [search, setSearch] = useState("");
  const [view, setView] = useState("pipeline");

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
    ],
    [companyName]
  );

  return (
    <div>
      <PageHeader
        title="Opportunités"
        subtitle="Suivez votre pipeline commercial"
      />

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
