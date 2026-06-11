import { useEffect, useState } from "react";
import { getCompanies } from "../services/companyService";
import { getContacts } from "../services/contactService";
import { getDeals } from "../services/dealService";

/**
 * Loads the three resources in parallel and derives the dashboard KPIs.
 * Returns { stats, loading, error } so the UI can handle every state.
 */
export function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.all([getCompanies(), getContacts(), getDeals()])
      .then(([companies, contacts, deals]) => {
        if (!active) return;
        const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);
        setStats({
          companies: companies.length,
          contacts: contacts.length,
          deals: deals.length,
          totalAmount,
        });
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // Avoid setting state if the component unmounts before the request resolves.
    return () => {
      active = false;
    };
  }, []);

  return { stats, loading, error };
}
