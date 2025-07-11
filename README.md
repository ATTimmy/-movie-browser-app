# 🎬 Movie Browser App

> A React + TypeScript app with Server-Side Rendering, modular routing, Vitest tests, GitHub Actions CI/CD, and a clean development workflow.

![CI](https://github.com/ATTimmy/-movie-browser-app/actions/workflows/ci.yml)

---

## 🧠 Overview

Movie Browser App is a modern web app that fetches and displays movie data. It's optimized for fast loading, developer productivity, and clean code architecture.

---

## 🧪 Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Run Vite in dev mode           |
| `npm run build`         | Build client bundle            |
| `npm run build:ssr`     | Build SSR bundle               |
| `npm run start`         | Run Express server with SSR    |
| `npm run test`          | Run all tests (Vitest + jsdom) |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`          | Run ESLint                     |
| `npm run lint:fix`      | Fix lint issues                |
| `npm run format`        | Format code with Prettier      |
| `npm run format:check`  | Check formatting               |

---

## 💅 Tooling

- **Vite** – Fast build tool for React
- **React 19 + TypeScript** – Modern UI foundation
- **SASS** – Modular global styling (`Styles/`)
- **Prettier** – Consistent code formatting
- **ESLint** – Strict linting with TS/React rules
- **Vitest + Testing Library** – Unit testing with jsdom
- **Husky + lint-staged** – Pre-commit hooks: lint + test
- **GitHub Actions** – CI pipeline with formatting/linting/build/test

---

## 🔁 Branching Strategy

- `main` – Stable production-ready branch
- `develop` – Integration branch
- `feature/GB#<num>-<description>` – Feature-specific branches (e.g. `feature/GB#18-testing`)

---

## 🌐 Routing (React Router v6)

Configured in `src/Routes/index.tsx`:

- `/` → Home page
- Additional routes (e.g. `/detail/:id`, `/wishlist`) will be modularized

SSR uses `StaticRouter`, and the client uses `BrowserRouter`.

---

## 🧠 SSR / Hydration

- Server entry: `src/Server/Server.tsx` (Express + `renderToString`)
- Client entry: `main.tsx` with `hydrateRoot`
- SSR bundle built with `vite.ssr.config.ts`
- Skeletons are rendered before client hydration

Hydration is delayed until JS loads, improving perceived performance.

---

## ✅ Testing Strategy

- Tests live next to components: `Component.test.tsx`
- `setupTests.ts` bootstraps Testing Library with `jsdom`
- Full coverage with `vitest run --coverage`
- Example: `Home.test.tsx` validates UI rendering

---

## 🚀 CI/CD Pipeline (GitHub Actions)

Workflow defined in `.github/workflows/ci.yml`

### Checks on every push or PR:

- ✅ Type-check (`tsc`)
- ✅ ESLint linting
- ✅ Prettier formatting check
- ✅ Vitest tests
- ✅ Build client and SSR bundles

### Badge

Included at top of README for build status.

---

## 📌 GitHub Project Board

> [🔗 View Project Board](https://github.com/users/ATTimmy/projects/1/views/1)

Tracks all features and tasks (GB# codes).

---

## 🧠 Extra Notes

- Avoid `any`, use strict typing
- Organize by features/components
- Use `feature/*` naming aligned with `GB#` codes

--
