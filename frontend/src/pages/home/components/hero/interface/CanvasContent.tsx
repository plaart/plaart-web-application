import { motion } from "framer-motion";
import useIntl from "../../../../../hooks/useIntl";

export const CanvasContent = () => {
  const { t } = useIntl();
  return (
    <div className="text-center z-10">
      <motion.div
        className="w-12 h-12 mb-4 mx-auto"
        whileHover={{ scale: 1.1 }}>
        <svg
          className="w-full h-full text-blue-400"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.div>
      <div className="text-gray-300 text-lg mb-2">
        {t("home.hero.content.canvas.data.title")}
      </div>
      <div className="text-gray-500 text-sm">
        {t("home.hero.content.canvas.data.subtitle")}
      </div>
    </div>
  );
};
