# ClientFlow

Monorepo fullstack du CRM **ClientFlow**.

```
clientflow/
├── frontend/   # SPA React 19 + Vite
└── backend/    # API REST Django + DRF (en construction)
```

## Stack
- **Frontend** : React 19, Vite, couche `services/` prête à consommer l'API.
- **Backend** : Django, Django REST Framework, PostgreSQL, JWT (à venir), pytest.
- **Infra** : Docker, GitHub Actions (CI).

## Démarrer

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend
> En cours de construction — voir `backend/README.md`.

## Organisation
Monorepo simple (dossiers frères, sans outil de build dédié) : le front et le back
sont versionnés ensemble pour garder front et API cohérents dans une même PR.
