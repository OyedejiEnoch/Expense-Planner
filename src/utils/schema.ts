import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const BudgetsSchema =pgTable( "budgets", {
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    amount:numeric("amount").notNull(),
    icon:varchar("icons"),
    createdBy:varchar("createdBy").notNull()
})

export const ExpensesSchema =pgTable("expenses", {
    id:serial("id").primaryKey(),
    name:varchar("name").notNull(),
    amount:numeric("amount").notNull().default("0"),
    budgetId:integer("budgetId").references(()=>BudgetsSchema.id),
    createdBy:varchar("createdAt").notNull()
})