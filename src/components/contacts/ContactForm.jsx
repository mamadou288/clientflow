import { useState } from "react";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { createContact } from "../../services/contactService";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  companyId: "",
};

function ContactForm({ companies = [], onSuccess, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const setField = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.firstName.trim()) next.firstName = "Le prénom est requis.";
    if (!values.lastName.trim()) next.lastName = "Le nom est requis.";
    if (!values.email.trim()) {
      next.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Email invalide.";
    }
    if (!values.companyId) next.companyId = "L'entreprise est requise.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createContact({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        position: values.position.trim(),
        companyId: Number(values.companyId),
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

      <div className="form-row">
        <FormField label="Prénom" htmlFor="firstName" error={errors.firstName}>
          <input
            id="firstName"
            className={`form-control${errors.firstName ? " form-control--error" : ""}`}
            value={values.firstName}
            onChange={setField("firstName")}
          />
        </FormField>
        <FormField label="Nom" htmlFor="lastName" error={errors.lastName}>
          <input
            id="lastName"
            className={`form-control${errors.lastName ? " form-control--error" : ""}`}
            value={values.lastName}
            onChange={setField("lastName")}
          />
        </FormField>
      </div>

      <FormField label="Email" htmlFor="email" error={errors.email}>
        <input
          id="email"
          type="email"
          className={`form-control${errors.email ? " form-control--error" : ""}`}
          value={values.email}
          onChange={setField("email")}
          placeholder="prenom.nom@exemple.com"
        />
      </FormField>

      <div className="form-row">
        <FormField label="Poste" htmlFor="position">
          <input
            id="position"
            className="form-control"
            value={values.position}
            onChange={setField("position")}
          />
        </FormField>
        <FormField label="Téléphone" htmlFor="phone">
          <input
            id="phone"
            className="form-control"
            value={values.phone}
            onChange={setField("phone")}
          />
        </FormField>
      </div>

      <FormField label="Entreprise" htmlFor="companyId" error={errors.companyId}>
        <select
          id="companyId"
          className={`form-control${errors.companyId ? " form-control--error" : ""}`}
          value={values.companyId}
          onChange={setField("companyId")}
        >
          <option value="">Sélectionner une entreprise…</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </FormField>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Création…" : "Créer le contact"}
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
