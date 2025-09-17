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
  role: text("role").notNull().default("admin"), // "super_admin", "admin", "manager", "viewer"
  accessLevel: text("access_level").notNull().default("full"), // "full", "limited", "read_only"
  avatar: text("avatar"),
  phone: text("phone"),
  department: text("department"),
  lastLogin: timestamp("last_login"),
  status: text("status").notNull().default("active"), // "active", "inactive", "suspended"
  permissions: text("permissions").array().default(sql`ARRAY[]::text[]`), // array of permission strings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
  kycStatus: text("kyc_status").notNull().default("pending"), // "pending", "approved", "rejected", "under_review"
  totalInvested: decimal("total_invested", { precision: 12, scale: 2 }).default("0"),
  activeProperties: integer("active_properties").default(0),
  monthlyIncome: decimal("monthly_income", { precision: 10, scale: 2 }).default("0"),
  nationality: text("nationality"),
  documentsUploaded: boolean("documents_uploaded").default(false),
  // Additional KYC fields
  firstName: text("first_name"),
  lastName: text("last_name"),
  salutation: text("salutation"), // "Mr", "Mrs", "Ms", "Dr"
  gender: text("gender"), // "male", "female", "other"
  dateOfBirth: timestamp("date_of_birth"),
  occupation: text("occupation"),
  city: text("city"),
  country: text("country"),
  address: text("address"),
  profilePicture: text("profile_picture"),
  applicationProgress: integer("application_progress").default(0), // 0-100 percentage
  appDownloadedAt: timestamp("app_downloaded_at"),
  kycSubmittedAt: timestamp("kyc_submitted_at"),
  aiRiskScore: integer("ai_risk_score"), // 1-100 AI calculated risk score
  preferredLanguage: text("preferred_language").default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
  documentType: text("document_type").notNull(), // "national_id", "passport", "iqama", "selfie", "proof_of_income", "address_proof", "employment_letter", "bank_statement"
  documentUrl: text("document_url").notNull(),
  status: text("status").notNull().default("pending"), // "pending", "approved", "rejected", "under_review", "resubmit_required"
  reviewNotes: text("review_notes"),
  reviewedBy: varchar("reviewed_by").references(() => adminUsers.id),
  isAuthentic: boolean("is_authentic"), // AI/Third-party authentication result
  confidenceScore: integer("confidence_score"), // 1-100 confidence in document authenticity
  extractedData: text("extracted_data"), // JSON string of extracted document data
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("info"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  message: text("message").notNull(),
  sender: text("sender").notNull(), // "user" or "ai"
  aiContext: text("ai_context"), // Context for AI responses
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiInsights = pgTable("ai_insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // "market", "customer", "property", "risk"
  title: text("title").notNull(),
  content: text("content").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  entityId: varchar("entity_id"), // Related property/customer ID
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
  updatedAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertKycDocumentSchema = createInsertSchema(kycDocuments).omit({
  id: true,
  uploadedAt: true,
  reviewedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertAiInsightSchema = createInsertSchema(aiInsights).omit({
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
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type KycDocument = typeof kycDocuments.$inferSelect;
export type InsertKycDocument = z.infer<typeof insertKycDocumentSchema>;
export type Notification = typeof notifications.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type AiInsight = typeof aiInsights.$inferSelect;
export type InsertAiInsight = z.infer<typeof insertAiInsightSchema>;