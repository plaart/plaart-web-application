import { useContext } from "react";
import IntlContext from "../context/intl/IntlContext";

const useIntl = () => {
  const context = useContext(IntlContext);
  if (context === undefined) {
    throw new Error("useIntl must be used within an IntlProvider");
  }
  return context;
};

export default useIntl;
