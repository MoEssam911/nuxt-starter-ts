/**
 * Generate a unique request ID for tracing API calls
 */
export const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};
