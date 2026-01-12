// Utilidades para detectar y manejar diferentes tipos de dispositivos

export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;
  
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || screenWidth < 768;
  const isTablet = /ipad/i.test(userAgent) || (screenWidth >= 768 && screenWidth < 1024);
  const isDesktop = screenWidth >= 1024;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    userAgent
  };
};

export const getTouchCapabilities = () => {
  return {
    hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    supportsPen: navigator.maxTouchPoints > 1
  };
};

export const getOptimalCanvasSize = () => {
  const device = detectDevice();
  
  if (device.isMobile) {
    return {
      width: Math.min(device.screenWidth - 32, 600),
      height: Math.min(window.innerHeight - 200, 400)
    };
  } else if (device.isTablet) {
    return {
      width: Math.min(device.screenWidth - 64, 800),
      height: Math.min(window.innerHeight - 250, 600)
    };
  } else {
    return {
      width: Math.min(device.screenWidth - 128, 1200),
      height: Math.min(window.innerHeight - 300, 800)
    };
  }
};

export const getRecommendedBrushSize = () => {
  const device = detectDevice();
  const touch = getTouchCapabilities();
  
  if (device.isMobile && touch.hasTouch) {
    return 8; // Más grande para dedos
  } else if (device.isTablet && touch.supportsPen) {
    return 3; // Tamaño medio para stylus
  } else {
    return 5; // Tamaño estándar para mouse
  }
};

export const shouldUseThickUI = () => {
  const device = detectDevice();
  return device.isMobile || device.isTablet;
};
