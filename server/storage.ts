import {
  type User,
  type InsertUser,
  type Investor,
  type InsertInvestor,
  type Property,
  type InsertProperty,
  type Transaction,
  type InsertTransaction,
  type ChatMessage,
  type InsertChatMessage,
  type AiInsight,
  type InsertAiInsight,
  type Notification,
  type Investment,
  type InsertInvestment,
  type InvestmentSettings,
  type InsertInvestmentSettings
} from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for all entities
export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Investors
  getInvestor(id: string): Promise<Investor | undefined>;
  getAllInvestors(): Promise<Investor[]>;
  createInvestor(investor: InsertInvestor): Promise<Investor>;
  updateInvestor(id: string, updates: Partial<InsertInvestor>): Promise<Investor | undefined>;
  
  // Properties
  getProperty(id: string): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined>;
  
  // Transactions
  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByInvestor(investorId: string): Promise<Transaction[]>;
  getAllTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Chat Messages
  getChatMessage(id: string): Promise<ChatMessage | undefined>;
  getChatMessagesByUser(userId?: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // AI Insights
  getAiInsight(id: string): Promise<AiInsight | undefined>;
  getAiInsightsByType(type: string): Promise<AiInsight[]>;
  getAllAiInsights(): Promise<AiInsight[]>;
  createAiInsight(insight: InsertAiInsight): Promise<AiInsight>;

  // Investment Settings
  getActiveInvestmentSettings(): Promise<InvestmentSettings | undefined>;
  getInvestmentSettings(id: string): Promise<InvestmentSettings | undefined>;
  createInvestmentSettings(settings: InsertInvestmentSettings): Promise<InvestmentSettings>;
  updateInvestmentSettings(id: string, updates: Partial<InsertInvestmentSettings>): Promise<InvestmentSettings | undefined>;

  // Investments
  getInvestment(id: string): Promise<Investment | undefined>;
  getInvestmentsByInvestor(investorId: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: string, updates: Partial<InsertInvestment>): Promise<Investment | undefined>;

  // Notifications
  getAllNotifications(): Promise<Notification[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private investors: Map<string, Investor>;
  private properties: Map<string, Property>;
  private transactions: Map<string, Transaction>;
  private chatMessages: Map<string, ChatMessage>;
  private aiInsights: Map<string, AiInsight>;
  private notifications: Map<string, Notification>;
  private investmentSettings: Map<string, InvestmentSettings>;
  private investments: Map<string, Investment>;

  constructor() {
    this.users = new Map();
    this.investors = new Map();
    this.properties = new Map();
    this.transactions = new Map();
    this.chatMessages = new Map();
    this.aiInsights = new Map();
    this.notifications = new Map();
    this.investmentSettings = new Map();
    this.investments = new Map();

    // Initialize with some sample data
    this.initializeSampleData();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Investors
  async getInvestor(id: string): Promise<Investor | undefined> {
    return this.investors.get(id);
  }

  async getAllInvestors(): Promise<Investor[]> {
    return Array.from(this.investors.values());
  }

  async createInvestor(insertInvestor: InsertInvestor): Promise<Investor> {
    const id = randomUUID();
    const investor: Investor = { 
      ...insertInvestor, 
      id, 
      createdAt: new Date() 
    };
    this.investors.set(id, investor);
    return investor;
  }

  async updateInvestor(id: string, updates: Partial<InsertInvestor>): Promise<Investor | undefined> {
    const investor = this.investors.get(id);
    if (!investor) return undefined;
    
    const updated = { ...investor, ...updates };
    this.investors.set(id, updated);
    return updated;
  }

  // Properties
  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { 
      ...insertProperty, 
      id, 
      createdAt: new Date() 
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;
    
    const updated = { ...property, ...updates };
    this.properties.set(id, updated);
    return updated;
  }

  // Transactions
  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByInvestor(investorId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(t => t.investorId === investorId);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      createdAt: new Date() 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Chat Messages
  async getChatMessage(id: string): Promise<ChatMessage | undefined> {
    return this.chatMessages.get(id);
  }

  async getChatMessagesByUser(userId?: string): Promise<ChatMessage[]> {
    const allMessages = Array.from(this.chatMessages.values());
    if (!userId) return allMessages;
    return allMessages.filter(m => m.userId === userId);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // AI Insights
  async getAiInsight(id: string): Promise<AiInsight | undefined> {
    return this.aiInsights.get(id);
  }

  async getAiInsightsByType(type: string): Promise<AiInsight[]> {
    return Array.from(this.aiInsights.values())
      .filter(insight => insight.type === type);
  }

  async getAllAiInsights(): Promise<AiInsight[]> {
    return Array.from(this.aiInsights.values());
  }

  async createAiInsight(insertInsight: InsertAiInsight): Promise<AiInsight> {
    const id = randomUUID();
    const insight: AiInsight = { 
      ...insertInsight, 
      id, 
      createdAt: new Date() 
    };
    this.aiInsights.set(id, insight);
    return insight;
  }

  // Notifications
  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  // Investment Settings
  async getActiveInvestmentSettings(): Promise<InvestmentSettings | undefined> {
    return Array.from(this.investmentSettings.values())
      .find(settings => settings.isActive === true);
  }

  async getInvestmentSettings(id: string): Promise<InvestmentSettings | undefined> {
    return this.investmentSettings.get(id);
  }

  async createInvestmentSettings(insertSettings: InsertInvestmentSettings): Promise<InvestmentSettings> {
    const id = randomUUID();
    const settings: InvestmentSettings = {
      ...insertSettings,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.investmentSettings.set(id, settings);
    return settings;
  }

  async updateInvestmentSettings(id: string, updates: Partial<InsertInvestmentSettings>): Promise<InvestmentSettings | undefined> {
    const settings = this.investmentSettings.get(id);
    if (!settings) return undefined;

    const updated = { ...settings, ...updates, updatedAt: new Date() };
    this.investmentSettings.set(id, updated);
    return updated;
  }

  // Investments
  async getInvestment(id: string): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async getInvestmentsByInvestor(investorId: string): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(inv => inv.investorId === investorId);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = randomUUID();
    const investment: Investment = {
      ...insertInvestment,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.investments.set(id, investment);
    return investment;
  }

  async updateInvestment(id: string, updates: Partial<InsertInvestment>): Promise<Investment | undefined> {
    const investment = this.investments.get(id);
    if (!investment) return undefined;

    const updated = { ...investment, ...updates, updatedAt: new Date() };
    this.investments.set(id, updated);
    return updated;
  }

  private initializeSampleData() {
    // Sample investors with proper typing
    const sampleInvestors: Omit<Investor, 'id' | 'createdAt'>[] = [
      {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed.rashid@example.com',
        phone: '+966 50 123 4567',
        kycStatus: 'approved',
        totalInvested: '750000',
        activeProperties: 3,
        monthlyIncome: '12500',
        nationality: 'Saudi Arabia',
        documentsUploaded: true
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+966 55 987 6543',
        kycStatus: 'approved',
        totalInvested: '520000',
        activeProperties: 5,
        monthlyIncome: '28400',
        nationality: 'United States',
        documentsUploaded: true
      },
      {
        name: 'Mohammad Al-Zahra',
        email: 'mohammad.zahra@example.com',
        phone: '+966 56 456 7890',
        kycStatus: 'pending',
        totalInvested: '0',
        activeProperties: 0,
        monthlyIncome: '0',
        nationality: 'Saudi Arabia',
        documentsUploaded: false
      }
    ];

    sampleInvestors.forEach(investor => {
      const id = randomUUID();
      this.investors.set(id, {
        ...investor,
        id,
        createdAt: new Date()
      });
    });

    // Sample properties with proper typing
    const sampleProperties: Omit<Property, 'id' | 'createdAt'>[] = [
      {
        title: 'Luxury Apartments Riyadh',
        description: 'Premium residential complex in the heart of Riyadh',
        location: 'Riyadh, Saudi Arabia',
        price: '2500000',
        propertyType: 'Residential',
        yield: '8.5',
        ownershipCap: 100,
        status: 'active',
        images: ['/assets/property1.jpg']
      },
      {
        title: 'Commercial Tower Jeddah',
        description: 'Modern office tower with premium amenities',
        location: 'Jeddah, Saudi Arabia',
        price: '5200000',
        propertyType: 'Commercial',
        yield: '9.2',
        ownershipCap: 100,
        status: 'active',
        images: ['/assets/property2.jpg']
      }
    ];

    sampleProperties.forEach(property => {
      const id = randomUUID();
      this.properties.set(id, {
        ...property,
        id,
        createdAt: new Date()
      });
    });

    // Sample AI insights with proper typing
    const sampleInsights: Omit<AiInsight, 'id' | 'createdAt'>[] = [
      {
        type: 'market',
        title: 'Strong Residential Demand in Riyadh',
        content: 'AI analysis shows 23% increase in residential property inquiries in Riyadh over the past month.',
        confidence: '0.92',
        entityId: null
      },
      {
        type: 'risk',
        title: 'KYC Processing Bottleneck Detected',
        content: 'AI detected average KYC processing time increased to 4.2 days.',
        confidence: '0.98',
        entityId: null
      }
    ];

    sampleInsights.forEach(insight => {
      const id = randomUUID();
      this.aiInsights.set(id, {
        ...insight,
        id,
        createdAt: new Date()
      });
    });

    // Initialize default investment settings
    const defaultSettings: Omit<InvestmentSettings, 'id' | 'createdAt' | 'updatedAt'> = {
      rentalYieldPercentage: '8.00',
      appreciationRatePercentage: '5.00',
      maturityPeriodYears: 3,
      investmentDurationYears: 5,
      earlyWithdrawalPenaltyPercentage: '15.00',
      platformFeePercentage: '2.00',
      minInvestmentAmount: '1000.00',
      maxInvestmentAmount: '1000000.00',
      isActive: true,
      description: 'Default investment settings',
      createdBy: null,
      updatedBy: null
    };

    const settingsId = randomUUID();
    this.investmentSettings.set(settingsId, {
      ...defaultSettings,
      id: settingsId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

export const storage = new MemStorage();
