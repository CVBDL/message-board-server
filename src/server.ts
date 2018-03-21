import * as Koa from "koa"

import bodyParser from "./core/bodyparser";

import tweet from './api/tweet/api';
import { ErrorHandler } from "./core/error-handler";


const server = new Koa();

server.use(ErrorHandler.handle);

// parse request body
server.use(bodyParser);

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
