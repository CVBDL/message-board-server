/**
 * Read system environment variable value.
 * 
 * @param key Environment variable name
 */
export function getEnvironmentVariable(key: string): string | undefined {
  return process.env[key];
}
