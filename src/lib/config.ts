/**
 * Environment Configuration
 * 
 * Centralized configuration management for environment variables.
 * Uses import.meta.env for Vite environment variables.
 */

// Helper to safely get environment variables
const getEnv = (key: string, defaultValue: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
};

const getEnvBoolean = (key: string, defaultValue: boolean = false): boolean => {
  const value = getEnv(key);
  return value === 'true' || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number = 0): number => {
  const value = getEnv(key);
  return value ? Number(value) : defaultValue;
};

export const config = {
  // API Endpoints
  api: {
    geodir: getEnv('VITE_GEODIR_API_URL', 'https://shoplocal.kinsta.cloud/wp-json/geodir/v2'),
    wordpress: getEnv('VITE_WP_API_URL', 'https://shoplocal.kinsta.cloud/wp-json/wp/v2'),
    dokan: getEnv('VITE_DOKAN_API_URL', 'https://shoplocal.kinsta.cloud/wp-json/dokan/v1'),
    timeout: getEnvNumber('VITE_API_TIMEOUT', 10000),
  },

  // Authentication
  auth: {
    username: getEnv('VITE_WP_USERNAME'),
    appPassword: getEnv('VITE_WP_APP_PASSWORD'),
    token: getEnv('VITE_API_AUTH_TOKEN'),
    jwtSecret: getEnv('VITE_JWT_SECRET'),
    jwtExpiration: getEnv('VITE_JWT_EXPIRATION', '7d'),
  },

  // External Services
  services: {
    unsplash: getEnv('VITE_UNSPLASH_ACCESS_KEY'),
    googleMaps: getEnv('VITE_GOOGLE_MAPS_API_KEY'),
    stripe: {
      publishableKey: getEnv('VITE_STRIPE_PUBLISHABLE_KEY'),
      secretKey: getEnv('VITE_STRIPE_SECRET_KEY'),
    },
    paypal: {
      clientId: getEnv('VITE_PAYPAL_CLIENT_ID'),
      secret: getEnv('VITE_PAYPAL_SECRET'),
    },
  },

  // Application Settings
  app: {
    env: getEnv('VITE_APP_ENV', 'development'),
    url: getEnv('VITE_APP_URL', 'http://localhost:5173'),
    isDevelopment: typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV,
    isProduction: typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD,
  },

  // Pagination
  pagination: {
    defaultPerPage: getEnvNumber('VITE_DEFAULT_PER_PAGE', 20),
    maxPerPage: getEnvNumber('VITE_MAX_PER_PAGE', 100),
  },

  // Feature Flags
  features: {
    reviews: getEnvBoolean('VITE_ENABLE_REVIEWS', true),
    wishlist: getEnvBoolean('VITE_ENABLE_WISHLIST', true),
    chat: getEnvBoolean('VITE_ENABLE_CHAT', false),
    notifications: getEnvBoolean('VITE_ENABLE_NOTIFICATIONS', true),
  },

  // Email Configuration
  email: {
    smtp: {
      host: getEnv('VITE_SMTP_HOST'),
      port: getEnvNumber('VITE_SMTP_PORT', 587),
      user: getEnv('VITE_SMTP_USER'),
      password: getEnv('VITE_SMTP_PASSWORD'),
    },
    from: getEnv('VITE_SMTP_FROM', 'noreply@shoplocal.com'),
    fromName: getEnv('VITE_SMTP_FROM_NAME', 'ShopLocal Marketplace'),
  },

  // CDN & Storage
  storage: {
    cdnUrl: getEnv('VITE_CDN_URL'),
    aws: {
      accessKeyId: getEnv('VITE_AWS_ACCESS_KEY_ID'),
      secretAccessKey: getEnv('VITE_AWS_SECRET_ACCESS_KEY'),
      region: getEnv('VITE_AWS_REGION', 'us-east-1'),
      bucket: getEnv('VITE_AWS_S3_BUCKET'),
    },
  },

  // Analytics
  analytics: {
    googleAnalytics: getEnv('VITE_GA_TRACKING_ID'),
    facebookPixel: getEnv('VITE_FB_PIXEL_ID'),
    sentry: getEnv('VITE_SENTRY_DSN'),
  },

  // Security
  security: {
    corsOrigins: getEnv('VITE_CORS_ORIGINS').split(',').filter(Boolean),
    rateLimit: {
      requests: getEnvNumber('VITE_RATE_LIMIT_REQUESTS', 100),
      window: getEnvNumber('VITE_RATE_LIMIT_WINDOW', 900000),
    },
    sessionSecret: getEnv('VITE_SESSION_SECRET'),
  },
};

/**
 * Get the authorization header for API requests
 */
export const getAuthHeader = (): string => {
  if (config.auth.token) {
    return `Basic ${config.auth.token}`;
  }
  
  // Fallback: create token from username and password
  if (config.auth.username && config.auth.appPassword) {
    const token = btoa(`${config.auth.username}:${config.auth.appPassword}`);
    return `Basic ${token}`;
  }
  
  // Check localStorage for auth token (from user login)
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      return `Basic ${storedToken}`;
    }
  }
  
  return '';
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
