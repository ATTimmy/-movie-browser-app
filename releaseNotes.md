# 📦 Release Notes – Movie Browser App

This document contains the version history of the project.

---

## 📄 Version Index

- [v0.1.0 – Project Foundation](#v010--project-foundation)

---

## 🎯 v0.1.0 – Project Foundation

This release sets up the complete technical foundation of the **Movie Browser App**, including support for React 19, Vite, TypeScript, SCSS, Server-Side Rendering (SSR), routing, automated testing, and CI/CD with GitHub Actions. It's designed to enable fast, scalable, and clean feature development from the ground up.

---

### ✅ User Stories and Tasks

#### 🟩 GB#11 – Base project setup

- GB#111 – Initialize Vite + React + TypeScript
- GB#112 – Create core folder structure
- GB#113 – Install Sass
- GB#114 – Add `styles/variables.scss`
- GB#115 – Create base `App.tsx`
- GB#116 – Push project to GitHub

#### 🟩 GB#12 – Global SCSS styling

- GB#121 – Configure SCSS import in `main.tsx`
- GB#122 – Add base and reset rules
- GB#123 – Document style structure

#### 🟩 GB#13 – Prettier configuration

- GB#131 – Install Prettier
- GB#132 – Create `.prettierrc`
- GB#133 – Add `format` and `format:check` scripts
- GB#134 – Add VSCode editor integration
- GB#135 – Document formatting rules

#### 🟩 GB#14 – ESLint configuration

- GB#141 – Install ESLint and plugins
- GB#142 – Create strict config
- GB#143 – Add `lint` script
- GB#144 – Document linting rules

#### 🟩 GB#15 – Husky + Lint-staged

- GB#151 – Install Husky and lint-staged
- GB#152 – Add pre-commit hook: lint, format, test
- GB#153 – Document commit workflow

#### 🟩 GB#16 – Server-Side Rendering (SSR) setup

- GB#161 – Install Express and `react-dom/server`
- GB#162 – Create `server.tsx` with `renderToString(<App />)`
- GB#163 – Separate client/server entry points
- GB#164 – Use `hydrateRoot` on the client
- GB#165 – Configure `vite.config.ts` for SSR
- GB#166 – Add `build:ssr` and `start` scripts
- GB#167 – Implement initial movie fetch on the server
- GB#168 – Inject `initialData` into HTML response
- GB#169 – Document SSR + hydration strategy

#### 🟩 GB#17 – Routing

- GB#171 – Install `react-router-dom` and types
- GB#172 – Configure `BrowserRouter` (client) + `StaticRouter` (SSR)
- GB#173 – Add routes: Home, Detail, Wishlist
- GB#174 – Document routing

#### 🟩 GB#18 – Testing with Vitest

- GB#181 – Install Vitest, Testing Library, jsdom
- GB#182 – Create `setupTests.ts`
- GB#183 – Add basic `<Home />` test
- GB#184 – Document testing approach

#### 🟩 GB#19 – CI/CD with GitHub Actions

- GB#191 – Create CI workflow (`.github/workflows/ci.yml`)
- GB#192 – Add steps: typecheck, lint, format check, test, build
- GB#193 – Add SSR build/start verification
- GB#194 – Add CI badge to README
- GB#195 – Document CI/CD strategy

#### 🟩 GB#1A – Documentation

- GB#1A1 – Create and organize `README.md`
- GB#1A2 – Include:
  - Project structure
  - Scripts
  - Tooling
  - CI/CD
  - SSR
  - Routing
  - GitHub Project board link
  - Branching strategy (main, develop, feature/\*)
