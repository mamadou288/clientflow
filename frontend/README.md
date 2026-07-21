# ClientFlow CRM — Frontend

> A modern sales CRM frontend built with **React + Vite**.
> Manage companies, contacts and deals through a clean, business-grade interface.

ClientFlow is a portfolio project demonstrating the ability to build a **real-world
business application** with a professional, scalable React architecture.

---

## Demo

| Module        | Features                                                        |
| ------------- | -------------------------------------------------------------- |
| **Dashboard** | Key metrics: clients, contacts, deals, total pipeline value    |
| **Companies** | List, search, filter, company detail view                      |
| **Contacts**  | List, search, contact detail view                              |
| **Deals**     | List + simple pipeline (Lead → Qualified → Proposal → Won/Lost) |
| **Forms**     | Add company, add contact, add deal                             |

> 🔌 The app runs entirely on **mocked data**. It is intentionally architected to
> be plugged into a future **Django REST API** with minimal changes (see
> [Architecture](#architecture)).

---

## Tech stack

- **React 19**
- **Vite** — fast dev server & build
- **React Router** — client-side routing
- **Plain modern CSS** — design tokens + components (no UI framework)
- **Mocked data** — no backend, no auth, no API (yet)

---

## Architecture

The code is organized by responsibility so it stays readable and easy to scale:

```
src/
├── assets/         # static assets (images, icons)
├── components/
│   ├── ui/         # reusable presentational components (Button, Card, Badge…)
│   └── layout/     # structural components (Sidebar, Topbar…)
├── pages/          # route-level pages (Dashboard, Companies, Contacts, Deals)
├── layouts/        # page shells (AppLayout with sidebar + content)
├── routes/         # route definitions
├── data/           # mocked data sources
├── services/       # data-access layer (API-ready abstraction)
├── hooks/          # custom React hooks
├── utils/          # pure helpers (formatting, etc.)
└── styles/         # design tokens + global styles
```

### Why a `services/` layer?

The UI never imports mocked data directly. It calls **services**
(`companyService`, `contactService`, `dealService`) that currently read from
`data/`. When a real backend is ready, only the service layer changes — swap
mock reads for `fetch`/`axios` calls to the Django REST API. **No component
needs to be rewritten.**

```
Components → hooks → services → (mock data | future REST API)
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app runs at `http://localhost:5173`.

---

## Roadmap

- [x] Project setup, architecture & design system
- [ ] App layout (sidebar + routing)
- [ ] Mock data & services layer
- [ ] Dashboard with KPIs
- [ ] Companies (list, search, filter, detail)
- [ ] Contacts (list, search, detail)
- [ ] Deals (list + pipeline)
- [ ] Forms (add company / contact / deal)
- [ ] Connect to Django REST API

---

## License

MIT — free to use as a learning and portfolio reference.
