import test from 'ava';
import { Connection } from 'mongoose';

import { getConnection } from './db';

test('should return a mongoose Connection instance', t => {
  let connection = getConnection();

  t.true(connection instanceof Connection);
});
