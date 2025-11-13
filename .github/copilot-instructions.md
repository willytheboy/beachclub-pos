# GitHub Copilot Instructions for Beach Club POS

## Project Overview

This is an **offline-resilient, waiter-facing PDA application** built with React Native (Expo) for a Beach Club Point of Sale system. The app is designed to work seamlessly with or without internet connectivity, syncing data when online.

## Technology Stack

- **Framework**: React Native with Expo (~50.0.0)
- **Language**: TypeScript (strict mode enabled)
- **State Management**: Redux Toolkit with RTK Query
- **Navigation**: React Navigation (bottom tabs)
- **Local Storage**: expo-sqlite for offline data, expo-secure-store for sensitive data
- **Architecture**: Feature-based modular architecture

## Project Structure

```
app/
  ├── App.tsx              # Root component
  ├── store.ts             # Redux store configuration
  ├── navigation/          # Navigation configuration (tabs, stacks)
  ├── common/              # Shared utilities, hooks, theme
  │   ├── theme.ts         # High-contrast sun-ready theme
  │   ├── useConnectivity.ts
  │   └── ...
  └── features/            # Feature modules (isolated, self-contained)
      ├── menu/
      ├── order/
      ├── customer/
      ├── modifiers/
      ├── print/
      ├── offlineQueue/
      ├── invoice/
      └── status/
```

## Architecture Principles

### Feature-Based Structure
Each feature lives in its own folder under `app/features/` and follows this structure:
- `index.ts` - Public exports
- `slice.ts` - Redux slice (state + reducers)
- `service.ts` - API calls and business logic
- `types.ts` - TypeScript interfaces and types
- `*Screen.tsx` - React components

### Isolation
- Features should be self-contained and not directly import from other features
- Shared functionality belongs in `app/common/`
- Cross-feature communication happens through Redux store or navigation

### Offline-First Design
- All data operations must handle offline scenarios
- Use SQLite for local data persistence
- Queue API calls when offline and sync when connectivity returns
- The `offlineQueue` feature manages sync operations

## Coding Conventions

### TypeScript
- **Strict mode**: All type checking is strict
- Use explicit types for function parameters and return values
- Prefer interfaces for object shapes
- Use type aliases for unions and primitives
- Path aliases: Use `@/*` to import from `app/*` (configured in tsconfig.json)

Example:
```typescript
import { useTheme } from '@/common/theme';
import { MenuItem } from '@/features/menu/types';
```

### React Components
- Use functional components with hooks
- Components should be typed properly with React.FC or explicit prop types
- Follow the sun-ready UX principle: high-contrast colors, 48px touch targets

### Redux
- Each feature exports its own slice
- Use Redux Toolkit's `createSlice` and `createAsyncThunk`
- Use RTK Query for API calls where appropriate
- Actions and selectors should be exported from slice files

### State Management
- Local component state for UI-only concerns
- Redux for app-wide state and data that needs to persist
- SQLite for offline data that survives app restarts

### Naming Conventions
- Files: camelCase for utilities, PascalCase for components
- Components: PascalCase (e.g., `MenuScreen.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useConnectivity.ts`)
- Redux slices: camelCase with `Slice` suffix (e.g., `menuSlice.ts`)

### Money Handling
- **Always use minor units (cents)** for money values
- Type alias: `type Money = number;`
- Never use floating-point arithmetic for money calculations

## Development Workflow

### Running the App
```bash
yarn install
expo start --dev-client
```

### Linting
```bash
yarn lint
```

### Testing
- Jest for unit tests per slice
- Follow existing test patterns in the repository
- Test files: `*.test.ts` or `*.spec.ts`

## Key Features to Understand

1. **Menu**: Fetch and cache menu items and categories
2. **Order**: Shopping cart logic, order management, totals calculation
3. **Modifiers**: Handle required/optional item modifications
4. **Customer**: Customer search, add, and assignment to orders
5. **Print**: ESC/POS printer routing and status management
6. **OfflineQueue**: SQLite-based queue for offline operations with sync
7. **Invoice**: Group delivered orders, generate receipts
8. **Status**: Dashboard widgets for printers, queue status, daily sales

## API Integration

- Backend: Supabase REST API with JWT authentication
- FastAPI edge for printer orchestration (planned)
- Use RTK Query for API hooks generation
- Handle offline scenarios gracefully

## UX Guidelines

- **Sun-Ready**: High-contrast theme for outdoor visibility
- **Touch-First**: Minimum 48px touch targets
- **Speed**: Optimize for 3-tap workflows (e.g., "Hi!" → kitchen ticket)
- **Hardware**: Support hardware back button navigation

## Important Notes

- This is Phase 1 MVP - advanced features (cards, analytics, inventory, loyalty) are postponed
- Focus on core order capture, printing, and offline resilience
- Connectivity awareness is critical - always check and handle offline state
- Security: Use expo-secure-store for sensitive data like auth tokens

## When Writing Code

1. **Check connectivity** before making API calls
2. **Queue operations** when offline using the offlineQueue feature
3. **Use strict TypeScript** - no `any` types unless absolutely necessary
4. **Follow the feature structure** - keep features isolated
5. **Test offline scenarios** - the app must work without internet
6. **Use path aliases** - `@/` instead of relative paths
7. **Follow existing patterns** - check similar features before implementing new ones

## Resources

- Phase 1 MVP Brief: `BeachClubPOS_Phase1_MVP_Brief_20250425_101712.md`
- Type definitions: `types.d.ts`
- Redux store: `app/store.ts`
- Theme configuration: `app/common/theme.ts`
