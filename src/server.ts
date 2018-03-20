import * as Koa from "koa"
import bodyParser = require('koa-bodyparser');

import tweet from './api/tweet/api';
import { ErrorHandler } from "./core/error-handler";


const server = new Koa();

server.use(ErrorHandler.handle);

// https://github.com/koajs/bodyparser#usage
server.use(bodyParser({
  enableTypes: ['json', 'form'],
  encode: 'utf-8',
  formLimit: '56kb',
  jsonLimit: '1mb',
  strict: true,
  onerror: (err, ctx) => {
    ctx.throw('Body should be a JSON object.', 400);
  }
}));

// debugging
server.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// register tweet apis
server.use(tweet.routes());

// global error handler
server.on('error', (err) => {
  console.log(err);
});

server.listen(3000);

console.log('Listening on port 3000...');
