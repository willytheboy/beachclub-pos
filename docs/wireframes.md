# Core User Flows Wireframes

This document sketches key screens for the POS. Each wireframe lists loading, empty, and error states along with edge cases.

## 1. Issue Beach Access Ticket

**Screens**: Home → Tickets → Product Picker → Client (optional) → Payment → Print/WhatsApp → Done

| Screen | States | Notes |
|---|---|---|
| Home | _default_ list of actions | Offline badge when device lacks connectivity |
| Tickets | Loading spinner → list or empty state | Error banner on fetch failure |
| Product Picker | Grid of SKUs, search input | Offline: uses local cache |
| Client (optional) | Search/add client | Invalid QR → alert |
| Payment | Tender keypad, amount due | Printer failure → retry modal |
| Print/WhatsApp | Choice of channels | WhatsApp rate limit → queue with toast |
| Done | Success summary | Duplicate redemption handled upstream |

## 2. Redeem Voucher

**Screens**: Checkout → Apply voucher → Recalculate totals → Fraud checks → Confirm → Audit log

| Screen | States | Notes |
|---|---|---|
| Checkout | Basket summary | Invalid QR or duplicate → error inline |
| Apply voucher | Loading, success, or invalid | Offline: redemption deferred |
| Recalculate totals | Spinner, updated totals | Partial refunds supported |
| Fraud checks | Manual override prompt | Logs to audit trail |
| Confirm | Success page | Printer fail → retry |
| Audit log | Immutable list | Shows attempt and operator |

## 3. Petty Cash Payout

**Screens**: Admin → Payout form (keypad) → Reason + approval → Print slip → Ledger update

| Screen | States | Notes |
|---|---|---|
| Admin | Menu of admin tasks | |
| Payout form | Keypad, amount field | Empty state when 0 |
| Reason + approval | Text input + supervisor PIN | Offline: stores pending |
| Print slip | Printing state, success, error | Printer fail → retry |
| Ledger update | Confirmation | Ledger locked offline |

## 4. WhatsApp Delivery

**Screens**: Choose recipient → Template + variables → Attach ticket/receipt → Send → Status toast

| Screen | States | Notes |
|---|---|---|
| Choose recipient | Contact list or manual entry | Consent tracking |
| Template + variables | Form fields with tokens | |
| Attach ticket/receipt | List of available docs | |
| Send | Sending progress | Rate limit → queued |
| Status toast | Success or failure toast | Retry option |

## 5. End-of-Day

**Screens**: Count cash → Z-report → Discrepancy resolution → Close shift → Backups + sign-off

| Screen | States | Notes |
|---|---|---|
| Count cash | Denomination inputs | Offline allowed |
| Z-report | Generating, preview | Printer fail → retry |
| Discrepancy resolution | List of mismatches | Audit trail |
| Close shift | Confirmation | |
| Backups + sign-off | Upload progress | Offline → pending upload |

