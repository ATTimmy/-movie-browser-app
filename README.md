# 🎬 Movie Browser App

> A React + TypeScript app with Server-Side Rendering, modular routing, testing, CI/CD, and a clean development workflow.

![CI Badge](https://github.com/ATTimmy/-movie-browser-app/actions/workflows/ci.yml/badge.svg)

---

## 🧠 Overview

Movie Browser App is a modern web app that fetches and displays movie data. It's optimized for fast loading, developer productivity, and clean code architecture.

---

## 🚀 Getting Started

### 🔧 Development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Preview static client build**

   ```bash
   npm run preview
   ```

---

### 🌍 Server-Side Rendering (SSR)

1. **Build SSR bundle**

   ```bash
   npm run build:ssr
   ```

2. **Start SSR server**

   ```bash
   npm run start
   ```

This uses Express to render pages on the server using `renderToString()` and hydrate them on the client.

---

## 📦 Release Notes

For full version history, see [`releaseNotes.md`](./releaseNotes.md)

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
- **Express + Hydration** – SSR rendering with dynamic routing

---

## 🤪 Scripts

| Script                  | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Run Vite in development mode             |
| `npm run build`         | Build the client bundle                  |
| `npm run build:ssr`     | Build the server-side (SSR) bundle       |
| `npm run start`         | Start Express server with SSR output     |
| `npm run preview`       | Preview static client build (non-SSR)    |
| `npm run test`          | Run all unit/component tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run lint`          | Run ESLint for static code analysis      |
| `npm run lint:fix`      | Fix lint issues automatically            |
| `npm run format`        | Format code using Prettier               |
| `npm run format:check`  | Check if code is properly formatted      |
| `npm run prepare`       | Install Husky and setup Git hooks        |

---

## 🔀 Branching Strategy

- `main` – Stable production-ready branch
- `develop` – Integration branch
- `feature/GB#<num>-<description>` – Feature-specific branches (e.g. `feature/GB#18-testing`)

---

## 🌐 Routing (React Router v6)

Configured in `src/Routes/index.tsx`:

- `/` → Home page
- `/movie/:category/:id` → Movie details page

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
- Mocks provided for `useNavigate`, API calls, and wishlist context

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

## 📂 Project Structure

```
src/
├── Components/
│   ├── Home/
│   ├── MovieDetails/
│   ├── Header/
│   └── ...
├── Context/
├── Styles/
├── Api/
├── Routes/
├── Server/
└── main.tsx
```

---

## 🧠 Extra Notes

- Avoid `any`, use strict typing
- Organize by features/components
- Use `feature/*` naming aligned with `GB#` codes
- Keep SSR-safe code clean (no `window`, `localStorage` in server paths)
