import * as Koa from 'koa';

import getErrorHandler from '../core/error-handler-factory';


/**
 * Client error send in response.
 */
export interface ClientError {
  status: number;
  message: string;
  errors?: any[];
}

/**
 * Error handler function.
 */
export type ErrorHandler = (err: any) => ClientError;

/**
 * Application error handler middleware.
 * @param ctx 
 * @param next 
 * @see {@link https://github.com/koajs/examples/blob/master/errors/app.js}
 */
async function handler(ctx: Koa.Context, next: () => Promise<any>) {
  try {
    await next();

  } catch (err) {
    const handler: ErrorHandler = getErrorHandler(err);
    const result: ClientError = handler(err);
    ctx.status = result.status;
    ctx.body = {
      message: result.message
    };

    ctx.app.emit('error', err, ctx);
  }
}

const middleware: Koa.Middleware = handler;

export default middleware;
