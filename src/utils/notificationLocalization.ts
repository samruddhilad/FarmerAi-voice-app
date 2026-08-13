/**
 * Notification Localization Module — Farmer AI
 * Localizes notification titles, descriptions/bodies, and categories
 * across all 5 supported languages: Marathi (mr), English (en), Hindi (hi), Ahirani (ahr), Konkani (kok).
 */

import { Notification } from '../types/api.types';
import { getTranslation } from './i18n';

interface LocalizedNotificationData {
  title: Record<string, string>;
  body: Record<string, string>;
  category: Record<string, string>;
}

export const NOTIFICATION_TRANSLATIONS: Record<string, LocalizedNotificationData> = {
  n1: {
    title: {
      en: 'Application window open for Micro Drip Irrigation Scheme',
      mr: 'ठिबक व तुषार सिंचन योजनेसाठी अर्ज प्रक्रिया सुरू',
      hi: 'ड्रिप और स्प्रिंकलर सिंचाई योजना के लिए आवेदन प्रक्रिया शुरू',
      ahr: 'ठिबक सिंचन योजनेसाठी ऑनलाईन अर्ज सुरू व्हया',
      kok: 'ठिबक आनी तुषार सिंचन येवजणे खातीर अर्ज सुरू जाल्या',
    },
    body: {
      en: 'State Agriculture Department is accepting subsidy applications for drip & sprinkler systems.',
      mr: 'कृषी विभागाकडून ठिबक व तुषार सिंचन संचावर ५०% ते ८०% अनुदानासाठी ऑनलाईन अर्ज स्वीकारले जात आहेत.',
      hi: 'कृषि विभाग द्वारा ड्रिप और स्प्रिंकलर सिस्टम पर 50% से 80% सब्सिडी के लिए ऑनलाइन आवेदन स्वीकार किए जा रहे हैं।',
      ahr: 'कृषी विभागाकडून ठिबक अन तुषार सिंचनवर ५०% अनुदानासाठी ऑनलाईन अर्ज लेत आहेत.',
      kok: 'कृषी खात्या कडल्यान ठिबक आनी तुषार सिंचनाव्हेर ५०% अनदाना खातीर ऑनलाईन अर्ज घेतले वतात.',
    },
    category: {
      en: 'Irrigation',
      mr: 'सिंचन योजना',
      hi: 'सिंचाई योजना',
      ahr: 'सिंचन योजना',
      kok: 'सिंचन येवजण',
    },
  },
  n2: {
    title: {
      en: 'Soil Health Card free testing camp in nearest KVK',
      mr: 'जवळच्या कृषी विज्ञान केंद्रात मोफत माती परीक्षण शिबीर',
      hi: 'निकटतम कृषि विज्ञान केंद्र में मुफ्त मृदा परीक्षण शिविर',
      ahr: 'जवळना कृषी विज्ञान केंद्रमा मोफत माती तपासणी शिबीर',
      kok: 'लागींच्या कृषी विज्ञान केंद्रांत फुकट माती तपासणी शिबीर',
    },
    body: {
      en: 'Farmers can submit soil samples for free analysis till the end of this month.',
      mr: 'शेतकरी चालू महिन्याच्या शेवटापर्यंत मातीचे नमुने देऊन मोफत जमीन आरोग्य पत्रक मिळवू शकतात.',
      hi: 'किसान इस महीने के अंत तक मिट्टी के नमूने जमा करके मुफ्त मृदा स्वास्थ्य कार्ड प्राप्त कर सकते हैं।',
      ahr: 'शेतकरी या महिन्याना शेवटापर्यंत मातीचे नमुने देऊन मोफत माती कार्ड लेई शकतात.',
      kok: 'शेतकार या म्हयन्याच्या शेवटा तक मातीचे नमुने देऊन फुकट माती कार्ड मेळवू शकतात.',
    },
    category: {
      en: 'Soil Health',
      mr: 'माती आरोग्य',
      hi: 'मृदा स्वास्थ्य',
      ahr: 'माती आरोग्य',
      kok: 'माती भलायकी',
    },
  },
  n3: {
    title: {
      en: 'PM-Kisan 17th Installment Credited',
      mr: 'पीएम-किसान १७ वा हप्ता बँक खात्यात जमा',
      hi: 'पीएम-किसान 17वीं किस्त बैंक खाते में हस्तांतरित',
      ahr: 'पीएम-किसान १७ वा हप्ता बँक खातामा जमा व्हया',
      kok: 'पीएम-किसान १७ वो हप्तो बँक खात्यांत जमा जालो',
    },
    body: {
      en: '₹2,000 financial assistance directly transferred to eligible farmers bank accounts.',
      mr: 'पात्र शेतकऱ्यांच्या आधार-लिंक्ड बँक खात्यात ₹२,००० थेट वर्ग करण्यात आले आहेत.',
      hi: 'पात्र किसानों के आधार-लिंक्ड बैंक खाते में ₹2,000 सीधे स्थानांतरित किए गए हैं।',
      ahr: 'पात्र शेतकऱ्यांच्या बँक खातामा ₹२,००० थेट जमा व्हया आहेत.',
      kok: 'पात्र शेतकारांच्या बँक खात्यांत ₹२,००० थेट वर्ग केल्यात.',
    },
    category: {
      en: 'PM-Kisan',
      mr: 'पीएम-किसान',
      hi: 'पीएम-किसान',
      ahr: 'पीएम-किसान',
      kok: 'पीएम-किसान',
    },
  },
  n4: {
    title: {
      en: 'PM Fasal Bima Yojana crop loss registration extended',
      mr: 'प्रधानमंत्री फसल विमा नुकसान नोंदणीची मुदत वाढवली',
      hi: 'प्रधानमंत्री फसल बीमा नुकसान पंजीकरण की समय सीमा बढ़ाई गई',
      ahr: 'पीक विमा नुकसान नोंदणीनी मुदत वाढली',
      kok: 'पीक विमा नुकसान नोंदणीची मुदत वाडयली',
    },
    body: {
      en: 'Farmers can register crop loss within 72 hours through the Crop Insurance app or helpline.',
      mr: 'अवेळी पावसामुळे झालेल्या पिकांच्या नुकसानीची माहिती ७२ तासांच्या आत विमा ॲपवर नोंदवा.',
      hi: 'असमय बारिश से हुए फसल नुकसान की जानकारी 72 घंटे के भीतर बीमा ऐप पर दर्ज करें।',
      ahr: 'पावसामुळे झालेल्या पिकांच्या नुकसानीची माहिती ७२ तासांमा नोंदवा.',
      kok: 'पावसाक लागून जाल्ल्या पिकांच्या नुकसानाची म्हाहिती ७२ वरमदीं नोंदवात.',
    },
    category: {
      en: 'Crop Insurance',
      mr: 'सुरक्षा व विमा',
      hi: 'फसल बीमा',
      ahr: 'सुरक्षा व विमा',
      kok: 'सुरक्षा आनी विमा',
    },
  },
};

/**
 * Returns a localized copy of a Notification object according to the selected language code.
 */
export const getLocalizedNotification = (
  notification: Notification,
  langCode: string
): Notification => {
  const trans = NOTIFICATION_TRANSLATIONS[notification.id];
  const lang = (['mr', 'en', 'hi', 'ahr', 'kok'].includes(langCode) ? langCode : 'mr') as keyof LocalizedNotificationData['title'];

  if (!trans) {
    return notification;
  }

  return {
    ...notification,
    title: trans.title[lang] || trans.title['mr'] || notification.title,
    body: trans.body[lang] || trans.body['mr'] || notification.body,
    category: trans.category[lang] || trans.category['mr'] || notification.category,
  };
};

/**
 * Returns a localized formatted time string ("Today", "1 day ago", etc.) based on language code.
 */
export const getLocalizedTimeAgo = (dateString: string, langCode: string): string => {
  if (!dateString) {
    return getTranslation(langCode, 'timeDaysAgo', { count: 2 });
  }

  const now = new Date();
  const date = new Date(dateString);
  const diffMs = Math.max(0, now.getTime() - date.getTime());
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return getTranslation(langCode, 'timeToday');
  }
  if (diffDays === 1) {
    return getTranslation(langCode, 'timeYesterday');
  }
  if (diffDays < 30) {
    return getTranslation(langCode, 'timeDaysAgo', { count: diffDays });
  }

  const diffMonths = Math.floor(diffDays / 30);
  return getTranslation(langCode, 'timeMonthsAgo', { count: diffMonths });
};
