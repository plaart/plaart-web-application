import type { DeviceInfo } from "../types";

const createDefaultDeviceInfo = (): DeviceInfo => {
  return {
    isIOS: false,
    isAndroid: false,
    isMacOS: false,
    isWindows: false,
    isLinux: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    platform: "",
    userAgent: "",
    hasTouch: false,
    screenSize: "medium",
    orientation: undefined,
    isIOSVersion: () => false,
    isMobileDevice: () => false,
  };
};

// Detención de plataformas
const detectIOS = (userAgent: string, platform: string): boolean => {
  // tradicional
  const iosDevices = [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ];
  if (iosDevices.includes(platform)) return true;
  // Detección para iPad moderno (iPadOs 13+)
  if (userAgent.includes("Mac") && "ontouchend" in document) return true;
  // Detección adiccional por user agent
  return /iPad|iPhone|iPod/i.test(userAgent);
};

const detectMobile = (userAgent: string): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

const detectTablet = (userAgent: string, isIOS: boolean): boolean => {
  // iPad
  if (
    isIOS &&
    (/iPad/i.test(userAgent) ||
      (userAgent.includes("Mac") && "ontouchend" in document))
  ) {
    return true;
  }
  return /Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
};

const getScreenSize = (): "small" | "medium" | "large" => {
  if (typeof window === "undefined") return "medium";

  const width = window.innerWidth;
  if (width < 768) return "small";
  if (width < 1024) return "medium";
  return "large";
};

const getOrientation = (): "portrait" | "landscape" | undefined => {
  if (typeof window === "undefined") return undefined;

  if (screen.orientation) {
    return screen.orientation.angle === 0 || screen.orientation.angle === 180
      ? "portrait"
      : "landscape";
  }

  return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
};

export {
  createDefaultDeviceInfo,
  detectIOS,
  getOrientation,
  getScreenSize,
  detectTablet,
  detectMobile,
};
