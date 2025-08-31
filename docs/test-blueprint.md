# Test Blueprint

## Contract Tests
Each module exposes DTOs and API endpoints. Contract tests ensure schema compatibility before merge.

| Module | Endpoint | Test |
|---|---|---|
| Ticketing | `POST /tickets` | Valid ticket creation, VAT calculation |
| Voucher | `POST /vouchers/redeem` | Reject invalid/duplicate/expired |
| Petty Cash | `POST /cash/payout` | Requires approval, ledger update |
| WhatsApp | `POST /notify` | Handles rate-limit responses |
| End-of-Day | `POST /eod/close` | Fails when unresolved discrepancies |

## E2E Smoke Scenarios
1. Issue ticket
2. Redeem voucher
3. Petty cash payout
4. Send ticket via WhatsApp
5. End-of-day close
6. Offline ticket sale
7. Printer failure retry
8. WhatsApp rate limit queue
9. Invalid voucher QR
10. Partial refund

## Visual Regression
Snapshot tests on: Home, Ticketing, Payment, Voucher redemption, End-of-day reports.

## Fixture Seed
Located in `seed/` directory providing sample clients, SKUs, vouchers.

## Canary Toggles
Environment variable `UI_CANARY=true` enables new components without affecting stable flows.
