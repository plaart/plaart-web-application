/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import type { DeviceInfo } from "../types";
import {
  createDefaultDeviceInfo,
  detectIOS,
  detectMobile,
  detectTablet,
  getOrientation,
  getScreenSize,
} from "../utils/device";

const useDevice = () => {
  const deviceInfo = useMemo((): DeviceInfo => {
    // Verificar si estamos en un navegador
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return createDefaultDeviceInfo();
    }

    const userAgent = navigator.userAgent || "";
    const platform = navigator.platform || "";

    // Usar User-Agent Client Hints API cuando esté disponible (más moderno y preciso)
    const userAgentData = (navigator as any).userAgentData;

    // Detección mejorada usando Client Hints cuando esté disponible
    let isAndroid = false;
    let isMobile = false;

    if (userAgentData) {
      // Usar la API moderna si está disponible
      isAndroid =
        userAgentData.brands?.some((brand: any) =>
          brand.brand.toLowerCase().includes("android")
        ) || false;
      isMobile = userAgentData.mobile || false;
    } else {
      // Fallback a detección tradicional
      isAndroid = /Android/i.test(userAgent);
      isMobile = detectMobile(userAgent);
    }

    // Detección de plataformas
    const isIOS = detectIOS(userAgent, platform);
    const isMacOS = /Mac/i.test(platform) && !isIOS;
    const isWindows = /Win/i.test(platform);
    const isLinux = /Linux/i.test(platform) && !isAndroid;

    // Detección de navegadores
    let isChrome = false;
    let isEdge = false;

    if (userAgentData) {
      // Usar Client Hints para detección de navegador
      const brands = userAgentData.brands || [];
      isChrome = brands.some(
        (brand: any) =>
          brand.brand.toLowerCase().includes("chrome") &&
          !brand.brand.toLowerCase().includes("edge")
      );
      isEdge = brands.some((brand: any) =>
        brand.brand.toLowerCase().includes("edge")
      );
    } else {
      // Fallback tradicional
      isChrome = /Chrome/i.test(userAgent) && !/Edge/i.test(userAgent);
      isEdge = /Edge|Edg/i.test(userAgent);
    }

    const isSafari = /Safari/i.test(userAgent) && !isChrome && !isEdge;
    const isFirefox = /Firefox/i.test(userAgent);

    // Detección de tipo de dispositivo
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isTablet = detectTablet(userAgent, isIOS);
    const isDesktop = !isMobile && !isTablet;

    // Información de pantalla
    const screenSize = getScreenSize();
    const orientation = getOrientation();

    // Función para verificar versión de iOS
    const isIOSVersion = (minVersion: number): boolean => {
      if (!isIOS) return false;
      const match = userAgent.match(/OS (\d+)_/);
      if (match) {
        const version = parseInt(match[1], 10);
        return version >= minVersion;
      }
      return false;
    };

    // Función auxiliar para detectar si es dispositivo móvil
    const isMobileDevice = (): boolean => isMobile || isTablet;

    return {
      // Plataformas
      isIOS,
      isAndroid,
      isMacOS,
      isWindows,
      isLinux,
      // Tipos de dispositivos
      isMobile,
      isTablet,
      isDesktop,
      // Navegadores
      isSafari,
      isChrome,
      isFirefox,
      isEdge,
      // Información adicional
      platform,
      userAgent,
      hasTouch,
      screenSize,
      orientation,
      // Métodos útiles
      isIOSVersion,
      isMobileDevice,
    };
  }, []);

  return deviceInfo; // Cambiado: retornar directamente el objeto, no envuelto
};

export default useDevice;
