import { useMemo, useState } from "react";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { DEAL_STAGES } from "../../data/dealStages";
import { createDeal } from "../../services/dealService";

const EMPTY = {
  title: "",
  companyId: "",
  contactId: "",
  amount: "",
  stage: "lead",
};

function DealForm({ companies = [], contacts = [], onSuccess, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Only show contacts that belong to the selected company.
  const availableContacts = useMemo(() => {
    if (!values.companyId) return [];
    return contacts.filter((c) => c.companyId === Number(values.companyId));
  }, [contacts, values.companyId]);

  const setField = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  // Changing the company invalidates the previously selected contact.
  const setCompany = (e) =>
    setValues((prev) => ({ ...prev, companyId: e.target.value, contactId: "" }));

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = "Le titre est requis.";
    if (!values.companyId) next.companyId = "L'entreprise est requise.";
    if (!values.contactId) next.contactId = "Le contact est requis.";
    if (!values.amount) {
      next.amount = "Le montant est requis.";
    } else if (Number.isNaN(Number(values.amount)) || Number(values.amount) <= 0) {
      next.amount = "Le montant doit être un nombre positif.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createDeal({
        title: values.title.trim(),
        companyId: Number(values.companyId),
        contactId: Number(values.contactId),
        amount: Number(values.amount),
        stage: values.stage,
      });
      onSuccess(created);
    } catch {
      setSubmitError("La création a échoué. Réessayez.");
      setSubmitting(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      {submitError && <p className="form-error">{submitError}</p>}

      <FormField label="Titre" htmlFor="title" error={errors.title}>
        <input
          id="title"
          className={`form-control${errors.title ? " form-control--error" : ""}`}
          value={values.title}
          onChange={setField("title")}
          placeholder="Ex : Refonte site e-commerce"
        />
      </FormField>

      <div className="form-row">
        <FormField label="Entreprise" htmlFor="companyId" error={errors.companyId}>
          <select
            id="companyId"
            className={`form-control${errors.companyId ? " form-control--error" : ""}`}
            value={values.companyId}
            onChange={setCompany}
          >
            <option value="">Sélectionner…</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Contact" htmlFor="contactId" error={errors.contactId}>
          <select
            id="contactId"
            className={`form-control${errors.contactId ? " form-control--error" : ""}`}
            value={values.contactId}
            onChange={setField("contactId")}
            disabled={!values.companyId}
          >
            <option value="">
              {values.companyId
                ? "Sélectionner…"
                : "Choisir une entreprise d'abord"}
            </option>
            {availableContacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.firstName} {contact.lastName}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="form-row">
        <FormField label="Montant (€)" htmlFor="amount" error={errors.amount}>
          <input
            id="amount"
            className={`form-control${errors.amount ? " form-control--error" : ""}`}
            value={values.amount}
            onChange={setField("amount")}
            inputMode="numeric"
            placeholder="25000"
          />
        </FormField>

        <FormField label="Statut" htmlFor="stage">
          <select
            id="stage"
            className="form-control"
            value={values.stage}
            onChange={setField("stage")}
          >
            {DEAL_STAGES.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Création…" : "Créer l'opportunité"}
        </Button>
      </div>
    </form>
  );
}

export default DealForm;
