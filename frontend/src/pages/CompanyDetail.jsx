import { Link, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import { useFetch } from "../hooks/useFetch";
import { getStage } from "../data/dealStages";
import { getCompanyById } from "../services/companyService";
import { getContactsByCompany } from "../services/contactService";
import { getDealsByCompany } from "../services/dealService";
import { formatCurrency, formatDate } from "../utils/format";
import "./CompanyDetail.css";

const contactColumns = [
  {
    key: "name",
    header: "Contact",
    render: (row) => (
      <span className="company-detail__strong">
        {row.firstName} {row.lastName}
      </span>
    ),
  },
  { key: "position", header: "Poste" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Téléphone" },
];

const dealColumns = [
  {
    key: "title",
    header: "Opportunité",
    render: (row) => <span className="company-detail__strong">{row.title}</span>,
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
];

function CompanyDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(
    () =>
      Promise.all([
        getCompanyById(id),
        getContactsByCompany(id),
        getDealsByCompany(id),
      ]).then(([company, contacts, deals]) => ({ company, contacts, deals })),
    [id]
  );

  if (loading) return <Spinner />;

  if (error) {
    return (
      <p className="company-detail__error">
        Impossible de charger l'entreprise. Réessayez plus tard.
      </p>
    );
  }

  if (!data?.company) {
    return (
      <div>
        <Link to="/companies" className="company-detail__back">
          ← Entreprises
        </Link>
        <p className="company-detail__empty">Cette entreprise est introuvable.</p>
      </div>
    );
  }

  const { company, contacts, deals } = data;

  const fields = [
    { label: "Secteur", value: company.industry },
    { label: "Localisation", value: `${company.city}, ${company.country}` },
    {
      label: "Site web",
      value: (
        <a
          href={`https://${company.website}`}
          target="_blank"
          rel="noreferrer"
          className="company-detail__link"
        >
          {company.website}
        </a>
      ),
    },
    { label: "Effectif", value: `${company.employees} employés` },
    { label: "Ajoutée le", value: formatDate(company.createdAt) },
  ];

  return (
    <div>
      <Link to="/companies" className="company-detail__back">
        ← Entreprises
      </Link>

      <header className="company-detail__header">
        <span className="company-detail__avatar">
          {company.name.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <h1 className="company-detail__title">{company.name}</h1>
          <p className="company-detail__subtitle">{company.industry}</p>
        </div>
      </header>

      <section className="company-detail__card">
        <dl className="company-detail__fields">
          {fields.map((field) => (
            <div key={field.label} className="company-detail__field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="company-detail__section">
        <h2 className="company-detail__section-title">
          Contacts <span>({contacts.length})</span>
        </h2>
        <Table
          columns={contactColumns}
          data={contacts}
          emptyMessage="Aucun contact pour cette entreprise."
        />
      </section>

      <section className="company-detail__section">
        <h2 className="company-detail__section-title">
          Opportunités <span>({deals.length})</span>
        </h2>
        <Table
          columns={dealColumns}
          data={deals}
          emptyMessage="Aucune opportunité pour cette entreprise."
        />
      </section>
    </div>
  );
}

export default CompanyDetail;
