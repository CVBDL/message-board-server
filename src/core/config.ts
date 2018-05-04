let config: { [property: string]: any } | null;

try {
  config = require('../config/config.json');

} catch (e) {
  throw "Error occurred parsing config.json";
}

/**
 * Get a config value by its key name.
 * 
 * @param name Config key name.
 */
export function getConfig(name: string): any {
  const configValue: any = getConfigValue(config, name);

  return configValue;
}

function getConfigValue(config: { [property: string]: any } | null, name: string) {
  if (config !== null) {
    return config[name];
  }
}
