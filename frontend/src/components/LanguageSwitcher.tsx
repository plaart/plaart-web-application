import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIntl from "../hooks/useIntl";
import { LANGUAGES } from "../shared/locales";

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: LANGUAGES.en, name: "English", flag: "🇺🇸" },
  { code: LANGUAGES.es, name: "Español", flag: "🇪🇸" },
];

export const LanguageSwitcher = () => {
  const { setLocale } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(
    languages[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language);
    setLocale(language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-white min-w-[120px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}>
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <motion.svg
          className="w-4 h-4 ml-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
            {languages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  currentLanguage.code === language.code
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}>
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
                {currentLanguage.code === language.code && (
                  <motion.svg
                    className="w-4 h-4 ml-auto text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
