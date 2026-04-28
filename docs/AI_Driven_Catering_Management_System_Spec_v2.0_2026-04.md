# AI-Driven Catering Management System
## Project Specification v2.0 — April 2026

---

## 1. Executive Summary

An enterprise-grade, multi-agent AI platform that automates end-to-end catering and event management operations. The system deploys specialized AI agents that collaborate hierarchically — from client intake through menu creation, kitchen execution, inventory control, and event delivery — using modern LLM orchestration frameworks and serverless cloud infrastructure.

**Target User:** Sporting Club Beirut + Feluka Express (extensible to third-party catering operations)

**Core Value:** Replace fragmented manual workflows with an autonomous, observable, auditable agent system that scales from 10-person cocktails to 500-person galas.

---

## 2. Modern Tech Stack (2026)

### 2.1 AI & Agent Layer
- **Primary LLM:** Claude Opus 4.7 (via Anthropic API) — agent reasoning, orchestration, complex decisions
- **Secondary LLM:** Claude Haiku 4.5 — fast, cheap tasks (classification, extraction, simple responses)
- **Agent Orchestration:** Claude Agent SDK (primary) — native tool use, sub-agents, memory management
- **Alternative/Complementary:** LangGraph 0.3+ for complex state machines and explicit workflow graphs
- **Agent Memory:** Mem0 or Letta for persistent agent memory across sessions
- **Vector Search:** Pinecone or Turbopuffer for recipe similarity, menu embeddings
- **Embeddings:** Voyage-3 or OpenAI text-embedding-3-large
- **Structured Output:** Anthropic's structured outputs API + Zod schemas for validation
- **Evaluation:** Braintrust or LangSmith for agent tracing, evals, and regression testing

### 2.2 Backend Infrastructure
- **Primary Platform:** Firebase (Google Cloud) + selective Cloud Run for heavy compute
- **Database:**
  - **Firestore** — real-time operational data (events, orders, inventory)
  - **Cloud SQL (PostgreSQL 16)** — structured relational data (recipes, financials, audit logs) with `pgvector` for embeddings
  - **Firebase Realtime Database** — live kitchen station status, staff presence
- **Cloud Functions:** Firebase Functions (2nd gen, Node.js 22) for agent triggers
- **Heavy Agent Workloads:** Cloud Run with GPU-backed instances for multi-step reasoning
- **Storage:** Firebase Storage for menus, images, documents, contracts
- **Authentication:** Firebase Auth + custom claims for role-based access
- **Message Bus:** Google Cloud Pub/Sub for inter-agent event streaming
- **Caching:** Upstash Redis (serverless) for session state and rate limiting

### 2.3 Frontend
- **Framework:** Next.js 15 (App Router) with React 19 Server Components
- **Language:** TypeScript 5.5+
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **State Management:** Zustand (client state) + TanStack Query v5 (server state)
- **Forms:** React Hook Form + Zod validation
- **Real-time UI:** Firestore listeners + optimistic updates
- **Mobile:** Expo (React Native) with shared TypeScript types — iOS + Android from single codebase
- **PWA:** Full offline support for kitchen stations using Workbox

### 2.4 DevOps & Tooling
- **Monorepo:** Turborepo with pnpm workspaces
- **CI/CD:** GitHub Actions → Firebase App Hosting
- **IaC:** Terraform for GCP resources
- **Monitoring:** Google Cloud Operations + Sentry for error tracking
- **Feature Flags:** Statsig or Firebase Remote Config
- **Secrets:** Google Secret Manager
- **Testing:** Vitest (unit) + Playwright (E2E) + Anthropic Evals (agent behavior)

### 2.5 Integrations
- **Payments:** Stripe (international) + local Lebanon payment rails for LBP
- **Messaging:** WhatsApp Business API (critical for Lebanon market) + Twilio fallback
- **Email:** Resend with React Email templates
- **Calendar:** Google Calendar API for event scheduling
- **Maps/Venues:** Google Places API
- **Documents:** Canva API for auto-generated proposals and menus
- **Accounting:** QuickBooks or Xero API

---

## 3. Agent Architecture

### 3.1 Hierarchical Agent Topology

```
┌─────────────────────────────────────────────────────┐
│  Operations Director Agent (Orchestrator)           │
│  Model: Claude Opus 4.7                             │
│  Role: Top-level planning, conflict resolution,     │
│        strategic resource allocation                │
└──────┬──────────────────────────────────────────────┘
       │
       ├─► Client Concierge Agent (Opus 4.7)
       │     └─ Sub: Proposal Writer, Pricing Analyst,
       │            Contract Drafter
       │
       ├─► Menu Architect Agent (Opus 4.7)
       │     └─ Sub: Recipe Curator, Dietary Specialist,
       │            Wine Pairing, Seasonal Advisor
       │
       ├─► Executive Chef Agent (Opus 4.7)
       │     └─ Sub: Prep Station, Hot Line, Cold Station,
       │            Pastry, Plating, Quality Control
       │
       ├─► Supply Chain Agent (Haiku 4.5)
       │     └─ Sub: Inventory Tracker, Purchase Orders,
       │            Supplier Liaison, Waste Analyst
       │
       ├─► Logistics & Setup Agent (Haiku 4.5)
       │     └─ Sub: Equipment Dispatcher, Transport,
       │            Venue Setup, Breakdown Crew
       │
       └─► Staff Coordinator Agent (Haiku 4.5)
             └─ Sub: Scheduler, Skills Matcher,
                    Payroll, Training
```

### 3.2 Agent Design Principles

**Tool-First Architecture:** Every agent capability is exposed as a well-defined tool (function). Agents reason about which tools to call rather than hardcoding workflows.

**Memory Hierarchy:**
- **Working Memory** — current conversation/task context
- **Episodic Memory** — past events with this specific client
- **Semantic Memory** — domain knowledge (recipes, techniques, policies)
- **Procedural Memory** — learned workflows and optimizations

**Observability by Default:** Every agent decision is logged with reasoning trace, tool calls, token usage, and outcome for debugging and continuous improvement.

**Human-in-the-Loop Gates:** Critical actions (>$5000 purchases, contract signing, recipe changes affecting allergens) require human approval via WhatsApp or dashboard.

**Graceful Degradation:** If an agent fails, the system falls back to a human operator with full context handoff.

---

## 4. Firebase/Firestore Data Model

### 4.1 Core Collections

```typescript
// Root collections
/clients/{clientId}
/events/{eventId}
/recipes/{recipeId}
/inventory/{itemId}
/staff/{staffId}
/equipment/{equipmentId}
/suppliers/{supplierId}
/venues/{venueId}

// Agent-specific collections
/agent_sessions/{sessionId}     // conversation state
/agent_memory/{agentId}         // long-term agent memory
/agent_traces/{traceId}         // execution logs for observability
/agent_approvals/{approvalId}   // human-in-loop queue

// Operational
/notifications/{notificationId}
/audit_logs/{logId}
/purchase_orders/{poId}
/invoices/{invoiceId}
```

### 4.2 Sample Document Schemas

```typescript
// /events/{eventId}
interface Event {
  id: string;
  clientId: string;
  status: 'inquiry' | 'proposal' | 'confirmed' | 'in_prep' | 'live' | 'completed' | 'cancelled';
  type: 'buffet' | 'plated' | 'cocktail' | 'stations' | 'family_style';
  dateTime: Timestamp;
  duration: number; // minutes
  guestCount: {
    confirmed: number;
    estimated: number;
  };
  venue: {
    id: string;
    name: string;
    address: string;
    setupRequirements: string[];
  };
  menu: {
    menuId: string;
    items: MenuItem[];
    dietaryAccommodations: Record<string, number>;
  };
  budget: {
    currency: 'USD' | 'LBP';
    total: number;
    breakdown: Record<string, number>;
    payments: Payment[];
  };
  staffing: {
    required: StaffRequirement[];
    assigned: StaffAssignment[];
  };
  timeline: {
    setupStart: Timestamp;
    serviceStart: Timestamp;
    serviceEnd: Timestamp;
    breakdown: Timestamp;
  };
  agentContext: {
    conciergeSessionId: string;
    menuArchitectSessionId: string;
    lastAgentAction: Timestamp;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// /recipes/{recipeId}
interface Recipe {
  id: string;
  name: string;
  nameArabic?: string;  // bilingual for Lebanon market
  category: RecipeCategory;
  cuisine: string[];
  courseType: 'appetizer' | 'main' | 'side' | 'dessert' | 'canapé';
  servingSize: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  dietary: {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    halal: boolean;
    kosher: boolean;
    allergens: string[];
  };
  costPerServing: { usd: number; lbp: number };
  complexity: 1 | 2 | 3 | 4 | 5;
  seasonality: Season[];
  servingTemperature: 'hot' | 'cold' | 'room';
  stationType: StationType;
  equipment: string[];
  embedding: number[];  // for similarity search
  popularity: number;
  lastUsed: Timestamp;
}
```

### 4.3 Security Rules Strategy
- Custom claims on auth tokens: `{ role: 'admin' | 'chef' | 'staff' | 'client', venues: string[] }`
- Row-level security enforced in Firestore rules
- All agent-initiated writes go through Cloud Functions with additional validation
- PII fields encrypted at rest using Cloud KMS

---

## 5. Agent Implementation Details

### 5.1 Claude Agent SDK Integration

Each agent is a TypeScript class wrapping the Claude Agent SDK with custom tools:

```typescript
// Conceptual structure - not full implementation
class MenuArchitectAgent {
  tools = [
    searchRecipes,
    checkInventory,
    calculateCost,
    validateDietary,
    proposeMenu,
    requestChefReview,
  ];

  systemPrompt = `You are the Menu Architect for Sporting Club Beirut's
    catering operation. You design menus that balance Lebanese Mediterranean
    tradition with modern dietary needs. You work with a strict budget,
    current inventory, and the Executive Chef's capacity...`;

  async planMenu(eventContext: Event): Promise<MenuProposal> {
    return this.agent.run({
      input: eventContext,
      maxIterations: 10,
      humanApprovalThreshold: 5000,
    });
  }
}
```

### 5.2 Inter-Agent Communication

Agents communicate through three channels:
1. **Direct tool calls** — parent agent invokes sub-agent as a tool
2. **Pub/Sub events** — fire-and-forget notifications (e.g., `event.confirmed` → triggers menu, logistics, staffing)
3. **Shared Firestore state** — agents read/write to event documents with optimistic locking

### 5.3 Model Selection Policy
- **Opus 4.7** — Complex reasoning: menu design, client negotiation, conflict resolution, proposal writing
- **Haiku 4.5** — Fast/cheap: inventory lookups, classification, notification drafting, simple extraction
- **Auto-routing** — Orchestrator agent classifies task complexity and dispatches to appropriate model

---

## 6. User Interfaces

### 6.1 Client Portal (Next.js 15 + React 19)
- Conversational event booking (chat interface with Client Concierge Agent)
- Visual menu builder with real-time pricing
- Dietary preference collection
- Proposal review and e-signature (via Dropbox Sign or DocuSeal)
- Payment (Stripe + local Lebanon rails)
- Real-time event day tracker

### 6.2 Staff Dashboard (Next.js 15)
- Kitchen station view (per-station agent instructions)
- Inventory alerts and quick count
- Event timeline with live updates
- WhatsApp-style chat with other staff
- Offline-capable PWA for back-of-house

### 6.3 Admin Console (Next.js 15)
- Agent observability dashboard (traces, costs, approvals)
- Analytics (revenue, popular menus, waste, margins)
- Configuration (agent prompts, thresholds, policies)
- Audit log browser
- Financial reports

### 6.4 Mobile App (Expo)
- Owner app: approvals, KPIs, critical alerts
- Staff app: shifts, event briefings, time tracking
- Waiter app: order taking (integrates with existing SC Waiter v3)

---

## 7. Implementation Roadmap

### Phase 1 — Foundation (Weeks 1-4)
- Firebase project setup, Firestore schema, auth
- Monorepo scaffolding, CI/CD pipeline
- First agent: Client Concierge (intake only)
- Basic client portal with chat interface

### Phase 2 — Core Agents (Weeks 5-10)
- Menu Architect Agent + Recipe database migration
- Supply Chain Agent + Inventory sync
- Operations Director Agent + orchestration layer
- Staff dashboard MVP

### Phase 3 — Kitchen Operations (Weeks 11-16)
- Executive Chef Agent + station sub-agents
- Real-time kitchen display system
- Equipment and logistics agents
- Waiter app integration

### Phase 4 — Intelligence & Polish (Weeks 17-22)
- Evaluation suite and agent tuning
- Analytics dashboard
- Mobile apps
- Canva integration for auto-generated collateral
- WhatsApp Business API integration

### Phase 5 — Scale & Extend (Weeks 23+)
- Multi-venue support (Sporting Club + Feluka + pop-ups)
- Supplier marketplace integration
- Predictive inventory and demand forecasting
- Franchise-ready white-label version

---

## 8. Observability, Cost & Governance

### 8.1 Agent Cost Controls
- Per-event token budget with hard cutoffs
- Model downgrade on budget overrun (Opus → Haiku)
- Response caching for repeated queries (recipe lookups, pricing)
- Daily/monthly spend dashboards per agent

### 8.2 Evaluation Framework
- Golden dataset of past events with expected outputs
- Continuous evals on menu quality, cost accuracy, dietary safety
- Regression tests before any prompt or model change
- Human rating interface for edge cases

### 8.3 Safety & Compliance
- Allergen safety: mandatory double-check agent before any menu finalization
- Food safety: HACCP-aligned logging
- Data privacy: GDPR-style consent for client data
- Financial controls: approval thresholds, audit trails

---

## 9. Localization for Lebanon Market

- **Bilingual:** Arabic + English throughout UI and agent responses
- **Dual Currency:** USD primary, LBP with live exchange rate
- **WhatsApp-first:** Primary client communication channel
- **Cash-aware:** Payment flows account for mixed cash/digital realities
- **Venue knowledge:** Pre-loaded with Beirut/Mount Lebanon venues, suppliers, logistics constraints
- **Cultural menus:** Mezze-forward defaults, holiday menus (Ramadan, Easter, Christmas), event templates (engagement, graduation, corporate)

---

## 10. Future Horizons

- **Voice agents:** Phone-based Client Concierge via Vapi or LiveKit
- **Vision agents:** Kitchen camera feed → real-time plating QC
- **Predictive:** Demand forecasting using historical + weather + calendar
- **Supplier marketplace:** Agent-to-agent negotiation with supplier systems
- **Guest personalization:** Returning guest recognition and preference memory
- **Autonomous events:** Full event execution with minimal human touch for standard packages

---
