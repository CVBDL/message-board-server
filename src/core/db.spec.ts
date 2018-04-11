import test from 'ava';

import { getConnection } from './db';

test('should return a database connection', t => {
  let connection = getConnection();

  t.is('function', typeof connection.model);
});
