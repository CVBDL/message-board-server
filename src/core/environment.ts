import { KeyValueReader } from './key-value-reader';


/**
 * Singleton class.
 */
export class Environment implements KeyValueReader {
  private static _instance: Environment | null = null;

  private constructor() { }

  public static get instance(): Environment {
    if (!Environment._instance) {
      Environment._instance = new Environment();
    }
    return Environment._instance;
  }

  public read(key: string): string | undefined {
    return process.env[key];
  }
}
