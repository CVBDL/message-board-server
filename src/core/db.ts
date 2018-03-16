import {
  Connection,
  createConnection
} from 'mongoose';

import { Configuration } from './config';
import { Environment } from './environment';


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
    const config: Configuration = Configuration.instance;
    const environment: Environment = Environment.instance;

    const host: string = config.read('dbHost');
    const port: number = config.read('dbPort');

    let database: string;
    if (environment.read('NODE_ENV') === 'production') {
      database = config.read('dbNameProd');
    } else {
      database = config.read('dbNameDev');
    }

    return `mongodb://${host}:${port}/${database}`;
  }
}
