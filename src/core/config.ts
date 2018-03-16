import * as fs from 'fs';
import * as path from 'path';

import { KeyValueReader } from './key-value-reader';


/**
 * Singleton class.
 */
export class Configuration implements KeyValueReader {
  private static _instance: Configuration | null = null;

  private json: { [property: string]: any };

  private constructor() { }

  public static get instance(): Configuration {
    if (!Configuration._instance) {
      Configuration._instance = new Configuration();
    }
    return Configuration._instance;
  }

  public read(key: string): any {
    if (!this.json) {
      this.readJson();
    }
    return this.json[key];
  }

  private readJson(): void {
    const filePath: string = path.join(__dirname, '../config/config.json');
    const content: string = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    this.json = JSON.parse(content);
  }
}
