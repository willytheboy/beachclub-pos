# Beach Club POS – Phase 1 (MVP)
**Refined Development Brief • 24 Apr 2025**

---

## 1. Executive Snapshot
We are delivering an **offline-resilient, waiter-facing PDA app** plus a minimal backend & PC companion that together cover end-to-end order capture, printer routing, customer lookup, and cash-drawer settlement. Everything else (cards, advanced analytics, inventory, loyalty…) is postponed to Phase 2+.

| Pillar | Why it matters for Phase 1 |
| ------ | -------------------------- |
| **Speed** | Touch‑first flow: 3 taps from “Hi!” → kitchen ticket. |
| **Reliability** | Works with zero connectivity; self‑heals & syncs later. |
| **Sun‑Ready UX** | High‑contrast theme + 48 px targets + hardware back button. |
| **Plug‑&‑Play Code** | Each feature lives in its own folder, exports its own Redux slice/service hooks, and never reaches across feature boundaries. |

---

## 2. System Topology
```
            ┌──────────────┐
            │ Supabase REST│  ← central DB, auth, file store
            └──────┬───────┘
                   │ HTTPS/JWT
         ┌─────────▼─────────┐
         │   FastAPI edge    │  (thin orchestration / printing micro‑API)
         └─────────┬─────────┘
                   │ WebSocket (later)
┌──────────────────▼──────────────────┐        LAN / BLE
│      React Native PDA (Expo)        │ ─────► Thermal Printers
└─────────────────────────────────────┘
┌──────────────────┬──────────────────┐
│ PC Companion SPA │  Admin CLI (opt) │
└──────────────────┴──────────────────┘
```

---

## 3. Application‑Shell Contract
*Navigation, Theme, State, Local DB, Secure Storage, Connectivity, Event Bus* – defined in the common layer. Every feature relies on these services via hooks (`useConnectivity`, `useSql`, etc.).

---

## 4. Feature Modules (folder‑per‑feature)

1. **menu** – fetch & cache categories/items  
2. **order** – cart logic & totals  
3. **modifiers** – modal for required/optional mods  
4. **customer** – search/add/assign  
5. **print** – ESC/POS routing + status  
6. **offlineQueue** – SQLite queue + sync  
7. **invoice** – group delivered orders, print receipt  
8. **status** – widgets for printers, queue, daily sales  

Each folder exports: *components, hooks, slice.ts, service.ts, types.ts*.

---

## 5. Data Contracts (excerpt)
```ts
export type Money = number; // minor units (cents)

export interface MenuItem   { id: string; name: string; price: Money; … }
export interface Order {
  localId: string;
  status: 'Draft'|'Sent'|'Delivered'|'InvoiceSettled';
  …
}
// Full contracts in contracts.ts
```

---

## 6. Backend API (Phase 1)
`POST /auth/login`, `GET /menu`, `POST /orders`, `POST /orders/sync/batch`,  
`POST /orders/status/batch`, `GET /orders/delivered`, `POST /customers`, `GET /customers`.

Generated hooks via RTK‑Query.

---

## 7. Repository Layout
```
beachclub-pos/
 ├─ app/                  # React Native
 │   ├─ navigation/
 │   ├─ common/
 │   └─ features/
 ├─ api/                  # FastAPI edge
 └─ scripts/
```

---

## 8. Sprint‑0 Checklist
1. Repo bootstrap  
2. Contracts & slices scaffolding  
3. Auth flow  
4. Menu caching  
5. Order happy path  
6. Printer stub  
7. Offline queue MVP  
8. E2E device smoke test  

---

## 9. Quality Gates
*Strict TS, Jest per slice, Playwright smoke, ESLint, Expo OTA channels.*

---

## 10. Module Assignment Proposal
| Dev | Feature | Effort |
| --- | ------- | ------ |
| **D1** | menu, modifiers | 4 d |
| **D2** | order, invoice | 6 d |
| **D3** | print, status  | 5 d |
| **D4** | offlineQueue, API sync | 5 d |
| **Lead** | Shell & CI | ongoing |

---

## 11. Immediate Next Steps
*Approve brief → create GitHub repo → kickoff call → start Sprint‑0.*

> **Phase 2 & 3 roadmaps** are archived separately and can be promoted later.
