export function getEnvConfig() {
  /**
   * PUBLIC_INTERFACE
   * Returns environment variables for future backend integration.
   * Reads without assuming presence; returns undefined if not set.
   */
  return {
    API_BASE: process.env.REACT_APP_API_BASE,
    BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL,
    WS_URL: process.env.REACT_APP_WS_URL,
    NODE_ENV: process.env.REACT_APP_NODE_ENV,
    NEXT_TELEMETRY_DISABLED: process.env.REACT_APP_NEXT_TELEMETRY_DISABLED,
    ENABLE_SOURCE_MAPS: process.env.REACT_APP_ENABLE_SOURCE_MAPS,
    PORT: process.env.REACT_APP_PORT,
    TRUST_PROXY: process.env.REACT_APP_TRUST_PROXY,
    LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL,
    HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH,
    FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS,
    EXPERIMENTS_ENABLED: process.env.REACT_APP_EXPERIMENTS_ENABLED,
  };
}
