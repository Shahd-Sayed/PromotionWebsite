# First Commit — Project Description

This file provides a concise project description intended for the repository's first commit message and commit body. Use it to populate the commit description or the repository's initial documentation.

Suggested commit title
----------------------

feat(project): initial scaffold — CapitalAgroWebsite (React + Vite frontend)

Suggested commit body (short)
-----------------------------

Add initial React + Vite frontend scaffold for the Capital Agro storefront.
- Project structure created under `src/` (components, pages, hooks, contexts, api).
- Initial `axiosClient` configured to use `VITE_API_URL` for API requests.
- UI components for product listing, category pages, product details and cart.
- Basic tooling: Vite, ESLint, Bootstrap, Tailwind utilities, and common libraries.

Longer description (optional)
----------------------------

This repository contains the client-side portion of the Capital Agro website. The frontend is built with React and Vite and expects an external REST API (not included) that exposes endpoints under the `/api` prefix. Key capabilities in this scaffold:

- Paginated product listing and product detail views
- Category listing and category detail pages
- Client-side shopping cart UI and order summary
- Theme context for light/dark mode
- Centralized Axios instance for API calls (`src/api/axiosClient.jsx`) that reads `VITE_API_URL`

How to perform the first commit (example commands)
------------------------------------------------

Run these commands in Powershell from the project root:

```powershell
git init
git add .
git commit -m "feat(project): initial scaffold — CapitalAgroWebsite (React + Vite frontend)" -m "Add initial React + Vite frontend scaffold for the Capital Agro storefront. Project structure under src/ with components, pages, hooks, contexts and axiosClient configured to use VITE_API_URL."
```

If the repository already exists and you want a more descriptive commit body, use `-m` multiple times or an editor:

```powershell
git commit -a
# Then enter the multi-line message in your editor and save
```

Next steps (suggested)
----------------------

- Add `README.md` and `.env.example` (if not present).  
- Add `docs/postman_collection.json` or OpenAPI spec for backend API.  
- Optionally scaffold a small backend or provide sample data for local testing.

Maintainer notes
----------------

- The frontend reads `import.meta.env.VITE_API_URL` — ensure you provide a `.env` with `VITE_API_URL` (e.g. `http://localhost:8000`).
- Consider adding `.gitignore` entries for `.env` and build artifacts if not already present.
