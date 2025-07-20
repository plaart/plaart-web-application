/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import type { ComponentEvent } from "../../types/event/ComponentEvent";
import ComponentEventsContext from "../../context/event/ComponentsEventContext";

const ComponentEventsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Almacena listeners por tipo de evento
  const listenersRef = useRef<
    Map<string, Set<(event: ComponentEvent) => void>>
  >(new Map());

  // Almacena listeners globales (escuchan todos los eventos)
  const globalListenersRef = useRef<Set<(event: ComponentEvent) => void>>(
    new Set()
  );

  // 🚀 EMIT - Emitir un evento
  const emit = useCallback(
    (type: string, payload?: any, source = "unknown") => {
      const event: ComponentEvent = {
        type,
        payload,
        timestamp: Date.now(),
        source,
      };

      // Notificar a listeners específicos del tipo de evento
      const typeListeners = listenersRef.current.get(type);
      if (typeListeners) {
        typeListeners.forEach((handler) => {
          try {
            handler(event);
          } catch (error) {
            console.error("Error in event handler:", error);
          }
        });
      }

      // Notificar a listeners globales
      globalListenersRef.current.forEach((handler) => {
        try {
          handler(event);
        } catch (error) {
          console.error("Error in global event handler:", error);
        }
      });
    },
    []
  );

  // 🎧 SUBSCRIBE - Suscribirse a eventos específicos
  const subscribe = useCallback(
    (type: string, handler: (event: ComponentEvent) => void) => {
      // Crear Set si no existe para este tipo
      if (!listenersRef.current.has(type)) {
        listenersRef.current.set(type, new Set());
      }

      const listeners = listenersRef.current.get(type)!;
      listeners.add(handler);

      // Retornar función de cleanup
      return () => {
        listeners.delete(handler);
        if (listeners.size === 0) {
          listenersRef.current.delete(type);
        }
      };
    },
    []
  );

  // 🌐 SUBSCRIBE ALL - Suscribirse a todos los eventos
  const subscribeAll = useCallback(
    (handler: (event: ComponentEvent) => void) => {
      globalListenersRef.current.add(handler);

      // Retornar función de cleanup
      return () => {
        globalListenersRef.current.delete(handler);
      };
    },
    []
  );

  const value = { emit, subscribe, subscribeAll };

  return (
    <ComponentEventsContext.Provider value={value}>
      {children}
    </ComponentEventsContext.Provider>
  );
};

export default ComponentEventsProvider;
