export type TranslationKey = keyof typeof translations.en

export const translations = {
  en: {
    // Header & Navigation
    welcome_back: "Welcome back,", 
    track_investments: "Track your real estate investments in Saudi Arabia",
    total_portfolio_value: "Total Portfolio Value",
    
    // Navigation
    home: "Home",
    properties: "Properties", 
    portfolio: "Portfolio",
    profile: "Profile",
    chat: "Chat",
    ai_advisor: "AI Advisor",
    
    // Dashboard
    total_value: "Total Value",
    total_return: "Total Return",
    since_inception: "Since inception",
    browse_properties: "Browse Properties",
    view_portfolio: "View Portfolio",
    
    // Investments
    active_investments: "Active Investments",
    current_property_investments: "Your current property investments",
    performance_summary: "Performance Summary",
    investment_performance_overview: "Your investment performance overview",
    
    // Property Details
    invested: "Invested",
    current_value: "Current Value",
    return: "Return",
    total_invested: "Total Invested",
    roi: "ROI",
    
    // Performance Labels
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    
    // Locations
    riyadh: "Riyadh",
    jeddah: "Jeddah",
    dammam: "Dammam",
    
    // Property Types
    luxury_apartment_complex: "Luxury Apartment Complex",
    retail_shopping_complex: "Retail Shopping Complex",
    commercial_office_building: "Commercial Office Building",
    luxury_villa_property: "Luxury Villa Property",
    
    // Available Properties
    available_properties: "Available Properties",
    new_investment_opportunities: "New investment opportunities",
    min_investment: "Min Investment",
    expected_return: "Expected Return",
    duration: "Duration",
    invest_now: "Invest Now",
    learn_more: "Learn More",
    
    // Chat & AI Features
    live_chat: "Live Chat",
    ai_assistant: "AI Assistant", 
    ask_ai: "Ask AI",
    chat_with_advisor: "Chat with Advisor",
    ai_insights: "AI Insights",
    market_analysis: "Market Analysis",
    investment_recommendations: "Investment Recommendations",
    send_message: "Send message",
    type_message: "Type your message...",
    
    // Saudi-specific
    saudi_market: "Saudi Real Estate Market",
    vision_2030: "Vision 2030 Aligned",
    neom_projects: "NEOM Projects",
    red_sea_developments: "Red Sea Developments",
    shariah_compliant: "Shariah Compliant",
    saudi_regulations: "Saudi Real Estate Regulations",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    hindi: "हिंदी"
  },
  
  ar: {
    // Header & Navigation  
    welcome_back: "مرحباً بعودتك،",
    track_investments: "تتبع استثماراتك العقارية في المملكة العربية السعودية",
    total_portfolio_value: "إجمالي قيمة المحفظة",
    
    // Navigation
    home: "الرئيسية",
    properties: "العقارات",
    portfolio: "المحفظة", 
    profile: "الملف الشخصي",
    chat: "المحادثة",
    ai_advisor: "المستشار الذكي",
    
    // Dashboard
    total_value: "القيمة الإجمالية",
    total_return: "العائد الإجمالي",
    since_inception: "منذ البداية",
    browse_properties: "تصفح العقارات",
    view_portfolio: "عرض المحفظة",
    
    // Investments
    active_investments: "الاستثمارات النشطة",
    current_property_investments: "استثماراتك العقارية الحالية",
    performance_summary: "ملخص الأداء",
    investment_performance_overview: "نظرة عامة على أداء استثماراتك",
    
    // Property Details
    invested: "المستثمر",
    current_value: "القيمة الحالية",
    return: "العائد",
    total_invested: "إجمالي المستثمر",
    roi: "عائد الاستثمار",
    
    // Performance Labels
    excellent: "ممتاز",
    good: "جيد", 
    average: "متوسط",
    
    // Locations
    riyadh: "الرياض",
    jeddah: "جدة",
    dammam: "الدمام",
    
    // Property Types
    luxury_apartment_complex: "مجمع شقق فاخرة",
    retail_shopping_complex: "مجمع تسوق تجاري",
    commercial_office_building: "مبنى مكاتب تجاري",
    luxury_villa_property: "فيلا فاخرة",
    
    // Available Properties
    available_properties: "العقارات المتاحة",
    new_investment_opportunities: "فرص استثمارية جديدة",
    min_investment: "الحد الأدنى للاستثمار",
    expected_return: "العائد المتوقع",
    duration: "المدة",
    invest_now: "استثمر الآن",
    learn_more: "اعرف المزيد",
    
    // Chat & AI Features
    live_chat: "المحادثة المباشرة",
    ai_assistant: "المساعد الذكي", 
    ask_ai: "اسأل الذكي",
    chat_with_advisor: "تحدث مع المستشار",
    ai_insights: "رؤى ذكية",
    market_analysis: "تحليل السوق",
    investment_recommendations: "توصيات الاستثمار",
    send_message: "إرسال رسالة",
    type_message: "اكتب رسالتك...",
    
    // Saudi-specific
    saudi_market: "سوق العقارات السعودي",
    vision_2030: "متوافق مع رؤية 2030",
    neom_projects: "مشاريع نيوم",
    red_sea_developments: "تطوير البحر الأحمر",
    shariah_compliant: "متوافق مع الشريعة",
    saudi_regulations: "اللوائح العقارية السعودية",
    
    // Language Names
    english: "English",
    arabic: "العربية", 
    hindi: "हिंदी"
  },
  
  hi: {
    // Header & Navigation
    welcome_back: "वापसी पर स्वागत है,",
    track_investments: "सऊदी अरब में अपने रियल एस्टेट निवेश को ट्रैक करें",
    total_portfolio_value: "कुल पोर्टफोलियो मूल्य",
    
    // Navigation
    home: "होम",
    properties: "संपत्तियां",
    portfolio: "पोर्टफोलियो",
    profile: "प्रोफाइल",
    chat: "चैट",
    ai_advisor: "AI सलाहकार",
    
    // Dashboard
    total_value: "कुल मूल्य",
    total_return: "कुल रिटर्न",
    since_inception: "शुरुआत से",
    browse_properties: "संपत्तियां ब्राउज़ करें",
    view_portfolio: "पोर्टफोलियो देखें",
    
    // Investments
    active_investments: "सक्रिय निवेश",
    current_property_investments: "आपके वर्तमान संपत्ति निवेश",
    performance_summary: "प्रदर्शन सारांश",
    investment_performance_overview: "आपके निवेश प्रदर्शन का अवलोकन",
    
    // Property Details
    invested: "निवेशित",
    current_value: "वर्तमान मूल्य",
    return: "रिटर्न",
    total_invested: "कुल निवेशित",
    roi: "ROI",
    
    // Performance Labels
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    average: "औसत",
    
    // Locations
    riyadh: "रियाद",
    jeddah: "जेद्दाह",
    dammam: "दम्माम",
    
    // Property Types
    luxury_apartment_complex: "लक्जरी अपार्टमेंट कॉम्प्लेक्स",
    retail_shopping_complex: "रिटेल शॉपिंग कॉम्प्लेक्स",
    commercial_office_building: "कमर्शियल ऑफिस बिल्डिंग",
    luxury_villa_property: "लक्जरी विला प्रॉपर्टी",
    
    // Available Properties
    available_properties: "उपलब्ध संपत्तियां",
    new_investment_opportunities: "नए निवेश के अवसर",
    min_investment: "न्यूनतम निवेश",
    expected_return: "अपेक्षित रिटर्न",
    duration: "अवधि",
    invest_now: "अभी निवेश करें",
    learn_more: "और जानें",
    
    // Chat & AI Features
    live_chat: "लाइव चैट",
    ai_assistant: "AI सहायक", 
    ask_ai: "AI से पूछें",
    chat_with_advisor: "सलाहकार से चैट करें",
    ai_insights: "AI अंतर्दृष्टि",
    market_analysis: "बाजार विश्लेषण",
    investment_recommendations: "निवेश सिफारिशें",
    send_message: "संदेश भेजें",
    type_message: "अपना संदेश टाइप करें...",
    
    // Saudi-specific
    saudi_market: "सऊदी रियल एस्टेट बाजार",
    vision_2030: "विज़न 2030 संरेखित",
    neom_projects: "NEOM परियोजनाएं",
    red_sea_developments: "रेड सी डेवलपमेंट",
    shariah_compliant: "शरिया अनुपालन",
    saudi_regulations: "सऊदी रियल एस्टेट नियम",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    hindi: "हिंदी"
  }
}

// Note: useTranslation hook is in /hooks/use-translation.ts