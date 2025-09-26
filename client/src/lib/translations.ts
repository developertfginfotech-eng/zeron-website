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
    contact_us: "Contact Us",
    
    // Auth Dialog
    welcome_to_zaron: "Welcome to Zaron",
    join_thousands_investors: "Join thousands of investors in Saudi Arabia's future",
    register: "Register",
    email: "Email",
    password: "Password",
    enter_password: "Enter your password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    first_name: "First Name",
    last_name: "Last Name",
    phone_number: "Phone Number",
    create_password: "Create a password",
    confirm_password: "Confirm Password",
    agree_to: "I agree to the",
    terms_conditions: "Terms & Conditions",
    and: "and",
    privacy_policy: "Privacy Policy",
    confirm_shariah_compliant: "I confirm this investment aligns with Shariah principles",
    create_account: "Create Account",
    sama_regulated: "SAMA Regulated",
    
    // Hero Section - Crowdfunding
    hero_title: "Invest in Saudi Arabia's Future",
    hero_subtitle: "Join the real estate crowdfunding revolution. Build wealth through Vision 2030 projects with Shariah-compliant investments.",
    invested_amount: "SAR 2.5B+ Invested",
    avg_returns: "15.2% Avg. Returns",
    total_properties: "450+ Properties",
    start_investing_now: "Start Investing Now",
    explore_opportunities: "Explore Opportunities",
    
    // Why Invest Section
    why_invest_title: "Why Real Estate Crowdfunding?",
    why_invest_subtitle: "Discover the benefits of fractional real estate investment in Saudi Arabia's booming market",
    start_investment_journey: "Start Your Investment Journey",
    
    // Why Invest Benefits
    fractional_ownership: "Fractional Ownership",
    fractional_desc: "Invest in premium properties with as little as SAR 1,000",
    superior_returns: "Superior Returns", 
    superior_desc: "Average returns of 15%+ backed by Saudi Arabia's growth",
    shariah_compliance: "Shariah Compliance",
    shariah_desc: "All investments are reviewed and approved by Shariah board",
    professional_mgmt: "Professional Management",
    professional_desc: "Expert property management handles everything for you",
    premium_properties: "Premium Properties",
    premium_desc: "Curated selection of high-quality Vision 2030 projects",
    vision_alignment: "Vision 2030 Aligned",
    vision_desc: "Invest in projects driving Saudi Arabia's transformation",
    
    // Trust & Testimonials
    trusted_by_thousands: "Trusted by Thousands of Investors",
    join_community: "Join our community of successful real estate investors across Saudi Arabia",
    investor_rating: "Investor Rating",
    success_rate: "Success Rate", 
    avg_payout: "Avg. Payout",
    support_available: "Support",
    
    // Testimonials
    testimonial_ahmed: "Zaron has transformed my investment strategy. The platform's transparency and Shariah-compliant options align perfectly with my values. I've achieved 18% returns consistently.",
    testimonial_fatima: "As a busy entrepreneur, Zaron's passive investment model is perfect. Professional property management and regular returns without the hassle of direct ownership.",
    testimonial_omar: "The Vision 2030 aligned properties on Zaron have been exceptional investments. Clear reporting, professional management, and impressive growth potential.",
    annual_returns: "Annual Returns",
    
    // Security & Compliance
    security_compliance: "Security & Compliance",
    security_subtitle: "Your investments are protected by industry-leading security measures and regulatory compliance",
    sama_regulated_title: "SAMA Regulated",
    sama_desc: "Licensed by Saudi Arabian Monetary Authority",
    shariah_compliant_title: "Shariah Compliant", 
    shariah_compliant_desc: "All investments certified by Shariah board",
    bank_grade_security: "Bank-Grade Security",
    bank_security_desc: "256-bit SSL encryption and secure data storage",
    legal_protection: "Legal Protection",
    legal_desc: "Full legal documentation and investor protection",
    trusted_partners: "Trusted Partners",
    
    // How It Works Process
    how_crowdfunding_works: "How Real Estate Crowdfunding Works",
    investment_journey_steps: "Start your investment journey in three simple steps",
    simple_secure_process: "Simple & Secure Process",
    start_investing_steps: "Start Investing in 3 Steps",
    streamlined_process: "Our streamlined process makes real estate investment accessible to everyone",
    
    // Process Steps
    register_verify: "Register & Verify",
    register_desc: "Create your account and complete KYC verification in under 5 minutes. All information is securely encrypted and Shariah compliant.",
    browse_select: "Browse & Select",
    browse_desc: "Explore our curated portfolio of premium Saudi real estate projects. View detailed analytics, returns, and investment terms.",
    invest_earn: "Invest & Earn", 
    invest_desc: "Make your investment starting from SAR 1,000. Track performance and receive returns directly to your account.",
    get_started_now: "Get Started Now",
    
    // Property Cards
    funding_progress: "Funding Progress",
    days_remaining: "Days Remaining",
    total_investors: "Investors",
    min_investment_amount: "Min. Investment",
    view_details: "View Details",
    register_to_unlock: "Register to unlock investment details",
    investment_details_locked: "Investment details are available after registration",
    browse_all_properties: "Browse All Properties",
    
    // Additional Translation Keys
    total_invested: "Total Invested",
    avg_returns_label: "Avg. Returns",
    
    // Form Validation Messages
    email_required: "Email is required",
    email_invalid: "Please enter a valid email address",
    password_min_length: "Password must be at least 6 characters",
    first_name_min_length: "First name must be at least 2 characters",
    last_name_min_length: "Last name must be at least 2 characters",
    phone_min_length: "Phone number must be at least 10 digits",
    phone_invalid: "Please enter a valid phone number",
    password_min_length_register: "Password must be at least 8 characters",
    password_complexity: "Password must contain uppercase, lowercase, and numbers",
    terms_required: "You must agree to the terms and conditions",
    password_mismatch: "Passwords do not match",
    logging_in: "Logging in",
    creating_account: "Creating account", 
    properties_funded: "Properties Funded",
    shariah_certified: "Shariah Certified",
    rating_display: "4.9/5 Rating",
    sama_licensed: "SAMA Licensed",
    
    // Property Tags
    vision_2030: "Vision 2030",
    shariah_compliant_tag: "Shariah Compliant", 
    high_yield: "High Yield",
    prime_location: "Prime Location",
    commercial: "Commercial",
    stable_returns: "Stable Returns",
    tourism: "Tourism",
    luxury: "Luxury",
    mega_project: "Mega Project"
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
    contact_us: "اتصل بنا",
    
    // Auth Dialog
    welcome_to_zaron: "مرحباً بك في زارون",
    join_thousands_investors: "انضم إلى آلاف المستثمرين في مستقبل المملكة العربية السعودية",
    register: "التسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    enter_password: "أدخل كلمة المرور",
    remember_me: "تذكرني",
    forgot_password: "نسيت كلمة المرور؟",
    first_name: "الاسم الأول",
    last_name: "اسم العائلة",
    phone_number: "رقم الهاتف",
    create_password: "أنشئ كلمة مرور",
    confirm_password: "تأكيد كلمة المرور",
    agree_to: "أوافق على",
    terms_conditions: "الشروط والأحكام",
    and: "و",
    privacy_policy: "سياسة الخصوصية",
    confirm_shariah_compliant: "أؤكد أن هذا الاستثمار متوافق مع مبادئ الشريعة الإسلامية",
    create_account: "إنشاء حساب",
    sama_regulated: "مرخص من ساما",
    
    // Hero Section - Crowdfunding
    hero_title: "استثمر في مستقبل المملكة العربية السعودية",
    hero_subtitle: "انضم إلى ثورة التمويل الجماعي العقاري. ابني الثروة من خلال مشاريع رؤية 2030 مع الاستثمارات المتوافقة مع الشريعة.",
    invested_amount: "تم استثمار أكثر من 2.5 مليار ريال",
    avg_returns: "متوسط العوائد 15.2%",
    total_properties: "أكثر من 450 عقار",
    start_investing_now: "ابدأ الاستثمار الآن",
    explore_opportunities: "استكشف الفرص",
    
    // Why Invest Section
    why_invest_title: "لماذا التمويل الجماعي العقاري؟",
    why_invest_subtitle: "اكتشف فوائد الاستثمار العقاري الجزئي في السوق السعودي المزدهر",
    start_investment_journey: "ابدأ رحلة الاستثمار",
    
    // Why Invest Benefits
    fractional_ownership: "الملكية الجزئية",
    fractional_desc: "استثمر في العقارات المميزة بقدر 1,000 ريال فقط",
    superior_returns: "عوائد متفوقة", 
    superior_desc: "متوسط عوائد 15%+ مدعومة بنمو المملكة العربية السعودية",
    shariah_compliance: "متوافق مع الشريعة",
    shariah_desc: "جميع الاستثمارات مراجعة ومعتمدة من هيئة الشريعة",
    professional_mgmt: "إدارة مهنية",
    professional_desc: "إدارة عقارية خبيرة تتولى كل شيء نيابة عنك",
    premium_properties: "عقارات مميزة",
    premium_desc: "مجموعة منتقاة من مشاريع رؤية 2030 عالية الجودة",
    vision_alignment: "متماشي مع رؤية 2030",
    vision_desc: "استثمر في المشاريع التي تقود تحول المملكة العربية السعودية",
    
    // Trust & Testimonials
    trusted_by_thousands: "موثوق من آلاف المستثمرين",
    join_community: "انضم إلى مجتمعنا من المستثمرين العقاريين الناجحين في جميع أنحاء المملكة العربية السعودية",
    investor_rating: "تقييم المستثمرين",
    success_rate: "معدل النجاح", 
    avg_payout: "متوسط الدفع",
    support_available: "الدعم",
    
    // Testimonials
    testimonial_ahmed: "زارون غيّر استراتيجية الاستثمار الخاصة بي. شفافية المنصة والخيارات المتوافقة مع الشريعة تتماشى تماماً مع قيمي. حققت عوائد 18% باستمرار.",
    testimonial_fatima: "كرائدة أعمال مشغولة، نموذج الاستثمار السلبي في زارون مثالي. إدارة عقارية مهنية وعوائد منتظمة دون متاعب الملكية المباشرة.",
    testimonial_omar: "كانت العقارات المتماشية مع رؤية 2030 في زارون استثمارات استثنائية. تقارير واضحة وإدارة مهنية وإمكانات نمو مذهلة.",
    annual_returns: "العوائد السنوية",
    
    // Security & Compliance
    security_compliance: "الأمان والامتثال",
    security_subtitle: "استثماراتك محمية بتدابير أمنية رائدة في الصناعة والامتثال التنظيمي",
    sama_regulated_title: "مرخص من ساما",
    sama_desc: "مرخص من مؤسسة النقد العربي السعودي",
    shariah_compliant_title: "متوافق مع الشريعة", 
    shariah_compliant_desc: "جميع الاستثمارات معتمدة من هيئة الشريعة",
    bank_grade_security: "أمان مصرفي",
    bank_security_desc: "تشفير SSL 256 بت وتخزين آمن للبيانات",
    legal_protection: "حماية قانونية",
    legal_desc: "وثائق قانونية كاملة وحماية للمستثمرين",
    trusted_partners: "شركاء موثوقون",
    
    // How It Works Process
    how_crowdfunding_works: "كيف يعمل التمويل الجماعي العقاري",
    investment_journey_steps: "ابدأ رحلة الاستثمار في ثلاث خطوات بسيطة",
    simple_secure_process: "عملية بسيطة وآمنة",
    start_investing_steps: "ابدأ الاستثمار في 3 خطوات",
    streamlined_process: "عمليتنا المبسطة تجعل الاستثمار العقاري في متناول الجميع",
    
    // Process Steps
    register_verify: "سجل وتحقق",
    register_desc: "أنشئ حسابك وأكمل التحقق من الهوية في أقل من 5 دقائق. جميع المعلومات مشفرة بأمان ومتوافقة مع الشريعة.",
    browse_select: "تصفح واختر",
    browse_desc: "استكشف محفظتنا المنتقاة من مشاريع العقارات السعودية المميزة. اطلع على التحليلات التفصيلية والعوائد وشروط الاستثمار.",
    invest_earn: "استثمر واربح", 
    invest_desc: "اقم باستثمارك بدءاً من 1,000 ريال. تتبع الأداء واحصل على العوائد مباشرة في حسابك.",
    get_started_now: "ابدأ الآن",
    
    // Property Cards
    funding_progress: "تقدم التمويل",
    days_remaining: "الأيام المتبقية",
    total_investors: "المستثمرون",
    min_investment_amount: "الحد الأدنى للاستثمار",
    view_details: "عرض التفاصيل",
    register_to_unlock: "سجل لفتح تفاصيل الاستثمار",
    investment_details_locked: "تفاصيل الاستثمار متاحة بعد التسجيل",
    browse_all_properties: "تصفح جميع العقارات",
    
    // Additional Translation Keys
    total_invested: "إجمالي الاستثمار",
    avg_returns_label: "متوسط العوائد",
    
    // Form Validation Messages
    email_required: "البريد الإلكتروني مطلوب",
    email_invalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    password_min_length: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    first_name_min_length: "الاسم الأول يجب أن يكون حرفين على الأقل",
    last_name_min_length: "اسم العائلة يجب أن يكون حرفين على الأقل",
    phone_min_length: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل",
    phone_invalid: "يرجى إدخال رقم هاتف صحيح",
    password_min_length_register: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    password_complexity: "كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام",
    terms_required: "يجب الموافقة على الشروط والأحكام",
    password_mismatch: "كلمات المرور غير متطابقة",
    logging_in: "جاري تسجيل الدخول",
    creating_account: "جاري إنشاء الحساب",
    properties_funded: "العقارات الممولة", 
    shariah_certified: "معتمد شرعياً",
    rating_display: "تقييم 4.9/5",
    sama_licensed: "مرخص من ساما",
    
    // Property Tags
    vision_2030: "رؤية 2030",
    shariah_compliant_tag: "متوافق مع الشريعة",
    high_yield: "عائد مرتفع",
    prime_location: "موقع متميز",
    commercial: "تجاري",
    stable_returns: "عوائد مستقرة",
    tourism: "سياحة",
    luxury: "فاخر",
    mega_project: "مشروع ضخم"
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
    contact_us: "رابطہ کریں",
    
    // Hero Section - Crowdfunding
    hero_title: "سعودی عرب کے مستقبل میں سرمایہ کاری کریں",
    hero_subtitle: "ریئل اسٹیٹ کراؤڈ فنڈنگ انقلاب میں شامل ہوں۔ ویژن 2030 پروجیکٹس کے ذریعے شریعت کے مطابق سرمایہ کاری سے دولت بنائیں۔",
    invested_amount: "SAR 2.5B+ سرمایہ کاری",
    avg_returns: "15.2% اوسط منافع",
    total_properties: "450+ پراپرٹیز",
    start_investing_now: "ابھی سرمایہ کاری شروع کریں",
    explore_opportunities: "مواقع دیکھیں",
    
    // Why Invest Section
    why_invest_title: "ریئل اسٹیٹ کراؤڈ فنڈنگ کیوں؟",
    why_invest_subtitle: "سعودی عرب کی بڑھتی مارکیٹ میں جزوی ریئل اسٹیٹ سرمایہ کاری کے فوائد دیکھیں",
    start_investment_journey: "اپنا سرمایہ کاری کا سفر شروع کریں",
    
    // Why Invest Benefits
    fractional_ownership: "جزوی ملکیت",
    fractional_desc: "صرف SAR 1,000 سے پریمیم پراپرٹیز میں سرمایہ کاری کریں",
    superior_returns: "بہتر منافع",
    superior_desc: "سعودی عرب کی ترقی سے حمایت یافتہ اوسط 15%+ منافع",
    shariah_compliance: "شریعت کے مطابق",
    shariah_desc: "تمام سرمایہ کاری شریعہ بورڈ سے جانچی اور منظور شدہ",
    professional_mgmt: "پیشہ ورانہ انتظام",
    professional_desc: "ماہر پراپرٹی انتظام آپ کے لیے سب کچھ سنبھالتا ہے",
    premium_properties: "پریمیم پراپرٹیز",
    premium_desc: "اعلیٰ معیار کے ویژن 2030 منصوبوں کا منتخب مجموعہ",
    vision_alignment: "ویژن 2030 کے ساتھ ہم آہنگ",
    vision_desc: "سعودی عرب کی تبدیلی میں رہنمائی کرنے والے منصوبوں میں سرمایہ کاری",
    
    // Trust & Testimonials
    trusted_by_thousands: "ہزاروں سرمایہ کاروں کا اعتماد",
    join_community: "سعودی عرب بھر میں کامیاب ریئل اسٹیٹ سرمایہ کاروں کی ہماری کمیونٹی میں شامل ہوں",
    investor_rating: "سرمایہ کار کی ریٹنگ",
    success_rate: "کامیابی کی شرح",
    avg_payout: "اوسط ادائیگی",
    support_available: "سپورٹ",
    
    // Testimonials
    testimonial_ahmed: "زارون نے میری سرمایہ کاری کی حکمت عملی کو تبدیل کر دیا۔ پلیٹ فارم کی شفافیت اور شریعت کے مطابق اختیارات میری اقدار سے بالکل میل کھاتے ہیں۔ میں نے مستقل طور پر 18% منافع حاصل کیا۔",
    testimonial_fatima: "ایک مصروف کاروباری خاتون کے طور پر، زارون کا غیر فعال سرمایہ کاری ماڈل کامل ہے۔ پیشہ ورانہ پراپرٹی انتظام اور براہ راست ملکیت کی پریشانی کے بغیر منتظم منافع۔",
    testimonial_omar: "زارون پر ویژن 2030 کے ساتھ ہم آہنگ پراپرٹیز غیر معمولی سرمایہ کاری تھیں۔ واضح رپورٹنگ، پیشہ ورانہ انتظام، اور شاندار ترقی کی صلاحیت۔",
    annual_returns: "سالانہ منافع",
    
    // Security & Compliance
    security_compliance: "سیکیورٹی اور تعمیل",
    security_subtitle: "آپ کی سرمایہ کاری صنعت کی بہترین سیکیورٹی اقدامات اور ریگولیٹری تعمیل سے محفوظ ہے",
    sama_regulated_title: "SAMA منظور شدہ",
    sama_desc: "سعودی عرب کی مانیٹری اتھارٹی سے لائسنس یافتہ",
    shariah_compliant_title: "شریعت کے مطابق",
    shariah_compliant_desc: "تمام سرمایہ کاری شریعہ بورڈ سے تصدیق شدہ",
    bank_grade_security: "بینک درجے کی سیکیورٹی",
    bank_security_desc: "256-bit SSL انکرپشن اور محفوظ ڈیٹا اسٹوریج",
    legal_protection: "قانونی تحفظ",
    legal_desc: "مکمل قانونی دستاویزات اور سرمایہ کار تحفظ",
    trusted_partners: "قابل اعتماد پارٹنرز",
    
    // How It Works Process
    how_crowdfunding_works: "ریئل اسٹیٹ کراؤڈ فنڈنگ کیسے کام کرتا ہے",
    investment_journey_steps: "تین آسان قدموں میں اپنا سرمایہ کاری کا سفر شروع کریں",
    simple_secure_process: "آسان اور محفوظ عمل",
    start_investing_steps: "3 قدموں میں سرمایہ کاری شروع کریں",
    streamlined_process: "ہمارا ہموار عمل ریئل اسٹیٹ سرمایہ کاری کو سب کے لیے قابل رسائی بناتا ہے",
    
    // Process Steps
    register_verify: "رجسٹر اور تصدیق کریں",
    register_desc: "5 منٹ سے کم میں اپنا اکاؤنٹ بنائیں اور KYC تصدیق مکمل کریں۔ تمام معلومات محفوظ طریقے سے انکرپٹ اور شریعت کے مطابق۔",
    browse_select: "دیکھیں اور منتخب کریں",
    browse_desc: "ہمارے منتخب کردہ پریمیم سعودی ریئل اسٹیٹ منصوبوں کا پورٹ فولیو دیکھیں۔ تفصیلی تجزیات، منافع، اور سرمایہ کاری کی شرائط دیکھیں۔",
    invest_earn: "سرمایہ کاری کریں اور کمائیں",
    invest_desc: "SAR 1,000 سے شروع کرتے ہوئے اپنی سرمایہ کاری کریں۔ کارکردگی کو ٹریک کریں اور براہ راست اپنے اکاؤنٹ میں منافع حاصل کریں۔",
    get_started_now: "ابھی شروع کریں",
    
    // Property Cards
    funding_progress: "فنڈنگ کی پیشرفت",
    days_remaining: "باقی دن",
    total_investors: "سرمایہ کار",
    min_investment_amount: "کم سے کم سرمایہ کاری",
    view_details: "تفصیلات دیکھیں",
    register_to_unlock: "سرمایہ کاری کی تفصیلات کھولنے کے لیے رجسٹر کریں",
    investment_details_locked: "سرمایہ کاری کی تفصیلات رجسٹریشن کے بعد دستیاب ہیں",
    browse_all_properties: "تمام پراپرٹیز دیکھیں",
    
    // Additional Translation Keys
    total_invested: "کل سرمایہ کاری",
    avg_returns_label: "اوسط منافع",
    
    // Form Validation Messages
    email_required: "ای میل ضروری ہے",
    email_invalid: "برائے کرم صحیح ای میل ایڈریس داخل کریں",
    password_min_length: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
    first_name_min_length: "پہلا نام کم از کم 2 حروف کا ہونا چاہیے",
    last_name_min_length: "آخری نام کم از کم 2 حروف کا ہونا چاہیے",
    phone_min_length: "فون نمبر کم از کم 10 ہندسوں کا ہونا چاہیے",
    phone_invalid: "برائے کرم صحیح فون نمبر داخل کریں",
    password_min_length_register: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
    password_complexity: "پاس ورڈ میں بڑے، چھوٹے حروف اور نمبر ہونے چاہیئے",
    terms_required: "آپ کو شرائط و ضوابط سے اتفاق کرنا ہوگا",
    password_mismatch: "پاس ورڈ میچ نہیں کرتے",
    logging_in: "لاگ ان ہو رہے ہیں",
    creating_account: "اکاؤنٹ بنایا جا رہا ہے",
    properties_funded: "فنڈ شدہ پراپرٹیز",
    shariah_certified: "شرعی تصدیق شدہ",
    rating_display: "4.9/5 ریٹنگ",
    sama_licensed: "ساما لائسنس یافتہ",
    
    // Property Tags
    vision_2030: "ویژن 2030",
    shariah_compliant_tag: "شرعی ضوابط کے مطابق",
    high_yield: "زیادہ منافع",
    prime_location: "بہترین مقام",
    commercial: "تجارتی",
    stable_returns: "مستحکم منافع",
    tourism: "سیاحت",
    luxury: "لگژری",
    mega_project: "بڑا منصوبہ",
    
    // Complete Why Invest Section
    why_invest_title: "ریئل اسٹیٹ کراؤڈفنڈنگ کیوں؟",
    why_invest_subtitle: "سعودی عرب کی بڑھتی مارکیٹ میں جزوی ریئل اسٹیٹ سرمایہ کاری کے فوائد دیکھیں",
    professional_mgmt: "پیشہ ورانہ انتظام",
    professional_desc: "ماہر پراپرٹی انتظام آپ کے لیے سب کچھ سنبھالتا ہے",
    vision_alignment: "ویژن 2030 کے ساتھ ہم آہنگ",
    vision_desc: "سعودی عرب کی تبدیلی میں رہنمائی کرنے والے منصوبوں میں سرمایہ کاری"
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
    contact_us: "संपर्क करें",
    
    // Key Crowdfunding Translations (Hindi)
    hero_title: "सऊदी अरब के भविष्य में निवेश करें",
    hero_subtitle: "रियल एस्टेट क्राउडफंडिंग क्रांति में शामिल हों। विज़न 2030 परियोजनाओं के माध्यम से शरिया-अनुपालित निवेश के साथ धन बनाएं।",
    start_investing_now: "अभी निवेश शुरू करें",
    explore_opportunities: "अवसर देखें",
    why_invest_title: "रियल एस्टेट क्राउडफंडिंग क्यों?",
    trusted_by_thousands: "हजारों निवेशकों का भरोसा",
    security_compliance: "सुरक्षा और अनुपालन",
    how_crowdfunding_works: "रियल एस्टेट क्राउडफंडिंग कैसे काम करता है",
    register_verify: "पंजीकरण और सत्यापन करें",
    browse_select: "ब्राउज़ करें और चुनें",
    invest_earn: "निवेश करें और कमाएं",
    fractional_ownership: "आंशिक स्वामित्व",
    superior_returns: "बेहतर रिटर्न",
    shariah_compliance: "शरिया अनुपालन",
    professional_mgmt: "व्यावसायिक प्रबंधन",
    premium_properties: "प्रीमियम संपत्तियां",
    vision_alignment: "विज़न 2030 संरेखित",
    investor_rating: "निवेशक रेटिंग",
    success_rate: "सफलता दर",
    avg_payout: "औसत भुगतान",
    support_available: "सहायता",
    sama_regulated_title: "SAMA विनियमित",
    shariah_compliant_title: "शरिया अनुपालित",
    bank_grade_security: "बैंक-ग्रेड सुरक्षा",
    legal_protection: "कानूनी सुरक्षा",
    trusted_partners: "विश्वसनीय भागीदार",
    annual_returns: "वार्षिक रिटर्न",
    
    // Additional Translation Keys
    total_invested: "कुल निवेश",
    avg_returns_label: "औसत रिटर्न",
    
    // Form Validation Messages
    email_required: "ईमेल आवश्यक है",
    email_invalid: "कृपया एक वैध ईमेल पता दर्ज करें",
    password_min_length: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए",
    first_name_min_length: "पहला नाम कम से कम 2 अक्षर का होना चाहिए",
    last_name_min_length: "अंतिम नाम कम से कम 2 अक्षर का होना चाहिए",
    phone_min_length: "फोन नंबर कम से कम 10 अंकों का होना चाहिए",
    phone_invalid: "कृपया एक वैध फोन नंबर दर्ज करें",
    password_min_length_register: "पासवर्ड कम से कम 8 अक्षर का होना चाहिए",
    password_complexity: "पासवर्ड में अपरकेस, लोअरकेस और संख्या होनी चाहिए",
    terms_required: "आपको नियम और शर्तों से सहमत होना होगा",
    password_mismatch: "पासवर्ड मेल नहीं खाते",
    logging_in: "लॉग इन हो रहे हैं",
    creating_account: "खाता बनाया जा रहा है",
    properties_funded: "फंडेड संपत्तियां",
    shariah_certified: "शरिया प्रमाणित",
    rating_display: "4.9/5 रेटिंग",
    sama_licensed: "SAMA लाइसेंसशुदा",
    
    // Property Tags  
    vision_2030: "विज़न 2030",
    shariah_compliant_tag: "शरिया अनुपालित",
    high_yield: "उच्च लाभ",
    prime_location: "प्रमुख स्थान",
    commercial: "व्यावसायिक",
    stable_returns: "स्थिर रिटर्न",
    tourism: "पर्यटन",
    luxury: "लक्जरी",
    mega_project: "मेगा प्रोजेक्ट",
    
    // Complete Why Invest Section
    why_invest_title: "रियल एस्टेट क्राउडफंडिंग क्यों؟",
    why_invest_subtitle: "साउदी अरब की बढ़ती मार्केट में आंशिक रियल एस्टेट निवेश के फायदे देखें",
    professional_mgmt: "पेशेवर प्रबंधन",
    professional_desc: "विशेषज्ञ संपत्ति प्रबंधन आपके लिए सब कुछ संभालता ہے",
    vision_alignment: "विज़न 2030 के साथ जुड़ाव",
    vision_desc: "साउदी अरब के परिवर्तन का नेतृत्व करने वाले प्रोजेक्टों में निवेश"
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
    contact_us: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    
    // Key Crowdfunding Translations (Punjabi)
    hero_title: "ਸਾਊਦੀ ਅਰਬ ਦੇ ਭਵਿੱਖ ਵਿੱਚ ਨਿਵੇਸ਼ ਕਰੋ",
    start_investing_now: "ਹੁਣੇ ਨਿਵੇਸ਼ ਸ਼ੁਰੂ ਕਰੋ",
    explore_opportunities: "ਮੌਕੇ ਦੇਖੋ",
    why_invest_title: "ਰੀਅਲ ਅਸਟੇਟ ਕ੍ਰਾਊਡਫੰਡਿੰਗ ਕਿਉਂ?",
    trusted_by_thousands: "ਹਜ਼ਾਰਾਂ ਨਿਵੇਸ਼ਕਾਂ ਦਾ ਭਰੋਸਾ",
    security_compliance: "ਸੁਰੱਖਿਆ ਅਤੇ ਪਾਲਣਾ",
    fractional_ownership: "ਅੰਸ਼ਿਕ ਮਾਲਕੀ",
    superior_returns: "ਸ਼ਾਨਦਾਰ ਰਿਟਰਨ",
    annual_returns: "ਸਾਲਾਨਾ ਰਿਟਰਨ",
    
    // Additional Translation Keys
    total_invested: "ਕੁੱਲ ਨਿਵੇਸ਼",
    avg_returns_label: "ਔਸਤ ਰਿਟਰਨ",
    
    // Form Validation Messages
    email_required: "ਈਮੇਲ ਲੋੜੀਂਦਾ ਹੈ",
    email_invalid: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਹੀ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ",
    password_min_length: "ਪਾਸਵਰਡ ਘੱਟੋ ਘੱਟ 6 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ",
    first_name_min_length: "ਪਹਿਲਾ ਨਾਮ ਘੱਟੋ ਘੱਟ 2 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ",
    last_name_min_length: "ਆਖਰੀ ਨਾਮ ਘੱਟੋ ਘੱਟ 2 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ",
    phone_min_length: "ਫੋਨ ਨੰਬਰ ਘੱਟੋ ਘੱਟ 10 ਅੰਕਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ",
    phone_invalid: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਸਹੀ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    password_min_length_register: "ਪਾਸਵਰਡ ਘੱਟੋ ਘੱਟ 8 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ",
    password_complexity: "ਪਾਸਵਰਡ ਵਿੱਚ ਵੱਡੇ, ਛੋਟੇ ਅਤੇ ਨੰਬਰ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ",
    terms_required: "ਤੁਹਾਨੂੰ ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ ਨਾਲ ਸਹਿਮਤ ਹੋਣਾ ਪਵੇਗਾ",
    password_mismatch: "ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ",
    logging_in: "ਲਾਗ ਇਨ ਹੋ ਰਿਹਾ ਹੈ",
    creating_account: "ਖਾਤਾ ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ",
    properties_funded: "ਫੰਡ ਕੀਤੀਆਂ ਸੰਪਤੀਆਂ",
    shariah_certified: "ਸ਼ਰੀਆ ਪ੍ਰਮਾਣਿਤ",
    rating_display: "4.9/5 ਰੇਟਿੰਗ",
    sama_licensed: "SAMA ਲਾਇਸੈਂਸਸ਼ੁਦਾ",
    
    // Property Tags
    vision_2030: "ਵਿਜ਼ਨ 2030",
    shariah_compliant_tag: "ਸ਼ਰੀਅਤ ਅਨੁਕੂਲ",
    high_yield: "ਉੱਚ ਲਾਭ",
    prime_location: "ਮੁੱਖ ਸਥਾਨ",
    commercial: "ਵਪਾਰਕ",
    stable_returns: "ਸਥਿਰ ਰਿਟਰਨ",
    tourism: "ਪਰਿਟਨ",
    luxury: "ਲਗਜ਼ਰੀ",
    mega_project: "ਮੇਗਾ ਪ੍ਰੋਜੈਕਟ",
    
    // Complete Why Invest Section
    why_invest_title: "ਰੀਅਲ ਅਸਟੇਟ ਕ੍ਰਾਉਡਫੰਡਿੰਗ ਕਿਉਂ؟",
    why_invest_subtitle: "ਸਾਉਦੀ ਅਰਬ ਦੀ ਵਧਦੀ ਮਾਰਕੀਟ ਵਿੱਚ ਅੰਸ਼ਿਕ ਰੀਅਲ ਅਸਟੇਟ ਨਿਵੇਸ਼ ਦੇ ਫਾਇਦੇ ਦੇਖੋ",
    professional_mgmt: "ਪੇਸ਼ੇਵਰ ਪ੍ਰਬੰਧਨ",
    professional_desc: "ਵਿਸ਼ੇਸ਼ਗ ਸੰਪਤੀ ਪ੍ਰਬੰਧਨ ਤੁਹਾਡੇ ਲਈ ਸਭ ਕੁਝ ਸੰਭਾਲਦਾ ਹੈ",
    vision_alignment: "ਵਿਜ਼ਨ 2030 ਦੇ ਨਾਲ ਜੁੜਿਆ",
    vision_desc: "ਸਾਉਦੀ ਅਰਬ ਦੀ ਤਬਦੀਲੀ ਦੀ ਅਗਵਾਈ ਕਰਨ ਵਾਲੇ ਪਰਿਯੋਜਨਾਵਾਂ ਵਿੱਚ ਨਿਵੇਸ਼"
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
    contact_us: "যোগাযোগ করুন",
    
    // Key Crowdfunding Translations (Bengali)  
    hero_title: "সৌদি আরবের ভবিষ্যতে বিনিয়োগ করুন",
    start_investing_now: "এখনই বিনিয়োগ শুরু করুন",
    explore_opportunities: "সুযোগ দেখুন",
    why_invest_title: "রিয়েল এস্টেট ক্রাউডফান্ডিং কেন?",
    trusted_by_thousands: "হাজার হাজার বিনিয়োগকারীর আস্থা",
    security_compliance: "নিরাপত্তা ও সম্মতি",
    fractional_ownership: "আংশিক মালিকানা",
    superior_returns: "উচ্চতর রিটার্ন",
    annual_returns: "বার্ষিক রিটার্ন",
    
    // Additional Translation Keys
    total_invested: "মোট বিনিয়োগ",
    avg_returns_label: "গড় রিটার্ন",
    
    // Form Validation Messages
    email_required: "ইমেইল প্রয়োজন",
    email_invalid: "অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন",
    password_min_length: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
    first_name_min_length: "প্রথম নাম কমপক্ষে ২ অক্ষরের হতে হবে",
    last_name_min_length: "শেষ নাম কমপক্ষে ২ অক্ষরের হতে হবে",
    phone_min_length: "ফোন নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে",
    phone_invalid: "অনুগ্রহ করে একটি বৈধ ফোন নম্বর দিন",
    password_min_length_register: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
    password_complexity: "পাসওয়ার্ডে বড়, ছোট হাতের অক্ষর এবং সংখ্যা থাকতে হবে",
    terms_required: "আপনাকে নিয়ম ও শর্তাবলীতে সম্মত হতে হবে",
    password_mismatch: "পাসওয়ার্ড মিলছে না",
    logging_in: "লগ ইন হচ্ছে",
    creating_account: "অ্যাকাউন্ট তৈরি হচ্ছে",
    properties_funded: "অর্থায়নকৃত সম্পত্তি",
    shariah_certified: "শরিয়া সার্টিফাইড",
    rating_display: "4.9/5 রেটিং",
    sama_licensed: "SAMA লাইসেন্সপ্রাপ্ত",
    
    // Property Tags
    vision_2030: "ভিশন 2030",
    shariah_compliant_tag: "শরিয়া অনুবর্তী",
    high_yield: "উচ্চ লাভ",
    prime_location: "প্রধান অবস্থান",
    commercial: "বাণিজ্যিক",
    stable_returns: "স্থিতিশীল রিটার্ন",
    tourism: "পর্যটন",
    luxury: "বিলাসবহুল",
    mega_project: "মেগা প্রকল্প",
    
    // Complete Why Invest Section
    why_invest_title: "রিয়েল এস্টেট ক্রাউডফান্ডিং কেন؟",
    why_invest_subtitle: "সাউদি আরবের বর্ধিষ্ণু বাজারে ভগ্নাংশের রিয়েল এস্টেট বিনিয়োগের সুবিধা দেখুন",
    professional_mgmt: "পেশাদার ব্যবস্থাপনা",
    professional_desc: "বিশেষজ্ঞ সম্পত্তি ব্যবস্থাপনা আপনার জন্য সবকিছু সামলায়",
    vision_alignment: "ভিশন 2030 এর সাথে সামঞ্জস্য",
    vision_desc: "সাউদি আরবের রূপান্তরে নেতৃত্বদানকারী প্রকল্পগুলিতে বিনিয়োগ"
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
    contact_us: "ഞങ്ങളെ ബന്ധപ്പെടുക",
    
    // Key Crowdfunding Translations (Malayalam)
    hero_title: "സൗദി അറേബ്യയുടെ ഭാവിയിൽ നിക്ഷേപിക്കുക",
    start_investing_now: "ഇപ്പോൾ നിക്ഷേപം ആരംഭിക്കുക",
    explore_opportunities: "അവസരങ്ങൾ കാണുക",
    why_invest_title: "റിയൽ എസ്റ്റേറ്റ് ക്രൗഡ്ഫണ്ടിംഗ് എന്തുകൊണ്ട്?",
    trusted_by_thousands: "ആയിരക്കണക്കിന് നിക്ഷേപകരുടെ വിശ്വാസം",
    security_compliance: "സുരക്ഷയും അനുവർത്തനവും",
    fractional_ownership: "ഭാഗിക ഉടമസ്ഥത",
    superior_returns: "മികച്ച റിട്ടേൺ",
    annual_returns: "വാർഷിക റിട്ടേൺ",
    
    // Additional Translation Keys
    avg_returns_label: "ശരാശരി റിട്ടേൺ",
    properties_funded: "ധനസഹായമുള്ള വസ്തുക്കൾ",
    
    // Form Validation Messages
    email_required: "ഇമെയിൽ ആവശ്യമാണ്",
    email_invalid: "ദയവായി സാധുവായ ഇമെയിൽ വിലാസം നൽകുക",
    password_min_length: "പാസ്‌വേഡ് കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം",
    first_name_min_length: "ആദ്യ പേര് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം",
    last_name_min_length: "അവസാന പേര് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം",
    phone_min_length: "ഫോൺ നമ്പർ കുറഞ്ഞത് 10 അക്കങ്ങൾ ഉണ്ടായിരിക്കണം",
    phone_invalid: "ദയവായി സാധുവായ ഫോൺ നമ്പർ നൽകുക",
    password_min_length_register: "പാസ്‌വേഡ് കുറഞ്ഞത് 8 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം",
    password_complexity: "പാസ്‌വേഡിൽ വലിയ, ചെറിയ അക്ഷരങ്ങളും സംഖ്യകളും ഉണ്ടായിരിക്കണം",
    terms_required: "നിങ്ങൾ നിബന്ധനകളും വ്യവസ്ഥകളും അംഗീകരിക്കണം",
    password_mismatch: "പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല",
    logging_in: "ലോഗ് ഇൻ ആകുന്നു",
    creating_account: "അക്കൗണ്ട് സൃഷ്ടിക്കുന്നു",
    shariah_certified: "ശരീഅത്ത് സാക്ഷ്യപ്പെടുത്തിയത്",
    rating_display: "4.9/5 റേറ്റിംഗ്",
    sama_licensed: "SAMA ലൈസൻസുള്ള",
    
    // Property Tags
    shariah_compliant_tag: "ശരീഅത്ത് അനുസൃത",
    high_yield: "ഉയർന്ന ലാഭം",
    prime_location: "പ്രധാന സ്ഥാനം",
    commercial: "വാണിജ്യിക",
    stable_returns: "സ്ഥിരമായ റിട്ടേൺ",
    tourism: "ടൂറിസം",
    luxury: "ആഡംബര",
    mega_project: "മെഗാ പ്രോജക്റ്റ്",
    
    // Complete Why Invest Section
    why_invest_subtitle: "സൗദി അറേബിയയുടെ വളരുന്ന കിന്പത്തമിൽ ഭാഗിക റിയൽ എസ്റ്റേറ്റ് നിക്ഷേപത്തിന്റെ പ്രയോജനങ്ങൾ കാണുക",
    professional_mgmt: "പ്രൊഫഷണൽ മാനേജ്മെന്റ്",
    professional_desc: "മാഹിര് വസ്തു പരിപാലനം നിങ്ങൾക്കായി എല്ലാം കൈകാര്യം ചെയ്യുന്നു",
    vision_alignment: "വിഷൻ 2030 എന്നതിനോട് അനുസരിച്ചത്",
    vision_desc: "സൗദി അറേബിയയുടെ രൂപാന്തരത്തിൽ നേതൃത്വം നൽകുന്ന പ്രോജക്ടുകളിൽ നിക്ഷേപിക്കുക"
  }
}

// Note: useTranslation hook is in /hooks/use-translation.ts