import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ta";

type Dict = Record<string, { en: string; ta: string }>;

export const dict = {
  nav_home: { en: "Home", ta: "முகப்பு" },
  nav_about: { en: "About", ta: "பற்றி" },
  nav_sim: { en: "Scam Simulator", ta: "மோசடி சிமுலேட்டர்" },
  nav_aware: { en: "Awareness", ta: "விழிப்புணர்வு" },
  nav_training: { en: "Training", ta: "பயிற்சி" },
  nav_report: { en: "Report Scam", ta: "புகார்" },
  nav_quiz: { en: "Quiz", ta: "வினாடி வினா" },
  nav_contact: { en: "Contact", ta: "தொடர்பு" },
  login: { en: "Login", ta: "உள்நுழை" },

  hero_tag: { en: "Think Before You Click", ta: "கிளிக் செய்யும் முன் சிந்தியுங்கள்" },
  hero_mission: { en: "Making cyber safety simple for everyone.", ta: "அனைவருக்கும் சைபர் பாதுகாப்பை எளிதாக்குகிறோம்." },
  hero_sub: {
    en: "A futuristic awareness platform protecting Tamil Nadu from digital scams, fraud, and cyber threats.",
    ta: "டிஜிட்டல் மோசடி, ஏமாற்று மற்றும் சைபர் அச்சுறுத்தல்களிலிருந்து தமிழ்நாட்டைப் பாதுகாக்கும் எதிர்கால தளம்.",
  },
  cta_sim: { en: "Try Scam Simulator", ta: "சிமுலேட்டரை முயற்சி" },
  cta_learn: { en: "Learn Cyber Safety", ta: "கற்றுக் கொள்ளுங்கள்" },

  about_title: { en: "About CyberShield", ta: "சைபர்ஷீல்டு பற்றி" },
  vision_t: { en: "Our Vision", ta: "எங்கள் தொலைநோக்கு" },
  vision_d: { en: "A digitally fearless India where every citizen recognizes and resists cyber threats with confidence.", ta: "ஒவ்வொரு குடிமகனும் சைபர் அச்சுறுத்தல்களை அடையாளம் கண்டு எதிர்க்கும் அச்சமற்ற டிஜிட்டல் இந்தியா." },
  mission_t: { en: "Our Mission", ta: "எங்கள் நோக்கம்" },
  mission_d: { en: "Equip students, families and businesses with practical cyber awareness through simulations, training and instant alerts.", ta: "சிமுலேஷன், பயிற்சி மற்றும் உடனடி எச்சரிக்கைகள் மூலம் மாணவர்கள், குடும்பங்கள் மற்றும் வணிகங்களுக்கு நடைமுறை விழிப்புணர்வை வழங்குதல்." },
  why_t: { en: "Why It Matters", ta: "ஏன் முக்கியம்" },
  why_d: { en: "Tamil Nadu reports thousands of scam cases each month. Awareness is the strongest firewall.", ta: "தமிழ்நாட்டில் மாதம் ஆயிரக்கணக்கான மோசடி வழக்குகள் பதிவாகின்றன. விழிப்புணர்வே வலுவான பாதுகாப்பு." },
  tn_t: { en: "Tamil Nadu Focus", ta: "தமிழ்நாடு கவனம்" },
  tn_d: { en: "Localized content in Tamil & English to reach every district, school and senior citizen.", ta: "ஒவ்வொரு மாவட்டம், பள்ளி மற்றும் மூத்த குடிமக்களை அடைய தமிழ் & ஆங்கிலத்தில் உள்ளடக்கம்." },

  sim_title: { en: "Scam Simulator", ta: "மோசடி சிமுலேட்டர்" },
  sim_sub: { en: "Tap a card — experience the scam, then learn how to spot it.", ta: "ஒரு கார்டை அழுத்தவும் — மோசடியை அனுபவித்து அதை எப்படி கண்டறிவது என்று கற்றுக் கொள்ளுங்கள்." },

  aware_title: { en: "Awareness Dashboard", ta: "விழிப்புணர்வு டாஷ்போர்டு" },
  aware_sub: { en: "Live intel on the scams targeting India this week.", ta: "இந்த வாரம் இந்தியாவை குறிவைக்கும் மோசடிகள் குறித்த நேரடி தகவல்." },

  avoid_title: { en: "How to Avoid Scams", ta: "மோசடிகளைத் தவிர்ப்பது எப்படி" },

  quiz_title: { en: "Safe or Scam? Quiz", ta: "பாதுகாப்பா? மோசடியா?" },
  quiz_sub: { en: "Test your cyber instincts. Earn badges. Become uncrackable.", ta: "உங்கள் சைபர் உள்ளுணர்வை சோதிக்கவும்." },

  report_title: { en: "Report a Scam", ta: "மோசடியைப் புகாரளி" },
  report_sub: { en: "Your report protects thousands. 100% confidential.", ta: "உங்கள் புகார் ஆயிரக்கணக்கானவர்களைப் பாதுகாக்கும்." },

  train_title: { en: "Training Programs", ta: "பயிற்சி திட்டங்கள்" },

  contact_title: { en: "CyberShield Communication Center", ta: "சைபர்ஷீல்டு தொடர்பு மையம்" },

  footer_tag: { en: "Protecting People from Digital Threats", ta: "டிஜிட்டல் அச்சுறுத்தல்களிலிருந்து மக்களைப் பாதுகாக்கிறோம்" },
} satisfies Dict;

export type DictKey = keyof typeof dict;

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("cs-lang")) as Lang | null;
    if (saved === "ta" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("cs-lang", l);
  };
  const t = (k: DictKey) => dict[k][lang];
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
