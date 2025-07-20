/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext } from "react";
import type { ComponentEvent } from "../../types/event/ComponentEvent";

interface ComponentEventsContextType {
  emit: (type: string, payload?: any, source?: string) => void;
  subscribe: (
    type: string,
    handler: (event: ComponentEvent) => void
  ) => () => void;
  subscribeAll: (handler: (event: ComponentEvent) => void) => () => void;
}

const ComponentEventsContext = createContext<
  ComponentEventsContextType | undefined
>(undefined);

export default ComponentEventsContext;
