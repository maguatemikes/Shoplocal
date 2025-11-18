/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_GEODIR_API_URL?: string;
  readonly VITE_WP_API_URL?: string;
  readonly VITE_DOKAN_API_URL?: string;
  readonly VITE_API_TIMEOUT?: string;

  // Authentication
  readonly VITE_WP_USERNAME?: string;
  readonly VITE_WP_APP_PASSWORD?: string;
  readonly VITE_API_AUTH_TOKEN?: string;
  readonly VITE_JWT_SECRET?: string;
  readonly VITE_JWT_EXPIRATION?: string;

  // External Services
  readonly VITE_UNSPLASH_ACCESS_KEY?: string;
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_STRIPE_SECRET_KEY?: string;
  readonly VITE_PAYPAL_CLIENT_ID?: string;
  readonly VITE_PAYPAL_SECRET?: string;

  // Application Configuration
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_DEFAULT_PER_PAGE?: string;
  readonly VITE_MAX_PER_PAGE?: string;

  // Feature Flags
  readonly VITE_ENABLE_REVIEWS?: string;
  readonly VITE_ENABLE_WISHLIST?: string;
  readonly VITE_ENABLE_CHAT?: string;
  readonly VITE_ENABLE_NOTIFICATIONS?: string;

  // Email Configuration
  readonly VITE_SMTP_HOST?: string;
  readonly VITE_SMTP_PORT?: string;
  readonly VITE_SMTP_USER?: string;
  readonly VITE_SMTP_PASSWORD?: string;
  readonly VITE_SMTP_FROM?: string;
  readonly VITE_SMTP_FROM_NAME?: string;

  // CDN & Storage
  readonly VITE_CDN_URL?: string;
  readonly VITE_AWS_ACCESS_KEY_ID?: string;
  readonly VITE_AWS_SECRET_ACCESS_KEY?: string;
  readonly VITE_AWS_REGION?: string;
  readonly VITE_AWS_S3_BUCKET?: string;

  // Analytics & Monitoring
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_FB_PIXEL_ID?: string;
  readonly VITE_SENTRY_DSN?: string;

  // Security
  readonly VITE_CORS_ORIGINS?: string;
  readonly VITE_RATE_LIMIT_REQUESTS?: string;
  readonly VITE_RATE_LIMIT_WINDOW?: string;
  readonly VITE_SESSION_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
