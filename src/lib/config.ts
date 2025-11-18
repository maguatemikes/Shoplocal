/**
 * Configuration file for ShopLocal Marketplace
 * Centralized configuration for API endpoints, feature flags, and app settings
 */

/**
 * Main configuration object
 */
export const config = {
  // API Endpoints
  api: {
    geodir: 'https://wpgeodirectory.com/wp-json/geodir/v2',
    wordpress: 'https://your-site.com/wp-json/wp/v2',
    dokan: 'https://your-site.com/wp-json/dokan/v1',
  },

  // Authentication
  auth: {
    token: '',
    type: 'Basic',
  },

  // Feature flags
  features: {
    geolocation: true,
    distanceCalculation: true,
    caching: true,
    maps: true,
    pagination: true,
    infiniteScroll: false,
  },

  // Caching settings
  cache: {
    ttl: 10 * 60 * 1000, // 10 minutes in milliseconds
    storageKey: 'shoplocal_cache',
    enabled: true,
  },

  // Pagination settings
  pagination: {
    defaultPerPage: 12,
    maxPerPage: 100,
  },

  // Geolocation settings
  geolocation: {
    defaultRadius: 50, // miles
    maxRadius: 500, // miles
    enableBrowserLocation: true,
    fallbackToZipCode: true,
  },

  // Map settings
  map: {
    defaultCenter: [39.8283, -98.5795] as [number, number], // Center of USA
    defaultZoom: 4,
    markerZoom: 13,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },

  // Brand colors
  colors: {
    primary: '#0EA5E9', // Sky blue
    black: '#000000',
    white: '#FFFFFF',
  },

  // UI settings
  ui: {
    buttonBorderRadius: '6px',
    containerMaxWidth: '1280px', // max-w-7xl
    animationDuration: 200,
  },

  // Typography
  typography: {
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    tracking: {
      tight: '-0.025em',
      wide: '0.025em',
      normal: '0',
    },
  },

  // External APIs
  external: {
    nominatim: 'https://nominatim.openstreetmap.org',
    unsplash: 'https://source.unsplash.com',
  },

  // App metadata
  app: {
    name: 'ShopLocal',
    description: 'Comprehensive marketplace for independent sellers and wholesale offerings',
    tagline: 'Shop Premium Brands Locally',
  },

  // SEO settings
  seo: {
    titleTemplate: '%s | ShopLocal',
    defaultTitle: 'ShopLocal - Your Local Marketplace',
    defaultDescription: 'Discover premium brands and local sellers in your community',
  },

  // Vendor directory settings
  vendorDirectory: {
    categoriesEnabled: true,
    ratingsEnabled: true,
    reviewsEnabled: true,
    mapViewEnabled: true,
  },
};

/**
 * Get the authorization header for API requests
 */
export const getAuthHeader = (): string => {
  if (config.auth.token) {
    return `Basic ${config.auth.token}`;
  }
  return '';
};

/**
 * Build API URL with query parameters
 */
export const buildApiUrl = (
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string => {
  const url = new URL(`${baseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof config.features): boolean => {
  return config.features[feature];
};

/**
 * Get API endpoint URL
 */
export const getApiUrl = (service: 'geodir' | 'wordpress' | 'dokan'): string => {
  return config.api[service];
};

export default config;