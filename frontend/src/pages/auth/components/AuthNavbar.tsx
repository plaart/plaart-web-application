import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import useIntl from "../../../hooks/useIntl";


export const AuthNavbar = () => {
  const { t } = useIntl();
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar la página actual basándose en la URL
  const currentPage: "login" | "register" = location.pathname.includes(
    "/register"
  )
    ? "register"
    : "login";

  // Manejar el cambio de página
  const handleTogglePage = () => {
    if (currentPage === "login") {
      navigate("/auth/register");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-200/80 bg-white/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className="container px-4 mx-auto relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover={{ scale: 1.05 }}>
            <span className="text-2xl font-bold tracking-tight text-black">
              {t("common.brand.name")}
            </span>
          </motion.div>

          {/* Toggle Login/Register */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">
              {currentPage === "login"
                ? t("auth.navbar.noAccount")
                : t("auth.navbar.hasAccount")}
            </span>
            <motion.button
              onClick={handleTogglePage}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              whileHover={{ scale: 1.05 }}>
              {currentPage === "login"
                ? t("auth.navbar.createAccount")
                : t("auth.navbar.signIn")}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
