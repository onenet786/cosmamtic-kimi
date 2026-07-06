import { PrismaClient, AccountLevel, AccountType, DebitCredit, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: "Cosmamtic Trading",
      slug: "cosmamtic",
      isActive: true,
    },
  });

  // Create branches
  const mainBranch = await prisma.branch.create({
    data: {
      tenantId: tenant.id,
      name: "Main Shop",
      code: "MAIN",
      address: "Main Market, Karachi",
      phone: "+92-300-0000000",
    },
  });

  const warehouseBranch = await prisma.branch.create({
    data: {
      tenantId: tenant.id,
      name: "Warehouse",
      code: "WH",
      address: "Industrial Area, Karachi",
    },
  });

  // Create fiscal year
  const fiscalYear = await prisma.fiscalYear.create({
    data: {
      tenantId: tenant.id,
      name: "FY 2026-27",
      startDate: new Date("2026-07-01"),
      endDate: new Date("2027-06-30"),
      isActive: true,
    },
  });

  // Create admin user
  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      branchId: mainBranch.id,
      name: "Owner",
      email: "owner@cosmamtic.com",
      passwordHash: bcrypt.hashSync("admin123", 10),
      role: Role.OWNER,
      isActive: true,
    },
  });

  // Create default COA
  const assets = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "1",
      name: "Assets",
      level: AccountLevel.CLASS,
      type: AccountType.ASSET,
      normalBalance: DebitCredit.DEBIT,
    },
  });

  const currentAssets = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "11",
      name: "Current Assets",
      level: AccountLevel.GROUP,
      type: AccountType.ASSET,
      normalBalance: DebitCredit.DEBIT,
      parentId: assets.id,
    },
  });

  const inventoryControl = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "1101",
      name: "Inventory Control",
      level: AccountLevel.LEDGER,
      type: AccountType.ASSET,
      normalBalance: DebitCredit.DEBIT,
      isControl: true,
      parentId: currentAssets.id,
    },
  });

  const cashControl = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "1102",
      name: "Cash Control",
      level: AccountLevel.LEDGER,
      type: AccountType.ASSET,
      normalBalance: DebitCredit.DEBIT,
      isControl: true,
      isCash: true,
      parentId: currentAssets.id,
    },
  });

  const bankControl = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "1103",
      name: "Bank Control",
      level: AccountLevel.LEDGER,
      type: AccountType.ASSET,
      normalBalance: DebitCredit.DEBIT,
      isControl: true,
      isBank: true,
      parentId: currentAssets.id,
    },
  });

  const liabilities = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "2",
      name: "Liabilities",
      level: AccountLevel.CLASS,
      type: AccountType.LIABILITY,
      normalBalance: DebitCredit.CREDIT,
    },
  });

  const currentLiabilities = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "21",
      name: "Current Liabilities",
      level: AccountLevel.GROUP,
      type: AccountType.LIABILITY,
      normalBalance: DebitCredit.CREDIT,
      parentId: liabilities.id,
    },
  });

  const apControl = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "2101",
      name: "Accounts Payable Control",
      level: AccountLevel.LEDGER,
      type: AccountType.LIABILITY,
      normalBalance: DebitCredit.CREDIT,
      isControl: true,
      parentId: currentLiabilities.id,
    },
  });

  const equity = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "3",
      name: "Equity",
      level: AccountLevel.CLASS,
      type: AccountType.EQUITY,
      normalBalance: DebitCredit.CREDIT,
    },
  });

  const retainedEarnings = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "3101",
      name: "Retained Earnings",
      level: AccountLevel.LEDGER,
      type: AccountType.EQUITY,
      normalBalance: DebitCredit.CREDIT,
      parentId: equity.id,
    },
  });

  const revenue = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "4",
      name: "Revenue",
      level: AccountLevel.CLASS,
      type: AccountType.REVENUE,
      normalBalance: DebitCredit.CREDIT,
    },
  });

  const salesRevenue = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "4101",
      name: "Sales Revenue",
      level: AccountLevel.LEDGER,
      type: AccountType.REVENUE,
      normalBalance: DebitCredit.CREDIT,
      parentId: revenue.id,
    },
  });

  const expenses = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "5",
      name: "Expenses",
      level: AccountLevel.CLASS,
      type: AccountType.EXPENSE,
      normalBalance: DebitCredit.DEBIT,
    },
  });

  const cogs = await prisma.account.create({
    data: {
      tenantId: tenant.id,
      code: "5101",
      name: "Cost of Goods Sold",
      level: AccountLevel.LEDGER,
      type: AccountType.EXPENSE,
      normalBalance: DebitCredit.DEBIT,
      parentId: expenses.id,
    },
  });

  // Create default units of measure
  const piece = await prisma.unitOfMeasure.create({
    data: {
      tenantId: tenant.id,
      name: "Piece",
      symbol: "Pcs",
    },
  });

  const dozen = await prisma.unitOfMeasure.create({
    data: {
      tenantId: tenant.id,
      name: "Dozen",
      symbol: "Dz",
    },
  });

  const carton = await prisma.unitOfMeasure.create({
    data: {
      tenantId: tenant.id,
      name: "Carton",
      symbol: "Ctn",
    },
  });

  // Create default warehouse
  await prisma.warehouse.create({
    data: {
      tenantId: tenant.id,
      branchId: mainBranch.id,
      name: "Main Shop Floor",
      code: "MAIN-FLOOR",
    },
  });

  await prisma.warehouse.create({
    data: {
      tenantId: tenant.id,
      branchId: warehouseBranch.id,
      name: "Central Warehouse",
      code: "CENTRAL",
    },
  });

  console.log("Seed completed successfully");
  console.log({
    tenantId: tenant.id,
    mainBranchId: mainBranch.id,
    fiscalYearId: fiscalYear.id,
    inventoryControlId: inventoryControl.id,
    cashControlId: cashControl.id,
    bankControlId: bankControl.id,
    apControlId: apControl.id,
    pieceUnitId: piece.id,
    dozenUnitId: dozen.id,
    cartonUnitId: carton.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
