import * as Koa from 'koa';

import bodyParser from './middleware/bodyparser';
import errorHandler from './middleware/error-handler';
import requestLogger from './middleware/request-logger';

import tweetRouter from './api/tweet/router';


const server = new Koa();

// overall error handler
server.use(errorHandler);

// request body parser
server.use(bodyParser);

// request logger for debugging
server.use(requestLogger);

// register tweet rest apis
server.use(tweetRouter);

// global error handler
server.on('error', (err) => {
  console.log(err);
});

server.listen(3000);

console.log('Listening on port 3000...');
