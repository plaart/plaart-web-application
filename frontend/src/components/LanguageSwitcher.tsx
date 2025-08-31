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

interface LanguageSwitcherProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageSwitcher = ({ 
  variant = 'default', 
  size = 'md' 
}: LanguageSwitcherProps) => {
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

  // Estilos dinámicos basados en variant y size
  const getButtonStyles = () => {
    const baseStyles = "flex items-center space-x-2 rounded-lg transition-all duration-200 font-medium";
    
    // Variantes de color
    const variantStyles = {
      default: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
      light: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm",
      dark: "bg-gray-800 border border-gray-600 text-white hover:bg-gray-700"
    };

    // Tamaños
    const sizeStyles = {
      sm: "px-2 py-1 text-xs min-w-[100px]",
      md: "px-3 py-2 text-sm min-w-[120px]",
      lg: "px-4 py-3 text-base min-w-[140px]"
    };

    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  };

  const getDropdownStyles = () => {
    const baseStyles = "absolute top-full left-0 mt-2 w-full rounded-lg shadow-2xl border overflow-hidden z-50";
    
    const variantStyles = {
      default: "bg-white border-gray-200",
      light: "bg-white border-gray-200", 
      dark: "bg-gray-800 border-gray-600"
    };

    return `${baseStyles} ${variantStyles[variant]}`;
  };

  const getOptionStyles = (isSelected: boolean) => {
    const baseStyles = "w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-150";
    
    const variantStyles = {
      default: isSelected 
        ? "bg-blue-50 text-blue-600" 
        : "text-gray-700 hover:bg-gray-50",
      light: isSelected 
        ? "bg-blue-50 text-blue-600" 
        : "text-gray-700 hover:bg-gray-50",
      dark: isSelected 
        ? "bg-blue-900/50 text-blue-400" 
        : "text-gray-200 hover:bg-gray-700"
    };

    const sizeStyles = {
      sm: "text-xs",
      md: "text-sm", 
      lg: "text-base"
    };

    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonStyles()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Cambiar idioma"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={size === 'sm' ? 'text-base' : 'text-lg'}>
          {currentLanguage.flag}
        </span>
        <span className="truncate">
          {currentLanguage.name}
        </span>
        <motion.svg
          className="w-4 h-4 ml-auto flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown de opciones */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={getDropdownStyles()}
            role="listbox"
            aria-label="Seleccionar idioma"
          >
            {languages.map((language) => {
              const isSelected = currentLanguage.code === language.code;
              
              return (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={getOptionStyles(isSelected)}
                  whileHover={{ backgroundColor: variant === 'dark' ? "rgba(55, 65, 81, 0.8)" : "rgba(59, 130, 246, 0.05)" }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={size === 'sm' ? 'text-base' : 'text-lg'}>
                    {language.flag}
                  </span>
                  <span className="font-medium truncate">
                    {language.name}
                  </span>
                  
                  {/* Checkmark para el idioma seleccionado */}
                  {isSelected && (
                    <motion.svg
                      className="w-4 h-4 ml-auto flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};