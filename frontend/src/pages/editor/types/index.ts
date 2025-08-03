// Tipos para mejor intellisense a la hora determinar el tipo de dispositivo desde la cual estamos trabajando
// types/index.ts

export interface DeviceInfo {
  // Plataformas
  isIOS: boolean;
  isAndroid: boolean;
  isMacOS: boolean;
  isWindows: boolean;
  isLinux: boolean;

  // Tipos de dispositivo
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  // Navegadores
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;

  // Información adicional
  platform: string;
  userAgent: string;
  hasTouch: boolean;
  screenSize: "small" | "medium" | "large";
  orientation: "portrait" | "landscape" | undefined;

  // Métodos útiles
  isIOSVersion: (minVersion: number) => boolean;
  isMobileDevice: () => boolean;
}

// Tipos para la User-Agent Client Hints API
export interface NavigatorUABrand {
  brand: string;
  version: string;
}

export interface NavigatorUAData {
  brands: NavigatorUABrand[];
  mobile: boolean;
  platform: string;
}

// Extensión del tipo Navigator para incluir userAgentData
declare global {
  interface Navigator {
    userAgentData?: NavigatorUAData;
  }
}
