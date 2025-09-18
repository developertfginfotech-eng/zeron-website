// Saudi Arabia-focused real estate data with AI features and chat functionality

export interface SaudiProperty {
  id: string;
  name: string;
  nameAr: string;
  nameHi: string;
  location: string;
  locationAr: string;
  locationHi: string;
  city: 'riyadh' | 'jeddah' | 'dammam' | 'neom' | 'red_sea';
  type: string;
  price: number;
  minInvestment: number;
  expectedReturn: number;
  duration: string;
  performance: 'excellent' | 'good' | 'average';
  vision2030Aligned: boolean;
  shariahCompliant: boolean;
  aiScore: number;
  marketTrend: 'rising' | 'stable' | 'declining';
  image: string;
  description: string;
  descriptionAr: string;
  descriptionHi: string;
  status: 'new' | 'selling' | 'sold_out';
  totalUnits: number;
  soldUnits: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'advisor';
  content: string;
  timestamp: Date;
  language: 'en' | 'ar' | 'hi';
  avatar?: string;
  userName?: string;
  isTyping?: boolean;
}

export interface AIInsight {
  id: string;
  title: string;
  titleAr: string;
  titleHi: string;
  content: string;
  contentAr: string;
  contentHi: string;
  type: 'market_analysis' | 'investment_recommendation' | 'risk_assessment' | 'trend_prediction';
  confidence: number;
  timestamp: Date;
  impact: 'high' | 'medium' | 'low';
}

export const saudiProperties: SaudiProperty[] = [
  {
    id: '1',
    name: 'NEOM The Line Residential Phase 1',
    nameAr: 'نيوم ذا لاين السكني المرحلة الأولى',
    nameHi: 'NEOM द लाइन आवासीय चरण 1',
    location: 'NEOM, Tabuk Province',
    locationAr: 'نيوم، منطقة تبوك',
    locationHi: 'NEOM, तबूक प्रांत',
    city: 'neom',
    type: 'Futuristic Smart City Development',
    price: 15000000,
    minInvestment: 500000,
    expectedReturn: 25,
    duration: '10 years',
    performance: 'excellent',
    vision2030Aligned: true,
    shariahCompliant: true,
    aiScore: 94,
    marketTrend: 'rising',
    image: '/api/placeholder/400/300',
    description: 'Revolutionary linear city development in NEOM with advanced AI integration and sustainable living.',
    descriptionAr: 'تطوير مدينة خطية ثورية في نيوم مع تكامل الذكاء الاصطناعي المتقدم والمعيشة المستدامة.',
    descriptionHi: 'उन्नत AI एकीकरण और टिकाऊ जीवन के साथ NEOM में क्रांतिकारी रैखिक शहर विकास।',
    status: 'new',
    totalUnits: 500,
    soldUnits: 126
  },
  {
    id: '2',
    name: 'Red Sea Global Marina Resort',
    nameAr: 'منتجع مارينا البحر الأحمر العالمي',
    nameHi: 'रेड सी ग्लोबल मरीना रिज़ॉर्ट',
    location: 'Red Sea Project, Western Coast',
    locationAr: 'مشروع البحر الأحمر، الساحل الغربي',
    locationHi: 'रेड सी प्रोजेक्ट, पश्चिमी तट',
    city: 'red_sea',
    type: 'Luxury Resort & Marina',
    price: 8500000,
    minInvestment: 250000,
    expectedReturn: 18,
    duration: '8 years',
    performance: 'excellent',
    vision2030Aligned: true,
    shariahCompliant: true,
    aiScore: 91,
    marketTrend: 'rising',
    image: '/api/placeholder/400/300',
    description: 'Premium beachfront resort with world-class marina facilities and sustainable tourism focus.',
    descriptionAr: 'منتجع فاخر على الواجهة البحرية مع مرافق مارينا عالمية المستوى وتركيز على السياحة المستدامة.',
    descriptionHi: 'विश्व स्तरीय मरीना सुविधाओं और टिकाऊ पर्यटन फोकस के साथ प्रीमियम बीचफ्रंट रिज़ॉर्ट।',
    status: 'selling',
    totalUnits: 300,
    soldUnits: 185
  },
  {
    id: '3',
    name: 'Riyadh Downtown Financial District',
    nameAr: 'المنطقة المالية وسط الرياض',
    nameHi: 'रियाद डाउनटाउन वित्तीय जिला',
    location: 'King Abdullah Financial District, Riyadh',
    locationAr: 'حي الملك عبدالله المالي، الرياض',
    locationHi: 'किंग अब्दुल्लाह वित्तीय जिला, रियाद',
    city: 'riyadh',
    type: 'Commercial Office Complex',
    price: 12000000,
    minInvestment: 400000,
    expectedReturn: 22,
    duration: '7 years',
    performance: 'excellent',
    vision2030Aligned: true,
    shariahCompliant: true,
    aiScore: 89,
    marketTrend: 'rising',
    image: '/api/placeholder/400/300',
    description: 'State-of-the-art office towers in the heart of Saudi Arabia\'s financial capital.',
    descriptionAr: 'أبراج مكاتب متطورة في قلب العاصمة المالية للمملكة العربية السعودية.',
    descriptionHi: 'सऊदी अरब की वित्तीय राजधानी के केंद्र में अत्याधुनिक कार्यालय टावर।',
    status: 'selling',
    totalUnits: 150,
    soldUnits: 89
  },
  {
    id: '4',
    name: 'Jeddah Corniche Luxury Residences',
    nameAr: 'مساكن كورنيش جدة الفاخرة',
    nameHi: 'जेद्दाह कॉर्निश लक्जरी निवास',
    location: 'Corniche Road, Jeddah',
    locationAr: 'طريق الكورنيش، جدة',
    locationHi: 'कॉर्निश रोड, जेद्दाह',
    city: 'jeddah',
    type: 'Waterfront Luxury Apartments',
    price: 6800000,
    minInvestment: 200000,
    expectedReturn: 16,
    duration: '6 years',
    performance: 'good',
    vision2030Aligned: true,
    shariahCompliant: true,
    aiScore: 85,
    marketTrend: 'stable',
    image: '/api/placeholder/400/300',
    description: 'Premium seafront apartments with panoramic Red Sea views and modern amenities.',
    descriptionAr: 'شقق فاخرة على الواجهة البحرية مع إطلالات بانورامية على البحر الأحمر ووسائل الراحة الحديثة.',
    descriptionHi: 'पैनोरामिक रेड सी दृश्यों और आधुनिक सुविधाओं के साथ प्रीमियम समुद्री तट अपार्टमेंट।',
    status: 'selling',
    totalUnits: 200,
    soldUnits: 78
  },
  {
    id: '5',
    name: 'Eastern Province Industrial Hub',
    nameAr: 'المركز الصناعي للمنطقة الشرقية',
    nameHi: 'पूर्वी प्रांत औद्योगिक हब',
    location: 'Dammam Industrial City',
    locationAr: 'مدينة الدمام الصناعية',
    locationHi: 'दम्माम औद्योगिक शहर',
    city: 'dammam',
    type: 'Industrial & Logistics Complex',
    price: 9500000,
    minInvestment: 300000,
    expectedReturn: 20,
    duration: '9 years',
    performance: 'excellent',
    vision2030Aligned: true,
    shariahCompliant: true,
    aiScore: 87,
    marketTrend: 'rising',
    image: '/api/placeholder/400/300',
    description: 'Strategic industrial development supporting Saudi Arabia\'s manufacturing and export goals.',
    descriptionAr: 'تطوير صناعي استراتيجي يدعم أهداف التصنيع والتصدير في المملكة العربية السعودية.',
    descriptionHi: 'सऊदी अरब के निर्माण और निर्यात लक्ष्यों का समर्थन करने वाला रणनीतिक औद्योगिक विकास।',
    status: 'new',
    totalUnits: 100,
    soldUnits: 23
  }
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Welcome to Zaron! I\'m your AI investment advisor. How can I help you explore Saudi Arabia\'s real estate opportunities today?',
    timestamp: new Date(Date.now() - 120000),
    language: 'en',
    avatar: '🤖',
    userName: 'Zaron AI'
  },
  {
    id: '2',
    type: 'user',
    content: 'I\'m interested in Vision 2030 aligned projects. What would you recommend?',
    timestamp: new Date(Date.now() - 90000),
    language: 'en',
    userName: 'Ahmed Al-Rashid'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Excellent choice! I recommend NEOM The Line (AI Score: 94) and Red Sea Global Marina (AI Score: 91). Both are Vision 2030 flagship projects with 25% and 18% expected returns respectively. Would you like detailed analysis?',
    timestamp: new Date(Date.now() - 60000),
    language: 'en',
    avatar: '🤖',
    userName: 'Zaron AI'
  },
  {
    id: '4',
    type: 'advisor',
    content: 'I\'m Fatima, your personal investment advisor. I can arrange a virtual tour of these properties and discuss financing options that align with your portfolio goals.',
    timestamp: new Date(Date.now() - 30000),
    language: 'en',
    avatar: '👩‍💼',
    userName: 'Fatima Al-Zahra'
  }
];

export const aiInsights: AIInsight[] = [
  {
    id: '1',
    title: 'NEOM Market Surge Predicted',
    titleAr: 'توقع ارتفاع سوق نيوم',
    titleHi: 'NEOM बाजार वृद्धि की भविष्यवाणी',
    content: 'AI analysis indicates 35% growth potential in NEOM properties over the next 18 months due to infrastructure completion and international partnerships.',
    contentAr: 'يشير تحليل الذكاء الاصطناعي إلى إمكانية نمو بنسبة 35% في عقارات نيوم خلال الـ 18 شهرًا القادمة بسبب اكتمال البنية التحتية والشراكات الدولية.',
    contentHi: 'AI विश्लेषण बुनियादी ढांचे की पूर्णता और अंतर्राष्ट्रीय साझेदारी के कारण अगले 18 महीनों में NEOM संपत्तियों में 35% वृद्धि की संभावना का संकेत देता है।',
    type: 'trend_prediction',
    confidence: 94,
    timestamp: new Date(Date.now() - 3600000),
    impact: 'high'
  },
  {
    id: '2',
    title: 'Red Sea Tourism Boom Expected',
    titleAr: 'توقع ازدهار سياحة البحر الأحمر',
    titleHi: 'रेड सी पर्यटन बूम की उम्मीद',
    content: 'Machine learning models predict 40% increase in tourism revenue by 2026, making Red Sea properties highly attractive for investment.',
    contentAr: 'تتنبأ نماذج التعلم الآلي بزيادة بنسبة 40% في إيرادات السياحة بحلول عام 2026، مما يجعل عقارات البحر الأحمر جذابة للغاية للاستثمار.',
    contentHi: 'मशीन लर्निंग मॉडल 2026 तक पर्यटन राजस्व में 40% वृद्धि की भविष्यवाणी करते हैं, जिससे रेड सी संपत्तियां निवेश के लिए अत्यधिक आकर्षक हो जाती हैं।',
    type: 'market_analysis',
    confidence: 91,
    timestamp: new Date(Date.now() - 7200000),
    impact: 'high'
  },
  {
    id: '3',
    title: 'Optimal Portfolio Diversification',
    titleAr: 'التنويع الأمثل للمحفظة',
    titleHi: 'इष्टतम पोर्टफोलियो विविधीकरण',
    content: 'Based on your risk profile, I recommend 40% NEOM, 30% Red Sea, and 30% Riyadh Financial District for maximum returns with balanced risk.',
    contentAr: 'بناءً على ملف المخاطر الخاص بك، أوصي بـ 40% نيوم و30% البحر الأحمر و30% المنطقة المالية بالرياض للحصول على أقصى عوائد مع مخاطر متوازنة.',
    contentHi: 'आपकी जोखिम प्रोफ़ाइल के आधार पर, मैं संतुलित जोखिम के साथ अधिकतम रिटर्न के लिए 40% NEOM, 30% रेड सी, और 30% रियाद वित्तीय जिले की सिफारिश करता हूं।',
    type: 'investment_recommendation',
    confidence: 89,
    timestamp: new Date(Date.now() - 10800000),
    impact: 'medium'
  }
];

export const saudiCities = [
  { id: 'riyadh', name: 'Riyadh', nameAr: 'الرياض', nameHi: 'रियाद', growth: '+12%' },
  { id: 'jeddah', name: 'Jeddah', nameAr: 'جدة', nameHi: 'जेद्दाह', growth: '+8%' },
  { id: 'dammam', name: 'Dammam', nameAr: 'الدمام', nameHi: 'दम्माम', growth: '+15%' },
  { id: 'neom', name: 'NEOM', nameAr: 'نيوم', nameHi: 'NEOM', growth: '+45%' },
  { id: 'red_sea', name: 'Red Sea', nameAr: 'البحر الأحمر', nameHi: 'रेड सी', growth: '+38%' }
];

export const saudiMarketStats = {
  totalMarketValue: 2850000000000, // SAR 2.85 Trillion
  yearlyGrowth: 18.5,
  vision2030Projects: 156,
  shariahCompliantRate: 98.7,
  foreignInvestmentGrowth: 34.2,
  digitalTransformationScore: 87
};