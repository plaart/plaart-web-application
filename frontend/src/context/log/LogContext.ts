import { createContext } from "react";
import type { Logger } from "../../types/log/Logger";

const LogContext = createContext<Logger | undefined>(undefined);

export default LogContext;
