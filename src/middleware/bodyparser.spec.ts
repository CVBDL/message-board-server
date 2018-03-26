import test from 'ava';

import * as Koa from 'koa';

import bodyParser from './bodyparser';


test('provide bodyparser middleware', t => {
  t.is('function', typeof bodyParser);
});
