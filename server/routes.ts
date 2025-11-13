import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertInvestorSchema,
  insertPropertySchema,
  insertTransactionSchema,
  insertChatMessageSchema,
  insertAiInsightSchema,
  insertInvestmentSettingsSchema,
  insertInvestmentSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Investors endpoints
  app.get("/api/investors", async (req, res) => {
    try {
      const investors = await storage.getAllInvestors();
      res.json(investors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investors" });
    }
  });

  app.get("/api/investors/:id", async (req, res) => {
    try {
      const investor = await storage.getInvestor(req.params.id);
      if (!investor) {
        return res.status(404).json({ error: "Investor not found" });
      }
      res.json(investor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investor" });
    }
  });

  app.post("/api/investors", async (req, res) => {
    try {
      const validatedData = insertInvestorSchema.parse(req.body);
      const investor = await storage.createInvestor(validatedData);
      res.status(201).json(investor);
    } catch (error) {
      res.status(400).json({ error: "Invalid investor data" });
    }
  });

  app.put("/api/investors/:id", async (req, res) => {
    try {
      const validatedData = insertInvestorSchema.partial().parse(req.body);
      const investor = await storage.updateInvestor(req.params.id, validatedData);
      if (!investor) {
        return res.status(404).json({ error: "Investor not found" });
      }
      res.json(investor);
    } catch (error) {
      res.status(400).json({ error: "Invalid investor data" });
    }
  });

  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await storage.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  // Transactions endpoints
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/investor/:investorId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByInvestor(req.params.investorId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  // Chat messages endpoints
  app.get("/api/chat/messages", async (req, res) => {
    try {
      const userId = req.query.userId as string | undefined;
      const messages = await storage.getChatMessagesByUser(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  // AI Insights endpoints
  app.get("/api/ai/insights", async (req, res) => {
    try {
      const type = req.query.type as string | undefined;
      const insights = type 
        ? await storage.getAiInsightsByType(type)
        : await storage.getAllAiInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI insights" });
    }
  });

  app.post("/api/ai/insights", async (req, res) => {
    try {
      const validatedData = insertAiInsightSchema.parse(req.body);
      const insight = await storage.createAiInsight(validatedData);
      res.status(201).json(insight);
    } catch (error) {
      res.status(400).json({ error: "Invalid insight data" });
    }
  });

  // AI Chat completion endpoint (will integrate with OpenAI)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, userId, language } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Store user message
      await storage.createChatMessage({
        userId: userId || null,
        message,
        sender: "user",
        aiContext: null
      });

      // Generate AI response (for now, mock response)
      const aiResponse = generateMockAiResponse(message, language);

      // Store AI response
      const aiMessage = await storage.createChatMessage({
        userId: userId || null,
        message: aiResponse,
        sender: "ai",
        aiContext: "response"
      });

      res.json(aiMessage);
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Investment Settings endpoints
  app.get("/api/investment-settings", async (req, res) => {
    try {
      const settings = await storage.getActiveInvestmentSettings();
      if (!settings) {
        return res.status(404).json({ error: "No active investment settings found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investment settings" });
    }
  });

  app.post("/api/investment-settings", async (req, res) => {
    try {
      const validatedData = insertInvestmentSettingsSchema.parse(req.body);
      const settings = await storage.createInvestmentSettings(validatedData);
      res.status(201).json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid investment settings data" });
    }
  });

  app.put("/api/investment-settings/:id", async (req, res) => {
    try {
      const validatedData = insertInvestmentSettingsSchema.partial().parse(req.body);
      const settings = await storage.updateInvestmentSettings(req.params.id, validatedData);
      if (!settings) {
        return res.status(404).json({ error: "Investment settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid investment settings data" });
    }
  });

  // Investments endpoints
  app.get("/api/investments/investor/:investorId", async (req, res) => {
    try {
      const investments = await storage.getInvestmentsByInvestor(req.params.investorId);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investments" });
    }
  });

  app.get("/api/investments/:id", async (req, res) => {
    try {
      const investment = await storage.getInvestment(req.params.id);
      if (!investment) {
        return res.status(404).json({ error: "Investment not found" });
      }
      res.json(investment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch investment" });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const validatedData = insertInvestmentSchema.parse(req.body);

      // Get active investment settings to apply rules
      const settings = await storage.getActiveInvestmentSettings();
      if (!settings) {
        return res.status(400).json({ error: "No active investment settings found" });
      }

      // Calculate maturity date (investmentDate + maturityPeriodYears)
      const maturityDate = new Date();
      maturityDate.setFullYear(maturityDate.getFullYear() + (validatedData.maturityPeriodYears || settings.maturityPeriodYears));

      // Create investment with settings snapshot
      const investment = await storage.createInvestment({
        ...validatedData,
        maturityDate,
        rentalYieldRate: validatedData.rentalYieldRate || settings.rentalYieldPercentage,
        appreciationRate: validatedData.appreciationRate || settings.appreciationRatePercentage,
        penaltyRate: validatedData.penaltyRate || settings.earlyWithdrawalPenaltyPercentage,
        maturityPeriodYears: validatedData.maturityPeriodYears || settings.maturityPeriodYears,
        investmentDurationYears: validatedData.investmentDurationYears || settings.investmentDurationYears
      });

      res.status(201).json(investment);
    } catch (error) {
      res.status(400).json({ error: "Invalid investment data" });
    }
  });

  // Withdraw investment endpoint with penalty calculation
  app.post("/api/investments/:id/withdraw", async (req, res) => {
    try {
      const investment = await storage.getInvestment(req.params.id);
      if (!investment) {
        return res.status(404).json({ error: "Investment not found" });
      }

      if (investment.status !== "active") {
        return res.status(400).json({ error: "Investment is not active" });
      }

      const now = new Date();
      const investmentDate = new Date(investment.investmentDate);
      const maturityDate = investment.maturityDate ? new Date(investment.maturityDate) : null;

      // Check if withdrawal is before maturity
      const isEarlyWithdrawal = maturityDate && now < maturityDate;

      let withdrawalAmount = parseFloat(investment.currentValue || investment.investmentAmount);
      let penalty = 0;

      if (isEarlyWithdrawal && investment.penaltyRate) {
        penalty = withdrawalAmount * (parseFloat(investment.penaltyRate) / 100);
        withdrawalAmount = withdrawalAmount - penalty;
      }

      // Update investment status
      await storage.updateInvestment(req.params.id, {
        status: "withdrawn",
        exitDate: now
      });

      // Create withdrawal transaction
      const transaction = await storage.createTransaction({
        investorId: investment.investorId,
        propertyId: investment.propertyId,
        type: "withdrawal",
        amount: withdrawalAmount.toString(),
        fee: penalty.toString(),
        description: isEarlyWithdrawal
          ? `Early withdrawal with ${investment.penaltyRate}% penalty`
          : "Withdrawal after maturity",
        status: "pending"
      });

      res.json({
        investment,
        transaction,
        withdrawalAmount,
        penalty,
        isEarlyWithdrawal
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process withdrawal" });
    }
  });

  // Calculate investment returns endpoint
  app.post("/api/investments/calculate", async (req, res) => {
    try {
      const { investmentAmount, propertyId } = req.body;

      if (!investmentAmount) {
        return res.status(400).json({ error: "Investment amount is required" });
      }

      const settings = await storage.getActiveInvestmentSettings();
      if (!settings) {
        return res.status(400).json({ error: "No active investment settings found" });
      }

      const amount = parseFloat(investmentAmount);
      const rentalYield = parseFloat(settings.rentalYieldPercentage);
      const appreciation = parseFloat(settings.appreciationRatePercentage);
      const maturityYears = settings.maturityPeriodYears;
      const totalYears = settings.investmentDurationYears;

      // Calculate rental income (annual)
      const annualRentalIncome = amount * (rentalYield / 100);
      const totalRentalIncome = annualRentalIncome * maturityYears;

      // Calculate appreciation (compound)
      const finalValue = amount * Math.pow(1 + appreciation / 100, maturityYears);
      const appreciationGain = finalValue - amount;

      // Total returns at maturity
      const totalReturnsAtMaturity = totalRentalIncome + appreciationGain;
      const totalValueAtMaturity = amount + totalReturnsAtMaturity;

      // Calculate early withdrawal penalty
      const penaltyAmount = amount * (parseFloat(settings.earlyWithdrawalPenaltyPercentage) / 100);

      res.json({
        investmentAmount: amount,
        settings: {
          rentalYieldPercentage: rentalYield,
          appreciationRatePercentage: appreciation,
          maturityPeriodYears: maturityYears,
          investmentDurationYears: totalYears,
          earlyWithdrawalPenaltyPercentage: parseFloat(settings.earlyWithdrawalPenaltyPercentage)
        },
        returns: {
          annualRentalIncome,
          totalRentalIncome,
          appreciationGain,
          totalReturnsAtMaturity,
          totalValueAtMaturity
        },
        earlyWithdrawal: {
          penaltyAmount,
          amountAfterPenalty: amount - penaltyAmount
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate investment returns" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Mock AI response function (will be replaced with OpenAI integration)
function generateMockAiResponse(userMessage: string, language?: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('dashboard') || lowerMessage.includes('overview')) {
    return language === 'ar' 
      ? 'أرى أنك تسأل عن لوحة التحكم. حالياً لديك مستخدمون نشطون وعقارات متاحة للاستثمار.'
      : 'I see you\'re asking about the dashboard. Currently you have active users and properties available for investment.';
  } else if (lowerMessage.includes('property') || lowerMessage.includes('عقار')) {
    return language === 'ar'
      ? 'بخصوص العقارات، لدينا فرص استثمارية ممتازة في الرياض وجدة.'
      : 'Regarding properties, we have excellent investment opportunities in Riyadh and Jeddah.';
  } else if (lowerMessage.includes('kyc') || lowerMessage.includes('verification')) {
    return language === 'ar'
      ? 'لديك طلبات KYC في انتظار المراجعة. معدل الموافقة الحالي مرتفع.'
      : 'You have KYC requests pending review. Current approval rate is high.';
  } else {
    return language === 'ar'
      ? 'شكراً لك على سؤالك. كيف يمكنني مساعدتك في إدارة استثماراتك العقارية؟'
      : 'Thank you for your question. How can I help you manage your real estate investments?';
  }
}