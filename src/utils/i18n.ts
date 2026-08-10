/**
 * Centralized i18n Translation Dictionary and Helper System
 * Supports Marathi ('mr') and English ('en')
 * Fully covers every page, screen, form, category, button, card, modal, and label in Farmer AI.
 */

export type SupportedLanguage = 'mr' | 'en';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  mr: {
    // ─── Bottom Tab Bar ───────────────────────────────────────────────
    homeTab: 'मुखपृष्ठ',
    schemesTab: 'योजना',
    agriMitraTab: 'कृषी मित्र',
    eligibilityTab: 'पात्रता',
    profileTab: 'प्रोफाईल',

    // ─── Header & General App ─────────────────────────────────────────
    appName: 'Farmer AI',
    appSubtitle: 'स्मार्ट शेती मित्र',
    back: 'मागे',
    search: 'शोधा',
    close: 'बंद करा',
    cancel: 'रद्द करा',
    save: 'जतन करा',
    loading: 'लोड होत आहे...',
    errorOccurred: 'त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
    retry: 'पुन्हा प्रयत्न करा',

    // ─── Home Page ────────────────────────────────────────────────────
    greeting: 'नमस्कार शेतकरी मित्रा! 👋',
    todayFarmingInfo: 'आजची शेती माहिती',
    aiSubtitle: 'AI च्या मदतीने अधिक उत्पादन, अधिक नफा.',
    quickServices: 'झटपट सेवा',
    seeAll: 'सर्व पहा >',
    todayTip: 'आजचा शेती सल्ला',
    tipText: 'आज ठिबक सिंचन केल्यास पाण्याची 40-60% बचत होऊ शकते.',

    // ─── Home Service Cards ───────────────────────────────────────────
    cropSelection: 'पीक निवड',
    cropSelectionSub: 'AI शिफारस',
    diseaseDiagnosis: 'रोग निदान',
    diseaseDiagnosisSub: 'पीक तपासणी',
    weather: 'हवामान अंदाज',
    weatherSub: '7 दिवसांचा अंदाज',
    schemesService: 'शासकीय योजना',
    schemesSub: 'पात्रता तपासा',
    marketPrices: 'बाजार भाव',
    marketPricesSub: 'बाजार भाव आणि EMI',
    fertilizerAdvice: 'खत सल्ला',
    fertilizerAdviceSub: 'NPK शिफारस',

    // ─── Schemes Page & Details ───────────────────────────────────────
    schemesPageTitle: 'शासकीय योजना',
    schemesPageSubtitle: '२० निवडक कृषी योजना',
    searchPlaceholder: 'योजना किंवा विषय शोधा...',
    allSchemes: 'सर्व',
    schemesCount: '{count} योजना',
    loadingMore: 'अजून लोड होत आहे...',
    noSchemesFound: 'कोणतीही योजना सापडली नाही',
    noSchemesSub: 'कृपया वेगळी श्रेणी किंवा शोध शब्द वापरून पहा.',
    benefitLabel: 'लाभ / फायदा',
    centralType: 'केंद्रीय योजना',
    stateType: 'राज्य योजना',
    schemeDetailsTitle: 'योजनेचा तपशील',
    eligibilityCriteria: 'पात्रतेचे निकष',
    benefits: 'मिळणारे फायदे व अनुदान',
    applyNow: 'अर्ज करा',
    officialPortal: 'शासकीय संकेतस्थळ',

    // ─── Categories ──────────────────────────────────────────────────
    catHorticulture: 'फळबाग व भाजीपाला',
    catTribalDevelopment: 'आदिवासी विकास',
    catAgroProcessing: 'कृषी प्रक्रिया',
    catIrrigation: 'सिंचन योजना',
    catFarmerWelfare: 'शेतकरी कल्याण',
    catSafetyWelfare: 'सुरक्षा व विमा',
    catCropDevelopment: 'पीक विकास',
    catRainfedDevelopment: 'कोरडवाहू विकास',
    catMechanization: 'शेती यांत्रिकीकरण',

    // ─── Eligibility Section (/eligibility) ───────────────────────────
    checkEligibility: 'पात्रता तपासा',
    eligibilitySubtitle: 'तुमच्यासाठी योग्य सरकारी योजना शोधा',
    introCardText: 'तुमची माहिती भरा आणि तुमच्यासाठी उपलब्ध योजनांची यादी मिळवा.',

    step1: 'पायरी १ → वैयक्तिक माहिती',
    step2: 'पायरी २ → शेतीची माहिती',
    step3: 'पायरी ३ → स्थान',
    step4: 'पायरी ४ → निकाल',

    step1Title: 'वैयक्तिक माहिती',
    step2Title: 'शेतीची माहिती',
    step3Title: 'स्थान माहिती',
    step4Title: 'पात्रता निकाल',

    // Form Labels
    age: 'वय',
    gender: 'लिंग',
    farmerType: 'शेतकरी प्रकार',
    landHolding: 'जमीन क्षेत्र (एकड/हेक्टर)',
    district: 'जिल्हा',
    taluka: 'तालुका',
    cropType: 'मुख्य पीक प्रकार',
    annualIncome: 'वार्षिक उत्पन्न',
    category: 'सामाजिक प्रवर्ग / जात',

    // Dropdown / Select Option Labels
    selectGender: 'लिंग निवडा',
    male: 'पुरुष',
    female: 'महिला',
    other: 'इतर',

    selectFarmerType: 'शेतकरी प्रकार निवडा',
    marginal: 'अल्पभूधारक (< १ हेक्टर)',
    small: 'लहान शेतकरी (१ - २ हेक्टर)',
    medium: 'मध्यम शेतकरी (२ - ५ हेक्टर)',
    large: 'मोठे शेतकरी (> ५ हेक्टर)',

    selectLand: 'जमीन क्षेत्र निवडा',
    landUnder1: '< १ हेक्टर (< २.५ एकड)',
    land1to2: '१ - २ हेक्टर (२.५ - ५ एकड)',
    land2to5: '२ - ५ हेक्टर (५ - १२.५ एकड)',
    landAbove5: '> ५ हेक्टर (> १२.५ एकड)',

    selectDistrict: 'जिल्हा निवडा',
    selectTaluka: 'तालुका निवडा',
    selectCrop: 'पीक प्रकार निवडा',
    cotton: 'कापूस',
    soybean: 'सोयाबीन',
    sugarcane: 'ऊस',
    wheat: 'गहू',
    onion: 'कांदा',
    vegetables: 'फळबाग व भाजीपाला',

    selectIncome: 'वार्षिक उत्पन्न निवडा',
    incomeUnder1L: '< ₹१ लाख',
    income1to2_5L: '₹१ लाख - ₹२.५ लाख',
    income2_5to5L: '₹२.५ लाख - ₹५ लाख',
    incomeAbove5L: '> ₹५ लाख',

    selectCategory: 'प्रवर्ग निवडा',
    general: 'सर्वसाधारण (General)',
    sc: 'अनुसूचित जाती (SC)',
    st: 'अनुसूचित जमाती (ST)',
    obc: 'इतर मागासवर्गीय (OBC)',

    // Eligibility Buttons & Results
    continueBtn: 'पुढे जा',
    backBtn: 'मागे',
    checkEligibilityBtn: 'पात्रता तपासा',
    modifyDetailsBtn: 'माहिती बदला',
    viewDetails: 'अधिक माहिती',
    askVoiceBtn: 'कृषी मित्राला विचारा',

    resultsFound: 'तुमच्यासाठी {count} योजना उपलब्ध आहेत',
    eligibleBadge: '१००% पात्र',
    partiallyEligibleBadge: 'पात्रता शक्यता',
    noMatchTitle: 'सध्या तुमच्या माहितीनुसार कोणतीही योजना उपलब्ध नाही.',
    noMatchSub: 'कृपया माहिती तपासून बदला किंवा इतर प्रवर्गातील योजना पहा.',

    // ─── Crop Selection Screen (/crop-selection) ──────────────────────
    aiCropBannerTitle: 'तुमच्या जमिनीनुसार योग्य पीक निवडा',
    aiCropBannerSub: 'हवामान, मातीचा प्रकार व बाजारातील मागणीनुसार सर्वोत्तम नफा मिळवून देणारी पिके.',
    soilTypeTitle: '१. मातीचा प्रकार निवडा',
    seasonTitle: '२. हंगाम निवडा',
    recommendedCropsTitle: 'शिफारस केलेली पिके',
    expectedYield: 'अपेक्षित उत्पादन',
    duration: 'कालावधी',
    waterNeed: 'पाण्याची गरज',
    estimatedProfit: 'अंदाजे नफा',
    getAdvice: 'सल्ला घ्या',

    soilBlack: 'काळी कसदार',
    soilRed: 'तांबडी माती',
    soilAlluvial: 'गाळाची माती',
    soilSandy: 'रेतड / मुरुमाची',

    seasonKharif: 'खरीप (पावसाळा)',
    seasonRabi: 'रब्बी (हिवाळा)',
    seasonSummer: 'उन्हाळी',

    // ─── Disease Diagnosis Screen (/disease-diagnosis) ────────────────
    uploadLeafPhoto: 'पानाचा फोटो काढा / अपलोड करा',
    uploadLeafSub: 'बाधित पानाचा स्पष्ट फोटो अपलोड करा. AI त्वरित रोगाचे निदान व उपाय सांगेल.',
    scanNow: 'स्कॅन करा (Scan Now)',
    scanningInProgress: 'तपासणी सुरू आहे...',
    majorDiseasesTitle: 'प्रमुख पीक रोग व उपाय',
    symptoms: 'लक्षणे:',
    organicRemedy: 'जैविक उपाय (Organic):',
    chemicalRemedy: 'रासायनिक उपाय (Chemical):',
    askAgriMitraDisease: 'कृषी मित्राला रोगाबद्दल विचारा',
    affectedCrops: 'प्रभावित पिके:',
    severityHigh: 'गंभीर',
    severityMed: 'मध्यम',

    // ─── Weather Screen (/weather) ────────────────────────────────────
    weatherUpdatedToday: 'आजचे अपडेट',
    humidity: 'आर्द्रता',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचा वेग',
    weatherAdvisoryTitle: 'कृषी सल्ला (Farming Advisory)',
    weatherAdvisorySub: 'येत्या बुधवारी पावसाची शिफारस असल्याने, फवारणी आजच उरकून घ्या व पिकांच्या निचऱ्याची सोय करा.',
    sevenDayForecastTitle: '७ दिवसांचा हवामान अंदाज',

    dayToday: 'आज',
    dayTomorrow: 'उद्या',
    dayWed: 'बुधवार',
    dayThu: 'गुरुवार',
    dayFri: 'शुक्रवार',
    daySat: 'शनिवार',
    daySun: 'रविवार',

    condPartlyCloudy: 'अंशतः ढगाळ',
    condSunny: 'निरभ्र आकाश',
    condLightRain: 'सौम्य पाऊस',
    condThunderstorm: 'विजेसह पाऊस',
    condCloudy: 'ढगाळ हवामान',

    // ─── Market Prices Screen (/market-prices) ────────────────────────
    selectMandiTitle: 'बाजार समिती निवडा',
    todayMarketPricesTitle: 'आजचे बाजार भाव',
    todayRates: 'आजचे दर',
    perQuintal: 'प्रति क्विंटल',
    minMaxRange: 'किमान-कमाल:',
    gradeQuality: 'दर्जा:',

    emiCalculatorTitle: 'ट्रॅक्टर व शेती कर्ज EMI कॅल्क्युलेटर',
    monthlyEmiLabel: 'अंदाजे मासिक हप्ता (Monthly EMI)',
    selectLoanAmount: 'कर्ज रक्कम निवडा:',
    consultLoanAgriMitra: 'कर्ज पात्रतेबाबत कृषी मित्राशी बोला',

    // ─── Fertilizer Advice Screen (/fertilizer-advice) ────────────────
    selectCropForFertilizer: 'पिकाची निवड करा',
    recommendedNpkRatio: 'शिफारस केलेले N:P:K प्रमाण (kg/एकड)',
    npkDoseSchedule: 'मात्रा देण्याची पद्धत:',
    nitrogen: 'नत्र (Nitrogen)',
    phosphorus: 'स्फुरद (Phosphorus)',
    potassium: 'पालाश (Potassium)',
    fertilizerScheduleTitle: 'टप्प्यानुसार खत वेळापत्रक',
    organicFertilizerTitle: 'जैविक व सेंद्रिय पर्याय',
    customSoilAdviceBtn: 'माती परीक्षणानुसार सानुकूल सल्ला घ्या',

    // ─── Voice / Agri Mitra Screen (/mic) ─────────────────────────────
    voiceListening: 'ऐकत आहे... बोला...',
    voiceTapToSpeak: 'बोलण्यासाठी मायक्रोफोनवर टॅप करा',
    suggestedQuestionsTitle: 'सुचवलेले प्रश्न',
    q1: 'माझ्या सोयाबीन पिकावर करपा आला आहे, काय उपाय करावा?',
    q2: 'PM किसान योजनेचा हप्ता कधी जमा होणार?',
    q3: 'कापूस पिकासाठी खताची योग्य मात्रा सांगा.',
    q4: 'आजचा लातूर APMC बाजार भाव काय आहे?',

    // ─── Notifications & Profile Screen ──────────────────────────────
    notificationsTitle: 'सूचना (Notifications)',
    noNotifications: 'कोणतीही नवी सूचना नाही.',
    profileTitle: 'प्रोफाईल (Profile)',
    settings: 'सेटिंग्ज',
    language: 'भाषा (Language)',
    conversationHistory: 'मागील संभाषणे',
    bookmarks: 'जतन केलेल्या योजना',
    helpSupport: 'मदत व पाठिंबा',
    privacyPolicy: 'गोपनीयता धोरण',
    termsConditions: 'अटी व शर्ती',
  },

  en: {
    // ─── Bottom Tab Bar ───────────────────────────────────────────────
    homeTab: 'Home',
    schemesTab: 'Schemes',
    agriMitraTab: 'Agri Mitra',
    eligibilityTab: 'Eligibility',
    profileTab: 'Profile',

    // ─── Header & General App ─────────────────────────────────────────
    appName: 'Farmer AI',
    appSubtitle: 'SMART FARMING',
    back: 'Back',
    search: 'Search',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    errorOccurred: 'An error occurred. Please try again.',
    retry: 'Retry',

    // ─── Home Page ────────────────────────────────────────────────────
    greeting: 'Welcome Farmer Friend! 👋',
    todayFarmingInfo: "Today's Farming Info",
    aiSubtitle: 'More yield, more profit with AI assistance.',
    quickServices: 'Quick Services',
    seeAll: 'See All >',
    todayTip: "Today's Farming Advisory",
    tipText: 'Drip irrigation today can save 40-60% water.',

    // ─── Home Service Cards ───────────────────────────────────────────
    cropSelection: 'Crop Selection',
    cropSelectionSub: 'AI Recommendation',
    diseaseDiagnosis: 'Disease Diagnosis',
    diseaseDiagnosisSub: 'Crop Inspection',
    weather: 'Weather Forecast',
    weatherSub: '7-Day Forecast',
    schemesService: 'Government Schemes',
    schemesSub: 'Check Eligibility',
    marketPrices: 'Market Rates',
    marketPricesSub: 'Market Rates & EMI',
    fertilizerAdvice: 'Fertilizer Advice',
    fertilizerAdviceSub: 'NPK Recommendation',

    // ─── Schemes Page & Details ───────────────────────────────────────
    schemesPageTitle: 'Government Schemes',
    schemesPageSubtitle: '20 curated agriculture schemes',
    searchPlaceholder: 'Search schemes, topics...',
    allSchemes: 'All',
    schemesCount: '{count} schemes',
    loadingMore: 'Loading more...',
    noSchemesFound: 'No schemes found',
    noSchemesSub: 'Try a different category or search term.',
    benefitLabel: 'BENEFIT',
    centralType: 'CENTRAL',
    stateType: 'STATE',
    schemeDetailsTitle: 'Scheme Details',
    eligibilityCriteria: 'Eligibility Criteria',
    benefits: 'Key Benefits & Subsidies',
    applyNow: 'Apply Now',
    officialPortal: 'Official Portal',

    // ─── Categories ──────────────────────────────────────────────────
    catHorticulture: 'Horticulture',
    catTribalDevelopment: 'Tribal Development',
    catAgroProcessing: 'Agro Processing',
    catIrrigation: 'Irrigation',
    catFarmerWelfare: 'Farmer Welfare',
    catSafetyWelfare: 'Safety & Welfare',
    catCropDevelopment: 'Crop Development',
    catRainfedDevelopment: 'Rainfed Development',
    catMechanization: 'Mechanization',

    // ─── Eligibility Section (/eligibility) ───────────────────────────
    checkEligibility: 'Check Eligibility',
    eligibilitySubtitle: 'Find government schemes you are eligible for',
    introCardText: 'Enter your details and find the schemes available for you.',

    step1: 'Step 1 → Personal Details',
    step2: 'Step 2 → Farm Details',
    step3: 'Step 3 → Location',
    step4: 'Step 4 → Results',

    step1Title: 'Personal Details',
    step2Title: 'Farm Details',
    step3Title: 'Location Details',
    step4Title: 'Eligibility Results',

    // Form Labels
    age: 'Your Age',
    gender: 'Gender',
    farmerType: 'Farmer Type',
    landHolding: 'Land Holding (Acres/Ha)',
    district: 'District',
    taluka: 'Taluka',
    cropType: 'Crop Type',
    annualIncome: 'Annual Income',
    category: 'Social Category',

    // Dropdown / Select Option Labels
    selectGender: 'Select Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',

    selectFarmerType: 'Select Farmer Type',
    marginal: 'Marginal (< 1 Hectare)',
    small: 'Small Farmer (1 - 2 Hectares)',
    medium: 'Medium Farmer (2 - 5 Hectares)',
    large: 'Large Farmer (> 5 Hectares)',

    selectLand: 'Select Land Holding',
    landUnder1: '< 1 Hectare (< 2.5 Acres)',
    land1to2: '1 - 2 Hectares (2.5 - 5 Acres)',
    land2to5: '2 - 5 Hectares (5 - 12.5 Acres)',
    landAbove5: '> 5 Hectares (> 12.5 Acres)',

    selectDistrict: 'Select District',
    selectTaluka: 'Select Taluka',
    selectCrop: 'Select Crop Type',
    cotton: 'Cotton',
    soybean: 'Soybean',
    sugarcane: 'Sugarcane',
    wheat: 'Wheat',
    onion: 'Onion',
    vegetables: 'Horticulture & Vegetables',

    selectIncome: 'Select Annual Income',
    incomeUnder1L: '< ₹1 Lakh',
    income1to2_5L: '₹1 Lakh - ₹2.5 Lakh',
    income2_5to5L: '₹2.5 Lakh - ₹5 Lakh',
    incomeAbove5L: '> ₹5 Lakh',

    selectCategory: 'Select Category',
    general: 'General / Open',
    sc: 'Scheduled Caste (SC)',
    st: 'Scheduled Tribe (ST)',
    obc: 'Other Backward Class (OBC)',

    // Eligibility Buttons & Results
    continueBtn: 'Continue',
    backBtn: 'Back',
    checkEligibilityBtn: 'Check Eligibility',
    modifyDetailsBtn: 'Modify Details',
    viewDetails: 'View Details',
    askVoiceBtn: 'Ask Agri Mitra',

    resultsFound: '{count} schemes are available for you',
    eligibleBadge: '100% Eligible',
    partiallyEligibleBadge: 'Likely Eligible',
    noMatchTitle: 'No schemes currently match your details.',
    noMatchSub: 'Please review your details or explore general schemes.',

    // ─── Crop Selection Screen (/crop-selection) ──────────────────────
    aiCropBannerTitle: 'Select the Best Crop for Your Land',
    aiCropBannerSub: 'Top profit-generating crops based on weather, soil type, and market demand.',
    soilTypeTitle: '1. Select Soil Type',
    seasonTitle: '2. Select Season',
    recommendedCropsTitle: 'Recommended Crops',
    expectedYield: 'Expected Yield',
    duration: 'Duration',
    waterNeed: 'Water Requirement',
    estimatedProfit: 'Estimated Profit',
    getAdvice: 'Get Advice',

    soilBlack: 'Black Cotton',
    soilRed: 'Red Soil',
    soilAlluvial: 'Alluvial Soil',
    soilSandy: 'Sandy / Murrum',

    seasonKharif: 'Kharif (Monsoon)',
    seasonRabi: 'Rabi (Winter)',
    seasonSummer: 'Summer',

    // ─── Disease Diagnosis Screen (/disease-diagnosis) ────────────────
    uploadLeafPhoto: 'Upload or Take Leaf Photo',
    uploadLeafSub: 'Upload a clear photo of the infected leaf. AI will instantly diagnose the disease and suggest remedies.',
    scanNow: 'Scan Now',
    scanningInProgress: 'Scanning in progress...',
    majorDiseasesTitle: 'Major Crop Diseases & Remedies',
    symptoms: 'Symptoms:',
    organicRemedy: 'Organic Remedy:',
    chemicalRemedy: 'Chemical Remedy:',
    askAgriMitraDisease: 'Ask Agri Mitra About Disease',
    affectedCrops: 'Affected Crops:',
    severityHigh: 'High',
    severityMed: 'Medium',

    // ─── Weather Screen (/weather) ────────────────────────────────────
    weatherUpdatedToday: 'Updated Today',
    humidity: 'Humidity',
    rainProbability: 'Rainfall Prob',
    windSpeed: 'Wind Speed',
    weatherAdvisoryTitle: 'Farming Advisory',
    weatherAdvisorySub: 'Rainfall is expected this Wednesday. Complete sprays today and prepare field drainage.',
    sevenDayForecastTitle: '7-Day Weather Forecast',

    dayToday: 'Today',
    dayTomorrow: 'Tomorrow',
    dayWed: 'Wednesday',
    dayThu: 'Thursday',
    dayFri: 'Friday',
    daySat: 'Saturday',
    daySun: 'Sunday',

    condPartlyCloudy: 'Partly Cloudy',
    condSunny: 'Sunny',
    condLightRain: 'Light Rain',
    condThunderstorm: 'Thunderstorm',
    condCloudy: 'Cloudy',

    // ─── Market Prices Screen (/market-prices) ────────────────────────
    selectMandiTitle: 'Select APMC Mandi',
    todayMarketPricesTitle: "Today's Mandi Prices",
    todayRates: 'Today Rates',
    perQuintal: 'per Quintal',
    minMaxRange: 'Min-Max:',
    gradeQuality: 'Grade:',

    emiCalculatorTitle: 'Tractor & Farm Loan EMI Calculator',
    monthlyEmiLabel: 'Estimated Monthly EMI',
    selectLoanAmount: 'Select Loan Amount:',
    consultLoanAgriMitra: 'Consult Agri Mitra About Loan',

    // ─── Fertilizer Advice Screen (/fertilizer-advice) ────────────────
    selectCropForFertilizer: 'Select Crop',
    recommendedNpkRatio: 'Recommended N:P:K Ratio (kg/acre)',
    npkDoseSchedule: 'Application Method:',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potassium (K)',
    fertilizerScheduleTitle: 'Stage-wise Fertilizer Schedule',
    organicFertilizerTitle: 'Organic Alternatives',
    customSoilAdviceBtn: 'Get Custom Advice Based on Soil Test',

    // ─── Voice / Agri Mitra Screen (/mic) ─────────────────────────────
    voiceListening: 'Listening... Speak now...',
    voiceTapToSpeak: 'Tap microphone to speak',
    suggestedQuestionsTitle: 'Suggested Questions',
    q1: 'My soybean crop has leaf blight, what remedy should I use?',
    q2: 'When will the next PM-Kisan installment be credited?',
    q3: 'What is the ideal fertilizer dose for cotton crop?',
    q4: 'What is today\'s market rate in Latur APMC?',

    // ─── Notifications & Profile Screen ──────────────────────────────
    notificationsTitle: 'Notifications',
    noNotifications: 'No new notifications.',
    profileTitle: 'Profile',
    settings: 'Settings',
    language: 'Language',
    conversationHistory: 'Conversation History',
    bookmarks: 'Bookmarked Schemes',
    helpSupport: 'Help & Support',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
  },
};

export const getTranslation = (
  langCode: string,
  key: string,
  params?: Record<string, any>
): string => {
  const code = (langCode === 'en' ? 'en' : 'mr') as SupportedLanguage;
  let text = translations[code]?.[key] || translations['mr']?.[key] || key;

  if (params) {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(params[paramKey]));
    });
  }

  return text;
};

export const getCategoryTranslation = (category: string, langCode: string): string => {
  const keyMap: Record<string, string> = {
    Horticulture: 'catHorticulture',
    'Tribal Development': 'catTribalDevelopment',
    'Agro Processing': 'catAgroProcessing',
    Irrigation: 'catIrrigation',
    'Farmer Welfare': 'catFarmerWelfare',
    'Safety & Welfare': 'catSafetyWelfare',
    'Crop Development': 'catCropDevelopment',
    'Rainfed Development': 'catRainfedDevelopment',
    Mechanization: 'catMechanization',
  };

  const key = keyMap[category];
  return key ? getTranslation(langCode, key) : category;
};
