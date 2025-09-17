import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  propertyType: text("property_type").notNull(),
  yield: decimal("yield", { precision: 5, scale: 2 }),
  ownershipCap: integer("ownership_cap").default(100),
  status: text("status").notNull().default("upcoming"),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investors = pgTable("investors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  kycStatus: text("kyc_status").notNull().default("pending"),
  totalInvested: decimal("total_invested", { precision: 12, scale: 2 }).default("0"),
  activeProperties: integer("active_properties").default(0),
  monthlyIncome: decimal("monthly_income", { precision: 10, scale: 2 }).default("0"),
  nationality: text("nationality"),
  documentsUploaded: boolean("documents_uploaded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  investorId: varchar("investor_id").references(() => investors.id),
  propertyId: varchar("property_id").references(() => properties.id),
  type: text("type").notNull(), // "investment", "payout", "withdrawal"
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const kycDocuments = pgTable("kyc_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  investorId: varchar("investor_id").references(() => investors.id),
  documentType: text("document_type").notNull(),
  documentUrl: text("document_url").notNull(),
  status: text("status").notNull().default("pending"),
  reviewNotes: text("review_notes"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertInvestorSchema = createInsertSchema(investors).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Investor = typeof investors.$inferSelect;
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type KycDocument = typeof kycDocuments.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;