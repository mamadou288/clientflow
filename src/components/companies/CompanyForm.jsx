import { useState } from "react";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { createCompany } from "../../services/companyService";

const EMPTY = {
  name: "",
  industry: "",
  city: "",
  country: "",
  website: "",
  employees: "",
};

function CompanyForm({ onSuccess, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const setField = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Le nom est requis.";
    if (!values.industry.trim()) next.industry = "Le secteur est requis.";
    if (!values.city.trim()) next.city = "La ville est requise.";
    if (!values.country.trim()) next.country = "Le pays est requis.";
    if (values.employees && Number.isNaN(Number(values.employees))) {
      next.employees = "L'effectif doit être un nombre.";
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
      const created = await createCompany({
        name: values.name.trim(),
        industry: values.industry.trim(),
        city: values.city.trim(),
        country: values.country.trim(),
        website: values.website.trim(),
        employees: values.employees ? Number(values.employees) : 0,
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

      <FormField label="Nom" htmlFor="name" error={errors.name}>
        <input
          id="name"
          className={`form-control${errors.name ? " form-control--error" : ""}`}
          value={values.name}
          onChange={setField("name")}
          placeholder="Ex : Nova Digital"
        />
      </FormField>

      <FormField label="Secteur" htmlFor="industry" error={errors.industry}>
        <input
          id="industry"
          className={`form-control${errors.industry ? " form-control--error" : ""}`}
          value={values.industry}
          onChange={setField("industry")}
          placeholder="Ex : Agence web"
        />
      </FormField>

      <div className="form-row">
        <FormField label="Ville" htmlFor="city" error={errors.city}>
          <input
            id="city"
            className={`form-control${errors.city ? " form-control--error" : ""}`}
            value={values.city}
            onChange={setField("city")}
          />
        </FormField>
        <FormField label="Pays" htmlFor="country" error={errors.country}>
          <input
            id="country"
            className={`form-control${errors.country ? " form-control--error" : ""}`}
            value={values.country}
            onChange={setField("country")}
          />
        </FormField>
      </div>

      <div className="form-row">
        <FormField label="Site web" htmlFor="website">
          <input
            id="website"
            className="form-control"
            value={values.website}
            onChange={setField("website")}
            placeholder="exemple.com"
          />
        </FormField>
        <FormField label="Effectif" htmlFor="employees" error={errors.employees}>
          <input
            id="employees"
            className={`form-control${errors.employees ? " form-control--error" : ""}`}
            value={values.employees}
            onChange={setField("employees")}
            inputMode="numeric"
          />
        </FormField>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Création…" : "Créer l'entreprise"}
        </Button>
      </div>
    </form>
  );
}

export default CompanyForm;
