import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface LocalizationContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  // Initialize language from localStorage or browser settings
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
      setDirection(savedLanguage === "ar" ? "rtl" : "ltr");
    } else {
      // Detect browser language
      const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";
      setLanguageState(browserLang);
      setDirection(browserLang === "ar" ? "rtl" : "ltr");
    }
  }, []);

  // Update direction when language changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguageState(newLanguage);
    setDirection(newLanguage === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", newLanguage);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDirection(lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("language", lang);
  };

  return (
    <LocalizationContext.Provider
      value={{ language, direction, toggleLanguage, setLanguage }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
