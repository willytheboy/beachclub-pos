
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
```
See the Phase 1 MVP brief for full module breakdown.

## Web Canvas App

A minimal canvas designer is provided in `web-canvas-app/`. Open `index.html` in a browser to try it.
