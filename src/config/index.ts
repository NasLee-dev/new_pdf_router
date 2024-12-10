export const config = {
  port: process.env.NODE_PORT || 9999,
  corsOrigins: process.env.CORS_ORIGINS || '*',
  maxRequestSize: '50mb',
  env: process.env.NODE_ENV || 'development'
};