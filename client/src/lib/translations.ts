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
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "Invest in Saudi Arabia's Future",
    landing_subtitle: "Join thousands of investors building wealth through Vision 2030 real estate projects",
    get_started: "Get Started",
    learn_more_cta: "Learn More",
    register_now: "Register Now",
    login: "Login",
    about_us: "About Us",
    business_model: "Business Model",
    download_app: "Download App",
    how_it_works: "How It Works",
    why_zaron: "Why Zaron",
    contact_us: "Contact Us"
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
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "استثمر في مستقبل المملكة العربية السعودية",
    landing_subtitle: "انضم إلى آلاف المستثمرين الذين يبنون الثروة من خلال مشاريع رؤية 2030 العقارية",
    get_started: "ابدأ الآن",
    learn_more_cta: "اعرف المزيد",
    register_now: "سجل الآن",
    login: "تسجيل الدخول",
    about_us: "عنا",
    business_model: "نموذج الأعمال",
    download_app: "تحميل التطبيق",
    how_it_works: "كيف يعمل",
    why_zaron: "لماذا زارون",
    contact_us: "اتصل بنا"
  },
  
  ur: {
    // Header & Navigation  
    welcome_back: "واپسی پر خوش آمدید،",
    track_investments: "سعودی عرب میں اپنی ریئل اسٹیٹ کی سرمایہ کاری کو ٹریک کریں",
    total_portfolio_value: "کل پورٹ فولیو ویلیو",
    
    // Navigation
    home: "ہوم",
    properties: "پراپرٹیز",
    portfolio: "پورٹ فولیو", 
    profile: "پروفائل",
    chat: "چیٹ",
    ai_advisor: "AI مشیر",
    
    // Dashboard
    total_value: "کل ویلیو",
    total_return: "کل واپسی",
    since_inception: "شروعات سے",
    browse_properties: "پراپرٹیز دیکھیں",
    view_portfolio: "پورٹ فولیو دیکھیں",
    
    // Investments
    active_investments: "فعال سرمایہ کاری",
    current_property_investments: "آپ کی موجودہ پراپرٹی سرمایہ کاری",
    performance_summary: "کارکردگی کا خلاصہ",
    investment_performance_overview: "آپ کی سرمایہ کاری کی کارکردگی کا جائزہ",
    
    // Property Details
    invested: "سرمایہ کاری",
    current_value: "موجودہ ویلیو",
    return: "واپسی",
    total_invested: "کل سرمایہ کاری",
    roi: "ROI",
    
    // Performance Labels
    excellent: "بہترین",
    good: "اچھا", 
    average: "اوسط",
    
    // Locations
    riyadh: "ریاض",
    jeddah: "جدہ",
    dammam: "دمام",
    
    // Property Types
    luxury_apartment_complex: "لگژری اپارٹمنٹ کمپلیکس",
    retail_shopping_complex: "ریٹیل شاپنگ کمپلیکس",
    commercial_office_building: "کمرشل آفس بلڈنگ",
    luxury_villa_property: "لگژری ولا پراپرٹی",
    
    // Available Properties
    available_properties: "دستیاب پراپرٹیز",
    new_investment_opportunities: "نئے سرمایہ کاری کے مواقع",
    min_investment: "کم سے کم سرمایہ کاری",
    expected_return: "متوقع واپسی",
    duration: "مدت",
    invest_now: "ابھی سرمایہ کاری کریں",
    learn_more: "مزید جانیں",
    
    // Chat & AI Features
    live_chat: "لائیو چیٹ",
    ai_assistant: "AI اسسٹنٹ", 
    ask_ai: "AI سے پوچھیں",
    chat_with_advisor: "مشیر سے چیٹ کریں",
    ai_insights: "AI بصیرت",
    market_analysis: "مارکیٹ تجزیہ",
    investment_recommendations: "سرمایہ کاری کی سفارشات",
    send_message: "پیغام بھیجیں",
    type_message: "اپنا پیغام ٹائپ کریں...",
    
    // Saudi-specific
    saudi_market: "سعودی ریئل اسٹیٹ مارکیٹ",
    vision_2030: "ویژن 2030 سے ہم آہنگ",
    neom_projects: "نیوم پروجیکٹس",
    red_sea_developments: "بحیرہ احمر ڈیولپمنٹ",
    shariah_compliant: "شریعت کے مطابق",
    saudi_regulations: "سعودی ریئل اسٹیٹ ریگولیشنز",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "سعودی عرب کے مستقبل میں سرمایہ کاری کریں",
    landing_subtitle: "ویژن 2030 ریئل اسٹیٹ پروجیکٹس کے ذریعے دولت بنانے والے ہزاروں سرمایہ کاروں میں شامل ہوں",
    get_started: "شروع کریں",
    learn_more_cta: "مزید جانیں",
    register_now: "ابھی رجسٹر کریں",
    login: "لاگ ان",
    about_us: "ہمارے بارے میں",
    business_model: "کاروباری ماڈل",
    download_app: "ایپ ڈاؤن لوڈ کریں",
    how_it_works: "یہ کیسے کام کرتا ہے",
    why_zaron: "زارون کیوں",
    contact_us: "رابطہ کریں"
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
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മলയাളം",
    
    // Website specific
    landing_title: "सऊदी अरब के भविष्य में निवेश करें",
    landing_subtitle: "विज़न 2030 रियल एस्टेट परियोजनाओं के माध्यम से धन निर्माण करने वाले हजारों निवेशकों में शामिल हों",
    get_started: "शुरू करें",
    learn_more_cta: "और जानें",
    register_now: "अभी रजिस्टर करें",
    login: "लॉगिन",
    about_us: "हमारे बारे में",
    business_model: "व्यापार मॉडल",
    download_app: "ऐप डाउनलोड करें",
    how_it_works: "यह कैसे काम करता है",
    why_zaron: "क्यों जारॉन",
    contact_us: "संपर्क करें"
  },
  
  pa: {
    // Header & Navigation
    welcome_back: "ਵਾਪਸੀ 'ਤੇ ਸੁਆਗਤ ਹੈ,",
    track_investments: "ਸਾਊਦੀ ਅਰਬ ਵਿੱਚ ਆਪਣੇ ਰੀਅਲ ਅਸਟੇਟ ਨਿਵੇਸ਼ ਨੂੰ ਟਰੈਕ ਕਰੋ",
    total_portfolio_value: "ਕੁੱਲ ਪੋਰਟਫੋਲੀਓ ਮੁੱਲ",
    
    // Navigation
    home: "ਘਰ",
    properties: "ਸੰਪਤੀਆਂ",
    portfolio: "ਪੋਰਟਫੋਲੀਓ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    chat: "ਚੈਟ",
    ai_advisor: "AI ਸਲਾਹਕਾਰ",
    
    // Dashboard
    total_value: "ਕੁੱਲ ਮੁੱਲ",
    total_return: "ਕੁੱਲ ਰਿਟਰਨ",
    since_inception: "ਸ਼ੁਰੂਆਤ ਤੋਂ",
    browse_properties: "ਸੰਪਤੀਆਂ ਬ੍ਰਾਉਜ਼ ਕਰੋ",
    view_portfolio: "ਪੋਰਟਫੋਲੀਓ ਦੇਖੋ",
    
    // Investments
    active_investments: "ਸਰਗਰਮ ਨਿਵੇਸ਼",
    current_property_investments: "ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਸੰਪਤੀ ਨਿਵੇਸ਼",
    performance_summary: "ਪ੍ਰਦਰਸ਼ਨ ਸਾਰਾਂਸ਼",
    investment_performance_overview: "ਤੁਹਾਡੇ ਨਿਵੇਸ਼ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਸਿਖਲਾਈ",
    
    // Property Details
    invested: "ਨਿਵੇਸ਼ਿਤ",
    current_value: "ਮੌਜੂਦਾ ਮੁੱਲ",
    return: "ਰਿਟਰਨ",
    total_invested: "ਕੁੱਲ ਨਿਵੇਸ਼ਿਤ",
    roi: "ROI",
    
    // Performance Labels
    excellent: "ਸ਼ਾਨਦਾਰ",
    good: "ਚੰਗਾ",
    average: "ਔਸਤ",
    
    // Locations
    riyadh: "ਰਿਯਾਦ",
    jeddah: "ਜੇਦਾਹ",
    dammam: "ਦਮਾਮ",
    
    // Property Types
    luxury_apartment_complex: "ਲਗਜ਼ਰੀ ਅਪਾਰਟਮੈਂਟ ਕੰਪਲੈਕਸ",
    retail_shopping_complex: "ਰਿਟੇਲ ਸ਼ਾਪਿੰਗ ਕੰਪਲੈਕਸ",
    commercial_office_building: "ਵਪਾਰਕ ਦਫਤਰ ਇਮਾਰਤ",
    luxury_villa_property: "ਲਗਜ਼ਰੀ ਵਿਲਾ ਸੰਪਤੀ",
    
    // Available Properties
    available_properties: "ਉਪਲਬਧ ਸੰਪਤੀਆਂ",
    new_investment_opportunities: "ਨਵੇਂ ਨਿਵੇਸ਼ ਦੇ ਮੌਕੇ",
    min_investment: "ਘੱਟੋ-ਘੱਟ ਨਿਵੇਸ਼",
    expected_return: "ਅਨੁਮਾਨਿਤ ਰਿਟਰਨ",
    duration: "ਮਿਆਦ",
    invest_now: "ਹੁਣੇ ਨਿਵੇਸ਼ ਕਰੋ",
    learn_more: "ਹੋਰ ਜਾਣੋ",
    
    // Chat & AI Features
    live_chat: "ਲਾਈਵ ਚੈਟ",
    ai_assistant: "AI ਸਹਾਇਕ",
    ask_ai: "AI ਨੂੰ ਪੁੱਛੋ",
    chat_with_advisor: "ਸਲਾਹਕਾਰ ਨਾਲ ਚੈਟ ਕਰੋ",
    ai_insights: "AI ਸੂਝ",
    market_analysis: "ਮਾਰਕੀਟ ਵਿਸ਼ਲੇਸ਼ਣ",
    investment_recommendations: "ਨਿਵੇਸ਼ ਸਿਫਾਰਸ਼ਾਂ",
    send_message: "ਸੰਦੇਸ਼ ਭੇਜੋ",
    type_message: "ਆਪਣਾ ਸੰਦੇਸ਼ ਟਾਈਪ ਕਰੋ...",
    
    // Saudi-specific
    saudi_market: "ਸਾਊਦੀ ਰੀਅਲ ਅਸਟੇਟ ਮਾਰਕੀਟ",
    vision_2030: "ਵਿਜ਼ਨ 2030 ਨਾਲ ਮੇਲ",
    neom_projects: "ਨਿਓਮ ਪ੍ਰੋਜੈਕਟ",
    red_sea_developments: "ਲਾਲ ਸਾਗਰ ਵਿਕਾਸ",
    shariah_compliant: "ਸ਼ਰੀਆ ਅਨੁਕੂਲ",
    saudi_regulations: "ਸਾਊਦੀ ਰੀਅਲ ਅਸਟੇਟ ਨਿਯਮ",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "ਸਾਊਦੀ ਅਰਬ ਦੇ ਭਵਿੱਖ ਵਿੱਚ ਨਿਵੇਸ਼ ਕਰੋ",
    landing_subtitle: "ਵਿਜ਼ਨ 2030 ਰੀਅਲ ਅਸਟੇਟ ਪ੍ਰੋਜੈਕਟਾਂ ਰਾਹੀਂ ਦੌਲਤ ਬਣਾਉਣ ਵਾਲੇ ਹਜ਼ਾਰਾਂ ਨਿਵੇਸ਼ਕਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    get_started: "ਸ਼ੁਰੂ ਕਰੋ",
    learn_more_cta: "ਹੋਰ ਜਾਣੋ",
    register_now: "ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ",
    login: "ਲਾਗਇਨ",
    about_us: "ਸਾਡੇ ਬਾਰੇ",
    business_model: "ਕਾਰੋਬਾਰੀ ਮਾਡਲ",
    download_app: "ਐਪ ਡਾਊਨਲੋਡ ਕਰੋ",
    how_it_works: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    why_zaron: "ਜ਼ਾਰੋਨ ਕਿਉਂ",
    contact_us: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ"
  },
  
  bn: {
    // Header & Navigation
    welcome_back: "ফিরে এসে স্বাগতম,",
    track_investments: "সৌদি আরবে আপনার রিয়েল এস্টেট বিনিয়োগ ট্র্যাক করুন",
    total_portfolio_value: "মোট পোর্টফোলিও মূল্য",
    
    // Navigation
    home: "হোম",
    properties: "সম্পত্তি",
    portfolio: "পোর্টফোলিও",
    profile: "প্রোফাইল",
    chat: "চ্যাট",
    ai_advisor: "AI উপদেষ্টা",
    
    // Dashboard
    total_value: "মোট মূল্য",
    total_return: "মোট রিটার্ন",
    since_inception: "শুরু থেকে",
    browse_properties: "সম্পত্তি ব্রাউজ করুন",
    view_portfolio: "পোর্টফোলিও দেখুন",
    
    // Investments
    active_investments: "সক্রিয় বিনিয়োগ",
    current_property_investments: "আপনার বর্তমান সম্পত্তি বিনিয়োগ",
    performance_summary: "কর্মক্ষমতা সারসংক্ষেপ",
    investment_performance_overview: "আপনার বিনিয়োগ কর্মক্ষমতার ওভারভিউ",
    
    // Property Details
    invested: "বিনিয়োগকৃত",
    current_value: "বর্তমান মূল্য",
    return: "রিটার্ন",
    total_invested: "মোট বিনিয়োগকৃত",
    roi: "ROI",
    
    // Performance Labels
    excellent: "চমৎকার",
    good: "ভাল",
    average: "গড়",
    
    // Locations
    riyadh: "রিয়াদ",
    jeddah: "জেদ্দাহ",
    dammam: "দাম্মাম",
    
    // Property Types
    luxury_apartment_complex: "লাক্সারি অ্যাপার্টমেন্ট কমপ্লেক্স",
    retail_shopping_complex: "রিটেইল শপিং কমপ্লেক্স",
    commercial_office_building: "বাণিজ্যিক অফিস ভবন",
    luxury_villa_property: "লাক্সারি ভিলা সম্পত্তি",
    
    // Available Properties
    available_properties: "উপলব্ধ সম্পত্তি",
    new_investment_opportunities: "নতুন বিনিয়োগের সুযোগ",
    min_investment: "সর্বনিম্ন বিনিয়োগ",
    expected_return: "প্রত্যাশিত রিটার্ন",
    duration: "সময়কাল",
    invest_now: "এখনই বিনিয়োগ করুন",
    learn_more: "আরও জানুন",
    
    // Chat & AI Features
    live_chat: "লাইভ চ্যাট",
    ai_assistant: "AI সহায়ক",
    ask_ai: "AI কে জিজ্ঞাসা করুন",
    chat_with_advisor: "উপদেষ্টার সাথে চ্যাট করুন",
    ai_insights: "AI অন্তর্দৃষ্টি",
    market_analysis: "বাজার বিশ্লেষণ",
    investment_recommendations: "বিনিয়োগ সুপারিশ",
    send_message: "বার্তা পাঠান",
    type_message: "আপনার বার্তা টাইপ করুন...",
    
    // Saudi-specific
    saudi_market: "সৌদি রিয়েল এস্টেট বাজার",
    vision_2030: "ভিশন 2030 সংযুক্ত",
    neom_projects: "নিওম প্রকল্প",
    red_sea_developments: "লোহিত সাগর উন্নয়ন",
    shariah_compliant: "শরিয়া সঙ্গতিপূর্ণ",
    saudi_regulations: "সৌদি রিয়েল এস্টেট নিয়মাবলী",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "সৌদি আরবের ভবিষ্যতে বিনিয়োগ করুন",
    landing_subtitle: "ভিশন 2030 রিয়েল এস্টেট প্রকল্পের মাধ্যমে সম্পদ তৈরি করা হাজার হাজার বিনিয়োগকারীদের সাথে যোগ দিন",
    get_started: "শুরু করুন",
    learn_more_cta: "আরও জানুন",
    register_now: "এখনই নিবন্ধন করুন",
    login: "লগইন",
    about_us: "আমাদের সম্পর্কে",
    business_model: "ব্যবসায়িক মডেল",
    download_app: "অ্যাপ ডাউনলোড করুন",
    how_it_works: "এটি কিভাবে কাজ করে",
    why_zaron: "কেন জারন",
    contact_us: "যোগাযোগ করুন"
  },
  
  ml: {
    // Header & Navigation
    welcome_back: "തിരിച്ചുവരവിൽ സ്വാഗതം,",
    track_investments: "സൗദി അറേബ്യയിലെ നിങ്ങളുടെ റിയൽ എസ്റ്റേറ്റ് നിക്ഷേപങ്ങൾ ട്രാക്ക് ചെയ്യുക",
    total_portfolio_value: "മൊത്തം പോർട്ട്ഫോളിയോ മൂല്യം",
    
    // Navigation
    home: "ഹോം",
    properties: "സ്വത്തുകൾ",
    portfolio: "പോർട്ട്ഫോളിയോ",
    profile: "പ്രൊഫൈൽ",
    chat: "ചാറ്റ്",
    ai_advisor: "AI ഉപദേശകൻ",
    
    // Dashboard
    total_value: "മൊത്തം മൂല്യം",
    total_return: "മൊത്തം റിട്ടേൺ",
    since_inception: "തുടക്കം മുതൽ",
    browse_properties: "സ്വത്തുകൾ ബ്രൗസ് ചെയ്യുക",
    view_portfolio: "പോർട്ട്ഫോളിയോ കാണുക",
    
    // Investments
    active_investments: "സജീവ നിക്ഷേപങ്ങൾ",
    current_property_investments: "നിങ്ങളുടെ നിലവിലെ സ്വത്ത് നിക്ഷേപങ്ങൾ",
    performance_summary: "പ്രകടന സംഗ്രഹം",
    investment_performance_overview: "നിങ്ങളുടെ നിക്ഷേപ പ്രകടന അവലോകനം",
    
    // Property Details
    invested: "നിക്ഷേപിച്ചത്",
    current_value: "നിലവിലെ മൂല്യം",
    return: "റിട്ടേൺ",
    total_invested: "മൊത്തം നിക്ഷേപിച്ചത്",
    roi: "ROI",
    
    // Performance Labels
    excellent: "മികച്ചത്",
    good: "നല്ലത്",
    average: "ശരാശരി",
    
    // Locations
    riyadh: "റിയാദ്",
    jeddah: "ജിദ്ദ",
    dammam: "ദമാം",
    
    // Property Types
    luxury_apartment_complex: "ലക്ഷറി അപ്പാർട്ട്മെന്റ് കോംപ്ലക്സ്",
    retail_shopping_complex: "റീട്ടെയിൽ ഷോപ്പിംഗ് കോംപ്ലക്സ്",
    commercial_office_building: "വാണിജ്യ ഓഫീസ് കെട്ടിടം",
    luxury_villa_property: "ലക്ഷറി വില്ല സ്വത്ത്",
    
    // Available Properties
    available_properties: "ലഭ്യമായ സ്വത്തുകൾ",
    new_investment_opportunities: "പുതിയ നിക്ഷേപ അവസരങ്ങൾ",
    min_investment: "കുറഞ്ഞ നിക്ഷേപം",
    expected_return: "പ്രതീക്ഷിച്ച റിട്ടേൺ",
    duration: "കാലാവധി",
    invest_now: "ഇപ്പോൾ നിക്ഷേപിക്കുക",
    learn_more: "കൂടുതൽ അറിയുക",
    
    // Chat & AI Features
    live_chat: "ലൈവ് ചാറ്റ്",
    ai_assistant: "AI സഹായി",
    ask_ai: "AI യോട് ചോദിക്കുക",
    chat_with_advisor: "ഉപദേശകനുമായി ചാറ്റ് ചെയ്യുക",
    ai_insights: "AI ഉൾക്കാഴ്ച",
    market_analysis: "മാർക്കറ്റ് വിശകലനം",
    investment_recommendations: "നിക്ഷേപ ശുപാർശകൾ",
    send_message: "സന്ദേശം അയയ്ക്കുക",
    type_message: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    
    // Saudi-specific
    saudi_market: "സൗദി റിയൽ എസ്റ്റേറ്റ് മാർക്കറ്റ്",
    vision_2030: "വിഷൻ 2030 അനുയോജ്യം",
    neom_projects: "നിയോം പ്രോജക്ടുകൾ",
    red_sea_developments: "ചെങ്കടൽ വികസനങ്ങൾ",
    shariah_compliant: "ശരീഅത്ത് അനുസൃതം",
    saudi_regulations: "സൗദി റിയൽ എസ്റ്റേറ്റ് നിയമങ്ങൾ",
    
    // Language Names
    english: "English",
    arabic: "العربية",
    urdu: "اردو",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    bengali: "বাংলা",
    malayalam: "മലയാളം",
    
    // Website specific
    landing_title: "സൗദി അറേബ്യയുടെ ഭാവിയിൽ നിക്ഷേപിക്കുക",
    landing_subtitle: "വിഷൻ 2030 റിയൽ എസ്റ്റേറ്റ് പ്രോജക്ടുകളിലൂടെ സമ്പത്ത് സൃഷ്ടിക്കുന്ന ആയിരക്കണക്കിന് നിക്ഷേപകരോട് ചേരുക",
    get_started: "ആരംഭിക്കുക",
    learn_more_cta: "കൂടുതൽ അറിയുക",
    register_now: "ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക",
    login: "ലോഗിൻ",
    about_us: "ഞങ്ങളെ കുറിച്ച്",
    business_model: "ബിസിനസ് മോഡൽ",
    download_app: "ആപ്പ് ഡൗൺലോഡ് ചെയ്യുക",
    how_it_works: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    why_zaron: "എന്തുകൊണ്ട് സാരോൺ",
    contact_us: "ഞങ്ങളെ ബന്ധപ്പെടുക"
  }
}

// Note: useTranslation hook is in /hooks/use-translation.ts