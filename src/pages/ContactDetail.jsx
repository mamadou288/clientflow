import { Link, useParams } from "react-router-dom";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";
import Table from "../components/ui/Table";
import { useFetch } from "../hooks/useFetch";
import { getStage } from "../data/dealStages";
import { getContactById } from "../services/contactService";
import { getCompanyById } from "../services/companyService";
import { getDealsByContact } from "../services/dealService";
import { formatCurrency, formatDate } from "../utils/format";
import "./ContactDetail.css";

const dealColumns = [
  {
    key: "title",
    header: "Opportunité",
    render: (row) => <span className="contact-detail__strong">{row.title}</span>,
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

function ContactDetail() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(async () => {
    const contact = await getContactById(id);
    if (!contact) return { contact: null };
    const [company, deals] = await Promise.all([
      getCompanyById(contact.companyId),
      getDealsByContact(id),
    ]);
    return { contact, company, deals };
  }, [id]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <p className="contact-detail__error">
        Impossible de charger le contact. Réessayez plus tard.
      </p>
    );
  }

  if (!data?.contact) {
    return (
      <div>
        <Link to="/contacts" className="contact-detail__back">
          ← Contacts
        </Link>
        <p className="contact-detail__empty">Ce contact est introuvable.</p>
      </div>
    );
  }

  const { contact, company, deals } = data;
  const fullName = `${contact.firstName} ${contact.lastName}`;

  const fields = [
    { label: "Poste", value: contact.position },
    {
      label: "Entreprise",
      value: company ? (
        <Link to={`/companies/${company.id}`} className="contact-detail__link">
          {company.name}
        </Link>
      ) : (
        "—"
      ),
    },
    {
      label: "Email",
      value: (
        <a href={`mailto:${contact.email}`} className="contact-detail__link">
          {contact.email}
        </a>
      ),
    },
    { label: "Téléphone", value: contact.phone },
    { label: "Ajouté le", value: formatDate(contact.createdAt) },
  ];

  return (
    <div>
      <Link to="/contacts" className="contact-detail__back">
        ← Contacts
      </Link>

      <header className="contact-detail__header">
        <span className="contact-detail__avatar">
          {contact.firstName[0]}
          {contact.lastName[0]}
        </span>
        <div>
          <h1 className="contact-detail__title">{fullName}</h1>
          <p className="contact-detail__subtitle">
            {contact.position}
            {company ? ` · ${company.name}` : ""}
          </p>
        </div>
      </header>

      <section className="contact-detail__card">
        <dl className="contact-detail__fields">
          {fields.map((field) => (
            <div key={field.label} className="contact-detail__field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contact-detail__section">
        <h2 className="contact-detail__section-title">
          Opportunités <span>({deals.length})</span>
        </h2>
        <Table
          columns={dealColumns}
          data={deals}
          emptyMessage="Aucune opportunité pour ce contact."
        />
      </section>
    </div>
  );
}

export default ContactDetail;
