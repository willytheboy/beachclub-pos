# Beach Club POS – Phase 1 Scaffold

Generated on 2025-04-24.

This is the starting skeleton for the React Native (Expo) PDA application.

## Getting started

```bash
git clone <YOUR-REPO-URL>
cd beachclub-pos
yarn install
expo start --dev-client
```

## Structure

```
app/
  App.tsx                # Root component
  navigation/            # Tab + stack navigation
  common/                # Shared hooks, theme, utils
  features/              # Feature folders (menu, order, ...)
api/                     # Planned FastAPI edge (printing proxy, not yet implemented)
contracts/               # DTOs + OpenAPI spec
modules/                 # Backend module scaffolds
seed/                    # Fixture data for demos
```

## Run with Docker

```bash
docker-compose up
```

## Lint & Tests

```bash
yarn lint
```

Contract and E2E tests are outlined in `docs/test-blueprint.md`.

## Guardrails for AI Edits
- Do not import other module internals; use contracts.
- Breaking API changes require new version and deprecation path.
- Keep pricing/VAT logic centralized.
- Maintain offline-first patterns and graceful retries.
