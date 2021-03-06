import {
  Connection,
  createConnection
} from 'mongoose';

import { getConfig } from './config';
import { getEnvironmentVariable } from './environment';


let isTestMode: boolean = false;

/**
 * Connect to testing database.
 */
export function enableTestMode(): void {
  isTestMode = true;
}

/**
 * Returns a Mongoose connection.
 */
export function getConnection(): Connection {
  const host: string = getHost();
  const port: number = getPort();
  const database: string = getDbName();
  const connectionString: string = getConnectionString(host, port, database);
  const connection: Connection = createConnection(connectionString);

  return connection;
}

function getHost(): string {
  return getConfig('dbHost');
}

function getPort(): number {
  return getConfig('dbPort');
}

function getDbName(): string {
  const envVarName = 'NODE_ENV';
  const envVarValueForProd = 'production';

  let database: string;
  if (isTestMode) {
    database = getConfig('dbNameTest');

  } else if (getEnvironmentVariable(envVarName) === envVarValueForProd) {
    database = getConfig('dbNameProd');

  } else {
    database = getConfig('dbNameDev');
  }

  return database;
}

function getConnectionString(host: string, port: number, database: string): string {
  const connectionString: string = `mongodb://${host}:${port}/${database}`;

  return connectionString;
}
