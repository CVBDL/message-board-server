import {
  getAbsoluteFilePath,
  loadFile
} from './file-loader';


const configFileRelativePath = '../config/config.json';

let config: { [property: string]: any } | null;

export function getConfig(name: string): any {
  if (!config) {
    let rawConfig: string | null = loadConfig(configFileRelativePath);

    if (rawConfig !== null) {
      config = parseConfig(rawConfig);
    }
  }

  const configValue: any = getConfigValue(config, name);

  return configValue;
}

function loadConfig(relativeFilePath: string): string | null {
  const configFilePath: string = getAbsoluteFilePath(relativeFilePath);
  const configFileContent: string | null = loadFile(configFilePath);

  return configFileContent;
}

function parseConfig(rawConfig: string): { [property: string]: any } | null {
  let config: { [property: string]: any } | null = null;

  try {
    config = JSON.parse(rawConfig);
  } catch(e) { }

  if (config && typeof config === 'object') {
    return config;

  } else {
    return null;
  }
}

function getConfigValue(config: { [property: string]: any } | null, name: string) {
  if (config !== null) {
    return config[name];
  }
}
