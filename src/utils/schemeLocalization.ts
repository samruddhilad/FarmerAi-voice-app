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
  'sub-mission-on-agricultural-mechanization-smam': {
    title: {
      mr: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
      en: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      hi: 'कृषि मशीनीकरण उप-मिशन (SMAM)',
      ahr: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
      kok: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
    },
    description: {
      mr: 'ट्रॅक्टर, पॉवर टिलर, रोटाव्हेटर आणि कृषी यंत्रसामग्रीवर ४०% ते ५०% अनुदान.',
      en: '40% to 50% subsidy on tractors, power tillers, rotavators, and implements.',
      hi: 'ट्रैक्टर, पावर टिलर, रोटावेटर और कृषि उपकरणों पर 40% से 50% सब्सिडी।',
      ahr: 'ट्रॅक्टर अन कृषी यंत्रांवर ४०% ते ५०% अनुदान.',
      kok: 'ट्रॅक्टर आनी शेतकाम यंत्रांचेर ४०% ते ५०% अनदान.',
    },
    amount: {
      mr: '४०% ते ५०% यंत्रांवर अनुदान',
      en: '40% to 50% Machinery Subsidy',
      hi: '40% से 50% मशीनरी सब्सिडी',
      ahr: '४०% ते ५०% अनुदान',
      kok: '४०% ते ५०% अनदान',
    },
    benefits: {
      mr: 'आधुनिक शेती यंत्रांची खरेदी आणि कस्टम हायरिंग सेंटर (CHC) स्थापना.',
      en: 'Subsidy on tractors, harvesters, and Custom Hiring Center setup.',
      hi: 'ट्रैक्टर, हार्वेस्टर और कस्टम हायरिंग सेंटर स्थापना पर सब्सिडी।',
      ahr: 'ट्रॅक्टर अन आधुनिक यंत्रांची खरेदी मदत.',
      kok: 'ट्रॅक्टर आनी आधुनिक यंत्रां खरेदी मदत.',
    },
    eligibility_criteria: {
      mr: 'महाराष्ट्रातील सर्व लहान, अत्यल्प भूधारक व महिला शेतकरी.',
      en: 'Small, marginal, women, and SC/ST farmers across Maharashtra.',
      hi: 'महाराष्ट्र के छोटे, सीमांत, महिला और एससी/एसटी किसान।',
      ahr: 'महाराष्ट्रातील सर्व लहान शेतकरी भाऊ.',
      kok: 'महाराष्ट्रांतले सगळे ल्हान शेतकार.',
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
  const localizedData = SCHEME_TRANSLATIONS[scheme.id];

  const getField = (fieldName: keyof LocalizedSchemeData, fallbackValue?: string): string => {
    if (localizedData && localizedData[fieldName]) {
      const fieldDict = localizedData[fieldName]!;
      if (fieldDict[lang]) return fieldDict[lang];
      if (fieldDict['mr']) return fieldDict['mr'];
      if (fieldDict['en']) return fieldDict['en'];
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
