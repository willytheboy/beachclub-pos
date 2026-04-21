# ROOTS — Phase 1 Scaffold (Expo + React Native + TypeScript)

Premium, mobile-first farm-to-table companion app scaffold for Phase 1.

## What is included

- Five-tab app shell: Home, Library, Recipes, Shop, Profile
- Typed bottom-tab navigation (`RootTabParamList`) with in-tab detail flows
- Reusable UI primitives: Card, Badge, Chip, Section
- Centralized design tokens (`src/theme/tokens.ts`)
- Seed-data-driven local repositories (`mockCatalogRepository`, `mockUserStateRepository`)
- Local persistence for preferences, saved recipes, and cart via `expo-secure-store`
- Feature-first folder structure with typed domain models
- TODO markers where Supabase repositories should plug in

## Folder structure

- `src/app/` app bootstrap, state, navigation
- `src/components/` shared UI primitives
- `src/features/` screen implementations by feature
- `src/data/` seed data + repository abstractions
- `src/lib/` low-level utilities (storage)
- `src/theme/` design tokens + navigation theme
- `src/types/` domain models

## Run locally

```bash
npm install
npm run start
```

or

```bash
yarn install
yarn start
```

## Supabase wiring notes

1. Replace `mockCatalogRepository` with `supabaseCatalogRepository` in `src/data/repositories/mockRepositories.ts`.
2. Replace `mockUserStateRepository` with `supabaseUserStateRepository` once auth/user tables are available.
3. Keep screen components unchanged by continuing to consume repository interfaces from `src/data/repositories/types.ts`.
