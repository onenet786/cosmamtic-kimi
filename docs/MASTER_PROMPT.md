# MASTER PROMPT: Cosmetics Trading ERP & POS Platform

## Role & Task
You are a senior full-stack engineer and UI/UX architect. Build a production-ready, user-friendly **Cosmetics Trading ERP & POS Platform** using the requirements below. Prioritize clean code, modern UI, robust business logic, and a scalable database design.

---

## Product Goal
A SaaS-native, multi-tenant-ready (schema-per-tenant) ERP for a cosmetics trading company with multiple retail shops. The first deployment is a fully unlocked single tenant. The system must eventually be resellable as a subscription SaaS to other cosmetics distributors/retailers.

---

## Users
- **Owner / Partners:** mobile oversight, approvals, dashboards.
- **Accountant / Finance Manager:** GL, vouchers, reconciliation.
- **Branch Manager:** branch-level inventory, purchase, sales.
- **POS Operator / Cashier:** offline sales, returns, shift closure.
- **Warehouse / Inventory Staff:** receiving, transfers, counts.

---

## Tech Stack
- **Framework:** Next.js 14+ (App Router) with TypeScript.
- **Styling:** Tailwind CSS + shadcn/ui components.
- **Database:** PostgreSQL (recommended) with Prisma ORM.
- **State / API:** Next.js Server Actions + React Server Components where possible; React Query for client cache.
- **Auth:** NextAuth.js or Clerk (or custom JWT with role/branch claims).
- **POS:** PWA-capable offline-first web app using IndexedDB/local queue + background sync.
- **Mobile App:** React Native (future) or responsive PWA for owner approvals now.
- **Reports:** Server-side generated Excel/PDF via libraries like xlsx + pdfmake or Puppeteer.
- **Notifications:** Push via FCM/APNs, WhatsApp Business API, SMS, Email.
- **Storage:** S3-compatible object storage for attachments.

---

## Database Recommendation
**Primary: PostgreSQL**
- ACID compliance is mandatory for double-entry accounting and inventory costing.
- Supports schema-per-tenant via PostgreSQL schemas for future SaaS resale.
- Excellent JSONB support for custom fields and flexible metadata.
- Row-level security (RLS) can enforce tenant/branch isolation.
- Native support for complex queries, materialized views for reports, and window functions for aging/ledger running balances.
- Reliable full-text search and time-series-like patterns for audit logs.

**Hosting suggestions:** AWS RDS/Aurora PostgreSQL, Supabase, Neon, or self-managed on a cloud VM for cost control.

---

## Core Architectural Rules
1. **Server-side truth:** all monetary and quantity calculations are computed server-side and re-validated on write. Never trust client totals.
2. **Base-unit storage:** all stock quantities and costs are stored in one base unit. UOM conversion is input/presentation only.
3. **Offline POS:** core sale transactions must work without internet; sync queue with server-side conflict resolution and clear audit.
4. **Shared approval engine:** one reusable approval service handles returns, discounts, expenses, transfers, credit overrides.
5. **Immutable audit:** every create/edit/delete/approve on financial or stock data is automatically logged with user, timestamp, and before/after values.
6. **No hard deletes:** posted financial/stock records are reversed or cancelled, never deleted.
7. **Control accounts:** AR, AP, Inventory, Cash, Bank are auto-aggregated from sub-ledgers; manual posting blocked.
8. **Multi-branch by config:** adding a branch requires no schema or code change.

---

## Functional Modules (Phase 1 — MVP)
### 1. Financial Management
- 4-level COA (Class → Group → Category → Ledger) with pre-built trading template.
- Control accounts (AR, AP, Inventory, Cash, Bank) auto-aggregate; no manual posting.
- Fiscal year configuration with custom start/end date.
- Opening balance entry for GL, party, inventory, fixed assets with debit=credit validation.
- Voucher types: Journal, Payment, Receipt, Contra, Debit Note, Credit Note.
- Auto-numbering per branch/fiscal year with configurable prefix, gapless sequence.
- Maker-checker approval for vouchers above threshold.
- Voucher reversal/cancellation with linked reversing entry and audit trail.
- Multiple cash/bank accounts per shop; daily position report.
- PDC register for issued/received cheques with maturity alerts.
- Expense entry with COA mapping and mandatory cost-center/branch tag.
- Year-end closing with auto entries and balance roll-forward.

### 2. General Ledger & Party Ledger
- Real-time GL posting from every sub-module.
- Drill-down from any GL balance to source voucher/transaction.
- Trial Balance, Ledger Report, Day Book (filter by date, branch, account; export Excel/PDF).
- Party master with type (Customer/Supplier/Both) and sub-classification (Retailer/Wholesaler/Distributor/Salon).
- Credit limit and credit period with soft-warn or hard-block.
- Party-wise running balance, transaction history, aging view.

### 3. Inventory Management
- Item master with parent-variant structure; independent SKU/barcode/stock per variant.
- Multi-UOM: base unit + unlimited hierarchy (e.g., Carton=12 Dozen=144 Piece).
- Separate purchase UOM, sales UOM, default reporting UOM per item; overridable per transaction.
- Fractional/loose-unit sale support without manual unbundling.
- Item categorization: Category → Sub-category → Brand, HS code, tax category.
- Mandatory batch number and expiry date at GRN for batch-tracked items.
- FEFO suggestion during picking.
- Multi-warehouse/shop stock with independent levels and consolidated view.
- Stock transfer between branches: request → dispatch → receive with in-transit visibility.
- Stock adjustment (damage/shrinkage/sample-out) with reason codes and approval.
- FIFO or Weighted Average costing per tenant, calculated in base unit.
- Real-time stock valuation and dead/slow-moving stock reports.

### 4. Purchase & Sales Management
- Purchase cycle: Requisition → PO → GRN → Purchase Invoice, 3-way match with variance flagging.
- UOM selection per purchase line with auto base-unit conversion.
- Purchase return linked to GRN, creates supplier debit note.
- Sales cycle: Quotation → Sales Order → Sales Invoice → Delivery Note.
- UOM selection per sales line with correct pricing and base-unit stock deduction.
- Sales return linked to original invoice with reason code.
- Multiple price lists by party classification, varying by UOM.
- Credit limit check at invoice creation.
- Province-configurable sales tax.

### 5. Accounts Receivable & Payable
- Aging reports (0-30/31-60/61-90/90+).
- Payment allocation: auto FIFO or manual; partial payments; advance tracking.
- PDC register integrated with AR/AP; maturity updates ledger; bounced cheque workflow.

### 6. Point of Sale System
- Offline-first transaction capture with local queue and auto-sync.
- Shift/till management: opening float, closing reconciliation, over/short report.
- Multiple/split payment methods (cash, card, etc.).
- Barcode scanning with UOM auto-detection; manual UOM toggle.
- Customer lookup pulling party ledger data.
- Return initiation routed for owner approval before processing.
- Discount authorization above threshold via supervisor PIN or owner approval.
- Thermal receipt printing + optional SMS/WhatsApp e-receipt.
- End-of-day Z-report reconciled to GL.

### 7. Owner / Partner Mobile App
- Real-time dashboard: cash inflow/outflow, sales vs prior period, stock valuation, top SKUs, low-stock alerts.
- Multi-branch toggle (consolidated/single).
- Unified approval inbox for returns, discounts, expenses, transfers, credit overrides.
- Return approval workflow: push → approve/reject → unlocks POS.
- Push notifications for large cash withdrawal, unusual discount, overdue payment, near-expiry, reorder triggers.
- Party ledger lookup from mobile.
- Biometric/PIN re-auth for approvals.
- Approval audit history.

### 8. Reports Suite
- Financial: Trial Balance, P&L, Balance Sheet, Cash Flow.
- Inventory: Stock Valuation, Stock Ledger, Expiry/Dead Stock, Reorder, Transfer, Count Variance.
- Sales/Purchase: Register, Returns, Profitability by Product/Brand/Shop/Rep.
- AR/AP: Aging, PDC Register, Overdue Party List, Collection Report.
- POS: Shift Reconciliation, Z-Report History, Return/Approval Audit.
- All reports exportable to Excel and PDF.

### 9. Platform Services
- RBAC with granular per-module, per-action permissions (view/create/edit/delete/approve).
- Generic, reusable approval chain engine configurable per tenant.
- Full immutable audit trail.
- Multi-branch by configuration.
- Notification engine: in-app, push, WhatsApp, email, SMS.
- Custom fields/metadata via JSON pattern.
- Export on every report and list view.
- Scheduled backups and retention policy.

---

## Non-Functional Requirements
- POS transaction <1s locally; dashboard widgets <2s on 4G.
- 99.5% cloud uptime; POS 100% operational during connectivity loss.
- Horizontal tenant scaling without per-tenant code changes.
- API-level RBAC; encryption at rest/transit; password policy and session timeout.
- Double-entry integrity at DB transaction level.
- All financial/stock mutations logged immutably.
- PKR formatting, Pakistan tax/FBR compliance, English UI with Urdu label support architected.
- Daily backups with tested restore procedure.

---

## Success Metrics
- 100% of shop sales captured in POS within 30 days of go-live.
- Stock variance <2% within 60 days.
- Owner approves/rejects a return within 5 minutes of initiation.
- Same-day month-end close.
- Zero unresolved GL-to-subledger discrepancies at month-end.

---

## Design & UX Requirements
- Use a clean, modern dashboard-first layout with a collapsible sidebar.
- Cards, charts, and tables must be responsive and mobile-friendly.
- Use consistent color coding for status: success green, warning yellow, danger red, info blue.
- Forms must show inline validation, loading states, and clear error messages.
- Use modals for quick actions (add party, quick expense, approve request).
- POS interface must be large-touch optimized for cashiers with minimal training.
- Owner mobile views should be card-based with swipeable approvals.
- Dark mode support is a plus.
- Accessibility: WCAG 2.1 AA minimum.

---

## Deliverables
1. Complete Next.js codebase with TypeScript.
2. Prisma schema covering all core entities.
3. Seed data for default COA, roles, permissions, and sample branches.
4. Responsive web admin app (desktop + tablet).
5. Offline-first POS PWA.
6. Owner approval mobile view (responsive web or React Native stub).
7. Core reports with Excel/PDF export.
8. Dockerized development setup (docker-compose.yml).
9. README with setup instructions and deployment notes.
10. Architecture decision record (ADR) for database and tenant model.

---

## Implementation Priority
1. Project scaffold, auth, RBAC, tenant/branch setup.
2. Chart of Accounts, fiscal year, opening balances.
3. Party master and ledger.
4. Inventory: item, variant, UOM, warehouse, batch, stock ledger.
5. Purchase cycle (PO → GRN → Invoice → Return).
6. Sales cycle (Quotation → Order → Invoice → Delivery → Return).
7. Payments, receipts, AR/AP, PDC.
8. POS offline-first client + shift management.
9. Approval engine + owner mobile dashboard.
10. Reports and exports.
11. Notifications, audit log, backups.

---

## Notes for AI Agents
- Always validate tenant/branch context on every server action.
- Always use transactions for double-entry voucher posting and stock updates.
- Never compute totals on the client; recalculate server-side from line items.
- Use optimistic UI only where safe; roll back on server error.
- Write idempotent sync endpoints for POS offline queue.
- Keep controllers/services thin; business logic lives in domain services.
- Add regression tests for voucher balance, inventory costing, and UOM conversion.
