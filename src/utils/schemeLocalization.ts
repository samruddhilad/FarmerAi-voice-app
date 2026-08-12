/**
 * Scheme Localization Utility Module
 * Translates scheme titles, descriptions, benefits, subsidy amounts, eligibility criteria,
 * departments, and categories across all 5 supported languages (mr, en, hi, ahr, kok).
 * Full fallback support to Marathi (mr) and English (en) ensures zero undefined or broken text.
 */

import { Scheme } from '../types/api.types';
import { getTranslation, getCategoryTranslation } from './i18n';

interface LocalizedSchemeData {
  title: Record<string, string>;
  description: Record<string, string>;
  amount?: Record<string, string>;
  benefits?: Record<string, string>;
  eligibility_criteria?: Record<string, string>;
  department?: Record<string, string>;
  objective?: Record<string, string>;
}

export const SCHEME_TRANSLATIONS: Record<string, LocalizedSchemeData> = {
  'bhausaheb-fundkar-falbag-lagvad-yojana': {
    title: {
      mr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      en: 'Bhausaheb Fundkar Falbag Lagvad Yojana',
      hi: 'भाऊसाहेब फुंडकर फलबाग पौधरोपण योजना',
      ahr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      kok: 'भाऊसाहेब फुंडकर फळबाग रोवप येवजण',
    },
    description: {
      mr: 'फळबाग लागवड आणि दीर्घकालीन बागायती पिकांसाठी अनुदान सहाय्य.',
      en: 'Subsidy support for orchard plantation and long-term horticulture crops.',
      hi: 'फलबाग पौधरोपण और दीर्घकालिक बागवानी फसलों के लिए सब्सिडी सहायता।',
      ahr: 'फळबाग लागवड अन बागायती पिकांसाठी अनुदान सहाय्य.',
      kok: 'फळबाग रोवप आनी बागायती पिकां खातीर अनदानाचो आदार.',
    },
    amount: {
      mr: '५०% पर्यंत अनुदान',
      en: 'Up to 50% subsidy',
      hi: '50% तक सब्सिडी',
      ahr: '५०% पर्यंत अनुदान',
      kok: '५०% मेरेन अनदान',
    },
    benefits: {
      mr: 'लागवड अनुदान, रोपे सहाय्य आणि बाग विकास मदत.',
      en: 'Plantation subsidy, sapling support, and orchard development assistance.',
      hi: 'पौधरोपण सब्सिडी, पौध सहायता और बाग विकास मदद।',
      ahr: 'लागवड अनुदान, रोपे सहाय्य अन बाग विकास मदत.',
      kok: 'रोवप अनदान, रोपां आदार आनी बाग वाडी खातीर मदत.',
    },
    eligibility_criteria: {
      mr: 'पात्र जमीन पार्सलवर फळबागा स्थापित करणारे शेतकरी.',
      en: 'Farmers establishing fruit orchards on eligible land parcels.',
      hi: 'पात्र भूमि पर फलबाग लगाने वाले किसान।',
      ahr: 'पात्र जमिनीवर फळबाग लागवड करणारे शेतकरी भाऊ.',
      kok: 'योग्य जमिनीचेर फळबागो रोवपी शेतकार.',
    },
  },
  'birsa-munda-krishi-kranti-outside-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी उपयोजनेबाहेर)',
      en: 'Birsa Munda Krishi Kranti Yojana (Outside Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना के बाहर)',
      ahr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी क्षेत्राबाहेर)',
      kok: 'बिरसा मुंडा कृषी क्रांती येवजण (आदिवासी उपयेवजणे भायर)',
    },
    description: {
      mr: 'आदिवासी क्षेत्राबाहेरील सिंचन, फलोत्पादन आणि शेती पायाभूत सुविधांसाठी पाठिंबा.',
      en: 'Support for irrigation, horticulture, and farm infrastructure outside tribal areas.',
      hi: 'आदिवासी क्षेत्रों के बाहर सिंचाई, बागवानी और कृषि बुनियादी ढांचे के लिए सहायता।',
      ahr: 'आदिवासी क्षेत्राबाहेर सिंचन अन शेती सुविधांसाठी पाठिंबा.',
      kok: 'आदिवासी वाठारा भायर सिंचन आनी शेतकाम आधारा खातीर मदत.',
    },
    amount: {
      mr: 'प्रकल्प आधारित अनुदान',
      en: 'Project-based subsidy',
      hi: 'परियोजना आधारित सब्सिडी',
      ahr: 'प्रकल्प आधारित अनुदान',
      kok: 'प्रकल्प आदारीत अनदान',
    },
    benefits: {
      mr: 'विहीर, तुषार/ठिबक सिंचन आणि फलोत्पादन विकास मदत.',
      en: 'Wells, micro-irrigation, and farm infrastructure support.',
      hi: 'कुआं, सूक्ष्म सिंचाई और कृषि विकास सहायता।',
      ahr: 'विहीर अन ठिबक सिंचन मदत.',
      kok: 'बांय, ठिबक उदक आनी फलोत्पादन मदत.',
    },
    eligibility_criteria: {
      mr: 'अनुसूचित जमातीचे शेतकरी (उपयोजनेबाहेरील भागातील).',
      en: 'Scheduled Tribe farmers residing outside tribal sub-plan areas.',
      hi: 'अनुसूचित जनजाति के किसान (उपयोजना के बाहर)।',
      ahr: 'अनुसूचित जमातीना शेतकरी भाऊ.',
      kok: 'अनुसूचित जमातीचे शेतकार.',
    },
  },
  'birsa-munda-krishi-kranti-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी उपयोजना)',
      en: 'Birsa Munda Krishi Kranti Yojana (Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना)',
      ahr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी उपयोजना)',
      kok: 'बिरसा मुंडा कृषी क्रांती येवजण (आदिवासी उपयेवजण)',
    },
    description: {
      mr: 'आदिवासी उपयोजना क्षेत्रातील शेती पायाभूत सुविधांसाठी विशेष सहाय्य.',
      en: 'Special support for farming infrastructure in tribal sub plan regions.',
      hi: 'आदिवासी उपयोजना क्षेत्रों में कृषि बुनियादी ढांचे के लिए विशेष सहायता।',
      ahr: 'आदिवासी उपयोजना क्षेत्रासाठी विशेष शेती सहाय्य.',
      kok: 'आदिवासी उपयेवजण वाठारांत शेतकाम आधारा खातीर विशेश मदत.',
    },
    amount: {
      mr: '१००% पर्यंत प्रकल्प अनुदान',
      en: 'Up to 100% project subsidy',
      hi: '100% तक परियोजना सब्सिडी',
      ahr: '१००% पर्यंत प्रकल्प अनुदान',
      kok: '१००% मेरेन प्रकल्प अनदान',
    },
    benefits: {
      mr: 'नवीन विहीर, जुनी विहीर दुरुस्ती, पंप संच व तुषार सिंचन.',
      en: 'New well construction, pump sets, micro irrigation, and farm development.',
      hi: 'नया कुआं निर्माण, पंप सेट, सूक्ष्म सिंचाई और कृषि विकास।',
      ahr: 'नवीन विहीर, पंप संच अन सिंचन मदत.',
      kok: 'नवी बांय, पंप संच आनी सिंचन मदत.',
    },
    eligibility_criteria: {
      mr: 'आदिवासी उपयोजना क्षेत्रातील अनुसूचित जमातीचे शेतकरी.',
      en: 'Scheduled Tribe farmers in tribal sub-plan areas.',
      hi: 'आदिवासी उपयोजना क्षेत्र के एसटी किसान।',
      ahr: 'आदिवासी क्षेत्रातील एसटी शेतकरी भाऊ.',
      kok: 'आदिवासी वाठारांतले एसटी शेतकार.',
    },
  },
  'chief-minister-agro-food-processing-scheme': {
    title: {
      mr: 'मुख्यमंत्री कृषी व अन्न प्रक्रिया योजना',
      en: 'Chief Minister Agro and Food Processing Scheme',
      hi: 'मुख्यमंत्री कृषि एवं खाद्य प्रसंस्करण योजना',
      ahr: 'मुख्यमंत्री कृषी व अन्न प्रक्रिया योजना',
      kok: 'मुख्यमंत्री कृषी आनी अन्न प्रक्रिया येवजण',
    },
    description: {
      mr: 'मूल्यवर्धन, अन्न प्रक्रिया आणि कृषी उद्योगांसाठी प्रोत्साहन अनुदान.',
      en: 'Incentives for value addition, food processing, and agri-based enterprises.',
      hi: 'मूल्य संवर्धन, खाद्य प्रसंस्करण और कृषि आधारित उद्यमों के लिए प्रोत्साहन।',
      ahr: 'अन्न प्रक्रिया अन कृषी उद्योगांसाठी अनुदान मदत.',
      kok: 'अन्न प्रक्रिया आनी शेतकाम उद्योगां खातीर तेंको.',
    },
    amount: {
      mr: '३०% ते ५०% भांडवली अनुदान',
      en: '30% to 50% Capital Subsidy',
      hi: '30% से 50% पूंजीगत सब्सिडी',
      ahr: '३०% ते ५०% भांडवली अनुदान',
      kok: '३०% ते ५०% भांडवली अनदान',
    },
    benefits: {
      mr: 'प्रक्रिया उद्योग उभारणी, शीतगृह आणि मूल्यवर्धन प्रकल्प सहाय्य.',
      en: 'Processing plant setup, cold chain support, and value addition units.',
      hi: 'प्रसंस्करण संयंत्र स्थापना, कोल्ड चेन और मूल्य संवर्धन इकाइयां।',
      ahr: 'प्रक्रिया उद्योग उभारणी अन शीतगृह मदत.',
      kok: 'प्रक्रिया प्रकल्प उबारप आनी शीतगृह मदत.',
    },
    eligibility_criteria: {
      mr: 'शेतकरी उत्पादक गट (FPO), वैयक्तिक शेतकरी व कृषी उद्योजक.',
      en: 'Farmer Producer Organizations (FPOs), individual farmers, and agri-entrepreneurs.',
      hi: 'किसान उत्पादक संगठन (FPO), व्यक्तिगत किसान और कृषि उद्यमी।',
      ahr: 'शेतकरी गट अन कृषी उद्योजक शेतकरी भाऊ.',
      kok: 'शेतकार पंगड आनी शेतकाम उद्योजक.',
    },
  },
  'chief-minister-sustainable-agriculture-irrigation-scheme': {
    title: {
      mr: 'मुख्यमंत्री शाश्वत कृषी सिंचन योजना',
      en: 'Chief Minister Sustainable Agriculture Irrigation Scheme',
      hi: 'मुख्यमंत्री सतत कृषि सिंचाई योजना',
      ahr: 'मुख्यमंत्री शाश्वत कृषी सिंचन योजना',
      kok: 'मुख्यमंत्री शाश्वत कृषी सिंचन येवजण',
    },
    description: {
      mr: 'सूक्ष्म सिंचन आणि शेततळ्यांच्या माध्यमातून पाण्याचा कार्यक्षम वापर.',
      en: 'Promotes efficient water use through micro irrigation and on-farm storage.',
      hi: 'सूक्ष्म सिंचाई और खेत तालाबों के माध्यम से कुशल जल उपयोग को बढ़ावा।',
      ahr: 'ठिबक सिंचन अन शेततळे द्वारे पाणी बचत.',
      kok: 'सूक्ष्म सिंचन आनी शेततळ्या वरवीं उदकाची बचत.',
    },
    amount: {
      mr: 'पूरक अनुदान (७५% ते ८५% पर्यंत सवलत)',
      en: 'Top-up subsidy (Up to 75%-85% total discount)',
      hi: 'टॉप-अप सब्सिडी (75%-85% तक कुल छूट)',
      ahr: 'पूरक अनुदान (७५% ते ८५% सवलत)',
      kok: 'पूरक अनदान (७५% ते ८५% मेरेन सवलत)',
    },
    benefits: {
      mr: 'ठिबक/तुषार सिंचनासाठी पूरक अनुदान आणि प्लास्टिक अस्तरीकरणासह शेततळे.',
      en: 'Additional top-up subsidy for drip/sprinkler and farm pond lining.',
      hi: 'ड्रिप/स्प्रिंकलर और खेत तालाब लाइनिंग के लिए अतिरिक्त सब्सिडी।',
      ahr: 'ठिबक सिंचन अन शेततळे प्लास्टिक अस्तरीकरण मदत.',
      kok: 'ठिबक सिंचन आनी शेततळे अस्तरीकरण मदत.',
    },
    eligibility_criteria: {
      mr: 'सूक्ष्म सिंचन बसवणारे महाराष्ट्रातील सर्व अल्प व अत्यल्प भूधारक शेतकरी.',
      en: 'Small and marginal farmers installing micro-irrigation systems in Maharashtra.',
      hi: 'महाराष्ट्र के छोटे और सीमांत किसान जो सूक्ष्म सिंचाई प्रणाली लगा रहे हैं।',
      ahr: 'महाराष्ट्रना सर्व अल्पभूधारक शेतकरी भाऊ.',
      kok: 'महाराष्ट्रांतले सगळे ल्हान आनी सीमांत शेतकार.',
    },
  },
  'dr-babasaheb-ambedkar-krushi-swavalamban-yojana': {
    title: {
      mr: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना',
      en: 'Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana',
      hi: 'डॉ. बाबासाहेब अंबेडकर कृषि स्वावलंबन योजना',
      ahr: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना',
      kok: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन येवजण',
    },
    description: {
      mr: 'अनुसूचित जातीच्या शेतकऱ्यांसाठी सिंचन, विहिरी व शेती साहित्यासाठी आर्थिक मदत.',
      en: 'Financial assistance for irrigation, wells, and farming assets for SC farmers.',
      hi: 'अनुसूचित जाति के किसानों के लिए सिंचाई, कुओं और कृषि परिसंपत्तियों हेतु वित्तीय सहायता।',
      ahr: 'अनुसूचित जातीना शेतकऱ्यांसाठी विहीर अन सिंचन मदत.',
      kok: 'अनुसूचित जातीच्या शेतकांरां खातीर बांय आनी सिंचन मदत.',
    },
    amount: {
      mr: '₹२.५ लाख पर्यंत अनुदान',
      en: 'Up to ₹2.5 Lakh subsidy',
      hi: '₹2.5 लाख तक सब्सिडी',
      ahr: '₹२.५ लाख पर्यंत अनुदान',
      kok: '₹२.५ लाख मेरेन अनदान',
    },
    benefits: {
      mr: 'नवी विहीर (₹२.५ लाख), सौर पंप, शेततळे व विजेचा जोडणी खर्च.',
      en: 'New well (₹2.5L), solar pump, farm pond, and micro-irrigation support.',
      hi: 'नया कुआं (₹2.5 लाख), सोलर पंप, खेत तालाब और सूक्ष्म सिंचाई सहायता।',
      ahr: 'नवी विहीर अन सौर पंप मदत.',
      kok: 'नवी बांय आनी सोलर पंप मदत.',
    },
    eligibility_criteria: {
      mr: 'अनुसूचित जाती (SC) व नवबौद्ध प्रवर्गातील शेतकरी (उत्पन्न मर्यादा ₹१.५ लाख).',
      en: 'SC category farmers in Maharashtra with annual income up to ₹1.5 Lakh.',
      hi: 'महाराष्ट्र के एससी वर्ग के किसान जिनकी वार्षिक आय ₹1.5 लाख तक है।',
      ahr: 'अनुसूचित जातीना शेतकरी भाऊ.',
      kok: 'अनुसूचित जातीचे शेतकार.',
    },
  },
  'dr-shyamaprasad-mukharji-jan-van-vikas-scheme': {
    title: {
      mr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      en: 'Dr. Shyamaprasad Mukharji Jan-Van Vikas Scheme',
      hi: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      ahr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      kok: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास येवजण',
    },
    description: {
      mr: 'वनांवर अवलंबून असणाऱ्या घटकांसाठी शाश्वत उपजीविका आणि वन विकास मदत.',
      en: 'Livelihood and development support for forest-dependent communities.',
      hi: 'वन-आश्रित समुदायों के लिए आजीविका और विकास सहायता।',
      ahr: 'वन परिसरातील लोकांसाठी उपजीविका अन विकास मदत.',
      kok: 'वनाचेर आदारीत लोकां खातीर उपजीविका आनी वाड आदार.',
    },
    amount: {
      mr: 'विकास व उपजीविका अनुदान',
      en: 'Development & livelihood assistance',
      hi: 'विकास एवं आजीविका सहायता',
      ahr: 'विकास अन उपजीविका अनुदान',
      kok: 'विकास आनी उपजीविका अनदान',
    },
    benefits: {
      mr: 'पर्यायी उपजीविका साधने, वन संरक्षण प्रोत्साहन आणि वैयक्तिक/सामुदायिक लाभ.',
      en: 'Alternative livelihood options, forest conservation support, and community assets.',
      hi: 'वैकल्पिक आजीविका साधन, वन संरक्षण प्रोत्साहन और सामुदायिक परिसंपत्तियां।',
      ahr: 'उपजीविका साधने अन वन संरक्षण मदत.',
      kok: 'उपजीविका साधनां आनी रान राखण मदत.',
    },
    eligibility_criteria: {
      mr: 'व्याघ्र प्रकल्प व वन क्षेत्राच्या परिघातील ग्रामस्थ व शेतकरी.',
      en: 'Forest dwellers, eco-development committees, and eligible villagers in tiger reserve buffer zones.',
      hi: 'टाइगर रिजर्व बफर जोन के ग्रामीण और वन-आश्रित निवासी।',
      ahr: 'वन क्षेत्रातील शेतकरी अन नागरिक भाऊ.',
      kok: 'रान वाठारांतले गांवकार आनी शेतकार.',
    },
  },
  'gopinath-munde-shetkari-apghat-suraksha-anudan-yojana': {
    title: {
      mr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना',
      en: 'Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana',
      hi: 'गोपीनाथ मुंडे किसान दुर्घटना सुरक्षा अनुदान योजना',
      ahr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा योजना',
      kok: 'गोपीनाथ मुंडे शेतकार अपघात सुरक्षा येवजण',
    },
    description: {
      mr: 'शेतात काम करताना अपघात किंवा मृत्यू झाल्यास शेतकरी कुटुंबास आर्थिक मदत.',
      en: 'Financial relief to farmer families in case of accidental death or disability.',
      hi: 'दुर्घटना में मृत्यु या विकलांगता के मामले में किसान परिवारों को वित्तीय सहायता।',
      ahr: 'अपघात प्रसंगी शेतकरी कुटुंबाले आर्थिक मदत.',
      kok: 'अपघात जाल्यार शेतकार कुटुंबाक आर्थिक आदार.',
    },
    amount: {
      mr: '₹२ लाख पर्यंत सानुग्रह अनुदान',
      en: 'Up to ₹2 Lakh insurance support',
      hi: '₹2 लाख तक अनुग्रह सहायता',
      ahr: '₹२ लाख पर्यंत अनुदान',
      kok: '₹२ लाख मेरेन आर्थिक आदार',
    },
    benefits: {
      mr: 'अपघाती मृत्यूवर ₹२ लाख, दोन अवयव अपंगत्वावर ₹२ लाख व एका अवयवासाठी ₹१ लाख.',
      en: '₹2 Lakh for accidental death/double limb loss, ₹1 Lakh for single limb disability.',
      hi: 'दुर्घटना मृत्यु/दो अंग हानि पर ₹2 लाख, एक अंग हानि पर ₹1 लाख।',
      ahr: 'अपघाती मृत्यूवर ₹२ लाख मदत.',
      kok: 'अपघाती मरणाचेर ₹२ लाख आदार.',
    },
    eligibility_criteria: {
      mr: '१० ते ७५ वयोगटातील महाराष्ट्रातील सर्व खातेदार शेतकरी व त्यांचे कुटुंब.',
      en: 'Registered landholder farmers aged 10-75 years in Maharashtra and family members.',
      hi: 'महाराष्ट्र के 10-75 वर्ष की आयु के सभी पंजीकृत किसान और उनके परिवार।',
      ahr: 'महाराष्ट्रातील सर्व शेतकरी भाऊ.',
      kok: 'महाराष्ट्रांतले सगळे नोंदणीकृत शेतकार.',
    },
  },
  'pm-kisan-samman-nidhi': {
    title: {
      mr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
      en: 'PM-Kisan Samman Nidhi Yojana',
      hi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
      ahr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
      kok: 'प्रधानमंत्री किसान सन्मान निधी येवजण',
    },
    description: {
      mr: 'शेतकरी कुटुंबांना थेट बँक खात्यात प्रतिवर्ष ₹६,००० ची आर्थिक मदत.',
      en: 'Direct income support of ₹6,000 per year for farmer families across India.',
      hi: 'भारत भर के किसान परिवारों के लिए प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।',
      ahr: 'शेतकरी कुटुंबाले वर्षाले ₹६,००० थेट मदत.',
      kok: 'शेतकार कुटुंबांक वर्साक ₹६,००० थेट आदार.',
    },
    amount: {
      mr: '₹६,००० / वर्ष (३ हप्त्यांमध्ये)',
      en: '₹6,000 / year (3 installments)',
      hi: '₹6,000 / वर्ष (3 किस्तों में)',
      ahr: '₹६,००० / वर्ष (३ हप्त्यांमध्ये)',
      kok: '₹६,००० / वर्स (३ हप्त्यांनी)',
    },
    benefits: {
      mr: 'दर ४ महिन्यांनी ₹२,००० थेट खात्यात (DBT द्वारे जमा).',
      en: '₹2,000 credited every 4 months directly via DBT.',
      hi: 'हर 4 महीने में ₹2,000 सीधे बैंक खाते में (डीबीटी द्वारा)।',
      ahr: 'दर ४ महिन्यांनी ₹२,००० थेट खात्यावर जमा.',
      kok: 'दर ४ म्हयन्यांनी ₹२,००० बँक खात्यांत जमा.',
    },
    eligibility_criteria: {
      mr: 'शेतीयोग्य जमीन असणारे सर्व लहान व मध्यम शेतकरी कुटुंबे.',
      en: 'All landholding farmer families with cultivable land in India.',
      hi: 'भारत में कृषि योग्य भूमि वाले सभी भूमिधारक किसान परिवार।',
      ahr: 'शेती जमीन असणारे सर्व शेतकरी भाऊ.',
      kok: 'शेतकाम जमीन आशिल्ले सगळे शेतकार.',
    },
  },
  'traditional-agriculture-development-scheme-pkvy': {
    title: {
      mr: 'परंपरागत कृषी विकास योजना (PKVY)',
      en: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      hi: 'परंपरागत कृषि विकास योजना (PKVY)',
      ahr: 'परंपरागत कृषी विकास योजना (PKVY)',
      kok: 'परंपरागत कृषी विकास येवजण (PKVY)',
    },
    description: {
      mr: 'सेंद्रिय शेती, गांडूळ खत निर्मिती आणि जैविक प्रमाणपत्रासाठी प्रोत्साहन.',
      en: 'Promotes organic farming, vermicompost units, and organic certification.',
      hi: 'जैविक खेती, वर्मीकंपोस्ट इकाइयों और जैविक प्रमाणीकरण को बढ़ावा।',
      ahr: 'सेंद्रिय शेती अन गांडूळ खत निर्मिती प्रोत्साहन.',
      kok: 'सेंद्रिय शेतकाम आनी गांडूळ सारें वाडी खातीर मदत.',
    },
    amount: {
      mr: '₹५०,००० / हेक्टर (३ वर्षांसाठी)',
      en: '₹50,000 / hectare (over 3 years)',
      hi: '₹50,000 / हेक्टेयर (3 वर्षों में)',
      ahr: '₹५०,००० / हेक्टर (३ वर्षांसाठी)',
      kok: '₹५०,००० / हेक्टर (३ वर्सां खातीर)',
    },
    benefits: {
      mr: 'सेंद्रिय खते, बियाणे, जैविक प्रमाणपत्र आणि विपणन सहाय्य.',
      en: 'Organic inputs, vermicompost, PGS certification, and market linkage.',
      hi: 'जैविक इनपुट, वर्मीकंपोस्ट, पीजीएस प्रमाणीकरण और बाजार संबंध।',
      ahr: 'सेंद्रिय बियाणे, खत अन विपणन मदत.',
      kok: 'सेंद्रिय बियाणीं, सारें आनी बाजारपेठ मदत.',
    },
    eligibility_criteria: {
      mr: '५० किंवा अधिक शेतकऱ्यांचा सेंद्रिय गट बनवणारे शेतकरी.',
      en: 'Farmers forming organic clusters of 50 or more farmers.',
      hi: '50 या अधिक किसानों का जैविक क्लस्टर बनाने वाले किसान।',
      ahr: 'सेंद्रिय गट बनवणारे शेतकरी भाऊ.',
      kok: 'सेंद्रिय पंगड तयार करपी शेतकार.',
    },
  },
  'kaju-kalma-vatap-scheme': {
    title: {
      mr: 'काजू कलमे वाटप योजना',
      en: 'Kaju Kalma Vatap Scheme (Cashew Graft Distribution)',
      hi: 'काजू कलम वितरण योजना',
      ahr: 'काजू कलमे वाटप योजना',
      kok: 'काजू कलमां वांटप येवजण',
    },
    description: {
      mr: 'उत्पादन वाढ आणि फलोत्पादन विस्तारासाठी उच्च प्रतीच्या काजू कलमांचे वाटप.',
      en: 'Distribution of high-quality cashew grafts for plantation expansion and income growth.',
      hi: 'उत्पादन वृद्धि और बागवानी विस्तार के लिए उच्च गुणवत्ता वाले काजू कलमी पौधों का वितरण।',
      ahr: 'उत्पादन वाढीसाठी काजू कलमे वाटप योजना.',
      kok: 'उत्पादन वाडी खातीर व्हड दर्जाचीं काजू कलमां वांटप मदत.',
    },
    amount: {
      mr: 'कलम साहित्य सहाय्य',
      en: 'Planting material support',
      hi: 'पौधरोपण सामग्री सहायता',
      ahr: 'कलम साहित्य सहाय्य',
      kok: 'कलमां रोवप आदार',
    },
    benefits: {
      mr: 'उत्कृष्ट दर्जाची काजू कलमे, रोपवाटिका तांत्रिक मार्गदर्शन व फलोत्पादन विस्तार सहाय्य.',
      en: 'Quality cashew graft supply, technical nursery support, and horticulture expansion.',
      hi: 'गुणवत्तापूर्ण काजू कलम आपूर्ति, तकनीकी सहायता और बागवानी विस्तार।',
      ahr: 'उत्कृष्ट काजू कलमे अन तांत्रिक मार्गदर्शन.',
      kok: 'बर्या दर्जाचीं काजू कलमां आनी तांत्रिक मार्गदर्शन मदत.',
    },
    eligibility_criteria: {
      mr: 'महाराष्ट्रातील काजू लागवडीसाठी योग्य जमीन असणारे सर्व पात्र शेतकरी.',
      en: 'Farmers with suitable land parcels for cashew cultivation in Maharashtra.',
      hi: 'महाराष्ट्र में काजू की खेती के लिए उपयुक्त भूमि वाले सभी पात्र किसान।',
      ahr: 'काजू लागवडीसाठी पात्र शेतकरी भाऊ.',
      kok: 'काजू रोवपा खातीर योग्य जमीन आशिल्ले शेतकार.',
    },
  },
  'mission-for-integrated-development-of-horticulture': {
    title: {
      mr: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH) - केंद्र पुरस्कृत',
      en: 'Mission for Integrated Development of Horticulture (MIDH) - CSS',
      hi: 'एकीकृत बागवानी विकास मिशन (MIDH) - केंद्र प्रायोजित',
      ahr: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
      kok: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
    },
    description: {
      mr: 'फलोत्पादन क्षेत्र विस्तार, आधुनिक रोपवाटिका आणि कापणीनंतरच्या पायाभूत सुविधांसाठी केंद्रीय सहाय्य.',
      en: 'Central support for horticulture expansion, modern nurseries, cold chain, and post-harvest systems.',
      hi: 'बागवानी विस्तार, आधुनिक नर्सरी और कटाई के बाद बुनियादी ढांचे के लिए केंद्रीय सहायता।',
      ahr: 'फलोत्पादन क्षेत्र विस्तार अन रोपवाटिका सहाय्य.',
      kok: 'फलोत्पादन वाड, रोपवाटिका आनी शीतगृह आदार.',
    },
    amount: {
      mr: 'प्रकल्प स्वरूपानुसार अनुदान',
      en: 'Pattern-based subsidy',
      hi: 'पैटर्न आधारित सब्सिडी',
      ahr: 'प्रकल्प आधारित अनुदान',
      kok: 'प्रकल्प आदारीत अनदान',
    },
    benefits: {
      mr: 'फळबाग लागवड सहाय्य, ग्रीन हाऊस, पॅक हाऊस व कोल्ड स्टोरेज उभारणीसाठी अनुदान.',
      en: 'Subsidy for orchards, greenhouse, pack-houses, and cold storage units.',
      hi: 'फलबाग, पॉलीहाउस, पैक-हाउस और कोल्ड स्टोरेज इकाइयों के लिए सब्सिडी।',
      ahr: 'फळबाग लागवड अन ग्रीन हाऊस अनुदान.',
      kok: 'फळबाग, पॉलीहाऊस आनी शीतगृह उबारपा खातीर अनदान.',
    },
    eligibility_criteria: {
      mr: 'वैयक्तिक शेतकरी, शेतकरी गट (FPO) आणि फलोत्पादन व्यावसायिक.',
      en: 'Individual farmers, FPOs, and horticulture entrepreneurs.',
      hi: 'व्यक्तिगत किसान, एफपीओ और बागवानी उद्यमी।',
      ahr: 'शेतकरी गट अन फलोत्पादन शेतकरी भाऊ.',
      kok: 'शेतकार पंगड आनी फलोत्पादन उद्योजक.',
    },
  },
  'nfsm-cotton-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस (NFSM Cotton) - केंद्र पुरस्कृत',
      en: 'National Food Security Mission (NFSM) - Cotton - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - कपास (NFSM Cotton) - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस (NFSM)',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस (NFSM)',
    },
    description: {
      mr: 'प्रात्यक्षिके, प्रगत बियाणे आणि तंत्रज्ञानाद्वारे कापूस उत्पादकता वाढवण्याचे अभियान.',
      en: 'Improves cotton productivity with high-yielding seeds, inputs, and field demonstrations.',
      hi: 'उन्नत बीजों, इनपुट और क्षेत्र प्रदर्शनों के माध्यम से कपास उत्पादकता में सुधार।',
      ahr: 'बियाणा अन प्रात्यक्षिकांद्वारे कापूस उत्पादन वाढ.',
      kok: 'बर्या दर्जाचें बीं आनी प्रात्यक्षिकां वरवीं कापूस वाड.',
    },
    amount: {
      mr: 'बियाणे व साहित्य अनुदान',
      en: 'Input subsidy support',
      hi: 'इनपुट सब्सिडी सहायता',
      ahr: 'बियाणे व साहित्य अनुदान',
      kok: 'बीं आनी साहित्य अनदान',
    },
    benefits: {
      mr: 'प्रमाणित बियाणे वाटप, एकात्मिक किड नियंत्रण प्रात्यक्षिके व शेतकरी प्रशिक्षण.',
      en: 'Certified seed distribution, Integrated Pest Management (IPM) demos, and farmer training.',
      hi: 'प्रमाणित बीज वितरण, एकीकृत कीट प्रबंधन प्रदर्शन और किसान प्रशिक्षण।',
      ahr: 'प्रमाणित बियाणे वाटप अन किड नियंत्रण प्रात्यक्षिके.',
      kok: 'प्रमाणीत बीं वांटप आनी किड नियंत्रण प्रात्यक्षिकां.',
    },
    eligibility_criteria: {
      mr: 'अधिसूचित कापूस उत्पादक जिल्ह्यांमधील सर्व पात्र कापूस शेतकरी.',
      en: 'Cotton growers in NFSM notified cotton growing districts.',
      hi: 'एनएफएसएम अधिसूचित कपास उत्पादक जिलों के कपास किसान।',
      ahr: 'कापूस उत्पादक जिल्ह्यातील शेतकरी भाऊ.',
      kok: 'कापूस पिकोवपी वाठारांतले शेतकार.',
    },
  },
  'nfsm-food-grains-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्ये (NFSM Food Grains)',
      en: 'NFSM - Food Grains (Pulses, Coarse Cereals, Rice, Wheat) - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - खाद्यान्न (NFSM Food Grains)',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्ये',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्यां',
    },
    description: {
      mr: 'डाळी, भरड धान्ये व तृणधान्य पिकांच्या उत्पादन वाढीसाठी बियाणे व प्रात्यक्षिक सहाय्य.',
      en: 'Productivity and input support for pulses, coarse cereals, nutri-cereals, rice, and wheat.',
      hi: 'दलहन, मोटे अनाज, चावल और गेहूं की उत्पादकता और इनपुट सहायता।',
      ahr: 'डाळी अन भरड धान्ये उत्पादन वाढ मदत.',
      kok: 'डाळी आनी अन्नधान्यां वाडी खातीर मदत.',
    },
    amount: {
      mr: 'बियाणे व बियाणे मिनीकिट अनुदान',
      en: 'Seed minikit & input subsidy',
      hi: 'बीज मिनीकिट और इनपुट सब्सिडी',
      ahr: 'बियाणे मिनीकिट अनुदान',
      kok: 'बीं मिनीकीट अनदान',
    },
    benefits: {
      mr: 'उच्च उत्पन्न देणाऱ्या वाणांचे बियाणे, सूक्ष्म अन्नद्रव्ये आणि आधुनिक सुधारित अवजारे.',
      en: 'High-yielding variety seeds, micronutrients, and modern farm tools.',
      hi: 'उच्च उपज वाली किस्म के बीज, सूक्ष्म पोषक तत्व और आधुनिक कृषि उपकरण।',
      ahr: 'सुधारित बियाणे अन खत साहित्यात सवलत.',
      kok: 'उच्च दर्जाचें बीं आनी आधुनिक अवजारां मदत.',
    },
    eligibility_criteria: {
      mr: 'अन्नधान्य व डाळी पिकांची लागवड करणारे महाराष्ट्रातील शेतकरी.',
      en: 'Farmers cultivating notified food grain crops and pulses.',
      hi: 'अधिसूचित खाद्यान्न और दलहन फसलों की खेती करने वाले किसान।',
      ahr: 'अन्नधान्य लागवड करणारे शेतकरी भाऊ.',
      kok: 'अन्नधान्य पिकोवपी सगळे शेतकार.',
    },
  },
  'nfsm-oilseed-oilpalm-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - गळित धान्य व तेलताड (NFSM Oilseeds)',
      en: 'NFSM - Oilseeds and Oil Palm - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - तिलहन और ऑयल पाम',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया',
    },
    description: {
      mr: 'गळित धान्ये (सोयाबीन, भुईमूग) आणि तेलताड लागवडीसाठी विशेष तंत्रज्ञान व अनुदान सहाय्य.',
      en: 'Boosts oilseed (soybean, groundnut) and oil palm production through technology and subsidies.',
      hi: 'तकनीक और सब्सिडी के माध्यम से तिलहन और ऑयल पाम उत्पादन को बढ़ावा।',
      ahr: 'सोयाबीन अन भुईमूग उत्पादक सवलत मदत.',
      kok: 'सोयाबीन आनी भुईमूग पिकां खातीर अनदान.',
    },
    amount: {
      mr: 'बियाणे व यंत्रसामग्री अनुदान',
      en: 'Input & machinery subsidy',
      hi: 'इनपुट और मशीनरी सब्सिडी',
      ahr: 'बियाणे अन साहित्य सवलत',
      kok: 'बीं आनी साहित्य अनदान',
    },
    benefits: {
      mr: 'सुधारित बियाणे वितरण, तुषार सिंचन संच व आंतरपिक प्रात्यक्षिके.',
      en: 'Improved seed distribution, sprinkler sets, and inter-cropping demos.',
      hi: 'उन्नत बीज वितरण, स्प्रिंकलर सेट और अंतर-फसल प्रदर्शन।',
      ahr: 'सुधारित बियाणे अन तुषार सिंचन अनुदान.',
      kok: 'बर्या वाणाचें बीं आनी सिंचन मदत.',
    },
    eligibility_criteria: {
      mr: 'गळित धान्ये आणि तेलताड पिकांची लागवड करणारे शेतकरी.',
      en: 'Oilseed and oil palm growers in approved agricultural clusters.',
      hi: 'स्वीकृत कृषि क्लस्टर्स में तिलहन और ऑयल पाम उगाने वाले किसान।',
      ahr: 'तेलबिया लागवड करणारे शेतकरी भाऊ.',
      kok: 'तेलबिया पिकोवपी शेतकार.',
    },
  },
  'nfsm-sugarcane-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस विकास (NFSM Sugarcane)',
      en: 'NFSM - Sugarcane Development - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - गन्ना विकास',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस विकास',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस विकास',
    },
    description: {
      mr: 'ऊस उत्पादकता वाढ, आंतरपिक पद्धत आणि सूक्ष्म सिंचन वापरासाठी प्रोत्साहन.',
      en: 'Support for sugarcane productivity, inter-cropping, micro-irrigation, and soil health.',
      hi: 'गन्ना उत्पादकता, अंतर-फसल प्रणाली और सूक्ष्म सिंचाई के लिए सहायता।',
      ahr: 'ऊस उत्पादन वाढ अन ठिबक सिंचन सवलत.',
      kok: 'ऊस उत्पादन वाड आनी सिंचन मदत.',
    },
    amount: {
      mr: 'उत्पादन प्रात्यक्षिक अनुदान',
      en: 'Production & demo support',
      hi: 'उत्पादन और प्रदर्शन सहायता',
      ahr: 'प्रात्यक्षिक सवलत अनुदान',
      kok: 'प्रात्यक्षिक अनदान आदार',
    },
    benefits: {
      mr: 'पांगरी/बड लागवड तंत्रज्ञान, आंतरपिक बी-बियाणे आणि जिवाणू खते अनुदान.',
      en: 'Tissue culture plantlets, inter-crop seeds, and bio-fertilizer support.',
      hi: 'टिश्यू कल्चर पौधे, अंतर-फसल बीज और जैव-उर्वरक सहायता।',
      ahr: 'ऊस बियाणे अन सेंद्रिय खते मदत.',
      kok: 'ऊस बीं आनी सेंद्रिय सारें अनदान.',
    },
    eligibility_criteria: {
      mr: 'महाराष्ट्रातील सर्व नोंदणीकृत ऊस उत्पादक शेतकरी.',
      en: 'Sugarcane cultivating farmers in Maharashtra.',
      hi: 'महाराष्ट्र के सभी गन्ना उत्पादक किसान।',
      ahr: 'ऊस उत्पादक शेतकरी भाऊ.',
      kok: 'ऊस पिकोवपी शेतकार.',
    },
  },
  'pmksy-per-drop-more-crop': {
    title: {
      mr: 'प्रधानमंत्री कृषी सिंचन योजना - प्रति थेंब अधिक पीक (PMKSY PDMC)',
      en: 'PMKSY - Per Drop More Crop (Micro-Irrigation) - CSS',
      hi: 'प्रधानमंत्री कृषि सिंचाई योजना - प्रति बूंद अधिक फसल',
      ahr: 'प्रधानमंत्री कृषी सिंचन योजना - प्रति थेंब जास्त पीक',
      kok: 'प्रधानमंत्री कृषी सिंचन येवजण - दरेक थेंबाक चड पीक',
    },
    description: {
      mr: 'ठिबक आणि तुषार सिंचन पद्धतींचा अवलंब करून पाण्याचा कार्यक्षम वापर वाढवणे.',
      en: 'Micro-irrigation support to maximize water efficiency and farm yields.',
      hi: 'जल दक्षता और कृषि उपज को अधिकतम करने के लिए सूक्ष्म सिंचाई सहायता।',
      ahr: 'ठिबक अन तुषार सिंचनावर ५५% पर्यंत अनुदान.',
      kok: 'ठिबक आनी तुषार सिंचना वरवीं उदकाची बचत आनी चड पीक.',
    },
    amount: {
      mr: '५५% पर्यंत थेट अनुदान',
      en: 'Up to 55% direct subsidy',
      hi: '55% तक प्रत्यक्ष सब्सिडी',
      ahr: '५५% पर्यंत थेट अनुदान',
      kok: '५५% मेरेन अनदान',
    },
    benefits: {
      mr: 'ठिबक सिंचन संच, तुषार सिंचन संच व तुषार नळ्या खरेदीवर भरीव अनुदान.',
      en: 'Subsidy on drip sets, sprinkler sets, micro-sprinklers, and pipes.',
      hi: 'ड्रिप सेट, स्प्रिंकलर सेट और पाइप की खरीद पर सब्सिडी।',
      ahr: 'ठिबक संच अन तुषार नळ्या खरेदी मदत.',
      kok: 'ठिबक आनी तुषार संच खरेदीचेर अनदान.',
    },
    eligibility_criteria: {
      mr: 'आपली शेतजमीन आणि पाण्याची उपलब्धता असणारे सर्व शेतकरी.',
      en: 'Farmers with agricultural land and available water sources.',
      hi: 'कृषि भूमि और उपलब्ध जल स्रोतों वाले सभी किसान।',
      ahr: 'पाण्याची सोय असणारे शेतकरी भाऊ.',
      kok: 'उदकाची सोय आशिल्ले सगळे शेतकार.',
    },
  },
  'pmrkvy-rainfed-area-development': {
    title: {
      mr: 'कोरडवाहू क्षेत्र विकास योजना (RAD - PMRKVY)',
      en: 'PMRKVY - Rainfed Area Development (RAD)',
      hi: 'वर्षा आधारित क्षेत्र विकास कार्यक्रम (RAD - PMRKVY)',
      ahr: 'कोरडवाहू क्षेत्र विकास योजना (RAD)',
      kok: 'कोरडवाहू वाठार विकास येवजण (RAD)',
    },
    description: {
      mr: 'कोरडवाहू भागात एकात्मिक शेती पद्धती आणि मृद व जलसंधारणाला चालना.',
      en: 'Integrated farming systems and soil moisture conservation for rainfed areas.',
      hi: 'वर्षा आधारित क्षेत्रों के लिए एकीकृत कृषि प्रणाली और मृदा नमी संरक्षण।',
      ahr: 'कोरडवाहू शेती अन जलसंधारण मदत.',
      kok: 'कोरडवाहू शेतकाम आनी उदक सांभाळ मदत.',
    },
    amount: {
      mr: '५०% पर्यंत प्रकल्प अनुदान',
      en: 'Up to 50% project subsidy',
      hi: '50% तक प्रोजेक्ट सब्सिडी',
      ahr: '५०% पर्यंत सवलत मदत',
      kok: '५०% मेरेन अनदान',
    },
    benefits: {
      mr: 'पिक + पशुपालन + फलोत्पादन एकात्मिक मॉडेल, शेततळे व गांडूळ खत घटक सहाय्य.',
      en: 'Crops + Livestock + Horticulture integrated models, vermicompost, and ponds.',
      hi: 'फसल + पशुपालन + बागवानी एकीकृत मॉडल और खेत तालाब सहायता।',
      ahr: 'पशुपालन अन फळबाग जोडधंदा मदत.',
      kok: 'पिकां + सोपे + फलोत्पादन जोडधंदो आदार.',
    },
    eligibility_criteria: {
      mr: 'कोरडवाहू व पावसावर अवलंबून शेती करणारे शेतकरी गट व वैयक्तिक शेतकरी.',
      en: 'Farmers practicing rainfed agriculture in designated clusters.',
      hi: 'निर्धारित क्लस्टर्स में वर्षा आधारित खेती करने वाले किसान।',
      ahr: 'पावसाच्या पाण्यावर शेती करणारे शेतकरी भाऊ.',
      kok: 'पावसाच्या उदकार शेतकाम करपी शेतकार.',
    },
  },
  'rashtriya-krushi-vikas-yojana-raftaar': {
    title: {
      mr: 'राष्ट्रीय कृषी विकास योजना (RKVY - RAFTAAR)',
      en: 'Rashtriya Krushi Vikas Yojana (RKVY) - RAFTAAR - CSS',
      hi: 'राष्ट्रीय कृषि विकास योजना (RKVY - RAFTAAR)',
      ahr: 'राष्ट्रीय कृषी विकास योजना (RKVY)',
      kok: 'राष्ट्रीय कृषी विकास येवजण (RKVY)',
    },
    description: {
      mr: 'कृषी नवकल्पना, पायाभूत सुविधा विकास आणि शेती उद्योग स्टार्टअप्सना प्रोत्साहन.',
      en: 'Encourages agri-innovation, infrastructure development, and agri-startups.',
      hi: 'कृषि-नवाचार, बुनियादी ढांचे के विकास और कृषि-स्टार्टअप को प्रोत्साहन।',
      ahr: 'कृषी पायाभूत सुविधा अन स्टार्टअप्स मदत.',
      kok: 'कृषी प्रकल्प आनी शेतकाम उद्योगां खातीर तेंको.',
    },
    amount: {
      mr: 'प्रकल्प आधारित निधी',
      en: 'Project funding support',
      hi: 'प्रोजेक्ट फंडिंग सहायता',
      ahr: 'प्रकल्प आधारित निधी',
      kok: 'प्रकल्प आदारीत निधी आदार',
    },
    benefits: {
      mr: 'कापणीनंतरचे व्यवस्थापन, प्रक्रिया उद्योग, गोडाऊन उभारणी व मूल्यवर्धन प्रकल्प.',
      en: 'Post-harvest management, processing units, godowns, and value addition.',
      hi: 'कटाई के बाद प्रबंधन, प्रसंस्करण इकाइयां, गोदाम निर्माण और मूल्य संवर्धन।',
      ahr: 'गोडाऊन उभारणी अन अन्न प्रक्रिया मदत.',
      kok: 'गोदाम उबारप आनी शेतकाम प्रक्रिया प्रकल्प मदत.',
    },
    eligibility_criteria: {
      mr: 'शेतकरी उत्पादक कंपन्या (FPO), शेतकरी गट आणि कृषी उद्योजक.',
      en: 'Farmer Producer Organizations (FPOs), collectives, and agri-entrepreneurs.',
      hi: 'किसान उत्पादक संगठन (FPO), समूह और कृषि उद्यमी।',
      ahr: 'शेतकरी कंपन्या अन उद्योजक शेतकरी भाऊ.',
      kok: 'शेतकार कंपन्या आनी शेतकाम उद्योजक.',
    },
  },
  'rkvy-sugarcane-harvester-subsidy': {
    title: {
      mr: 'ऊस कापणी यंत्र अनुदान योजना (RKVY Sugarcane Harvester)',
      en: 'RKVY - Sugarcane Harvester Machine Subsidy',
      hi: 'गन्ना कटाई मशीन सब्सिडी योजना (RKVY)',
      ahr: 'ऊस कापणी यंत्र अनुदान योजना',
      kok: 'ऊस कापणी यंत्र अनदान येवजण',
    },
    description: {
      mr: 'ऊस तोडणी यंत्रांच्या खरेदीवर भांडवली अनुदान देऊन शेती यांत्रिकीकरणाला गती देणे.',
      en: 'Capital subsidy for sugarcane harvesting machines to address labor shortages.',
      hi: 'श्रमिकों की कमी को दूर करने के लिए गन्ना कटाई मशीनों पर पूंजीगत सब्सिडी।',
      ahr: 'ऊस तोडणी मशीन खरेदीवर सवलत मदत.',
      kok: 'ऊस कापणी मशीन खरेदीचेर व्हड अनदान.',
    },
    amount: {
      mr: '₹४० लाख पर्यंत अनुदान (४०%)',
      en: 'Up to ₹40 Lakh subsidy (40%)',
      hi: '₹40 लाख तक सब्सिडी (40%)',
      ahr: '₹४० लाख पर्यंत अनुदान',
      kok: '₹४० लाख मेरेन अनदान',
    },
    benefits: {
      mr: 'वेळेवर ऊस तोडणी, मजुरांची बचत आणि स्वयंचलित कापणी यंत्र खरेदीसाठी मदत.',
      en: 'Timely sugarcane harvesting, labor savings, and heavy machinery support.',
      hi: 'समय पर गन्ने की कटाई, श्रम की बचत और भारी मशीनरी सहायता।',
      ahr: 'मजुरांची बचत अन वेळेवर ऊस तोडणी.',
      kok: 'वावड्यांची बचत आनी वेळार ऊस कापणी मदत.',
    },
    eligibility_criteria: {
      mr: 'कृषी पदवीधर, शेतकरी गट (FPO), सहकारी साखर कारखाने आणि उद्योजक शेतकरी.',
      en: 'Agri graduates, FPOs, sugar co-operatives, and entrepreneur farmers.',
      hi: 'कृषि स्नातक, एफपीओ, चीनी सहकारी समितियां और उद्यमी किसान।',
      ahr: 'कृषी पदवीधर अन शेतकरी गट.',
      kok: 'कृषी पदवीधर आनी शेतकार पंगड.',
    },
  },
  'state-sponsored-agriculture-mechanization': {
    title: {
      mr: 'राज्य पुरस्कृत कृषी यांत्रिकीकरण योजना',
      en: 'State Sponsored Agriculture Mechanization Scheme',
      hi: 'राज्य प्रायोजित कृषि यांत्रिकीकरण योजना',
      ahr: 'राज्य कृषी यांत्रिकीकरण योजना',
      kok: 'राज्य कृषी यांत्रिकीकरण येवजण',
    },
    description: {
      mr: 'ट्रॅक्टर, औजार बँक आणि शेती उपकरणांच्या खरेदीवर राज्य शासनाचे सवलत अनुदान.',
      en: 'State government subsidy for tractors, power tillers, rotavators, and implements.',
      hi: 'ट्रैक्टर, पावर टिलर, रोटावेटर और उपकरणों के लिए राज्य सरकार की सब्सिडी।',
      ahr: 'ट्रॅक्टर अन शेती औजारांवर सवलत अनुदान.',
      kok: 'ट्रॅक्टर आनी शेतकाम अवजारांचेर अनदान.',
    },
    amount: {
      mr: '५०% पर्यंत यंत्र अनुदान',
      en: 'Up to 50% equipment subsidy',
      hi: '50% तक उपकरण सब्सिडी',
      ahr: '५०% पर्यंत अनुदान मदत',
      kok: '५०% मेरेन अनदान',
    },
    benefits: {
      mr: 'ट्रॅक्टरचलित औजारे, पेरणी यंत्रे, मळणी यंत्रे आणि अवजार बँक निर्मिती.',
      en: 'Tractor-drawn implements, seed drills, threshers, and farm equipment banks.',
      hi: 'ट्रैक्टर चालित उपकरण, सीड ड्रिल, थ्रेशर और कृषि उपकरण बैंक।',
      ahr: 'पेरणी यंत्र अन मळणी यंत्र खरेदी मदत.',
      kok: 'पेरणी मशीन आनी शेतकाम अवजारां मदत.',
    },
    eligibility_criteria: {
      mr: 'महाराष्ट्रातील सर्व पात्र अल्प, अत्यल्प व बहुधारक शेतकरी.',
      en: 'Small, marginal, and all category farmers residing in Maharashtra.',
      hi: 'महाराष्ट्र में रहने वाले छोटे, सीमांत और सभी श्रेणियों के किसान।',
      ahr: 'महाराष्ट्रातील सर्व शेतकरी भाऊ.',
      kok: 'महाराष्ट्रातले सगळे शेतकार.',
    },
  },
  'sub-mission-on-agricultural-mechanization-css': {
    title: {
      mr: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM - केंद्र पुरस्कृत)',
      en: 'Sub-Mission on Agricultural Mechanization (SMAM - CSS)',
      hi: 'कृषि मशीनीकरण उप-मिशन (SMAM - केंद्र प्रायोजित)',
      ahr: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
      kok: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
    },
    description: {
      mr: 'शेती कामात यांत्रिकीकरणाला गती देणे आणि कस्टम हायरिंग सेंटर्सची उभारणी करणे.',
      en: 'Promotes modern farm machinery access and Custom Hiring Center (CHC) setup.',
      hi: 'आधुनिक कृषि मशीनरी की पहुंच और कस्टम हायरिंग सेंटर (CHC) की स्थापना को बढ़ावा।',
      ahr: 'आधुनिक शेती यंत्रे अन कस्टम हायरिंग सेंटर मदत.',
      kok: 'आधुनिक शेतकाम यंत्रां आनी कस्टम हायरिंग सेंटर मदत.',
    },
    amount: {
      mr: '४०% ते ८०% पर्यंत अनुदान',
      en: '40% to 80% Machinery Subsidy',
      hi: '40% से 80% मशीनरी सब्सिडी',
      ahr: '४०% ते ८०% अनुदान',
      kok: '४०% ते ८०% मेरेन अनदान',
    },
    benefits: {
      mr: 'वैयक्तिक यंत्र खरेदीसाठी ५०% अनुदान, कस्टम हायरिंग सेंटर उभारणीसाठी ८०% अनुदान.',
      en: '50% subsidy for individual machinery, up to 80% for Custom Hiring Centers.',
      hi: 'व्यक्तिगत मशीनरी के लिए 50% सब्सिडी, कस्टम हायरing सेंटर के लिए 80% तक।',
      ahr: 'यंत्र खरेदीवर ५०% अन CHC साठी ८०% अनुदान.',
      kok: 'यंत्र खरेदीचेर ५०% आनी CHC उबारपा खातीर ८०% अनदान.',
    },
    eligibility_criteria: {
      mr: 'महिला शेतकरी, अल्प व अत्यल्प भूधारक शेतकरी आणि शेतकरी बचत गट.',
      en: 'Women farmers, small & marginal farmers, and self-help groups (SHGs).',
      hi: 'महिला किसान, छोटे और सीमांत किसान और स्वयं सहायता समूह (SHG)।',
      ahr: 'महिला शेतकरी अन बचत गट शेतकरी भाऊ.',
      kok: 'बायलो शेतकार आनी शेतकार पंगड.',
    },
  },
};

/**
 * Normalizes a language code (mr, en, hi, ahr, kok).
 */
export const normalizeLangCode = (langCode?: string): string => {
  if (!langCode) return 'mr';
  const clean = langCode.toLowerCase().trim();
  if (['mr', 'en', 'hi', 'ahr', 'kok'].includes(clean)) return clean;
  return 'mr';
};

/**
 * Returns a fully localized Scheme object for the active language.
 * Guarantees zero `undefined` or broken fields by falling back gracefully:
 * Target Language -> Marathi ('mr') -> English ('en') -> Original field.
 */
export const getLocalizedScheme = (scheme: Scheme, langCode?: string): Scheme => {
  if (!scheme) return scheme;
  const lang = normalizeLangCode(langCode);
  
  // Find localizedData either by exact id or by normalized slug matching
  let localizedData = SCHEME_TRANSLATIONS[scheme.id];
  if (!localizedData && scheme.id) {
    const slug = scheme.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    localizedData = SCHEME_TRANSLATIONS[slug];
  }

  const getField = (fieldName: keyof LocalizedSchemeData, fallbackValue?: string): string => {
    if (localizedData && localizedData[fieldName]) {
      const fieldDict = localizedData[fieldName]!;
      if (fieldDict[lang]) return fieldDict[lang];
      if (lang === 'en') {
        if (fieldDict['en']) return fieldDict['en'];
        if (fieldDict['mr']) return fieldDict['mr'];
      } else {
        if (fieldDict['mr']) return fieldDict['mr'];
        if (fieldDict['en']) return fieldDict['en'];
      }
    }
    return fallbackValue || '';
  };

  const title = getField('title', scheme.title) || scheme.title;
  const description = getField('description', scheme.description) || scheme.description;
  const amount = getField('amount', scheme.amount) || scheme.amount;
  const benefits = getField('benefits', scheme.benefits) || scheme.benefits;
  const eligibility_criteria = getField('eligibility_criteria', scheme.eligibility_criteria) || scheme.eligibility_criteria;
  const department = getField('department', scheme.department) || scheme.department || (scheme.type === 'Central' ? getTranslation(lang, 'centralType') : getTranslation(lang, 'stateType'));
  const category = getCategoryTranslation(scheme.category, lang);

  return {
    ...scheme,
    title,
    description,
    amount,
    benefits,
    eligibility_criteria,
    department,
    category,
  };
};

/**
 * Translates scheme category names dynamically (e.g., 'Horticulture' -> 'फलोत्पादन').
 */
export const getLocalizedCategoryName = (categoryName: string, langCode?: string): string => {
  if (!categoryName) return '';
  const lang = normalizeLangCode(langCode);
  if (categoryName === 'All' || categoryName === 'सर्व') {
    return getTranslation(lang, 'allSchemes') || 'सर्व';
  }
  return getCategoryTranslation(categoryName, lang);
};
