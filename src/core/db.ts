import {
  Connection,
  createConnection
} from 'mongoose';

import { getConfig } from './config';
import { getEnvironmentVariable } from './environment';


/**
 * Wrapper of database.
 */
export class Db {
  private static _instance: Db | null = null;

  private constructor() { }

  public static get instance(): Db {
    if (!Db._instance) {
      Db._instance = new Db();
    }
    return Db._instance;
  }

  /**
   * Creates a Connection instance.
   */
  public getConnection(): Connection {
    return createConnection(this.getConnectionString());
  }

  /**
   * Get MongoDB connection URI used to connect to a MongoDB database server.
   */
  private getConnectionString(): string {
    const host: string = getConfig('dbHost');
    const port: number = getConfig('dbPort');

    let database: string;
    if (getEnvironmentVariable('NODE_ENV') === 'production') {
      database = getConfig('dbNameProd');
    } else {
      database = getConfig('dbNameDev');
    }

    return `mongodb://${host}:${port}/${database}`;
  }
}
