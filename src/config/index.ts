export const config = {
  port: process.env.PORT || 9999,
  corsOrigins: process.env.CORS_ORIGINS || '*',
  maxRequestSize: '50mb',
  env: process.env.NODE_ENV || 'development'
};