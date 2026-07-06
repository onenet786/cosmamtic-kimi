# Cosmamtic ERP & POS

A modern, multi-branch **Cosmetics Trading ERP & POS Platform** built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and PostgreSQL.

## Features

- **Financial Management:** 4-level chart of accounts, vouchers, fiscal years, opening balances, PDC, year-end closing.
- **General Ledger:** Real-time GL posting from every sub-module, drill-down, trial balance, day book.
- **Party Ledger:** Customers, suppliers, credit limits, aging, statements.
- **Inventory:** Multi-UOM, batch/expiry, multi-warehouse, FIFO/weighted average costing, transfers, adjustments.
- **Purchase & Sales:** Full cycle (PO → GRN → Invoice, Quotation → Order → Invoice → Delivery), returns, price lists.
- **AR/AP:** Aging, payment allocation, receipts, payments, PDC.
- **POS:** Offline-first, barcode scanning, multi-payment, shift management, returns with approval.
- **Owner Mobile App:** Real-time dashboard, unified approval center, push notifications.
- **Reports:** Financial, inventory, sales/purchase, AR/AP, POS reports with Excel/PDF export.
- **Platform:** RBAC, audit trail, approval engine, multi-branch, notifications, backups.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend API | Next.js Server Actions + REST API |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| Reports | xlsx, jspdf, recharts |
| Mobile | Responsive PWA (React Native planned for future) |
| DevOps | Docker, Docker Compose |

## Recommended Database

**PostgreSQL** is the best choice for this application because it provides:

- ACID compliance for double-entry accounting and inventory costing.
- Schema-per-tenant support for future SaaS resale.
- JSONB for custom fields and flexible metadata.
- Row-level security for tenant/branch isolation.
- Materialized views and window functions for complex reports.
- Reliable full-text search and audit logging.

Suggested hosting: AWS RDS/Aurora, Supabase, Neon, aaPanel-managed PostgreSQL on a dedicated server, or a self-managed cloud VM.

## Project Structure

```
cosmamtic-kimi/
├── docs/
│   ├── MASTER_PROMPT.md          # Complete AI prompt for extending this project
│   └── AA_PANEL_SETUP.md         # Guide for PostgreSQL on aaPanel dedicated server
├── web/                          # Next.js application
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── dashboard/        # Admin dashboard routes
│   │   │   │   ├── accounts/
│   │   │   │   ├── approvals/
│   │   │   │   ├── inventory/
│   │   │   │   ├── parties/
│   │   │   │   ├── payments/
│   │   │   │   ├── pos/
│   │   │   │   ├── purchases/
│   │   │   │   ├── reports/
│   │   │   │   ├── sales/
│   │   │   │   └── settings/
│   │   │   ├── page.tsx          # Login page
│   │   │   └── layout.tsx        # Root layout
│   │   ├── components/
│   │   │   ├── layout/           # Sidebar, header
│   │   │   └── ui/               # shadcn/ui components
│   │   └── lib/
│   │       ├── prisma.ts         # Prisma client singleton
│   │       └── utils.ts          # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── seed.ts               # Seed data
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── docker-compose.yml
│   └── Dockerfile
```

## Setup Instructions

### Prerequisites

- Node.js 20+
- PostgreSQL 15+ (or use Docker)
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   cd web
   npm install --legacy-peer-deps
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Start PostgreSQL (choose one):**

   **Docker:**
   ```bash
   docker-compose up -d db
   ```

   **Remote/aaPanel server:**
   See `docs/AA_PANEL_SETUP.md` for installing PostgreSQL on aaPanel, creating a database/user, and updating `DATABASE_URL` in `.env`.

   **Existing local PostgreSQL:**
   Update `DATABASE_URL` in `.env` with your local credentials.

4. **Generate Prisma client and run migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed the database:**
   ```bash
   npm run db:seed
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3025](http://localhost:3025) in your browser.

### Default Login

- Email: `owner@cosmamtic.com`
- Password: `admin123`

Change this password immediately after first login in a production environment.

### Docker Compose (Full Stack)

```bash
docker-compose up -d
```

This will start both PostgreSQL and the Next.js application.

## Next Steps

1. **Authentication:** Implement NextAuth.js with credentials provider and role-based access.
2. **Server Actions:** Build CRUD server actions for accounts, parties, items, vouchers, orders.
3. **Business Logic:** Implement double-entry voucher posting, inventory costing, UOM conversion.
4. **Offline POS:** Add IndexedDB/local queue and background sync.
5. **Approval Engine:** Implement reusable approval workflow service.
6. **Reports:** Add Excel/PDF export and executive dashboard charts.
7. **Mobile App:** Build responsive owner approval view or React Native app.
8. **Notifications:** Add push, WhatsApp, SMS, and email notifications.

## Database Schema

The Prisma schema covers all core entities:

- Tenant, Branch, User, Role, Permission
- ChartOfAccount, FiscalYear, Voucher, VoucherLine
- Party, PartyLedgerEntry, CreditTerm
- Item, ItemVariant, UnitOfMeasure, ItemUOMConversion, Barcode
- Warehouse, StockLedgerEntry, StockTransfer, StockAdjustment, PhysicalCount
- PurchaseOrder, GoodsReceivedNote, PurchaseInvoice, PurchaseReturn
- Quotation, SalesOrder, SalesInvoice, SalesReturn, PriceList, PriceListItem, Scheme
- Payment, Receipt, PDCCheque, PaymentAllocation
- POSSession, POSTransaction, POSTransactionLine, ReturnRequest, ApprovalRecord
- ApprovalChainConfig, NotificationLog, AuditLogEntry, Attachment

## Contributing

This is a generated foundation. Use the master prompt in `docs/MASTER_PROMPT.md` to extend the application with AI coding assistants.

## License

Private / Commercial — for client use.
