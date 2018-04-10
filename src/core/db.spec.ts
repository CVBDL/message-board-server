import test from 'ava';

import { Db } from './db';
import { Connection } from 'mongoose';


test('should be singleton', t => {
  const dbA: Db = Db.instance;
  const dbB: Db = Db.instance;

  t.is(dbA, dbB);
});

test('should return a database connection', t => {
  let connection = Db.instance.getConnection();

  t.is('function', typeof connection.model);
});
